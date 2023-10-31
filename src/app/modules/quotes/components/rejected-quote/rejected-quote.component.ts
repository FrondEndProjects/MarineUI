import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import { QuotesComponent } from '../../quotes.component';
import { QuotesService } from '../../quotes.service';
import * as Mydatas from '../../../../app-config.json';

@Component({
  selector: 'app-rejected-quote',
  templateUrl: './rejected-quote.component.html',
  styleUrls: ['./rejected-quote.component.scss'],
  providers: [QuotesComponent]

})
export class RejectedQuoteComponent implements OnInit {

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
    public dialog: MatDialog

  ) {
    this.OpenCover = this.quotesComponent?.OpenCover;
    console.log(this.OpenCover);

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
      "Type": "L",
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails.BranchCode
    };
    this.quoteService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.brokerList = data?.Result;
        this.selectedBroker = this.selectedBroker?this.selectedBroker:this.brokerList[0]?.LoginId;
        this.onChangeBroker();

      },
      (err) => { },
    );
  }
  onChangeBroker() {
    if(this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User'){
      this.loginId = this.selectedBroker;
    }
    
    this.onLoadGrid();
  }


  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}menu/rejected/quote`;
    const reqData = {
      'ApplicationId': this.applicationId,
      'LoginId': this.loginId,
      'ProductId': this.productId,
      'OpenCoverNo': this.OpenCover?.value,
      'BranchCode': this.userDetails?.BranchCode,
    };
    this.quoteService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.columnHeader = [
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'QuotationDate', display: 'Quotation Date' },
            { key: 'LapsedDate', display: 'Rejected Date' },
            { key: 'LapsedRemarks', display: 'Rejected Reason' },
          ];
          this.tableData = data?.Result;

        }
      },
      (err) => { },
    );
  }





}
