import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PortfolioService } from '../../portfolio.service';
import { Router } from '@angular/router';
import * as Mydatas from "../../../../app-config.json";
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';

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
    public dialogService: MatDialog,) {
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
   isActionBtn(rowData){

   }
}