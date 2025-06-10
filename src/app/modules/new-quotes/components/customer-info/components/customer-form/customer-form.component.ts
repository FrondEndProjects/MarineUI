declare var $: any;
import { CustomerInfoComponent } from './../../customer-info.component';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Mydatas from '../../../../../../app-config.json';
import { NewQuotesService } from '../../../../new-quotes.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  @ViewChild('myModal4') myModal4: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public AdminUrl: any = this.AppConfig.AdminUrl;
  public userDetails: any;
  public productId: any;
  public openCoverNo: any = '';
  public filterValue: any;
  customerType: any = 'Individual'
  columnHeader1: any[] = [];
  searchList: any[] = [];
  public loginId: any;
  public applicationId: any; brokerCode: any = null;

  // public customerGrid: boolean = true;
  public isCustomerTable: boolean = true;
  public submitted: boolean;
  public customerForm: FormGroup;
  @ViewChild('formDirective') public customerFormDirective: NgForm;
  public dropTitleList: any[] = [];
  public dropCityList: any[] = [];

  public tableData: any[] = []; mobileNo: any = null;
  public columnHeader: any[] = []; coreAppcode: any = null; poBox: any = null;
  broCode: any; title: any = null; customerName: any = null; cityValue: any = null;
  closeResult: any = null; editSection: boolean = false; OpenCover: any = null;
  titleError: boolean = false; customerNameError: boolean = false;
  coreAppcodeError: boolean = false; cityNameError: boolean = false;
  poBoxError: boolean = false; customerVat: any = null; Address1: any = null;
  Address2: any = null; endorsement: any = null; emailIdError: boolean = false;
  isIssuer: boolean = false; emailId: any = null; mobileNoError: boolean = false;
  docUploadedData: any;
  setDocvalue: any;
  constructor(
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private newQuotesService: NewQuotesService,
    private customerInfoComponent: CustomerInfoComponent,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userDetails = this.customerInfoComponent?.userDetails;
    this.productId = this.customerInfoComponent?.productId;
    this.openCoverNo = this.customerInfoComponent.OpenCover?.value;
    this.customerForm = this.customerInfoComponent.customerForm;
    this.loginId = this.customerInfoComponent?.loginId;
    this.endorsement = JSON.parse(sessionStorage.getItem('endorsement'));
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    if (this.OpenCover) {
      if (this.OpenCover?.name == 'adminReferral') {
        this.productId = this.OpenCover?.productId;
      }
    }
    this.broCode = this.customerInfoComponent?.broCode
    this.docUploadedData = JSON.parse(sessionStorage.getItem('docUploadData'));
    console.log('llllllllllllllll', this.loginId)
    this.applicationId = this.customerInfoComponent?.applicationId;
    if (sessionStorage.getItem('loginId')) {
      this.loginId = sessionStorage.getItem('loginId');
    }

    this.activatedRoute.queryParams.subscribe(params => {
      this.setDocvalue = params['value'];
      if (this.setDocvalue == 'back' || this.setDocvalue == 'edit') {
        this.docUploadedData = null
      }

    });

  }

  ngOnInit(): void {
    this.onLoadDropdownList();

  }

  get customerF() {
    return this.customerForm.controls;
  }
  onLoadDropdownList() {
    this.columnHeader = [
      {
        key: 'CustomerId',
        display: 'Premia Code',
        config: {
          select: true,
        },
      },
      { key: 'CustomerName', display: 'Customer Namet' },
      { key: 'Email', display: 'Email' },
      { key: 'PoBox', display: 'P.O.Box' },
      { key: 'CityName', display: 'City' }
    ];
    this.onGetTitleDropdownList();
    this.onGetCityDropdownList();
    console.log('FFFFFFFFFFFF', this.brokerCode)
    this.customerF.customerType.setValue('Individual');
    /*if(this.broCode){
      this.onGetCustomerList(this.broCode);
      console.log('jjjjjjjjjjjj',this.broCode)
    }
    else{
      this.onGetCustomerList(this.brokerCode);
    }*/
    //this.onGetCustomerList(this.brokerCode);
  }

  onGetTitleDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/title`;

    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'pvType': 'title',
      'ProductId': this.productId,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropTitleList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropTitleList, 'title');

        }
      },
      (err) => { },
    );
  }
  onGetCityDropdownList() {
    let urlLink
    let reqData
    if (this.userDetails.InsuranceId == '100020') {
      let countryId = this.userDetails?.OriginationCountryId ? this.userDetails?.OriginationCountryId : this.userDetails?.LoginBranchDetails[0]?.OriginationCountryId;
      urlLink = `${this.ApiUrl1}master/countrycity/list`;
      reqData = {
        'countryID': countryId
      };
    }
    else {
      urlLink = `${this.ApiUrl1}quote/dropdown/city`;
      reqData = {
        'BranchCode': this.userDetails?.BelongingBranch,
        'ProductId': this.productId,
        'pvType': 'city',
        'OpenCoverNo': this.openCoverNo,
      };
    }

    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropCityList = data?.Result;
          console.log(this.dropCityList);

          this.newQuotesService.getDropDownList(this.dropCityList, 'city');
          if (this.docUploadedData && this.setDocvalue != 'back' && this.setDocvalue != 'edit') {
            this.setDocUploadData();
          }
        }
      },
      (err) => { },
    );
  }

  onGetCustomerList(code) {
    console.log('Codes', this.customerInfoComponent.brokercallcode);
    this.tableData = [];
    const urlLink = `${this.ApiUrl1}api/customer/information`;
    if (this.productId == '3') this.openCoverNo = null;
    const reqData = {
      "BrokerCode": code,
      'ApplicationId': this.applicationId,
      'LoginId': this.loginId,
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          // if (this.customerF.name.status == "DISABLED" || data?.Result == null) {
          if (this.productId == '3' || this.productId == '11') {
            $('.customersearch').css("display", "block");
            this.isCustomerTable = true;
          }
          // else {
          //   this.isCustomerTable = true;
          // }
          this.tableData = data?.Result;

        }
      },
      (err) => { },
    );
  }
  getCustomerAltList(modal) {

    this.tableData = [];
    // if (this.userDetails?.UserType == "Issuer"){
    //   this.loginId = this.userDetails.LoginId;
    //   this.applicationId = ''
    // }

    //console.log('Brokercodess',this.brokerComponent.brokerForm.controls['borker'].value)
    let code = this.customerInfoComponent.brokercallcode;
    console.log('GCOdesssss', code);
    const urlLink = `${this.ApiUrl1}api/customer/information`;
    if (this.productId == '3') this.openCoverNo = null;
    const reqData = {
      "BrokerCode": code,
      //this.brokerCode,
      'ApplicationId': this.applicationId,
      'LoginId': this.loginId,
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          // if (this.customerF.name.status == "DISABLED" || data?.Result == null) {
          if (this.productId == '3' || this.productId == '11') {
            this.editSection = false;
            if (modal) this.open(modal)
          }
          // else {
          //   this.isCustomerTable = true;
          // }
          this.tableData = data?.Result;

          console.log('kkkkkkkkkkkkkkkkkkkkkkk', this.tableData, this.isCustomerTable)

        }
      },
      (err) => { },
    );
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  public hideModel() {

  }
  onSelectCustomer(event: any, modal) {

    console.log('kkkkkkkkkk', event)
    this.customerF.title.setValue(event?.Title);
    this.customerF.name.setValue(event?.CustomerName);
    this.customerF.coreAppcode.setValue(event?.MissippiCustomerCode);
    this.customerF.city.setValue(event?.CityCode);
    this.customerF.poBox.setValue(event?.PoBox);
    this.customerF.mobileNo.setValue(event?.Mobile);
    this.customerF.email.setValue(event?.Email);
    this.customerF.customerVat.setValue(event?.VatRegNo);
    this.customerF.Address1.setValue(event?.Address1);
    this.customerF.Address2.setValue(event?.Address2);
    this.customerF.Code.setValue(event.CustomerId);
    this.customerF.customerType.setValue(event.CustomerType);
    modal.close();

  }
  getCustomerId() { return this.customerF.Code.value }
  close() {
  }
  onsubmit() {
    let valid = this.checkMandatories();
    let LoginId: any
    if (valid) {
      if (this.userDetails?.UserType != "Issuer") {
        this.loginId = this.userDetails?.LoginId;
        LoginId = this.userDetails?.LoginId;
        this.applicationId = '1';
        this.isIssuer = false;

      }
      // Issuer

      if (this.userDetails?.UserType == "Issuer") {
        this.loginId = this.endorsement?.LoginId || '';
        //this.loginId = this.customerInfoComponent.brokercallcode;
        LoginId = this.customerInfoComponent.brokercallcode;
        this.applicationId = this.userDetails.LoginId;
        this.isIssuer = true;
      }
      let cityName = null;
      if (this.cityValue != null && this.cityValue != '' && this.cityValue != undefined) {
        let entry = this.dropCityList.find(ele => ele.Code == this.cityValue);
        console.log('Entry', entry)
        if (entry) cityName = entry.CodeDescription;
      }
      let ReqObj = {
        "Address1": this.Address1,
        "Address2": this.Address2,
        "ApplicationId": this.applicationId,
        "CityCode": this.cityValue,
        "CityName": cityName,
        "ClientCustomerId": null,
        "CompanyName": null,
        "Country": null,
        "CustFirstName": this.customerName,
        "CustLastName": null,
        "CustVatRegNo": this.customerVat,
        "CustomerArNo": null,
        'CustomerType': this.customerType,
        "CustomerArabicName": null,
        "CustomerCode": this.coreAppcode,
        "CustomerId": null,
        "CustomerName": this.customerName,
        "DateOfBirth": null,
        "Email": this.emailId,
        "Fax": null,
        "Gender": null,
        "LoginBranchCode": this.userDetails?.BranchCode,
        "LoginId": LoginId,
        "MobileNo": this.mobileNo,
        "Nationality": null,
        "Occupation": null,
        "PoBox": this.poBox,
        "TelephoneNo": null,
        "Title": this.title
      }
      console.log("Final obj", ReqObj)
      let urlLink = `${this.ApiUrl1}OpenCover/customer/save`;
      this.newQuotesService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data?.Status) {
            this.customerName = null; this.mobileNo = null; this.emailId = null; this.title = null;
            this.coreAppcode = null; this.cityValue = null; this.customerVat = null; this.Address1 = null;
            this.Address2 = null; this.editSection = false; this.getCustomerAltList(null);
          }
        },
        (err) => { },
      );
    }
  }
  checkMandatories() {
    let i = 0; this.titleError = false; this.customerNameError = false; this.coreAppcodeError = false; this.cityNameError = false; this.poBoxError = false;
    this.mobileNoError = false; this.emailIdError = false;
    if (this.title == null || this.title == '' || this.title == undefined) { i += 1; this.titleError = true; }
    if (this.customerName == null || this.customerName == '' || this.customerName == undefined) { i += 1; this.customerNameError = true; }
    if (this.coreAppcode == null || this.coreAppcode == '' || this.coreAppcode == undefined) { i += 1; this.coreAppcodeError = true; }
    if (this.cityValue == null || this.cityValue == '' || this.cityValue == undefined) { i += 1; this.cityNameError = true; }
    if (this.poBox == null || this.poBox == '' || this.poBox == undefined) { i += 1; this.poBoxError = true; }
    if (this.mobileNo == null || this.mobileNo == '' || this.mobileNo == undefined) { i += 1; this.mobileNoError = true; }
    if (this.emailId == null || this.emailId == '' || this.emailId == undefined) { i += 1; this.emailIdError = true; }
    return i == 0;
  }
  setDocUploadData() {
    this.customerF.name.setValue(this.docUploadedData?.ImporterName);
    // this.customerF.mobileNo.setValue(this.docUploadedData?.ImporterTelephone.substring(3));
    this.customerF.Address1.setValue(this.docUploadedData?.ImporterAddress);
    this.customerF.email.setValue(this.docUploadedData?.ImporterEmail);
    this.customerF.customerVat.setValue(this.docUploadedData?.ImporterPIN);
    const tel = this.docUploadedData?.ImporterTelephone;
    const mobile = tel?.startsWith("254") ? tel.substring(3) : tel;
    this.customerF.mobileNo.setValue(mobile);
  }

  onSearchCustomer(value) {
    this.columnHeader1 = [
      {
        key: 'CustomerId',
        display: 'Customer Id',
        config: {
          select: true,
        },
      },
      { key: 'BROKER_CODE', display: 'Customer Name' },
      { key: 'BROKER_NAME', display: 'Customer Name' },
    ];

    this.modalService.open(this.myModal4, { size: 'lg', scrollable: true });

    let ReqObj = {
      "BranchCode": null,
      "InsuranceId": this.userDetails.InsuranceId,
      "SearchValue": value ? value : null,
      "SourceType": this.userDetails.SubUserType
    }
    let urlLink = `${this.AdminUrl}api/search/premiabrokercustomercode`;
    this.newQuotesService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log("Searched Data", data);

        if (data.Result.length != 0) {
          if (data.Result.length == 1) {
            if (data.Result[0].BROKER_CODE != null) {
              this.searchList = data.Result;
              // this.dataSource.data = this.searchList;
              // this.dataSource = new MatTableDataSource(this.searchList);
              // this.dataSource.paginator = this.paginator;
            }
          }
          else {
            this.searchList = data.Result;
            // this.dataSource.data = this.searchList;
            // this.dataSource = new MatTableDataSource(this.searchList);
            // this.dataSource.paginator = this.paginator; // <-- Important!
          }
        }
      },
      (err) => { },
    );

  }
  selectProduct(customer: any, modal) {
    this.coreAppcode = customer.BROKER_CODE
    this.customerName = customer.BROKER_NAME
    modal.close();
  }
}
