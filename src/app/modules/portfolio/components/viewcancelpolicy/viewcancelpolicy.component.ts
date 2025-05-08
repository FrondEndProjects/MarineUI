import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PortfolioService } from '../../portfolio.service';
import { Router } from '@angular/router';
import * as Mydatas from "../../../../app-config.json";
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import { NewQuotesService } from "../../../new-quotes/new-quotes.service";


@Component({
  selector: 'app-viewcancelpolicy',
  templateUrl: './viewcancelpolicy.component.html',
  styleUrls: ['./viewcancelpolicy.component.scss']
})
export class ViewcancelpolicyComponent  implements OnInit{

    title:any;
    imageUrl:any; public tableData: any[] = [];
    public columnHeader: any[] = [];
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public userDetails: any;
    public productId: any;
    public loginId: any;
    public applicationId: any;
    public FilterValue: any;
    public OpenCover:any=''; public isButton: boolean = false;
    public routerBaseLink:any='';portfolio:any;
   constructor( private portfolioBrokerService: PortfolioService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    public dialogService: MatDialog, private newQuotesService: NewQuotesService,) {
      this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.routerBaseLink = this.userDetails?.routerBaseLink;
      this.portfolio = JSON.parse(sessionStorage.getItem("portfolio"));
      this.loginId = this.portfolio?.LoginId != undefined ? this.portfolio?.LoginId: this.loginId;
      sessionStorage.removeItem('EndtReffStatus')
    }
 
    ngOnInit(): void {
      this.onEndorse();
    }
  
    onEndorse() {
      const urlLink = `${this.ApiUrl1}menu/endorsement/list`;
      const reqData = {
        PolicyNo: this.portfolio?.PolicyNo,
        LoginId: this.loginId,
        ProductId: this.productId,
        QuoteNo: this.portfolio?.QuoteNo,
      };
      this.portfolioBrokerService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          this.columnHeader = [
            {
              key: "QuoteNo",
              display: "Quote No",
              sticky: false,
            },
            {
              key: "CustomerName",
              display: "Customer Name",
            },
            {
              key: "QuotationDate",
              display: "Quotation Date",
            },
            {
              key: "Premium",
              display: "Premium",
            },
            {
              key: "PolicyNo",
              display: "Policy No",
            },
            {
              key: "schedule",
              display: "Schedule",
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Schedule",
                isNgxIcon: "fas fa-calendar-alt",
                bg: "primary",
                isCheckDisabled: 'Status',
              },
            },
            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ]
              }
            }
            // {
            //   key: "ReferralStatus",
            //   display: "Status",
            // },
            // {
            //   key: "edit",
            //   display: "Edit",
            //   sticky: true,
            //   config: {
            //     isActionBtn: true,
            //     isActionBtnName: "Edit",
            //     isNgxIcon: "fas fa-pen-alt",
            //     bg: "primary",
            //     isCheckDisabled: 'Status',
  
            //   },
            // },
            // {
            //   key: "schedule",
            //   display: "Schedule",
            //   sticky: true,
            //   config: {
            //     isActionBtn: true,
            //     isActionBtnName: "Schedule",
            //     isNgxIcon: "fas fa-calendar-alt",
            //     bg: "primary",
            //     isCheckDisabled: 'Status',
            //   },
            // },
          ];
          this.tableData = data?.Result?.EndorsementDetails || [];
          if (this.tableData.length == 0) {
            this.isButton = false;
          } else {
            this.isButton = this.tableData.some((ele: any) => ele.Status == "E");
          }
        },
        (err) => { }
      );
    }
   close(){ }
   isActionBtn(row){

    console.log('hhhhhhhhhh',row)
    if(row.btName =='Schedule'){
      let Results='';
      console.log('rrrrrrr',row)
      const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
      const reqData = {
        "BranchCode":this.userDetails.LoginResponse.BranchCode,
         "QuoteNo":row.QuoteNo,
         "PrintQuoteYn": "N"

        //"PolicyNo":row.data.OriginalPolicyNo,
    //"ApplicationNo":row.ApplicationNo,
    //"BelongingBranchCode":"",
    //"PolicyNo":row.PolicyNo,
  
      };
      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          Results=data.Result
          this.onDownloadSchedule(Results,row);
          
          //sessionStorage.setItem('ProposalNo',data.ProposalNo);
          //this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);
  
        },
        (err) => { },
      );
    }
   }
   onmenu(row,rowData){
    console.log('jjjjjjjjjjj',row)
    console.log('kkkkkkkk',rowData)

    if(rowData=='Schedule'){
      this.getSchedulePdf(row,rowData);
    }
    else if(rowData == 'Debit Note'){
      this.getDebitPdf(row,rowData);
    }
    else if(rowData=='Credit Note'){
      this.getCreditPdf(row,rowData);
    }
    
  }
  getSchedulePdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    ReqObj = {
      "BranchCode":this.userDetails.LoginResponse.BranchCode,
      "QuoteNo": rowData.data?.QuoteNo,
      "PrintQuoteYn": "N"
    }
    if(type=='Schedule'){
      
       UrlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    }
    else if(type == 'Policy Wordings'){
      type = 'PolicyWordings'
       UrlLink = `${this.ApiUrl1}pdf/policywording`;
    }
      this.portfolioBrokerService.onPostMethodSync(UrlLink, ReqObj).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,type)
        });
  }
  getCreditPdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    // ReqObj = {
    //   "BranchCode": this.userDetails?.BranchCode,
    //   "QuoteNo": rowData.data?.QuoteNo
    // }
       UrlLink = `${this.ApiUrl1}pdf/creditNote?policyNo=${rowData.data?.PolicyNo}`;
      this.portfolioBrokerService.onGetMethodSync(UrlLink).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,type)
        });
  }
  getDebitPdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    // ReqObj = {
    //   "BranchCode": this.userDetails?.BranchCode,
    //   "QuoteNo": rowData.data?.QuoteNo
    // }
       UrlLink = `${this.ApiUrl1}pdf/debitNote?policyNo=${rowData.data?.PolicyNo}`;
      this.portfolioBrokerService.onGetMethodSync(UrlLink).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,type)
        });
  }
  onschedule(){

  }

   
  onDownloadSchedule(Results,rowData){

    console.log('jjjjjjjj',Results,rowData)
   /* const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo":row.QuoteNo
    }*/
      if(Results){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', Results);
        if(rowData.PolicyNo) link.setAttribute('download',rowData.PolicyNo);
        else link.setAttribute('download',rowData);
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
      

   
  }
  
}