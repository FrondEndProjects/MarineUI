import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../../app-config.json';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
//import { MastersService } from '../../../../../Masters/masters.service';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { MastersService } from '../Masters/masters.service';
import { OpenCoverService } from '../../open-cover/open-cover.service';
import { DatePipe } from '@angular/common';
//import { OpenCoverService } from '.open-cover.service';

@Component({
  selector: 'app-opencoverreport',
  templateUrl: './opencoverreport.component.html',
  styleUrls: ['./opencoverreport.component.scss']
})
export class OpenCoverComponent implements OnInit {
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public userDetails: any;
    public productId: any;
    public loginId: any;
    public applicationId: any;
    public searchForm!: FormGroup;
    public tabActive: number = 2;
    public productNameList: any[] = [];
    public regionList: any[] = [];
    RegionNo:any;
    public branchList: any[] = [];
    effectiveDate:any;
    public routerBaseLink: any = '';
    public tableSection: boolean = false;
  public tableData: any;
  public columnHeader: any[] = [];
  public t:any;
  public s:any;
  branchValue:any;
  minDate:any;
  public filterValue;  
  innerColumnHeader:any[]=[];
  public loginTypeList: any[] = [];
  branchData:any[]=[];
  brokero=false;
  public loginType:any;
  innerTableData:any[]=[];
      usertype: any;
      show: boolean=false;
      product:any;
  endeffectiveDate: any;
  log: any;
  opencov: any;
  po: any;
    constructor(
      private datePipe:DatePipe,
      private openCoverService: OpenCoverService,
      private _formBuilder: FormBuilder,
      private adminReferralService: AdminReferralService,
      private router: Router,
      private sessionStorageService: SessionStorageService,
      private menuService: NbMenuService,
      private masterSer: MastersService,
  
    ) {
      this.minDate=new Date();
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
      this.userDetails = this.userDetails?.LoginResponse;
      this.routerBaseLink = this.userDetails?.routerBaseLink;
      this.searchForm = this.adminReferralService.searchForm;
      //this.loginId = this.userDetails.LoginId;
      this.usertype=this.userDetails.UserType
      this.columnHeader = [
          {key: 'S.No', display: 'S.No'},
          {key: 'ProposalNumber', display: 'Proposal No'},
          {key: 'CustomerName', display: 'Customer Name'},
          {key: 'PolicyStartDate', display: 'Policy Start Date'},
          {key: 'PolicyEndDate', display: 'Policy End Date'},
         //{key: 'EffectiveDate', display: 'Effective Date'},
          {key: 'Draft', display: 'Draft'},
          {
            key: 'actions',
            display: 'Edit',
            config: {
              isEdit: true,
            }
          }
        ];
        this.onGetLoginTypeDropdownList();
        //this.onGetProductList()  
        //this.onGetBranchList();
    }
  
    ngOnInit(): void {
     
    }

    onGetProductList() {
  
      const urlLink = `${this.ApiUrl1}opencover/dropdown/referral/quoteproduct`;
      const reqData = {
        "LoginId":this.userDetails.LoginId,
        "BranchCode":this.userDetails.BranchCode
      };
      this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          this.productNameList = data?.Result?.ProductionDetails || [];
        },
        (err) => { },
      );
    }

  
  
    onGetLoginTypeDropdownList() {
      const urlLink = `${this.ApiUrl1}opencover/dropdown/existing/brokerList`;
      const reqData = {
        'BranchCode': this.userDetails?.BranchCode,
      };
      this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          if (data?.Message === 'Success') {
            let obj =[{Code:"All",CodeDescription:"ALL"}]
            this.loginTypeList= obj.concat(data?.Result);
            //this.loginTypeList = data?.Result;
          }
        },
        (err) => { },
      );
    }
  
  
  public applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
  
    get sF() {
      return this.searchForm?.controls;
    }
  onEdit(row:any){}
  goback(){
    this.show=false;
  }
  gobacks(){
    this.show=true;
    this.brokero=false;
  }
  getAdmin() {
  
      let t:any,s:any;
      if(this.effectiveDate!=null){
        this.t=  this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
       console.log('efffffffffff',t);
       //this.brokerList[0].EffectiveDateStart=t;
     }
     if(this.endeffectiveDate!=null){
        this.s=  this.datePipe.transform(this.endeffectiveDate, "dd/MM/yyyy");
        console.log('efffffffffff',s);
     }
        /*this.columnHeader = [
            
              {key: 'S.No', display: 'S.No'},
            {key: 'BrokerName', display: 'Broker Name'},
            {key: 'CustomerName', display: 'Customer Name'},
            {key: 'OpenCoverNo', display: 'Open Cover No'},
            {key: 'NoOfPolicies', display: 'No Of Policies'},
           {key: 'TotalPremium', display: 'Total Premium'},
           {key: 'TotalCommision', display: 'Total Commission'},
           
          ];
          this.innerColumnHeader = [
              //{key: 'S.No', display: 'S.No'},
              {key: 'PolicyNo', display: 'Policy No'},
              {key: 'InceptionDate', display: 'Inception Date'},
              {key: 'EffectiveDate', display: 'Effective Date'},
              {key: 'ProductId', display: 'ProductId'},
              {key: 'CustomerName', display: 'Customer Name'},
              {key: 'TrasportDesc', display: 'Trasport Desc'},
              {key: 'Cover Name', display: 'CoverName'},
             
            ];*/
         
        let ReqObj = {
          
          "BranchCode": this.userDetails.BranchCode,
          "BrokerCode":this.loginType,
         "FromDate":this.t,
          "ToDate":this.s
       }
    
        let urlLink = `${this.ApiUrl1}admin/getOpenCoverReportList`;
        this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            if (data) {
              console.log(data);
              this.columnHeader = [
              {key: 'BrokerName', display: 'Broker Name'},
              {key: 'CustomerName', display: 'Customer Name'},
              {key: 'OpenCoverNo', display: 'Open Cover No'},
              {key: 'PolicyCount', display: 'No Of Policies'},
             {key: 'TotalPremium', display: 'Total Premium'},
             {key: 'TotalCommision', display: 'Total Commission'},
             
            ];
              this.tableData = data?.Result;

              if(this.tableData.length!=0){
                this.show=true;
      this.brokero=false;
              }
              this.log=data.Result[0].LoginId
            }
          }, (err) => { }
        );
      }


      brokeropen(open){
        

        console.log('opppppp',open)
        let ReqObj = {
          "BranchCode":this.userDetails.BranchCode,
          "FromDate":this.t,
          "ProductId":this.productId,
          "ToDate":this.s,        
          "Broker":this.loginType,
          "OpenCoverNo":open,
  
     }
      let urlLink = `${this.ApiUrl1}admin/getOpenCoverCertificateList`;
      this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data?.Result) {
            console.log(data);
            this.branchData=data.Result;
            this.log=data.Result[0].LoginId;
            this.po=data.Result[0].ProductId;
             
            this.opencov=open;
            console.log('mmmmmmmmm',this.log)
            this.brokero=true;
            this.columnHeader = [
              {
                key: "more",
                display: "More View",
                config: {
                isMoreView: true,
                }
              },
              {key: 'EntryDate', display: 'Policy Issue Date'},
              {key: 'PolicyNo', display: 'Policy No'},
              {key: 'CustomerName', display: 'Customer Name'},
              {key: 'TransportDesc', display: 'Mode Of Transport'},
              {key: 'CoverName', display: 'Cover'},
             //{key: 'Suminsured', display: 'Sum Insured'},
              
            ];
            this.innerColumnHeader = [
              //{key: 'S.No', display: 'S.No'},
              {key: 'Suminsured', display: 'Sum Insured'},
              {key: 'ExchangeRate', display: 'ExchangeRate'},
              {key: 'TransitFromCountry', display: 'Orginating Country'},
              {key: 'FinalDestCountry', display: 'Destination Country'},
              //{key: 'FinalDestCountry', display: 'Destination Country'},
              {key:'CurrencyName',display:'CurrencyName'}
             
             
            ];
      
          }
        }, (err) => { }
      );
      }

      
  vechileInnerdata(rowData:any){
    //this.pass=true;

    console.log('vvvvvvvvvv',rowData)
    this.innerTableData =[{
      "ismore":true,
     'ExchangeRate':rowData.ExchangeRate,
      'TransitFromCountry':rowData.TransitFromCountry,
      'FinalDestCountry':rowData.FinalDestCountry,
      'CurrencyName':rowData.CurrencyName,
      'Suminsured':rowData.Suminsured
    }];
    rowData.innerTableData=[{
      "ismore":true,
      'ExchangeRate':rowData.ExchangeRate,
       'TransitFromCountry':rowData.TransitFromCountry,
       'FinalDestCountry':rowData.FinalDestCountry,
       'CurrencyName':rowData.CurrencyName,
       'Suminsured':rowData.Suminsured
    }]
   }
      pdf(type){
        let Results:any;
       console.log('kkkkkkk',this.log)
        let typelist:any;
          typelist=type;
        let ReqObj = {
          "BranchCode":this.userDetails.BranchCode,
        "EndDate":this.s,
        "LoginId":this.log,
        "StartDate":this.t,
        "Type": typelist
      }
      
      let urlLink = `${this.ApiUrl1}pdf/opencoverreport`;
      this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data) {
            console.log('kkkkkkkkk',data);
            Results=data.Result;
            this.onDownloadSchedule(Results)
          }
        }, (err) => { }
      );
      }

      onDownloadSchedule(Results){

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
            link.setAttribute('download',Results);
            document.body.appendChild(link);
            link.click();
            link.remove();
           
          }
          
    
       
      }
      pdfs(type){
        console.log('kkkkkkk',this.log);
        let Result:any;
         let typelist:any;
           typelist=type;
         let ReqObj = {
           "BranchCode":this.userDetails.BranchCode,
         "EndDate":this.s,
         "LoginId":this.log,
         "StartDate":this.t,
        "BrokerLogin":this.log,
       "OpenCoverNo":this.opencov,
        "ProductId":this.productId,
         "Type": typelist
       }
       
       let urlLink = `${this.ApiUrl1}pdf/opencoverdetailreport`;
       this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
         (data: any) => {
           if (data) {
             console.log('kkkkkkkkk',data);
             Result=data?.Result;
             this.onpdfDownloadSchedule(Result);
           }
         }, (err) => { }
       );
       }


       onpdfDownloadSchedule(Results){

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
            link.setAttribute('download',Results);
            document.body.appendChild(link);
            link.click();
            link.remove();
           
          }
          
    
       
      }
  
  }
  