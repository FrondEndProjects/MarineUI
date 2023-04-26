import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import * as Mydatas from '../../app-config.json';

@Component({
  selector: 'app-endorsement',
  templateUrl: './endorsement.component.html',
  styleUrls: ['./endorsement.component.scss']
})
export class EndorsementComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];


  public brokerList: any[] = [];
  public selectedBroker: any = '';

  public show = 'endo'
  public OpenCover:any='';
  public routerBaseLink:any='';


  constructor(
    private portfolioBrokerService: PortfolioService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));

    if (this.userDetails?.UserType === 'Broker' || this.userDetails?.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails?.UserType !== 'Broker' && this.userDetails?.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails?.LoginId;
    }


  }
  ngOnInit(): void {
    this.onGetBrokerList();
    this.selectedBroker = sessionStorage.getItem('loginId');
  }

  onGetBrokerList() {
    const urlLink = `${this.ApiUrl1}menu/quoteregister/dropdownlist`;
    const reqData = {
      "Type": "PE",
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails?.BranchCode
    };
    this.portfolioBrokerService.onPostMethodSync(urlLink, reqData).subscribe(
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
    if(this.selectedBroker){
      this.loginId = this.selectedBroker;
    }
    this.onLoadGrid();
  }

  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}menu/policy/endorsement`;
    const reqData = {
      "OpenCoverNo": this.OpenCover?.value,
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails?.BranchCode
    }
    this.portfolioBrokerService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.tableData = [];

        if (data?.Result) {
          this.columnHeader = [

            { key: 'QuoteNo', display: 'Quote No', sticky: false, },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'QuotationDate', display: 'Policy Date' },
            { key: 'Premium', display: 'Premium' },
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'Username', display: 'Username' },
            { key: 'GoodsDescription', display: 'Goods' },
            { key: 'LcDate', display: 'LC Date' },
            { key: 'LcNumber', display: 'LC Number' },
            { key: 'BlAwbNo', display: 'Bill No' },
            { key: 'BlAwbDate', display: 'Bill Date' },

            {
              key: 'endorse',
              display: 'Endorse',
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: 'add',
                isNgxIcon:'fas fa-plus-circle',
                bg: 'primary'
              }
            },

            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Policy Wordings' },
                  { name: 'Documents' },
                ]
              },
            },
          ];
          this.tableData = data?.Result.map(x => ({
            ...x,
            isClicked: false
          }));;
        }
      },
      (err) => { },
    );
  }

  isActionBtn(event: any) {
    //  const data:any = {
    //   'PolicyNo':event.PolicyNo,
    //   'QuoteNo':event.QuoteNo,
    //   'LoginId':this.selectedBroker
    //  }
    //  console.log(data);
    // sessionStorage.setItem('portfolio',JSON.stringify(data));
    // sessionStorage.setItem('quotesType', 'With-Endo');
    // this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-grid`]);
  }




}
