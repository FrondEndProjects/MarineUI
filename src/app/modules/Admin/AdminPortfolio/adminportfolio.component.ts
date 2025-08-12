import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../../app-config.json';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { MastersService } from '../Masters/masters.service';
import { OpenCoverService } from '../../open-cover/open-cover.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../login/login.service';
import { NewQuotesComponent } from '../../new-quotes/new-quotes.component';
import { NewQuotesService } from '../../new-quotes/new-quotes.service';
import Swal from 'sweetalert2';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../Auth/auth.service';

@Component({
  selector: 'app-adminportfolio',
  templateUrl: './adminportfolio.component.html',
  styleUrls: ['./adminportfolio.component.scss']
})
export class AdminPortfolioComponent implements OnInit {
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
  public loginTypeList: any[] = [];
  public loginType: any;
  effectiveDate: any;
  RegionNo: any;
  public tableSection: boolean = false;
  public tableData: any;
  public columnHeader: any[] = [];
  search: any;
  searchValue: any;
  branchValue: any;
  SearchList: any[] = [];
  innerColumnHeader: any[] = [];
  QuoteHeader: any[] = [];
  public filterValue;
  PortData: any[] = [];
  innerTableData: any[] = [];
  endeffectiveDate: any;
  uploadedDocumentsList: any[] = [];
  uploadDocuments: any[] = [];
  branchCode: any


  minDate: any;
  show: boolean;
  imageUrl: any;
  uploadDocList: any;
  TypeValue: any;
  TypeList: any[] = [];
  QuoteNo: any;
  InsuranceId: any;
  constructor(
    private openCoverService: OpenCoverService,
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,
    private menuService: NbMenuService,
    private masterSer: MastersService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private loginService: LoginService,
    private newQuotesService: NewQuotesService,
    //private newQuotesComponent:NewQuotesComponent

  ) {
    this.minDate = new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    console.log('kkkkkkkkkk', this.productId)
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.loginId = this.userDetails.LoginId;
    this.searchForm = this.adminReferralService.searchForm;
    this.InsuranceId = this.userDetails?.InsuranceId;
    /*this.columnHeader = [
        //{key: 'S.No', display: 'S.No'},
        {key: 'ProposalNo', display: 'Proposal No'},
        {key: 'CompanyName', display: 'Customer Name'},
        {key: 'OpenCoverStartDate', display: 'Policy Start Date'},
        {key: 'OpenCoverEndDate', display: 'Policy End Date'},
       //{key: 'EffectiveDate', display: 'Effective Date'},
        {key: 'MissippiOpenCoverNo', display: 'MissippiOpenCoverNo'},
        {
          key: 'actions',
          display: 'Edit',
          config: {
            isEdit: true,
          }
        }
      ];*/
    this.onGetLoginTypeDropdownList();
    this.onGetRegionList();
    this.ongetUploadedDocument();
    this.SearchList = [{ 'Code': '1', "CodeDesc": "PolicyNo" },
    { 'Code': '2', "CodeDesc": "QuoteNo" },
    { 'Code': '3', "CodeDesc": "CustomerName" }]

    this.TypeList = [{ 'Code': '1', "CodeDesc": "Pending Quotations" },
    { 'Code': '2', "CodeDesc": "Policy Generated" },
    { 'Code': '3', "CodeDesc": "Policy Cancelled" }]
    this.onGetBranchList()
  }

  ngOnInit(): void {
    this.branchCode = this.userDetails?.BranchCode
    this.authService.branchCode$.subscribe((code) => {
      if (code) {
        this.branchCode = code
      }
    });
  }


  onUploadDocument(event: any, eventType: string) {
    console.log(event);
    console.log('hhhhhhh', eventType)
    let fileList;
    if (eventType == 'click') {
      let fileList = event.target.files;
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
        var reader: any = new FileReader();
        reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          let Exist = this.uploadDocuments.some((ele: any) => ele.fileName == filename);
          console.log("Element Exist", Exist)
          if (!Exist) {
            this.uploadDocuments.push({ 'url': element, "fileName": filename, 'productid': this.sessionStorageService.sessionStorgaeModel.productId, 'loginid': this.userDetails?.LoginId, 'quoteNo': this.QuoteNo });
            console.log('jjjjjj', this.uploadDocuments);
            this.submit();
          }
          else {
            Swal.fire(
              `Selected File ${element.name} Already Exist`,
              'Invalid Document'
            )
          }

        }

      }

    }
    if (eventType == 'drop') {
      fileList = event[0];
    }


  }

  ongetUploadedDocument() {
    console.log('fffffffffff', this.QuoteNo);

    //this.uploadedDocumentsList=[];
    const urlLink = `${this.ApiUrl1}file/upload/list`;
    const reqData = {
      "LoginId": this.userDetails?.LoginId,
      "QuoteNo": this.QuoteNo,
      "UploadId": null
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log("Doc List kkkkkkkkkkkkk", data);
      this.uploadedDocumentsList = data.Result;
    })
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
  onDeleteUploadedDoc(index) {
    this.uploadedDocumentsList.splice(index, 1);
  }
  onDeleteUploadDoc(index) {
    this.uploadDocuments.splice(index, 1);
  }
  openDialog(templateRef, row) {
    this.QuoteNo = ""
    console.log('yyyyy', row.QuoteNo)
    //this.QuoteNo=row.QuoteNo;
    this.uploadedDocumentsList = [];
    this.uploadDocuments = [];
    if (row.QuoteNo) {
      this.QuoteNo = row.QuoteNo;
      let dialogRef = this.dialog.open(templateRef, {
        width: '70%',
        height: '60%'
      });
      this.ongetUploadedDocument();
    }
  }
  close() {

    this.dialog.closeAll();
  }


  submit() {
    if (this.uploadDocuments.length != 0) {
      let i = 0;
      for (let doc of this.uploadDocuments) {
        const urlLink = `${this.ApiUrl1}file/upload`;
        this.newQuotesService.onDocumentPostMethodSync(urlLink, doc).subscribe((data: any) => {
          console.log(data);
          if (data) {
            i += 1;
            if (i == this.uploadDocuments.length) {
              this.uploadedDocumentsList = [];
              //this.close();
              this.ongetUploadedDocument();
              //this.close();
            }
          }
        })
      }
    }
    else {

    }
  }
  onmenu(row, rowData, template) {
    console.log('jjjjjjjjjjj', row)
    console.log('kkkkkkkk', rowData)
    if (rowData == 'Schedule' || rowData == 'Policy Wordings') this.getSchedulePdf(row, rowData);

    if (rowData == 'Debit Note') {
      this.getDebitPdf(row, rowData);
    }
    if (rowData == 'Credit Note') {
      this.getCreditPdf(row, rowData);
    }
  }
  getSchedulePdf(rowData, type) {
    let ReqObj: any, UrlLink: any;
    ReqObj = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo": rowData.data?.QuoteNo,
      "PrintQuoteYn": "N"
    }
    if (type == 'Schedule') {

      UrlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    }
    else if (type == 'Policy Wordings') {
      type = 'PolicyWordings'
      UrlLink = `${this.ApiUrl1}pdf/policywording`;
    }
    else if (type == 'AKI Document') {
      // type = 'PolicyWordings'
      UrlLink = `${this.ApiUrl1}Integration/get/certificate`;
    }
    this.newQuotesService.onPostMethodSync(UrlLink, ReqObj).subscribe(
      (data: any) => {
        let Results = data.Result
        this.onDownloadSchedule(Results, type)
      });
  }

  getCreditPdf(rowData, type) {
    let ReqObj: any, UrlLink: any;
    // ReqObj = {
    //   "BranchCode": this.userDetails?.BranchCode,
    //   "QuoteNo": rowData.data?.QuoteNo
    // }
    UrlLink = `${this.ApiUrl1}pdf/creditNote?policyNo=${rowData.data?.PolicyNo}`;
    this.newQuotesService.onGetMethodSync(UrlLink).subscribe(
      (data: any) => {
        let Results = data.Result
        this.onDownloadSchedule(Results, type)
      });
  }
  getDebitPdf(rowData, type) {
    let ReqObj: any, UrlLink: any;
    // ReqObj = {
    //   "BranchCode": this.userDetails?.BranchCode,
    //   "QuoteNo": rowData.data?.QuoteNo
    // }
    UrlLink = `${this.ApiUrl1}pdf/debitNote?policyNo=${rowData.data?.PolicyNo}`;
    this.newQuotesService.onGetMethodSync(UrlLink).subscribe(
      (data: any) => {
        let Results = data.Result
        this.onDownloadSchedule(Results, type)
      });
  }
  onDownloadSchedule(Results, rowData) {

    console.log('jjjjjjjj', Results)
    /* const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
     const reqData = {
       "BranchCode": this.userDetails?.BranchCode,
       "QuoteNo":row.QuoteNo
     }*/
    if (Results) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', Results);
      link.setAttribute('download', rowData);
      document.body.appendChild(link);
      link.click();
      link.remove();

    }



  }
  // onDownloadSchedule(row:any){

  //   console.log('jjjjjjjj',row)
  //   const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
  //   const reqData = {
  //     "BranchCode": this.userDetails?.BranchCode,
  //     "QuoteNo":row.QuoteNo
  //   }

  //   this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
  //     if(data?.Result){
  //       const link = document.createElement('a');
  //       link.setAttribute('target', '_blank');
  //       link.setAttribute('href', data?.Result);
  //       link.setAttribute('download', row.QuoteNo);
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();

  //     }


  //   })
  // }

  onDragDocument(target: any, fileType: any, type: any) {
    let fileList = target;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];

      var reader: any = new FileReader();
      reader.readAsDataURL(element);
      var filename = element.name;

      let imageUrl: any;
      reader.onload = (res: { target: { result: any; }; }) => {
        imageUrl = res.target.result;
        this.imageUrl = imageUrl;
        this.uploadDocList.push({ 'url': this.imageUrl, 'DocTypeId': '', 'filename': element.name, 'JsonString': {} });

      }
    }
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
      'RegionCode': this.InsuranceId,
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];

      },
      (err) => { },
    );
  }

  QuoteList() {
    let ReqObj =
    {
      "QuoteNo": this.searchValue,
      "BranchCode": this.branchCode
    }

    let urlLink = `${this.ApiUrl1}admin/getPortFolioSearchByQuoteNo`;
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
            { key: 'BrokerOrganization', display: 'Broker Organization' },
            { key: 'LoginId', display: 'Quote Created By' },
            { key: 'QuoteNo', display: 'Quote No' },
            //{key: 'PolicyNo', display: 'Policy No'},
            //{key: 'CustomerName', display: 'Customer Name'},
            //{key: 'EffectiveDate', display: 'Effective Date'},
            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ]
              },
            },
            {
              key: 'Views',
              display: 'View Documnet',
              config: {
                isViews: true,
              }
            }
          ];
          this.innerColumnHeader = [
            //{key: 'S.No', display: 'S.No'},
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'Premium', display: 'Premium' },

          ];
          this.tableData = data?.Result;

        }
      }, (err) => { }
    );
  }

  getExistingAdmin() {

    if (this.search == '2') {
      this.QuoteList();
    }
    else if (this.search == '1') {
      this.policyList();
    }
    else if (this.search == '3') {
      this.customerList();
    }

  }

  customerList() {

    let ReqObj =
    {
      "CustomerName": this.searchValue,
      "BranchCode": this.branchCode
    }

    let urlLink = `${this.ApiUrl1}admin/getPortFolioSearchByCustomer`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.columnHeader = [
            {
              key: "more",
              display: "More View",
              config: {
                isMoreView: true,
              }
            },
            { key: 'BrokerOrganization', display: 'Broker Organization' },
            { key: 'LoginId', display: 'Quote Created By' },
            { key: 'QuoteNo', display: 'Quote No' },
            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ]
              },
            },
            {
              key: 'Views',
              display: 'View Document',
              config: {
                isViews: true,
              }
            }
          ];
          this.innerColumnHeader = [
            //{key: 'S.No', display: 'S.No'},
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'Premium', display: 'Premium' },

          ];
          this.tableData = data?.Result;

        }
      }, (err) => { }
    );
  }

  policyList() {
    let ReqObj =
    {
      "PolicyNo": this.searchValue,
      "BranchCode": this.branchCode
    }

    let urlLink = `${this.ApiUrl1}admin/getPortFolioSearchByPolicyNo`;
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
            { key: 'BrokerOrganization', display: 'Broker Organization' },
            { key: 'LoginId', display: 'Quote Created By' },
            { key: 'QuoteNo', display: 'Quote No' },
            //{key: 'PolicyNo', display: 'Policy No'},
            //{key: 'CustomerName', display: 'Customer Name'},
            //{key: 'EffectiveDate', display: 'Effective Date'},
            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ]
              },
            },
            {
              key: 'Views',
              display: 'View Documnet',
              config: {
                isViews: true,
              }
            }
          ];
          this.innerColumnHeader = [
            //{key: 'S.No', display: 'S.No'},
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'Premium', display: 'Premium' },

          ];
          this.tableData = data?.Result;

        }
      }, (err) => { }
    );
  }


  vechileInnerdata(rowData: any) {
    //this.pass=true;

    console.log('vvvvvvvvvv', rowData)
    rowData.OpenVesselName = 'AdminPortfolio'
    this.innerTableData = [{
      "ismore": true,
      "CustomerName": rowData.CustomerName,
      "Premium": rowData.Premium,
      "PolicyNo": rowData.PolicyNo,
    }];
    rowData.innerTableData = [{
      "ismore": true,
      "CustomerName": rowData.CustomerName,
      "Premium": rowData.Premium,
      "PolicyNo": rowData.PolicyNo,
    }]
  }

  getsearch() {
    this.show = true;
    if (this.TypeValue == '2') {
      this.policygenerated()
    }
    else if (this.TypeValue == '1') {
      this.pendingQuote()
    }
    else if (this.TypeValue == '3') {
      this.policyCancelled()
    }
  }

  policygenerated() {
    let t: any, s: any;
    console.log('effectiveDate raw value:', this.effectiveDate);
    console.log('endeffectiveDate raw value:', this.endeffectiveDate);
    if (this.effectiveDate != null) {
      t = this.getFormattedDate(this.effectiveDate);
    }
    if (this.endeffectiveDate != null) {
      s = this.getFormattedDate(this.endeffectiveDate);
    }
    let ReqObj =
    {
      "BranchCode": this.branchValue,
      "EndDate": s,
      "ProductId": "ALL",
      "StartDate": t
    }

    let urlLink = `${this.ApiUrl1}admin/getPortFolioSearchByPolicyGenerated`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);

          this.QuoteHeader = [
            //{key: 'S.No', display: 'S.No'},

            { key: 'BrokerOrganization', display: 'Broker Organization' },
            { key: 'LoginId', display: 'Quote Created By' },
            { key: 'PolicyNo', display: 'PolicyNo' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'Premium', display: 'Premium' },
            { key: 'PremiumCurrencyName', display: 'Currency' },
            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ]
              },
            },
            {
              key: 'Views',
              display: 'View Documnet',
              config: {
                isViews: true,
              }
            }
          ];
          this.PortData = data.Result


        }
      }, (err) => { }
    );
  }
  pendingQuote() {
    let t: any, s: any;
    if (this.effectiveDate != null) {
      t = this.getFormattedDate(this.effectiveDate);
    }
    if (this.endeffectiveDate != null) {
      s = this.getFormattedDate(this.endeffectiveDate);
    }
    let ReqObj =
    {
      "BranchCode": this.branchValue,
      "EndDate": s,
      "ProductId": "3",
      "StartDate": t
    }

    let urlLink = `${this.ApiUrl1}admin/getPortFolioSearchByPending`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);

          this.QuoteHeader = [
            //{key: 'S.No', display: 'S.No'},

            { key: 'BrokerOrganization', display: 'Broker Organization' },
            { key: 'LoginId', display: 'Quote Created By' },
            { key: 'PolicyNo', display: 'PolicyNo' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'Premium', display: 'Premium' },
            { key: 'PremiumCurrencyName', display: 'Currency' },

            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ]
              },
            },
            {
              key: 'Views',
              display: 'View Document',
              config: {
                isViews: true,
              }
            }
          ];
          this.PortData = data.Result


        }
      }, (err) => { }
    );
  }

  policyCancelled() {
    let t: any, s: any;
    if (this.effectiveDate != null) {
      t = this.getFormattedDate(this.effectiveDate);
    }
    if (this.endeffectiveDate != null) {
      s = this.getFormattedDate(this.endeffectiveDate);
    }
    let ReqObj =
    {
      "BranchCode": this.branchValue,
      "EndDate": s,
      "ProductId": "3",
      "StartDate": t
    }

    let urlLink = `${this.ApiUrl1}admin/getPortFolioSearchByCancelled`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);

          this.QuoteHeader = [
            //{key: 'S.No', display: 'S.No'},

            { key: 'BrokerOrganization', display: 'Broker Organization' },
            { key: 'LoginId', display: 'Quote Created By' },
            { key: 'PolicyNo', display: 'PolicyNo' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'Premium', display: 'Premium' },
            { key: 'PremiumCurrencyName', display: 'Currency' },
            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                ]
              },
            },
            {
              key: 'Views',
              display: 'View Documnet',
              config: {
                isViews: true,
              }
            }
          ];
          this.PortData = data.Result


        }
      }, (err) => { }
    );
  }
  /*getAdmin() {

  this.show=true; let t:any,s:any;
  if(this.effectiveDate!=null){
    t=  this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
   console.log('efffffffffff',t);
   //this.brokerList[0].EffectiveDateStart=t;
 }
 if(this.endeffectiveDate!=null){
    s=  this.datePipe.transform(this.endeffectiveDate, "dd/MM/yyyy");
    console.log('efffffffffff',s);
 }

    this.QuoteHeader = [
        //{key: 'S.No', display: 'S.No'},
          {key: 'S.No', display: 'S.No'},
        {key: 'BrokerOrganization', display: 'Broker Organization'},
        {key: 'Quote', display: 'Quote Created By'},
        {key: 'QuoteNo', display: 'QuoteNo'},
        {key: 'CustomerName', display: 'Customer Name'},
       {key: 'Premium', display: 'Premium'},
        {
          key: 'View',
          display: 'ViewDraft',
          config: {
            isView: true,
          }
        },
        {
          key: 'Views',
          display: 'View Documnet',
          config: {
            isViews: true,
          }
        }
      ];
       this.PortData=[{"SNo":'1'},
        {"MissippiOpenCoverNo":"1234OP"}
    ]
    /*let ReqObj = {
      "BranchCode": this.userDetails?.BranchCode,
      "LoginId": this.loginType,
   }

    let urlLink = `${this.ApiUrl1}opencover/report/renewal/policy`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data) {
          console.log(data);
          this.columnHeader = [
            //{key: 'S.No', display: 'S.No'},
            {key: 'ProposalNo', display: 'Proposal No'},
            {key: 'CompanyName', display: 'Customer Name'},
            {key: 'OpenCoverStartDate', display: 'Policy Start Date'},
            {key: 'OpenCoverEndDate', display: 'Policy End Date'},
           //{key: 'EffectiveDate', display: 'Effective Date'},
            {key: 'MissippiOpenCoverNo', display: 'MissippiOpenCoverNo'},
            {
              key: 'actions',
              display: 'View PDF',
              config: {
                isView: true,
              }
            },
            {
              key: 'actions',
              display: 'View Documnet',
              config: {
                isViews: true,
              }
            }
          ];
          this.tableData = data?.Result;
           this.tableData=[{"ProposalNo":'345678'},
            {"MissippiOpenCoverNo":"1234OP"}
        ]
        }
      }, (err) => { }
    );
  }*/

  get sF() {
    return this.searchForm?.controls;
  }
  onEdit(row: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/renewal`;
    const reqData = {
      "BranchCode": this.userDetails.BranchCode,
      "ProposalNo": row.ProposalNo
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result) {
          this.getExistingAdmin();
        }
        //this.branchList = data || [];
        //this.getExistingAdmin();
      },
      (err) => { },
    );
  }
  onviewQuotes(row: any) {

  }
  onViewQuotes(row: any) {

  }
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
