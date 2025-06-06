import { OpenCoverLayoutComponent } from './../../../../layout/open-cover-layout/open-cover-layout.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import { QuotesComponent } from '../../quotes.component';
import { QuotesService } from '../../quotes.service';
import { ConfirmPromptComponent } from '../confirm-prompt/confirm-prompt.component';

@Component({
  selector: 'app-exist-quote',
  templateUrl: './exist-quote.component.html',
  styleUrls: ['./exist-quote.component.scss'],
  providers: [QuotesComponent]
})
export class ExistQuoteComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public filterValue: any;
  public selectedBroker:any=null;
  public brokerList: any[] = [];
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public OpenCover:any;
  public routerBaseLink:any='';

  constructor(
    private quoteService: QuotesService,
    private router: Router,
    private quotesComponent:QuotesComponent,
    private sessionStorageService: SessionStorageService,
    public dialog: MatDialog,
    private openCoverLayoutComponent: OpenCoverLayoutComponent
  ) {
    this.OpenCover = this.quotesComponent?.OpenCover;
    console.log(this.OpenCover);
    sessionStorage.removeItem("endorsement");
    sessionStorage.removeItem("ReferenceNo");
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.removeItem('EndtReffStatus')
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails.LoginId;
    }
  }

  ngOnInit(): void {
    this.onGetBrokerList();
    this.selectedBroker = sessionStorage.getItem('loginId');
  }
  onGetBrokerList() {
    const urlLink = `${this.ApiUrl1}menu/quoteregister/dropdownlist`;
    const reqData = {
      "Type": "QE",
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails.BranchCode
    };
    this.quoteService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.brokerList = data?.Result;
        this.selectedBroker = this.selectedBroker?this.selectedBroker:this.brokerList[0].LoginId;
        this.onChangeBroker();

      },
      (err) => { },
    );
  }
  onChangeBroker() {
    if(this.userDetails.UserType !== 'User'){
      this.loginId = this.selectedBroker;
    }
    
    this.onLoadGrid();
  }


  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}menu/existing/quote`;
    const reqData = {
      'ApplicationId': this.applicationId,
      'Key': '',
      'LoginId': this.loginId,
      'ProductId': this.productId,
      'UserType': this.userDetails.UserType,
      'OpenCoverNo': this.OpenCover?.value,
      'BranchCode': this.userDetails?.BranchCode,
    };
    this.quoteService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.columnHeader = [
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'CustomerName', display: 'Name' },
            { key: 'QuotationDate', display: 'Quote Date' },
            { key: 'ValidityDate', display: 'Validity Date' },
            { key: 'Premium', display: 'Premium' },
            { key: 'PremiumCurrencyName', display: 'Currency' },
            {
              key: "edit",
              display: "Edit",
              // sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Edit",
                isNgxIcon: "fas fa-pen-alt",
                bg: "primary",
              },
            },
            {
              key: "print",
              display: "Print",
              // sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Print",
                isNgxIcon: "fas fa-print",
                bg: "success",
              },
            },
            {
              key: "mail",
              display: "Mail",
              // sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Mail",
                isNgxIcon: "fas fa-envelope",
                bg: "warning",
              },
            },
            {
              key: "reject",
              display: "Reject",
              // sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Reject",
                isNgxIcon: "fas fa-window-close",
                bg: "danger",
              },
            },
          ];
          this.tableData = data?.Result;

        }
      },
      (err) => { },
    );
  }

  isActionBtn(event:any){
    console.log(event);
    if(event?.btName ==='Edit'){
      this.onEdit(event);
    }
    if(event?.btName === 'Mail'){

    }
    if(event?.btName === 'Reject'){
      this.onReject(event);
    }
    if(event?.btName === 'Print'){
      this.onGetSchedule(event);
    }
  }
  onGetSchedule(rowData){
    let ReqObj:any,UrlLink:any;
    ReqObj = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo": rowData.QuoteNo,
      "PrintQuoteYn": 'Y'
    }
      
       UrlLink = `${this.ApiUrl1}pdf/portalcertificate`;
      this.quoteService.onPostMethodSync(UrlLink, ReqObj).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,'Quotation')
        });
  }
  onDownloadSchedule(Results,rowData){
    console.log('jjjjjjjj',Results)
   /* const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo":row.QuoteNo
    }*/
      if(Results){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', Results);
        link.setAttribute('download',rowData);
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
  }
  onEdit(item: any) {

  
    this.sessionStorageService.remove('referral');
  //sessionStorage.removeItem('referral');

    sessionStorage.setItem('quotesType', 'Without-Endo');
    sessionStorage.setItem('ReferenceNo', item.ApplicationNo);
    sessionStorage.setItem('QuoteStatus', 'QE');
    sessionStorage.setItem('Exist','No');


    // const data = {
    //   'value':item?.OpenCoverNo

    // }
    //  sessionStorage.setItem('OpenCover',JSON.stringify(data));
    let value ='edit'
    this.router.navigate([`/${this.routerBaseLink}/new-quotes`],{ queryParams: { value } });
  }
  onGetReasonDropdown(){
    
  }
  onReject(item:any){
    const urlLink = `${this.ApiUrl1}menu/rejectedreasons`;
    const reqData = {
      "QuoteNo": item?.QuoteNo,
      "BranchCode": this.userDetails?.BranchCode
    };
    this.quoteService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        const reasonList:any[] = data?.Result;
        const dialogRef = this.dialog.open(ConfirmPromptComponent, {
          width: '400px',
          data: {items:reasonList,row:item},
        });
   
        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.onLoadGrid();
          }
        });
      },
      (err) => { },
    );

   }

}
