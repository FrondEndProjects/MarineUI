import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import { PortfolioComponent } from '../../portfolio.component';
import { PortfolioService } from '../../portfolio.service';
import * as Mydatas from '../../../../app-config.json';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-canceled-policies',
  templateUrl: './canceled-policies.component.html',
  styleUrls: ['./canceled-policies.component.scss']
})
export class CanceledPoliciesComponent implements OnInit {


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
  isIssuer: boolean;


  constructor(
    private portfolioBrokerService: PortfolioService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    public dialogService: MatDialog,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;

    console.log('rrrrrr',this.routerBaseLink)
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));

    if (this.userDetails?.UserType === 'Broker' || this.userDetails?.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails?.UserType !== 'Broker' && this.userDetails?.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails?.LoginId;
    }

    if (this.userDetails?.UserType != "RSAIssuer") {
      //this.loginId = this.userDetails?.LoginId;
      //this.applicationId = '1';
      this.isIssuer = false;

    }
    // Issuer

    if (this.userDetails?.UserType == "RSAIssuer"){
      //this.loginId = this.endorsement?.LoginId || '';
      //.applicationId = this.userDetails.LoginId;
      this.isIssuer = true;
    }

  }
  ngOnInit(): void {
    if (this.userDetails?.UserType == "RSAIssuer") {
      this.onGetBrokerList();
    }
    else{
      this.onChangeBroker();
    }
    this.selectedBroker = sessionStorage.getItem('loginId');
  }

  onGetBrokerList() {
    const urlLink = `${this.ApiUrl1}menu/portfolio/dropdownlist`;
    const reqData = {
      "Type":"PC",
      // "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails?.BranchCode,
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
    const urlLink = `${this.ApiUrl1}menu/portfolio/policycancelled`;
    const reqData = {
      "OpenCoverNo": this.OpenCover?.value,
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "OtherPolicyNo": null,
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
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Policy Wordings' },
                  { name: 'Cancelled Certificate' },
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
  onmenu(row,rowData){
    console.log('jjjjjjjjjjj',row)
    console.log('kkkkkkkk',rowData)
      if(rowData=='Schedule' || rowData=='Policy Wordings')  this.getSchedulePdf(row,rowData);

      if(rowData=='Cancelled Certificate'){
        this.canceldocument(row.data);
      }

  }

  canceldocument(rowData){
    const data:any = {
      'PolicyNo':rowData.PolicyNo,
      'QuoteNo':rowData.QuoteNo,
      'LoginId':rowData.LoginId
     }
     console.log(data);
    sessionStorage.setItem('portfolio',JSON.stringify(data));
    sessionStorage.setItem('quotesType', 'With-Endo');
    this.router.navigate(['/marine-opencover/portfolio/cancelled-certificate'])
  }
  getSchedulePdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    ReqObj = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo": rowData.data?.QuoteNo
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
  isActionBtn(event: any) {
     const data:any = {
      'PolicyNo':event.PolicyNo,
      'QuoteNo':event.QuoteNo,
      'LoginId':this.selectedBroker
     }
     console.log(data);
    sessionStorage.setItem('portfolio',JSON.stringify(data));
    sessionStorage.setItem('quotesType', 'With-Endo');
    this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-grid`]);
  }



}
