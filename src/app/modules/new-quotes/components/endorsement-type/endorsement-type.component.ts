import { NewQuotesService } from './../../new-quotes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as Mydatas from '../../../../app-config.json';
import Swal from 'sweetalert2';
import { NewQuotesComponent } from '../../new-quotes.component';

@Component({
  selector: 'app-endorsement-type',
  templateUrl: './endorsement-type.component.html',
  styleUrls: ['./endorsement-type.component.scss'],

})
export class EndorsementTypeComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;

  public nonFinancial: any[] = [];
  public financial: any[] = [];
  public QuoteNo: any = '';
  public PolicyNo: any = '';
  public remarks: any = '';
  public cancelRemarks: any = '';
  public isCancelRemarks: boolean = false;

  public endorsement: any;
  public issueDate:any;
  public OpenCover:any;
  public routerBaseLink:any='';

  constructor(
    private newQuotesService: NewQuotesService,
    private router: Router,
    private newQuotesComponent:NewQuotesComponent

  ) {
    this.userDetails = this.newQuotesComponent?.userDetails;
    this.routerBaseLink = this.userDetails?.routerBaseLink;

    console.log('hhhhhhhhh',this.routerBaseLink);

    this.productId = this.newQuotesComponent?.productId;
    this.loginId = this.newQuotesComponent.loginId;
    this.applicationId = this.newQuotesComponent.applicationId;
    this.OpenCover = this.newQuotesComponent?.OpenCover;
    this.endorsement = JSON.parse(sessionStorage.getItem('endorsement'));
    this.loginId = this.endorsement?.LoginId != undefined ? this.endorsement?.LoginId : this.loginId;

  }
  ngOnInit(): void {
    this.QuoteNo = this.endorsement?.QuoteNo;
    this.PolicyNo = this.endorsement?.PolicyNo;
    this.onGetEndorsements();
  }

  onChangeType(event: any) {
    const listMerge: any[] = [...this.financial, ...this.nonFinancial];
    const checkedLength: any[] = listMerge.filter((ele: any) => ele.isChecked == true);

    if (checkedLength[0]?.EndtTypeId == '41' && checkedLength?.length == 1) {
      this.isCancelRemarks = true;
    } else {
      this.isCancelRemarks = false;

    }
  }

  onGetEndorsements() {
    const urlLink = `${this.ApiUrl1}menu/endorsementtype/list`;
    const urlLink2 = `${this.ApiUrl1}menu/endorsement/edit`;

    const reqData = {
      "ProductId": '3',
    };
    const reqData2 = {
      "QuoteNo": this.QuoteNo
    };
    const endoList = this.newQuotesService.onPostMethodSync(urlLink, reqData);
    const endoListEdit = this.newQuotesService.onPostMethodSync(urlLink2, reqData2);

    forkJoin([endoList, endoListEdit]).subscribe((list: any) => {
      const endoList: any[] = list[0]?.Result || [];
      const endoListEdit: any = list[1]?.Result?.EndtFields || '';
      const EndtFields: any[] = endoListEdit.split(",");
      this.remarks = list[1]?.Result?.EndtRemarks;
      console.log(endoListEdit, EndtFields)

      this.nonFinancial = endoList.filter((x: any) => x.EndtTypeCategory == 'Non Financial').map(y => ({
        ...y,
        isChecked: EndtFields.some((ele: any) => ele == y.EndtTypeId)
      }));
      this.financial = endoList?.filter((x: any) => x.EndtTypeCategory == 'Financial').map(y => ({
        ...y,
        isChecked: EndtFields.some((ele: any) => ele == y.EndtTypeId)
      }));
      console.log(this.nonFinancial, this.financial);

    })
  }

  onSubmit() {
    const urlLink = `${this.ApiUrl1}api/endorsement/save`;
    const listMerge: any[] = [...this.financial, ...this.nonFinancial];
    const EndorsementInfo: any[] = listMerge.filter((ele: any) => ele.isChecked === true).map(x => ({
      EndType: x.EndtTypeId
    }));
    let isCheckEnt = EndorsementInfo.some((ele: any) => ele.EndType == '41');
    let url: any = `${this.routerBaseLink}/new-quotes/customer-info`;
    let isCheckCancle: boolean = false;

    if (isCheckEnt && EndorsementInfo.length == 1) {
      url = `${this.routerBaseLink}/portfolio/canceled-policies`;
      //url = `${this.routerBaseLink}/new-quotes/policy-generate`;
      isCheckCancle = true;
    } else {
      url = `${this.routerBaseLink}/new-quotes/customer-info`;
    }

    console.log(EndorsementInfo, isCheckEnt, EndorsementInfo.length)

    const reqData = {
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "CancelRemarks": this.cancelRemarks,
      "CancelYN": "",
      "EndtRemarks": this.remarks,
      "LoginId": this.loginId,
      "LoginUserType": this.userDetails.UserType,
      "OpenCoverNo": this.OpenCover?.value,
      "PolicyNo": this.PolicyNo,
      "QuoteNo": this.QuoteNo,
      "EndorsementInfo": EndorsementInfo,
      "EffectiveDate": this.issueDate? this.issueDate?.replace(/-/g, '/'):'',
    }

    if (isCheckEnt && EndorsementInfo.length != 1) {
      Swal.fire(
        'Cancellation of Certificate/Individual Policy',
        `Please remove other endorsement types`,
        'info'
      )

    } else {
      if (isCheckCancle) {
        Swal.fire({
          title: 'Are you sure?',
          text: "Do You really want to cancel this policy!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
              console.log(data);
              if (data.Message == "Success") {
                sessionStorage.setItem('ReferenceNo', data?.Result?.ReferenceNo);
                this.router.navigate([url]);
                console.log('ggggggg', this.router.navigate([url]))
              }
            })
          }
        })
      } else {
        this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
          console.log(data);
          if (data.Message == "Success") {
            sessionStorage.setItem('ReferenceNo', data?.Result?.ReferenceNo);
            this.router.navigate([url]);
          }
        })
      }

    }
  }

}
