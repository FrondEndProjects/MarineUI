import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as Mydatas from "../../../../app-config.json";
import { NewQuotesComponent } from "../../new-quotes.component";
import { NewQuotesService } from "../../new-quotes.service";
//import { SharedService } from "src/app/shared/shared.service";


@Component({
  selector: "app-endorsement-grid",
  templateUrl: "./endorsement-grid.component.html",
  styleUrls: ["./endorsement-grid.component.scss"],
})
export class EndorsementGridComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public routerBaseLink:any='';

  public portfolio: any;
  public isButton: boolean = false;
  porttype: string;
  constructor(
    private newQuotesService: NewQuotesService,
    //private sharedService: SharedService,
    private router: Router,
    private newQuotesComponent:NewQuotesComponent
  ) {
    this.portfolio = this.newQuotesComponent?.portfolio;
    this.userDetails = this.newQuotesComponent?.userDetails;
    this.productId = this.newQuotesComponent?.productId;
    this.loginId = this.newQuotesComponent?.loginId;
    this.routerBaseLink = this.userDetails?.routerBaseLink;

    this.applicationId= this.newQuotesComponent?.applicationId;
    this.portfolio = JSON.parse(sessionStorage.getItem("portfolio"));
    this.loginId = this.portfolio?.LoginId != undefined ? this.portfolio?.LoginId: this.loginId;
    sessionStorage.removeItem('EndtReffStatus');
    this.porttype= sessionStorage.getItem('openCOverType');
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
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if(this.porttype == 'MOP'){
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
              key: "PremiumCurrencyName",
              display: "Currency",
            },
            {
              key: "PolicyNo",
              display: "Policy No",
            },
            {
              key: "ReferralStatus",
              display: "Status",
            },
            {
              key: "edit",
              display: "Edit",
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Edit",
                isNgxIcon: "fas fa-pen-alt",
                bg: "primary",
                isCheckDisabled: 'Status',
  
              },
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
              key: "Action",
              display: "Action",
              sticky: true,
              config: {
                isMenuAction: true,
                isActionBtnName: "Action",
                menuList: [
                  { name: 'Schedule' },
                ],
                isCheckDisabled: 'Status',
              },
            },
          ];
        }
        else{
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
              key: "PremiumCurrencyName",
              display: "Currency",
            },
            {
              key: "PolicyNo",
              display: "Policy No",
            },
            {
              key: "ReferralStatus",
              display: "Status",
            },
            {
              key: "edit",
              display: "Edit",
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Edit",
                isNgxIcon: "fas fa-pen-alt",
                bg: "primary",
                isCheckDisabled: 'Status',
  
              },
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
              key: "Action",
              display: "Action",
              sticky: true,
              config: {
                isMenuAction: true,
                isActionBtnName: "Action",
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ],
                isCheckDisabled: 'Status',
              },
            },
          ];
        }
     
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
  onmenu(row,rowData){
      if(rowData=='Schedule' || rowData=='Policy Wordings')  this.getSchedulePdf(row,rowData);

      if(rowData == 'Debit Note'){
        this.getDebitPdf(row,rowData);
      }
      if(rowData=='Credit Note'){
        this.getCreditPdf(row,rowData);
      }
  }
  getSchedulePdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    ReqObj = {
      "BranchCode": this.userDetails?.BranchCode,
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
      this.newQuotesService.onPostMethodSync(UrlLink, ReqObj).subscribe(
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
      this.newQuotesService.onGetMethodSync(UrlLink).subscribe(
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
      this.newQuotesService.onGetMethodSync(UrlLink).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,type)
        });
  }
  isActionBtn(event: any) {

    sessionStorage.removeItem('Edit')
    console.log('lllllllllll',event)
    let data = {
      PolicyNo: event.PolicyNo,
      QuoteNo: event.QuoteNo,
      LoginId: this.portfolio?.LoginId,
    };
    sessionStorage.setItem("endorsement", JSON.stringify(data));
    sessionStorage.setItem('QuoteStatus',event?.Status);
    sessionStorage.setItem('EndtReffStatus',event.ReferralStatus);

    if(event.btName!='Schedule'){
      if(event.ReferralStatus=='ReferalApproved'){
        sessionStorage.setItem('ReferenceNo',event.ApplicationNo);
        sessionStorage.setItem('EntNo',event.ReferralStatus);
        this.router.navigate([`${this.routerBaseLink}/new-quotes/premium-info`]);
      }
      else{
        this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-type`]);
      }
    }
    if(event.btName=="Schedule"){
      this.schedule(event);
      console.log('kkkkkkkkkkkkkkkk',event)
      }
    
    
  }

  schedule(row){
    let Results='';
    console.log('rrrrrrr',row)
    const urlLink = `${this.ApiUrl1}pdf/endtcertificate`;
    const reqData = {
      "BranchCode":this.userDetails.BranchCode,
      //"PolicyNo":row.data.OriginalPolicyNo,
  "ApplicationNo":row.ApplicationNo,
  "BelongingBranchCode":"",
  "PolicyNo":row.PolicyNo,

    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        Results=data.Result
        this.onDownloadSchedule(Results,row)
        
        //sessionStorage.setItem('ProposalNo',data.ProposalNo);
        //this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);

      },
      (err) => { },
    );
  }


  onDownloadSchedule(Results,rowData){

      if(Results){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', Results);
        if(rowData?.PolicyNo) link.setAttribute('download',rowData.PolicyNo);
        else link.setAttribute('download',rowData);
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
      

   
  }

  onNewEndorse() {
    let data: any;
    if (this.tableData.length == 0) {
      data = this.portfolio;
    } else {
      let lastData = this.tableData[0];
      data = {
        PolicyNo: lastData.PolicyNo,
        QuoteNo: lastData.QuoteNo,
        LoginId: this.portfolio.LoginId,
      };
    }
    console.log(data);
    sessionStorage.removeItem('QuoteStatus');
    sessionStorage.setItem('Edit','NewEdit');
    console.log('Endorsement Status Master',data);
    sessionStorage.setItem("endorsement", JSON.stringify(data));
    this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-type`]);

  }
}
