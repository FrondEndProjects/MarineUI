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
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
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

  isActionBtn(event: any) {

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
        link.setAttribute('download',rowData.PolicyNo);
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
    sessionStorage.setItem("endorsement", JSON.stringify(data));
    this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-type`]);

  }
}
