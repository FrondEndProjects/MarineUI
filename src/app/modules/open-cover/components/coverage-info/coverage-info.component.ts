import { map, filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { OpenCoverService } from '../../open-cover.service';
import * as Mydatas from '../../../../app-config.json';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-coverage-info',
  templateUrl: './coverage-info.component.html',
  styleUrls: ['./coverage-info.component.scss'],
})
export class CoverageInfoComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public coverTypeList: any[] = [];
  public transportDetails: any[] = [];
  public currencyList:any[]=[];
  public routerBaseLink:any='';
  public OpenCover:any;
  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
    private appComponent: AppComponent,

  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails') || '{}');
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
  }

  ngOnInit(): void {
    this.onGetCurrencyDropdownList();
    this.onGetTransportList();
  }

  onSelectCustomer(item: any) {
    console.log(item);
  }
  onGetCurrencyDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/currency`;
    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
      'CountryId': this.userDetails.CountryId,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.currencyList = data?.Result;
        }
      },
      (err) => { },
    );
  }
  onGetTransportList() {
    const urlLink = `${this.ApiUrl1}OpenCover/transport/edit`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'ProposalNo': this.proposalNo
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('transport', data);
        this.columnHeader = [
          {
            key: 'ModeOfTransportName',
            display: 'Mode of transport',
            config: {
              isCheck: true,
            },
          },
          {
            key: 'CoverInfo',
            display: 'Coverages',
            config: {
              isCoverageList: true,
            },
          },


        ];
        this.transportDetails = data?.Result?.TransportDetails;
        // this.onGetCoverTypeList(data?.Result?.TransportDetails)
        const list: any[] = data?.Result?.TransportDetails;
        const CoverTypeList: any[] = [];
        for (let index = 0; index < list.length; index++) {
          const element = list[index];
          let urlLink = `${this.ApiUrl1}OpenCover/covertype/list`;
          let reqData = {
            'BranchCode': this.userDetails?.BranchCode,
            'ModeOfTransportCode': element?.ModeOfTransport
          }
          CoverTypeList.push(this.openCoverService.onPostMethodSync(urlLink, reqData));
          if (index === list.length - 1) {
            this.onGetCoverTypeList(CoverTypeList);
          }
        }
      },
      (err) => { },
    );
  }
  onGetCoverTypeList(list: any[]) {
    let parallelCall = forkJoin(list);
    parallelCall.subscribe(
      (data: any) => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.coverTypeList.push(...element.Result);
        }
        console.log("coverType", this.coverTypeList);
        let list = this.transportDetails.map(x => ({
          ...x,
          isChecked:this.modeOfCheck(x.ModeOfCheck,x.ModeOfTransport),
          CoverInfo:x.CoverInfo?.map(ele=>({...ele,CoverCheck:this.coverCheck(ele.CoverCheck,ele.CoverId),CoverTypeInfo:this.coverTypeList.filter((ob:any)=>ob.ModeOfTransportCode === x.ModeOfTransport).map(el=>({...el,conveyanceCheck:this.conveyanceCheck(ele.CoverTypeInfo,el)}))}))
        }))
        console.log('cover-data',list);
        this.tableData = list;
      },
      (err) => { },
      () => console.log('done')
    );
  }
  onSubmit() {
    const filterCheckedList = this.tableData.filter((ele: any) => ele.isChecked === true);
    const TransportDetails: any[] = filterCheckedList.map(x => ({
      "CoverInfo": x.CoverInfo.filter(y=>y.CoverCheck === true).map(z=>(
        {
          CoverId:z.CoverId,
          CoverName:z.CoverName,
          CoverTypeInfo:z.CoverTypeInfo.filter(b=>b.conveyanceCheck ===true).map(c=>({CoverTypeId:c.ConveyanceCode,CoverTypeName:c.ConveyanceDesc}))}
        )),
      "CurrencyId": x.CurrencyId,
      "CurrencyName": this.getCurrencyInfo(x.CurrencyId,'CodeDescription'),
      "CurrencyValue": this.getCurrencyInfo(x.CurrencyId,'CodeValue'),
      "LocationLimit": x.LocationLimit,
      "ModeOfTransport": x.ModeOfTransport,
      "ModeOfTransportName": x.ModeOfTransportName,
      "PerBottomLimit": x.PerBottomLimit
    }));
    console.log(TransportDetails);
    const urlLink = `${this.ApiUrl1}OpenCover/transport/save`;
    const reqData =  {
      "OpenCoverNo": this.OpenCover?.value,
      "ProposalNo":  this.proposalNo,
      "TransportDetails": TransportDetails
    }
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result.Status){
          this.onMoveFront();

        }
      },
      (err) => { },
    );

  }


  getCurrencyInfo(id:any,name:any){
    if(id){
      let idx =  this.currencyList.findIndex((m:any)=>m.Code == id);
      console.log("Entry",idx)
      if(idx>=0) return this.currencyList[idx][name];
      else return '';
    }

  }
  conveyanceCheck(selected:any[],all:any){
    if(selected){
     let x = selected.some((ele:any)=>ele.CoverTypeId == all.ConveyanceCode);
     return x;
    }
  }
  modeOfCheck(ModeOfCheck:any,ModeOfTransport:any){
    if(ModeOfCheck === ModeOfTransport){
      return true;
    }else{
      return false;
    }
  }
  coverCheck(CoverCheck:any,CoverId:any){
    if(CoverCheck === CoverId){
      return true;
    }else{
      return false;
    }



  }
  onMoveFront() {
    this.openCoverService.onMoveNext('Front');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/commodity-info`]);
  }
  onMoveBack() {
    this.openCoverService.onMoveNext('Back');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/country-commodity-info`]);
  }
}
