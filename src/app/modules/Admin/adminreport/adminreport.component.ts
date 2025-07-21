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
  selector: 'app-adminreport',
  templateUrl: './adminreport.component.html',
  styleUrls: ['./adminreport.component.scss']
})
export class AdminReportComponent implements OnInit {
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
  public branchList: any[] = [];
  public routerBaseLink: any = '';
  public innerTableData: any[] = [];
  public tableSection: boolean = false;
  public tableData: any;
  brokerouw: boolean = false;
  public columnHeader: any[] = [];
  branchValue: any;
  effectiveDate: any;
  public filterValue;
  minDate: any;
  public loginTypeList: any[] = [];
  public loginType: any[] = [];
  innerColumnHeader: any[] = [];
  RegionNo: any;
  brokerData: any[] = [];
  branchData: any[] = [];
  usertype: any;
  value: any = "View";
  brokero: boolean = false;
  show: boolean = false;
  s: any;
  t: any;
  endeffectiveDate: any;
  product: any;
  unproduct: any;
  unRegionNo: any;
  unendeffectiveDate: any;
  uneffectiveDate: any;
  uWList: any[] = [];
  uwbrokerData: any[] = [];
  uwshow: boolean = false;
  log: any;
  Results: any;


  constructor(
    private datePipe: DatePipe,
    private openCoverService: OpenCoverService,
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private menuService: NbMenuService,
    private masterSer: MastersService,

  ) {
    this.minDate = new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.searchForm = this.adminReferralService.searchForm;
    //this.loginId = this.userDetails.LoginId;
    this.usertype = this.userDetails.UserType

    this.onGetLoginTypeDropdownList();
    this.onGetProductList();
    this.getuwList();
    //this.onGetBranchList();
  }

  ngOnInit(): void {

  }

  onRedirect(value) {
    this.value = value;
    if (value == 'View') {
      //this.productin=true;
    }
    else if (value == 'Broker') {

    }


  }


  goback() {
    this.show = false;
    this.uwshow = false;
  }

  gobroker() {
    this.show = true;
    this.brokero = false;
  }

  gobackBroker() {
    this.show = false;
  }

  gobackss() {
    this.uwshow = true;
    this.brokerouw = false;
  }

  gobacks() {
    this.uwshow = true;
    this.brokerouw = true;
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


  getuwList() {
    const urlLink = `${this.ApiUrl1}admin/getReportUWList`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          let obj = [{ LoginId: "ALL", UserName: "ALL" }]
          this.uWList = obj.concat(data?.Result);
          //this.loginTypeList = data?.Result;
        }
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
          let obj = [{ Code: "ALL", CodeDescription: "ALL" }]
          this.loginTypeList = obj.concat(data?.Result);
          //this.loginTypeList = data?.Result;
        }
      },
      (err) => { },
    );
  }

  getExistingAdmin() {

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

  onGetProductList() {

    const urlLink = `${this.ApiUrl1}opencover/dropdown/referral/quoteproduct`;
    const reqData = {
      "LoginId": this.userDetails.LoginId,
      "BranchCode": this.userDetails.BranchCode
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.productNameList = data?.Result?.ProductionDetails || [];
      },
      (err) => { },
    );
  }

  getBroker() {

    //this.brokerData=[];
    let t: any, s: any;
    if (this.effectiveDate != null) {
      // this.t = this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
      this.t = this.getFormattedDate(this.effectiveDate);
      console.log('efffffffffff', t);
      //this.brokerList[0].EffectiveDateStart=t;
    }
    if (this.endeffectiveDate != null) {
      // this.s = this.datePipe.transform(this.endeffectiveDate, "dd/MM/yyyy");
      this.s = this.getFormattedDate(this.endeffectiveDate);
      console.log('efffffffffff', s);
    }
    let ReqObj =
    {
      "BranchCode": this.userDetails.BranchCode,
      "BrokerCode": this.RegionNo,
      "FromDate": this.t,
      "ProductId": this.product,
      "ToDate": this.s
    }

    let urlLink = `${this.ApiUrl1}admin/getBrokerReportList`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.show = true;
          this.brokerData = data.Result;
          if (this.brokerData.length != 0) {
            this.brokero = false;
          }
        }
      }, (err) => { }
    );
  }

  brokeropen(loginid) {
    this.log = loginid;
    let ReqObj = {
      "BranchCode": this.userDetails.BranchCode,
      "FromDate": this.t,
      "LoginId": loginid,
      "ProductId": this.product,
      "Status": "P",
      "ToDate": this.s
    }
    let urlLink = `${this.ApiUrl1}admin/getBranchReportList`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.branchData = data.Result;
          this.brokero = true;
          /*this.columnHeader = [
            {key: 'S.No', display: 'S.No'},
            {key: 'ProposalNumber', display: 'Proposal No'},
            {key: 'CustomerName', display: 'Customer Name'},
            {key: 'PolicyStartDate', display: 'Policy Start Date'},
            {key: 'PolicyEndDate', display: 'Policy End Date'},
           //{key: 'EffectiveDate', display: 'Effective Date'},
            {key: 'Draft', display: 'Draft'},
          ];*/
          this.columnHeader = [
            {
              key: "more",
              display: "More View",
              config: {
                isMoreView: true,
              }
            },
            { key: 'EntryDate', display: 'EntryDate' },
            { key: 'LoginId', display: 'Login Id' },
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'BranchName', display: 'BranchName' },
            { key: 'ApplicationId', display: 'ApplicationId' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'TransportDesc', display: 'Mode Of Transport' },
            { key: 'CoverName', display: 'Cover' },
            //{key: 'Suminsured', display: 'Sum Insured'},

          ];
          this.innerColumnHeader = [
            //{key: 'S.No', display: 'S.No'},
            { key: 'Suminsured', display: 'Sum Insured' },
            { key: 'SuminsuredForeign', display: 'SuminsuredForeign' },
            { key: 'ExchangeRate', display: 'ExchangeRate' },
            { key: 'TransitFromCountry', display: 'Orginating Country' },
            { key: 'FinalDestCountry', display: 'Destination Country' },
            //{key: 'FinalDestCountry', display: 'Destination Country'},
            { key: 'CurrencyName', display: 'CurrencyName' }


          ];


        }
      }, (err) => { }
    );
  }


  brokeropens(loginid) {
    console.log('llllllll', loginid)
    this.log = loginid
    let ReqObj = {
      "BranchCode": this.userDetails.BranchCode,
      "FromDate": this.t,
      "LoginId": loginid,
      "ProductId": this.unproduct,
      "Status": "P",
      "ToDate": this.s
    }
    let urlLink = `${this.ApiUrl1}admin/getBranchReportList`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.branchData = data.Result;
          this.brokerouw = true;
          /*this.columnHeader = [
            {key: 'S.No', display: 'S.No'},
            {key: 'ProposalNumber', display: 'Proposal No'},
            {key: 'CustomerName', display: 'Customer Name'},
            {key: 'PolicyStartDate', display: 'Policy Start Date'},
            {key: 'PolicyEndDate', display: 'Policy End Date'},
           //{key: 'EffectiveDate', display: 'Effective Date'},
            {key: 'Draft', display: 'Draft'},
          ];*/
          this.columnHeader = [
            {
              key: "more",
              display: "More View",
              config: {
                isMoreView: true,
              }
            },
            { key: 'EntryDate', display: 'Policy Issue Date' },
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'TransportDesc', display: 'Mode Of Transport' },
            { key: 'CoverName', display: 'Cover' },
            //{key: 'Suminsured', display: 'Sum Insured'},

          ];
          this.innerColumnHeader = [
            //{key: 'S.No', display: 'S.No'},
            { key: 'Suminsured', display: 'Sum Insured' },
            { key: 'ExchangeRate', display: 'ExchangeRate' },
            { key: 'TransitFromCountry', display: 'Orginating Country' },
            { key: 'FinalDestCountry', display: 'Destination Country' },
            //{key: 'FinalDestCountry', display: 'Destination Country'},
            { key: 'CurrencyName', display: 'CurrencyName' }


          ];


        }
      }, (err) => { }
    );
  }

  pdf(type) {

    let typelist: any;
    typelist = type;
    let Results: any = '';

    console.log("hhhhhhh", this.log)
    let ReqObj = {

      "BranchCode": this.userDetails.BranchCode,
      "EndDate": this.s,
      "LoginId": this.log,
      "ProductId": this.product,
      "ReportStatus": "Y",
      "StartDate": this.t,
      "Type": typelist
    }

    let urlLink = `${this.ApiUrl1}pdf/branchreport`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log('kkkkkkkkk', data);
          Results = data.Result
          this.onDownloadSchedule(Results)
        }
      }, (err) => { }
    );
  }

  onDownloadSchedule(Results) {

    console.log('jjjjjjjj', this.Results)
    /* const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
     const reqData = {
       "BranchCode": this.userDetails?.BranchCode,
       "QuoteNo":row.QuoteNo
     }*/
    if (Results) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', Results);
      link.setAttribute('download', 'Report');
      document.body.appendChild(link);
      link.click();
      link.remove();

    }



  }
  vechileInnerdata(rowData: any) {
    //this.pass=true;

    console.log('vvvvvvvvvv', rowData)
    this.innerTableData = [{
      "ismore": true,
      'ExchangeRate': rowData.ExchangeRate,
      'TransitFromCountry': rowData.TransitFromCountry,
      'FinalDestCountry': rowData.FinalDestCountry,
      'CurrencyName': rowData.CurrencyName,
      'Suminsured': rowData.Suminsured,
      'SuminsuredForeign': rowData.SuminsuredForeign
    }];
    rowData.innerTableData = [{
      "ismore": true,
      'ExchangeRate': rowData.ExchangeRate,
      'TransitFromCountry': rowData.TransitFromCountry,
      'FinalDestCountry': rowData.FinalDestCountry,
      'CurrencyName': rowData.CurrencyName,
      'Suminsured': rowData.Suminsured,
      'SuminsuredForeign': rowData.SuminsuredForeign
    }]
  }

  getsearch(value: any) {
    if (value == 'Broker') {
      this.getBroker();

    }

    if (value == 'View') {
      this.underwriter();

    }
  }

  underwriter() {
    let t: any, s: any;
    if (this.uneffectiveDate != null) {
      // this.t = this.datePipe.transform(this.uneffectiveDate, "dd/MM/yyyy");
      this.t = this.getFormattedDate(this.uneffectiveDate);
      console.log('efffffffffff', t);
      //this.brokerList[0].EffectiveDateStart=t;
    }
    if (this.unendeffectiveDate != null) {
      // this.s = this.datePipe.transform(this.unendeffectiveDate, "dd/MM/yyyy");
      this.s = this.getFormattedDate(this.unendeffectiveDate);
      console.log('efffffffffff', s);
    }
    let ReqObj =
    {
      "BranchCode": this.userDetails.BranchCode,
      "BrokerCode": this.unRegionNo,
      "FromDate": this.t,
      "ProductId": this.unproduct,
      "ToDate": this.s
    }

    let urlLink = `${this.ApiUrl1}admin/getUWReportList`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.uwshow = true;
          this.uwbrokerData = data.Result;
          if (this.uwbrokerData.length != 0) {
            this.brokerouw = false;
          }
        }
      }, (err) => { }
    );
  }


  onEdit(row: any) { }

  getFormattedDate(dateStr: string | null | undefined): string | null {
    if (!dateStr || typeof dateStr !== 'string') {
      return null;
    }

    // Expecting format like "1-6-2025"
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;

    const jsDate = new Date(year, month - 1, day);
    if (isNaN(jsDate.getTime())) return null;

    return this.datePipe.transform(jsDate, 'dd/MM/yyyy');
  }

}

