import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenCoverService } from '../../open-cover.service';
import * as Mydatas from '../../../../app-config.json';
@Component({
  selector: 'app-commodity-info',
  templateUrl: './commodity-info.component.html',
  styleUrls: ['./commodity-info.component.scss'],
})
export class CommodityInfoComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public innerTableData: any[] = [];
  public innerColumnHeader: any[] = [];

  public CommodityList: any[] = [];
  public CommodityNotIn: any[] = [];

  public coverTypeId: any;
  public coverTransitId: any;
  public isWarType: any;

  public routerBaseLink:any='';
  EndorsementStatus: any;
  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,

  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;

  }

  ngOnInit(): void {
    this.onCheckWarTypeYesOrNo();
    this.onGetLandTrasitYesOrNo();
    this.onGetCoverTypeId();
    this.onGetCommodityList();
    this.editapis();
  }



  onGetCoverTypeId() {
    const urlLink = `${this.ApiUrl1}OpenCover/type`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('cover-id', data);
        this.coverTypeId = data?.OpenCoverType;
      },
      (err) => { },
    );
  }

  onGetLandTrasitYesOrNo() {
    const urlLink = `${this.ApiUrl1}OpenCover/hauliertype`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('transit-id', data);
        this.coverTransitId = data?.HaulierYn;
      },
      (err) => { },
    );
  }
  onCheckWarTypeYesOrNo() {
    const urlLink = `${this.ApiUrl1}OpenCover/warsrccyn`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('war', data);
        this.isWarType = data?.Result;
      },
      (err) => { },
    );
  }
  editapis(){
    const urlLink = `${this.ApiUrl1}OpenCover/endorsement/edit`;
    let ReqObj={
      "ProposalNo": this.proposalNo,
      "BranchCode": this.userDetails.BranchCode
    }
    this.openCoverService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log('Datas',data);
        this.EndorsementStatus = data?.EndorsementStatus
      },
      (err) => { },
    );
  
}
  onGetCommodityList() {
    const urlLink = `${this.ApiUrl1}OpenCover/commodity/edit/info`;
    const reqData = {
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
         const CommodityIn:any[] = data?.Result?.CommodityInResponse || [];
         const CommodityNotIn:any[] = data?.Result?.CommodityNotInResponse.map((ele:any)=>({
          ...ele,
          CommodityNotInResponse:true
         })) || [];
         this.CommodityList = [...CommodityIn,...CommodityNotIn];
        this.columnHeader = [
          {
            key: 'CommodityName',
            display: 'Commodity Name',
            sticky: true,

          },
          {
            key: 'edit',
            display: 'Rate',
            sticky: false,
            config: {
              isCollapse: true,
              isCollapseName:'Add rate'
            },
          },
        ];
        this.tableData = this.CommodityList;
        this.tableData =  this.tableData.map(x=>({
          ...x,
          isClicked:false
        }));

      },
      (err) => { },
    );

  }

  onGetSelectedCommodityList(element: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/premium/commodity/edit`;
    const reqData = {
      "ProposalNo": this.proposalNo,
      "CommodityCode": element.CommodityId,
      "BranchCode": this.userDetails.BranchCode
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('rate',data);
        this.innerColumnHeader = [
          {
            key: 'CommodityName',
            display: 'Commodity Name',
          },
          {
            key: 'ModeOfTransportDesc',
            display: 'Mode of Transport',
          },
          {
            key: 'CoverName',
            display: 'Cover',
          },
          {
            key: 'CommodityBaseRate',
            display: 'Base Rate',
            config: {
              CommodityBaseRate: true,
            },
          },
          {
            key: 'DiscountPercent',
            display: 'Excess',
            config: {
              DiscountPercent: true,
            },
          },
          {
            key: 'DiscountValue',
            display: 'Excess Value',
            config: {
              DiscountValue: true,
            },
          },
          {
            key: 'DiscountDesc',
            display: 'Excess Desc',
            config: {
              DiscountDesc: true,
            },
          },
        ];
        this.innerTableData = data?.Result || []
      },
      (err) => { },
    );

  }

  onCheckPageValidation(){
    const urlLink = `${this.ApiUrl1}OpenCover/fourpage`;
    const reqData = {
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if(data?.Result?.Status == true){
          this.onMoveFront();
        }
      });
  }


  onMoveFront() {
    if (this.coverTypeId == '13' || this.coverTypeId == '12') {
      sessionStorage.setItem('Move',"1");
      this.router.navigate([`${this.routerBaseLink}/new-open-cover/premium-computation`]);
    } else {
      this.openCoverService.onMoveNext('Front');
      sessionStorage.setItem('Move',"1");
      this.router.navigate([`${this.routerBaseLink}/new-open-cover/policy-generate-cover`]);

    }
  }
  onMoveBack() {
    this.openCoverService.onMoveNext('Back');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/coverage-info`]);
  }
}
