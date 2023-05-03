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
import { LoginService } from '../../login/login.service';
import { DatePipe } from '@angular/common';
import { NewQuotesService } from '../../new-quotes/new-quotes.service';
//import { OpenCoverService } from '.open-cover.service';

@Component({
  selector: 'app-branchreports',
  templateUrl: './branchreports.component.html',
  styleUrls: ['./branchreports.component.scss']
})
export class BranchCoverComponent implements OnInit {
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
branchValue:any;
minDate:any;
public filterValue;  
innerColumnHeader:any[]=[];
public loginTypeList: any[] = [];
public loginType:any[]=[];
    usertype: any;
    show: boolean=false;
  endeffectiveDate: any;
  status: any="Y";
  product: any;
  innerTableData:any[]=[];
  Results:any;
  t:any;s:any;
  constructor(
    private openCoverService: OpenCoverService,
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private menuService: NbMenuService,
    private masterSer: MastersService,
    private loginService: LoginService,
    private datePipe:DatePipe,
    private newQuotesService: NewQuotesService,
  ) {
    this.minDate=new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.searchForm = this.adminReferralService.searchForm;
    console.log('kkkkkkkk',this.userDetails)
    this.loginId = this.userDetails.LoginId;

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
      this.onGetRegionList();  
      this.onGetBranchList();
      this.onGetProductList();
      this.branchValue=this.userDetails.BranchCode;
      //this.onGetBranchList();
  }

  ngOnInit(): void {
   
  }
  /*onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': '01',
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
        this.getExistingAdmin();
      },
      (err) => { },
    );
  }*/
  goback(){
    this.show=false;
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
          this.loginTypeList = data?.Result;
        }
      },
      (err) => { },
    );
  }


  onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    this.loginService.onGetMethodSync(urlLink).subscribe((data: any) => {
      console.log(data);
      this.regionList = data?.Result;


      //this.AttachedBranchs();
    });
  }

  
  onGetBranchList() {
   
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': "01",
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
         
      },
      (err) => { },
    );
  }
 


  getExistingAdmin(){

    let ReqObj = {
       "BranchCode": this.branchValue,
  "LoginId": this.loginType,
  "Status": "A",
  "UserType": this.usertype
   }

    let urlLink = `${this.ApiUrl1}OpenCover/pendingtoapproved`;
 this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
   (data: any) => {
     if (data?.Result) {
       console.log(data);
       this.tableData = data?.Result;
     }
   }, (err) => { }
 );
}

public applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
}

  get sF() {
    return this.searchForm?.controls;
  }
onEdit(row:any){}


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


pdf(type){

  let typelist:any;
    typelist=type;
  let ReqObj = {

    "BranchCode":this.branchValue,
  "EndDate":this.s,
  "LoginId":"ALL",
  "ProductId":this.product,
  "ReportStatus":this.status,
  "StartDate":this.t,
  "Type": typelist
}

let urlLink = `${this.ApiUrl1}pdf/branchreport`;
this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    if (data) {
      console.log('kkkkkkkkk',data);
      this.Results=data.Result;
      this.onDownloadSchedule(this.Results)
    }
  }, (err) => { }
);
}

getAdmin() {

    this.show=true;
      /*this.columnHeader = [
          //{key: 'S.No', display: 'S.No'},
          {
            key: "more",
            display: "More View",
            config: {
                isMoreView: true,
            }
          },
            {key: 'S.No', display: 'S.No'},
          {key: 'EntryDate', display: 'Entry Date'},
          {key: 'BranchName', display: 'Branch Name'},
          {key: 'LoginId', display: 'Login Id'},
          {key: 'ApplicationId', display: 'Application Id'},
         {key: 'QuoteNo', display: 'Quote No'},
         
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

      let ReqObj = {
          "BranchCode": this.branchValue,
          "FromDate":this.t,
          "LoginId":"ALL",
          "ProductId":this.product,
          "Status":this.status,
          "ToDate":this.s
        
     }
  
      let urlLink = `${this.ApiUrl1}admin/getBranchReportList`;
      this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if (data) {
            console.log(data);
          this.columnHeader = [
          //{key: 'S.No', display: 'S.No'},
          {
            key: "more",
            display: "More View",
            config: {
                isMoreView: true,
            }
          },
            //{key: 'S.No', display: 'S.No'},
          {key: 'EntryDate', display: 'Entry Date'},
          {key: 'BranchName', display: 'Branch Name'},
          {key: 'LoginId', display: 'Login Id'},
          {key: 'ApplicationId', display: 'Application Id'},
         {key: 'QuoteNo', display: 'Quote No'},
         
        ];
        this.innerColumnHeader = [
            //{key: 'S.No', display: 'S.No'},
            {key: 'PolicyNo', display: 'Policy No'},
            {key: 'InceptionDate', display: 'Inception Date'},
            {key: 'EffectiveDate', display: 'Effective Date'},
            {key: 'ProductId', display: 'ProductId'},
            {key: 'CustomerName', display: 'Customer Name'},
            {key: 'TransportDesc', display: 'Trasport Desc'},
            {key: 'Cover Name', display: 'CoverName'},
           
          ];

          this.tableData=data.Result;
          }
        }, (err) => { }
      );
    }

    vechileInnerdata(rowData:any){
      //this.pass=true;
  
      console.log('vvvvvvvvvv',rowData)
      this.innerTableData =[{
        "ismore":true,
        "CustomerName":rowData.CustomerName,
        "TransportDesc":rowData.TransportDesc,
        "PolicyNo":rowData.PolicyNo,
        "CoverName":rowData.CoverName,
        "ProductId":rowData.ProductId,
        "InceptionDate":rowData.InceptionDate,
        "EffectiveDate":rowData.EffectiveDate

      }];
      rowData.innerTableData=[{
          "ismore":true,
          "CustomerName":rowData.CustomerName,
          "TransportDesc":rowData.TransportDesc,
          "PolicyNo":rowData.PolicyNo,
          "CoverName":rowData.CoverName,
        "ProductId":rowData.ProductId,
        "InceptionDate":rowData.InceptionDate,
        "EffectiveDate":rowData.EffectiveDate

      }]
     }


     onDownloadSchedule(Results){

      console.log('jjjjjjjj',this.Results)
     /* const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
      const reqData = {
        "BranchCode": this.userDetails?.BranchCode,
        "QuoteNo":row.QuoteNo
      }*/
        if(this.Results){
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', this.Results);
          link.setAttribute('download',this.Results);
          document.body.appendChild(link);
          link.click();
          link.remove();
         
        }
        
  
     
    }
  

}
