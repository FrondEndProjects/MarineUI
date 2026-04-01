import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../app/shared/shared.service';
import Swal from 'sweetalert2';

import * as Mydatas from '../../../app-config.json';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss']
})
export class BrokerComponent {
  tableData: any[] = [];
  productEditable: boolean = false;
  brokerDialogVisible: boolean = false;
  visibleBrokerDetails: boolean = false;
  ChangePass: boolean = false;
  branchPopup: boolean = false;
  coverPopup: boolean = false;
  depositPopup: boolean = false;
  paymentTypesPopup: boolean = false;
  paymentTypesDetailPopup: boolean = false;
  productPopup: boolean = false;
  branchDetailsPopup: boolean = false;
  addProduct: boolean = false;
  existingProduct: boolean = true;
  paymentTable: boolean = true; coverEffectiveError: boolean = false;
  paymentTableAdd: boolean = false; coverEffectiveDate: any = null;
  ExistingPaymentAddPopup: boolean = false;
  brokerHeader: any[] = []; sectionList: any[] = [];
  brokerData: any[] = []; sectionValue: any = null;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.AdminUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  public motorApiUrl: any = this.AppConfig.MotorApiUrl;
  public AdminUrl: any = this.AppConfig.AdminUrl;
  companyList: any; loginId: any;
  insuranceId: any; channelId: any = "broker";
  productId: string;
  userDetails: any;
  subUserType: string;
  channelList: any[] = [];
  editsSection: boolean = false;
  loginInformation: any;
  PersonalInformation: any;
  CbcDeposit: any[] = [];
  designation: any;
  contactPersonName: any;
  coreAppBrokerCode: any;
  regulatoryCode: any;
  custConfirmYN: any = 'Y';
  makerYN: any = 'Y';
  mobileCode: any;
  pobox: any;
  remarks: any;
  userMail: any;
  userMobile: any;
  userName: any;
  brokerLoginId: any;
  whatsAppCode: any;
  whatsAppNo: any;
  vatRegNo: any = null;
  countryCode: any;
  cityCode: any;
  cityName: any;
  customerCode: any;
  address1: any;
  address2: any;
  companyName: any;
  stateName: any;
  stateCode: any;
  creditLimit: any;
  newList: any[] = [];
  newslist: any[] = [];
  brokerProductList: any[] = [];
  mobileCodeList: any[] = [];
  countryList: any[] = [];
  editSection: boolean = false;
  stateList: any[] = [];
  cityList: any[] = [];
  agencyCode: any = null;
  brokerCompanyYn: any;
  taxExcemptedYN: any = 'N';
  taxExcemptedCode: any;
  companyCode: any;
  commissionVatYN: any = 'N';
  checkerYN: any = 'Y';
  cbcno: any = null;
  password: any = null;
  statusValue: String = 'Y';
  Status: String = 'Y'
  effectiveDate: any;
  changePasswordYN: string = 'N';
  repassword: any = null;
  bankCode: null;
  subUser: string;
  branchData: any[] = [];
  AddUserPopup: boolean = false;
  userDataList: any[] = [];
  branchName: any;
  brokerBranchName: any;
  branchType: any;
  salePointCode: any;
  email: any;
  mobile: any;
  subInsuranceId: any = null;
  subSourceId: any;
  DepartmentCode: any;
  AttachedBranchCode: any;
  BranchCode: any = null;
  BrokerBranchCode: any;
  selectedProductList: any[] = []; productValue: any = null;
  productData: any[]; productList: any[] = [];
  customerSearchvisible: boolean = false; selectedCoverListInc: any[] = [];
  position: string = 'top'; selectedCoverListExc: any[] = [];
  userNameError: boolean = false;
  customerCodeError: boolean = false;
  stateCodeError: boolean = false;
  cityCodeError: boolean = false;
  userMailError: boolean = false;
  mobileCodeError: boolean = false;
  userMobileError: boolean = false;
  coreAppBrokerCodeError: boolean = false;
  regulatoryCodeError: boolean = false;
  creditLimitError: boolean = false;
  brokerLoginIdError: boolean = false;
  effectiveDateError: boolean = false;
  remarksError: boolean = false;
  searchList: any[] = [];
  searchLengthSection: boolean = false;
  sampleCustomerCode: any = null;
  searchValue: any;
  sampleCustomerName: any;
  branchList: any[] = [];
  branchValue: string;
  paymentData: any[] = [];
  UserType: string;
  minDate: Date;
  paymentMasterId: null;
  paymentdetalis: null;
  CashYn: any;
  SwitchCashYn: boolean = true;
  ChequeYn: any;
  CreditYn: any;
  EffectiveDateStart: any;
  OnlineYn: any;
  branchDatas: any[] = [];
  CbcDatas: any[] = [];
  cbcnos: any[] = [];
  PaymentList: { Code: string; CodeDesc: string; }[];
  accountNo: any = null;
  bamount: any = null;
  chargabletype: any = null;
  chequeno: any = null;
  Premium: any = null;
  depositno: any = null;
  deposiType: any = null;
  micrno: any = null;
  payeeName: any = null;
  paymentid: any = null;
  policyinsu: any = null;
  reciptNo: any = null;
  referenceno: any = null;
  VatAmount: any = null;
  chequeDate: any = null;
  refundDate: any = null;
  show: boolean; searchBranchValue: any = null;
  editProduct: boolean = false;
  userLoginId: any;
  insertlist: any[] = [];
  SwitchCreditYn: boolean = true;
  SwitchChequeYn: boolean = true;
  SwitchOnlineYn: boolean = true; SwitchMobileYn: boolean = true; SwitchRealPayYn: boolean = true;
  passwordPopup: boolean = false; MobileYn: any = 'Y'; RealPayYn: any = 'Y';
  ViewProducts: any[] = [];
  dates: any; LastLoginDate: any; LastPolicyDate: any; LastQuoteDate: any; CollectedPremium: any;
  PolicyCommission: any; branchSPDetailsPopup: boolean = false;
  brokerValue: any; subBranchId: any = null;
  OaCode: any; subBranchList: any[] = []; CoverType: any = '1';
  sourceList: any[] = []; SalePointCodeList: any[] = [];
  selectedBranchName: any = null; selectedSPCode: any = null; SalePointCode: any = null;
  viewBrokerDetails: any; categoryId: any = null; categoryList: any[] = []
  selectedProductId: any; productEndorsement: boolean = false;
  endorseData: any[] = [];
  existProduct: any ='3';
  approvalId: any;
  approverList: any[] = [];
  selectedBranchCode: any;
  isValidCustomer: boolean = false;
  constructor(private router: Router,
    private sharedService: SharedService, public datePipe: DatePipe) {
    this.productId = sessionStorage.getItem('companyProductId');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.selectedBranchCode = sessionStorage.getItem('selectedBranchCode');
    const user = this.userDetails?.Result;
    this.brokerProductList = user.BrokerCompanyProducts;

    this.insuranceId = user.InsuranceId;
    this.loginId = user.LoginId;
    this.subUser = sessionStorage.getItem('typeValue');
    let channelId = sessionStorage.getItem('brokerChannelId');
    //this.UserType= user.UserType;
    this.subUserType = channelId;
    if (channelId) this.channelId = channelId;
    this.getCompanyList();
    this.getChannelList();
    if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
      this.getApproverList();
    }
  }

  ngOnInit() {
    this.minDate = new Date();
    this.newslist['EffectiveDateStart'] = this.minDate
    this.getBrokerList();
    this.getMobileCodeList();
    this.getCountryList();
    this.PaymentList = [{ "Code": "1", "CodeDesc": "Cash" }, { "Code": "2", "CodeDesc": "Cheque" }];
    let com = sessionStorage.getItem('editBroker');
    if (com) {
      this.editsSection = false;

    }
    else {
      let channelId = sessionStorage.getItem('brokerChannelId');
      if (channelId) this.subUserType = channelId;
      this.editsSection = true;
    }
    if (this.insuranceId == '100002') {
      this.isValidCustomer = true;
    }

  }
  getChannelList() {
    let ReqObj = {
      "UserType": "Broker"
    }
    // let urlLink = `${this.CommonApiUrl}dropdown/subusertype`;
    let urlLink = `${this.AdminUrl}dropdown/subusertype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.channelList = data.Result;
        }
      },
      (err) => { },
    );
  }
  checkCompanyId() {
    return this.insuranceId == '100002'
  }
  SwitchCash() {
    if (this.SwitchCashYn == false) {
      this.CashYn = 'N';
    }
    else this.CashYn = 'Y';
    if (this.SwitchCreditYn == false) {
      this.CreditYn = 'N';
    }
    else this.CreditYn = 'Y';
    if (this.SwitchChequeYn == false) {
      this.ChequeYn = 'N';
    }
    else this.ChequeYn = 'Y';
    if (this.SwitchOnlineYn == false) {
      this.OnlineYn = 'N';
    }
    else this.OnlineYn = 'Y';
    if (this.SwitchMobileYn == false) {
      this.MobileYn = 'N';
    }
    else this.MobileYn = 'Y';

    if (this.SwitchRealPayYn == false) {
      this.RealPayYn = 'N'
    }
    else this.RealPayYn = 'Y'
  }
  getApproverList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "UserType": "Issuer"
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/getApproverDropDownByClientId`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.approverList = data.Result.customerDetails;
        }
      },
      (err) => { },
    );
  }
  showDialogBrokerDetails(type) {
    if (type == 'AddBroker') {
      if (this.insuranceId == '100002') {
        this.isValidCustomer = true;
      }
      else {
        this.isValidCustomer = false;
      }
      this.agencyCode = null;
      this.brokerDialogVisible = true;
      this.formRest();
      if (this.stateList.length != 0) this.onCountryChange('direct', null, null);
      this.editsSection;
    }
    else if (type == 'AddUser') {
      this.AddUserPopup = true;

    }
    else if (type == 'branchSPDetail') { this.branchSPDetailsPopup = true; }
    else if (type == 'branchDetail') {
      this.branchDetailsPopup = true;
      this.branchFormReset();

    }
    else if (type == 'AddProduct') {
      this.addProduct = true; this.productEndorsement = false;
      this.editProduct = false;
      this.existingProduct = false;
    }
    else if (type == 'EditProduct') {
      this.addProduct = false; this.productEndorsement = false;
      this.editProduct = true;
      this.existingProduct = false;
    }
    else if (type == 'ProductCancel') {
      this.addProduct = false; this.productEndorsement = false;
      this.existingProduct = true;
      this.editProduct = false;
    }


    else if (type == 'PaymentAddCancel') {
      this.userLoginId = sessionStorage.getItem('userLoginId');
      this.getBrokersBranchList();
      sessionStorage.removeItem('userLoginId');
      this.paymentTable = true;
      this.paymentTableAdd = false;

    }
    else if (type == 'paymentTableAdd') {
      this.ExistingPaymentAddPopup = true
    }
    else if (type == 'paymentTableAdd') {
      this.ExistingPaymentAddPopup = true
    }
    else if (type == 'paymentTableAddCancel') {
      this.ExistingPaymentAddPopup = false;
    }
  }
  onSaveBranchName() {
    if (this.selectedBranchName) { this.branchName = this.selectedBranchName; this.brokerBranchName = this.selectedBranchName; }
    if (this.selectedSPCode) this.salePointCode = this.selectedSPCode;
    this.branchSPDetailsPopup = false;
  }
  searchBranchName(type, value, modal) {
    this.searchLengthSection = false;
    this.selectedBranchName = this.branchName;
    this.selectedSPCode = this.salePointCode;
    this.SalePointCodeList = [];
    if (type == 'change') this.searchBranchValue = value;
    if (this.searchBranchValue == null) {
      this.searchBranchValue = this.regulatoryCode;
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "SpCode": this.searchBranchValue
    }
    let urlLink = `${this.motorApiUrl}api/getbrokerspcode`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.SalePointCodeList = data.Result;
        }
      },
      (err) => { },
    );
  }
  branchFormReset() {
    this.branchName = null, this.brokerBranchName = null; this.branchType = 'Main'; this.salePointCode = null;
    this.address1 = null; this.address2 = null; this.email = null; this.mobile = null;
    this.remarks = null; this.Status = 'Y'; this.BranchCode = null;
    this.getMainBranchList();
  }
  getMainBranchList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let obj = [{ "Code": null, "CodeDesc": "---Select---" }]
          this.branchList = obj.concat(data.Result);
        }
      },
      (err) => { },
    );
  }
  SourceType() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": this.BranchCode
    }
    let urlLink = `${this.CommonApiUrl}dropdown/sourcetype`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.sourceList = data.Result;

        }
      },
      (err) => { },
    );
  }
  showDialogBrokerDetails1(type, value) {

    if (type == 'DepositAdd') {
      this.paymentTable = false;
      this.paymentTableAdd = true;
      this.getDetails(value.CbcNo);
      sessionStorage.setItem("userLoginId", value.BrokerName);
    }
  }
  brokerDetailsView(value) {
    this.formRest();
    this.viewBrokerDetails = value;
    this.brokerLoginId = value.LoginId;
    this.subUserType = value.SubUserType;
    this.UserType = value.UserType;
    // this.OaCode=value.OaCode;
    this.visibleBrokerDetails = true;
    this.getEditBrokerDetails();
    this.getBranchuserList();
    this.brokerProducts();
    this.editSection = true;
  }
  passwordField() {
    this.passwordPopup = true;
    this.password = '';
    this.repassword = '';
  }
  passChanged() {
    this.onProceed();


  }
  // passChange(){
  //   this.onProceed();
  //   this.passwordPopup=false;
  // }
  ConfigPopUp(type, value) {
    this.brokerLoginId = value.LoginId;
    this.userLoginId = value.LoginId;
    this.agencyCode = value.OaCode;
    if (type == 'Cover') {
      this.coverPopup = true;
      this.getBrokerProductList();
    }
    else if (type == 'Deposit') {
      this.depositPopup = true;
    }
    else if (type == 'PaymentTypes') {
      this.paymentTypesPopup = true;
    }
    else if (type == 'paymentDetail') {
      this.paymentTypesDetailPopup = true;
    }
    else if (type == 'paymentDetailCancel') {
      this.paymentTypesDetailPopup = false;
    }
  }
  getBrokerProductList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "LoginId": this.brokerLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/dropdown/brokerproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ "Code": null, "CodeDesc": "--Select--" }]
          this.productList = obj.concat(data.Result);
          if (data.Result.length != 0) {
            this.productValue = data.Result[0].Code;
            //this.getBrokerBranchList();
            this.onChangeProduct();
          }
        }
      },
      (err) => { },
    );
  }
  onChangeProduct() {
    this.sectionValue = null;
    this.sectionList = [];
    this.tableData = [];
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId": this.productValue,
      "BranchCode": this.branchValue,
      "AgencyCode": this.agencyCode
    }
    let urlLink = `${this.ApiUrl1}master/dropdown/productsection`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ "Code": null, "CodeDesc": "--Select--" }]
          this.sectionList = obj.concat(data.Result);
          let sectionValue = null;
          if (data.Result.length != 0) sectionValue = data.Result[0].Code;
          if (sectionValue) {
            this.sectionValue = sectionValue;
            let Inc = sessionStorage.getItem('IncValue')
            if (Inc) this.CoverType = Inc;
            else { Inc = '1'; this.CoverType = '1' }
            this.onChangeSection();
            //this.getBrokerCoverList();
          }
        }
      },
      (err) => { },
    );
  }
  onChangeSection() {
    this.selectedCoverListInc = []; this.selectedCoverListExc = [];
    let Inc = this.CoverType;
    if (Inc == '1') {
      this.branchValue = "99999";
      this.getBrokerCoverList();
    }
    else if (Inc == '2') {
      this.branchValue = "99999";
      this.getBrokerAllCoverList();
    }
  }
  getBrokerCoverList() {

    let ReqObj = {
      "Limit": "",
      "Offset": "100000",
      "InsuranceId": this.insuranceId,
      "SectionId": this.sectionValue,
      "ProductId": this.productValue,
      "BranchCode": this.branchValue,
      "AgencyCode": this.agencyCode
    }
    let urlLink = `${this.ApiUrl1}master/getallsectionbrokercoverdetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          //sessionStorage.setItem('companySectionId',this.sectionValue);
          this.tableData = data.Result;
        }
      },
      (err) => { },
    );
  }
  getBrokerAllCoverList() {

    let ReqObj = {
      "Limit": "",
      "Offset": "100000",
      "InsuranceId": this.insuranceId,
      "SectionId": this.sectionValue,
      "ProductId": this.productValue,
      "BranchCode": this.branchValue,
      "AgencyCode": this.agencyCode
    }
    let urlLink = `${this.ApiUrl1}master/getallsectioncoverbroker`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          //sessionStorage.setItem('companySectionId',this.sectionValue);
          this.tableData = data.Result;
        }
      },
      (err) => { },
    );
  }
  changebroker() {
    if (this.channelId != null && this.channelId != undefined && this.channelId != '') {
      this.getBrokerList();
    }
  }
  onSaveCover() {
    if (this.coverEffectiveDate == null || this.coverEffectiveDate == '') { this.coverEffectiveError = true; }
    else {
      let t: any;
      if (this.CoverType == '1') {
        //this.Included(this.rowData)
        if (this.coverEffectiveDate != null) {
          if (String(this.coverEffectiveDate).split('/').length == 1) t = this.datePipe.transform(this.effectiveDate, "dd/MM/yyyy");
          else t = this.coverEffectiveDate
          //this.brokerList[0].EffectiveDateStart=t;
        }
        let i = 0;
        for (let u of this.selectedCoverListInc) {
          u['Status'] = this.statusValue;
          u['EffectiveDateStart'] = t;
          i++;
          if (i == this.selectedCoverListInc.length) this.Included(this.CoverType)

        }
      }
      else if (this.CoverType == '2') {
        if (this.coverEffectiveDate != null) {
          if (String(this.coverEffectiveDate).split('/').length == 1) t = this.datePipe.transform(this.coverEffectiveDate, "dd/MM/yyyy");
          else t = this.coverEffectiveDate
        }
        let i = 0;
        for (let u of this.selectedCoverListExc) {
          u['EffectiveDateStart'] = t;
          i++;
          if (i == this.selectedCoverListExc.length) this.Included(this.CoverType)

        }
      }
    }
  }
  Included(incValue) {
    let ReqObj = [];
    if (incValue == '1') ReqObj = this.selectedCoverListInc
    else ReqObj = this.selectedCoverListExc;
    let urlLink = `${this.ApiUrl1}master/insertbrokersectioncover`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.selectedCoverListExc = [];
          this.selectedCoverListInc = [];
          if (this.CoverType == '1') this.CoverType = '2';
          else this.CoverType = '1';
          this.onChangeSection()
        }
        else if (data.ErrorMessage) {
        }
      },
      (err) => { },
    );

  }
  onSelectCustomer(row: any, checked) {
    let t: any;
    if (checked == true) {
      if (this.CoverType == '2') {
        let entry = {
          "CreatedBy": this.brokerLoginId,
          "InsuranceId": this.insuranceId,
          "ProductId": this.productValue,
          "SectionId": this.sectionValue,
          "CoverId": row.CoverId,
          "Type": "Included",
          "EffectiveDateStart": t,
          "AgencyCode": this.agencyCode,
          "BranchCode": this.branchValue,
          "Status": "Y",
        }
        this.selectedCoverListExc.push(entry);
      }
      else if (this.CoverType == '1') {
        let entry = {
          "InsuranceId": this.insuranceId,
          "ProductId": this.productValue,
          "CoverId": row.CoverId,
          "SectionId": this.sectionValue,
          "Status": row.Status,
          "Type": "Excluded",
          "EffectiveDateStart": t,
          "BranchCode": this.branchValue,
          "AgencyCode": this.agencyCode
        }
        this.selectedCoverListInc.push(entry);
      }
    }
    else if (checked == false) {
      if (this.CoverType == '2') {
        let index = this.selectedCoverListExc.findIndex(ele => ele.CoverId == row.CoverId);
        this.selectedCoverListExc.splice(index, 1);
      }
      else if (this.CoverType == '1') {
        let index = this.selectedCoverListInc.findIndex(ele => ele.CoverId == row.CoverId);
        this.selectedCoverListInc.splice(index, 1);
      }
    }

  }
  EditDetailsView(value) {
    this.isValidCustomer = false;
    this.formRest();
    this.brokerLoginId = value.LoginId
    this.brokerDialogVisible = true;
    this.visibleBrokerDetails = false;
    this.getEditBrokerDetails();
  }
  getMobileCodeList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          let obj = [{ "Code": null, "CodeDesc": "---Select---" }];
          this.mobileCodeList = obj.concat(data?.Result);


        }
      },
      (err) => { },
    );
  }
  brokerProducts() {
    let ReqObj = {
      // "LoginId": this.brokerLoginId
      "BrokerBranchCode": "",
      "BranchCode": "",
      "InsuranceId": this.insuranceId,
      "LoginId": this.brokerLoginId,
      "ApplicationId": "1",
      "UserType": this.UserType,
      "SubUserType": this.subUserType,
      "SourceType": "",
      "BdmCode": null,
      "ProductId": "",
      "Limit": 0,
      "Offset": 1000
    }
    let urlLink = `${this.CommonApiUrl}api/viewlogindetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          console.log(data.Result, "brokerProducts1");

          this.ViewProducts = data.Result.ProductDetails;
          // this.dates =data.Result;
          this.LastLoginDate = data.Result.LastLoginDate;
          this.LastPolicyDate = data.Result.LastPolicyDate;
          this.LastQuoteDate = data.Result.LastQuoteDate;
          this.CollectedPremium = data.Result.CollectedPremium;
          this.PolicyCommission = data.Result.PolicyCommission;

        }
      },
      (err) => { },
    );
  }

  getBranchuserList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.branchList = data?.Result;
          this.onBrokerChange();
        }
      },
      (err) => { },

    );
  }
  onBrokerChange() {
    let ReqObj = {
      "UserType": "User",
      "SubUserType": "",
      "InsuranceId": this.insuranceId,
      "OaCode": this.OaCode,
      "Limit": "0",
      "Offset": "10000",
    }
    let urlLink = `${this.CommonApiUrl}admin/getallusers`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        this.userDataList = data.Result;
        // this.brokerValue = value;
        // if(this.brokerValue && this.insuranceId){
        //   let useObj = {"BrokerId":this.brokerValue,"InsuranceId":this.insuranceId,"channelId":this.subUserType,"UserId": null};
        //   sessionStorage.setItem('userEditDetails',JSON.stringify(useObj));
        // }
      },
      (err) => { },
    );

  }
  getCompanyList() {
    let ReqObj = {
      "LoginId": this.loginId
    }
    // let urlLink = `${this.CommonApiUrl}master/dropdown/superadmincompanies`;
    let urlLink = `${this.AdminUrl}master/dropdown/superadmincompanies`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.companyList = data.Result;
          if (this.companyList.length != 0) {
            if (this.channelId) this.getBrokerList();
          }
        }
      },
      (err) => { },
    );
  }
  getBrokerList() {
    if (this.insuranceId != null && this.channelId != null) {
      sessionStorage.setItem('brokerChannelId', this.channelId);

      //    this.insuranceId= this.brokerProductList[0].InsuranceId;

      let ReqObj = {
        "UserType": "Broker",
        "SubUserType": this.channelId,
        "Limit": "0",
        "Offset": "1000",
        "InsuranceId": this.insuranceId
      }
      let urlLink = `${this.CommonApiUrl}admin/getallbrokers`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            this.brokerData = data.Result;

          }
        },
        (err) => { },
      );
    }

  }
  getEditBrokerDetails() {
    let ReqObj = { "LoginId": this.brokerLoginId }
    let urlLink = `${this.CommonApiUrl}admin/getbrokerbyid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          //this.cityList = data.Result;
          this.editSection = true;

          this.loginInformation = data.Result.LoginInformation;
          this.OaCode = this.loginInformation.OaCode;
          this.agencyCode = this.loginInformation.AgencyCode
          this.PersonalInformation = data.Result.PersonalInformation;
          this.CbcDeposit = data.Result.DepositCbc;
          this.designation = this.PersonalInformation.Designation;
          this.contactPersonName = this.PersonalInformation.ContactPersonName;
          this.coreAppBrokerCode = this.PersonalInformation.CoreAppBrokerCode;
          this.regulatoryCode = this.PersonalInformation.RegulatoryCode;
          //this.cityCode = PersonalInformation?.CityName;
          this.custConfirmYN = this.PersonalInformation.CustConfirmYn;
          this.makerYN = this.PersonalInformation.MakerYn;
          this.mobileCode = this.PersonalInformation.MobileCode;
          this.pobox = this.PersonalInformation.Pobox;
          this.remarks = this.PersonalInformation.Remarks;
          this.userMail = this.PersonalInformation.UserMail;
          this.userMobile = this.PersonalInformation.UserMobile;
          this.userName = this.PersonalInformation.UserName;
          this.brokerLoginId = this.loginInformation.LoginId;
          this.whatsAppCode = this.PersonalInformation.WhatsappCode;
          this.whatsAppNo = this.PersonalInformation.WhatsappNo;
          this.vatRegNo = this.PersonalInformation.VatRegNo;
          this.countryCode = this.PersonalInformation.CountryCode;
          this.cityCode = this.PersonalInformation.CityCode;
          this.cityName = this.PersonalInformation.CityName;
          this.customerCode = this.PersonalInformation.CustomerCode;
          this.address1 = this.PersonalInformation?.Address1;
          this.address2 = this.PersonalInformation?.Address2;
          this.companyName = this.PersonalInformation?.CompanyName;
          this.stateCode = this.PersonalInformation?.StateCode;
          this.stateName = this.PersonalInformation?.StateName;
          this.statusValue = this.loginInformation.Status;
          this.creditLimit = this.PersonalInformation?.CreditLimit;
          this.effectiveDate = this.loginInformation?.EffectiveDateStart;
          this.taxExcemptedYN = this.PersonalInformation?.TaxExemptedYn;
          this.taxExcemptedCode = this.PersonalInformation?.TaxExemptedCode;
          this.approvalId = this.PersonalInformation?.ApprovalId;
          if (this.stateCode && this.cityCode)
            this.onCountryChange('direct', this.stateCode, this.cityCode);
        }
      },
      (err) => { },
    );
  }
  getCountryList() {
    let ReqObj = { "InsuranceId": this.insuranceId }
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Result) {
          this.countryList = data.Result;
          let brokerId = sessionStorage.getItem('editBroker');
          if (brokerId) {
            // this.getEditBrokerDetails(brokerId);
            this.editSection = true;
          }
          else {
            // this.getInsuranceList('change', this.insuranceId);
            // this.getBankList();
            if (this.countryList.length != 0) {
              if (this.countryList.find(ele => ele.Code == 'TZS')) {
                this.countryCode = 'TZS';
              }
              else this.countryCode = this.countryList[0].Code;

              if (this.stateList.length == 0) this.onCountryChange('change', null, null);
            }
            this.mobileCode = '255';
            this.whatsAppCode = '255';
            this.editSection = false;
          }
        }
      },
      (err) => { },
    );
  }
  onCountryChange(type, stateCode, cityCode) {
    let ReqObj = {
      "CountryId": this.countryCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/region`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let obj = [{ "Code": null, "CodeDesc": "---Select---" }];
        this.stateList = obj.concat(data?.Result);
        this.stateCode = stateCode;
        this.cityCode = cityCode;
        this.onStateChange('direct', cityCode);
      },
      (err) => { },
    );
  }
  onStateChange(type, cityCode) {
    let ReqObj = {
      "CountryId": this.countryCode,
      "RegionCode": this.stateCode
    }
    let urlLink: any = null;
    if (this.insuranceId != '100020') urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
    else urlLink = `${this.CommonApiUrl}master/dropdown/stategroups`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let obj = [{ "Code": null, "CodeDesc": "---Select---" }];
        this.cityList = obj.concat(data?.Result);
        this.cityCode = cityCode;
      },
      (err) => { },
    );
  }
  onProceed() {

    if (this.editSection && this.changePasswordYN == 'N') {
      let entry = this.checkValidation();
      if (entry) {
        this.onSubmit();
      }
    }
    else {
      let entry = this.checkValidation();
      if (entry) {
        if (this.password == null || this.password == "" || this.password == undefined) {
          Swal.fire({
            title: '<strong>Password Details</strong>',
            icon: 'error',
            html:
              `Please enter Password`,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Error!',
          })
          // this.Toaster.open({
          //   text: 'Please enter Password',
          //   caption: 'password Details',
          //   type: 'danger',
          // });
        }
        else if (this.repassword == null || this.repassword == "" || this.repassword == undefined) {
          Swal.fire({
            title: '<strong>Password Details</strong>',
            icon: 'error',
            html:
              `Please enter Re-Password`,
            showCloseButton: true,
            focusConfirm: false,
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Error!',
          })
        }
        else if (this.password != undefined || this.password != null || this.password != "") {
          if (this.repassword != undefined || this.repassword != null || this.repassword != "") {
            if (this.password != this.repassword) {
              Swal.fire({
                title: '<strong>Password Details</strong>',
                icon: 'error',
                html:
                  `Passwords are MisMatching`,
                showCloseButton: true,
                focusConfirm: false,
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Error!',
              })
              // this.Toaster.open({
              //   text: 'Passwords are MisMatching',
              //   caption: 'password Details',
              //   type: 'danger',
              // });
            }
            else this.onSubmit();
          }
          else this.onSubmit();
        }
      }
    }
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerConfigure'])
  }
  onSubmit() {
    if (this.commissionVatYN == 'N') this.vatRegNo = null;
    let bankCode = null;
    if (this.subUserType == 'bank' && this.bankCode != null && this.bankCode != undefined) bankCode = this.bankCode
    let creditLimit = null;
    if (this.creditLimit) {
      if (this.creditLimit.includes(',')) {//creditLimit = this.creditLimit.replace(',',''); 
        creditLimit = this.creditLimit.replace(/,/g, '');
        console.log('KKKKKKKKKKKKKKK', this.creditLimit);
      }
      else { creditLimit = this.creditLimit; }
    }
    console.log('this', this.brokerCompanyYn)
    if (this.brokerCompanyYn == null || this.brokerCompanyYn == '' || this.brokerCompanyYn == undefined) {
      this.brokerCompanyYn = 'N';

      console.log('bbbbbbbbb', this.brokerCompanyYn)
    }
    let cityName = null;
    if (this.cityCode != null && this.cityCode != '') {
      let entry = this.cityList.find(ele => ele.Code == this.cityCode);
      if (entry) cityName = entry.CodeDesc;
    }
    if (this.taxExcemptedYN == 'N') this.taxExcemptedCode = null;

    let ReqObj = {
      "LoginInformation": {
        "AgencyCode": this.agencyCode,
        "BankCode": bankCode,
        "BrokerCompanyYn": this.brokerCompanyYn,
        "Createdby": this.loginId,
        "EffectiveDateStart": this.effectiveDate,
        "InsuranceId": this.insuranceId,
        "LoginId": this.brokerLoginId,
        "OaCode": this.agencyCode,
        "Password": this.password,
        "Status": this.statusValue,
        "SubUserType": this.channelId,
        "UserType": "Broker",
        "CbcNo": this.cbcno,
        "BranchCode": this.selectedBranchCode
      },
      "PersonalInformation": {
        "AcExecutiveId": "5",
        "Address1": this.address1,
        "Address2": this.address2,
        "Address3": "None",
        "ApprovedPreparedBy": this.loginId,
        "CheckerYn": this.checkerYN,
        "CityCode": this.cityCode,
        "CityName": cityName,
        "StateCode": this.stateCode,
        "CommissionVatYn": this.commissionVatYN,
        "CompanyName": this.companyCode,
        "ContactPersonName": this.contactPersonName,
        "CoreAppBrokerCode": this.coreAppBrokerCode,
        "RegulatoryCode": this.regulatoryCode,
        "CountryCode": this.countryCode,
        "CustConfirmYn": this.custConfirmYN,
        "Designation": this.designation,
        "Fax": "0",
        "MakerYn": this.makerYN,
        "CreditLimit": creditLimit,
        "TaxExemptedYn": this.taxExcemptedYN,
        "TaxExemptedCode": this.taxExcemptedCode,
        "Pobox": this.pobox,
        "Remarks": this.remarks,
        "UserMail": this.userMail,
        "UserMobile": this.userMobile,
        "UserName": this.userName,
        "MobileCode": this.mobileCode,
        "WhatsappCode": this.whatsAppCode,
        "WhatsappNo": this.whatsAppNo,
        "VatRegNo": this.vatRegNo,
        "CustomerCode": this.customerCode,
        "ApprovalId": this.approvalId,
      }
    }
    if (ReqObj.LoginInformation.EffectiveDateStart != '' && ReqObj.LoginInformation.EffectiveDateStart != null && ReqObj.LoginInformation.EffectiveDateStart != undefined) {
      let dateList = String(ReqObj.LoginInformation.EffectiveDateStart).split('/');
      if (dateList.length == 1) ReqObj.LoginInformation['EffectiveDateStart'] = this.datePipe.transform(ReqObj.LoginInformation.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj.LoginInformation['EffectiveDateStart'] = "";
    }
    let doc = null;
    let urlLink = `${this.CommonApiUrl}admin/createbroker`;
    this.sharedService.onPostBrokerDocumentMethodSync(urlLink, ReqObj, doc).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if (this.insuranceId == '100046' || this.insuranceId == '100047' || this.insuranceId == '100048' || this.insuranceId == '100049' || this.insuranceId == '100050') {
            this.getApproverList();
          }
          console.log('HHHHHHHHHHHHHHH', data.Result);
          sessionStorage.setItem('editBroker', this.brokerLoginId);
          sessionStorage.setItem('editBrokerAgencyCode', data.Result.AgencyCode);
          let entry = {
            "loginId": this.brokerLoginId,
            "brokerId": this.agencyCode,
            "insuranceId": this.insuranceId,
            "brokerCompanyYN": this.brokerCompanyYn,
            "UserType": "Broker",
            "RegulatoryCode": this.regulatoryCode,
            "SubUserType": this.subUserType,
            "CustomerCode": this.customerCode
          }
          sessionStorage.setItem('brokerConfigureDetails', JSON.stringify(entry));
          this.formRest();
          this.getBrokerList();
          this.brokerDialogVisible = false;
          this.passwordPopup = false;
          this.visibleBrokerDetails = false;
          // this.insuranceId=this.insuranceId
          // this.getBrokerList();

        }
        else if (data.ErrorMessage) {
          for (let entry of data.ErrorMessage) {
          }
          console.log("Error Iterate", data.ErrorMessage)
        }
      },
      (err) => { },
    );
  }
  checkValidation() {
    let i = 0
    if (this.customerCode != null && this.customerCode != '' && this.customerCode != undefined) { this.customerCodeError = false; }
    else { i += 1; this.customerCodeError = true; }
    if (this.userName != null && this.userName != '' && this.userName != undefined) { this.userNameError = false; }
    else { i += 1; this.userNameError = true; }
    if (this.stateCode != null && this.stateCode != '' && this.stateCode != undefined) { this.stateCodeError = false; }
    else { i += 1; this.stateCodeError = true; }
    if (this.cityCode != null && this.cityCode != '' && this.cityCode != undefined) { this.cityCodeError = false; }
    else { i += 1; this.cityCodeError = true; }
    if (this.userMail != null && this.userMail != '' && this.userMail != undefined) { this.userMailError = false; }
    else { i += 1; this.userMailError = true; }
    if (this.mobileCode != null && this.mobileCode != '' && this.mobileCode != undefined) { this.mobileCodeError = false; }
    else { i += 1; this.mobileCodeError = true; }
    if (this.userMobile != null && this.userMobile != '' && this.userMobile != undefined) { this.userMobileError = false; }
    else { i += 1; this.userMobileError = true; }
    if (this.coreAppBrokerCode != null && this.coreAppBrokerCode != '' && this.coreAppBrokerCode != undefined) { this.coreAppBrokerCodeError = false; }
    else { i += 1; this.coreAppBrokerCodeError = true; }
    if (this.regulatoryCode != null && this.regulatoryCode != '' && this.regulatoryCode != undefined) { this.regulatoryCodeError = false; }
    else { i += 1; this.regulatoryCodeError = true; }
    if (this.creditLimit != null && this.creditLimit != '' && this.creditLimit != undefined) { this.creditLimitError = false; }
    else { i += 1; this.creditLimitError = true; }
    if (this.brokerLoginId != null && this.brokerLoginId != '' && this.brokerLoginId != undefined) { this.brokerLoginIdError = false; }
    else { i += 1; this.brokerLoginIdError = true; }
    if (this.effectiveDate != null && this.effectiveDate != '' && this.effectiveDate != undefined) { this.effectiveDateError = false; }
    else { i += 1; this.effectiveDateError = true; }
    if (this.remarks != null && this.remarks != '' && this.remarks != undefined) { this.remarksError = false; }
    else { i += 1; this.remarksError = true; }
    return i == 0;
  }
  formRest() {
    this.customerCodeError = false; this.userNameError = false; this.stateCodeError = false; this.cityCodeError = false; this.userMailError = false;
    this.mobileCodeError = false; this.userMobileError = false; this.coreAppBrokerCodeError = false; this.regulatoryCodeError = false; this.creditLimitError = false;
    this.effectiveDateError = false; this.brokerLoginIdError = false; this.remarksError = false;
    this.editSection = false
    this.customerCode = ''
    this.regulatoryCode = ''
    this.brokerLoginId = ''
    this.whatsAppNo = ''
    this.userName = ''
    this.userMobile = ''
    this.userMail = ''
    this.remarks = ''
    this.pobox = ''
    this.creditLimit = ''
    this.taxExcemptedCode = ''
    this.taxExcemptedYN = 'N'
    this.designation = ''
    this.coreAppBrokerCode = ''
    this.contactPersonName = ''
    this.companyCode = ''
    this.stateCode = ''
    this.cityName = ''
    this.cityCode = ''
    this.brokerLoginId = ''
    this.address2 = ''
    this.address1 = ''
    this.statusValue = 'Y'
    this.effectiveDate = ''
    this.brokerCompanyYn = ''
    this.cbcno = ''; this.password = ''; this.repassword = '';
  }

  getBrokerBranchList(LoginId) {
    //this.getEditBrokerDetails(LoginId);
    //let brokerLoginId =sessionStorage.getItem('brokerLoginId')
    let ReqObj = {
      "LoginId": LoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.branchData = data?.Result;
          this.brokerLoginId = LoginId
        }
      },
      (err) => { },
    );

  }
  branchDataList(value) {
    //sessionStorage.setItem('brokerLoginId',value)
    this.branchPopup = true;
    this.getBrokerBranchList(value);
  }
  ProductDataList(value) {
    //sessionStorage.setItem('brokerLoginId',value)
    this.userLoginId = value.LoginId; this.productEndorsement = false;
    this.productPopup = true; this.existingProduct = true; this.addProduct = false; this.editProduct = false;
    this.getOptedProductDetails();
  }
  onGetEndorsement(rowData) {
    this.selectedProductId = rowData.ProductId; this.endorseData = [];
    this.categoryList = [
      { "Code": "1", "CodeDesc": "Non-Financial" }
    ]
    this.categoryId = "1";
    this.getExistingEndorsementList();
  }
  getExistingEndorsementList() {
    let ReqObj = {
      "CompanyId": this.insuranceId,
      "EndtTypeCategoryId": this.categoryId,
      "ProductId": this.selectedProductId,
      "LoginId": this.userLoginId
    }
    let urlLink = `${this.CommonApiUrl}master/getactiveendorsement`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        let res: any = data;
        if (res?.Result) {
          if (res?.Result.length != 0) {
            this.endorseData = res?.Result[0]?.EndorsementMasterListRes;
          }
          this.productEndorsement = true;
          this.existingProduct = false;
          this.addProduct = false;
        }
      });
  }
  onCheckEndorseSelect(rowData) {
    return rowData.SelectedYn == 'Y';
  }
  onSelectProduct(rowData, event, i) {
    if (event) {
      rowData.SelectedYn = 'Y';
      //rowData.Checked = true;
    }
    else {
      rowData.SelectedYn = 'N';
    }
  }
  onsubmitEndorsement() {
    let i = 0; let req: any = [];
    let selectedList = this.endorseData.filter(ele => ele.SelectedYn == 'Y');
    for (let s of selectedList) {
      req.push(s.EndtTypeId);
      i += 1;
    }
    let type: any; let types: any;
    let categoryId = this.categoryList.find(ele => ele.Code == this.categoryId)
    if (categoryId) {
      type = categoryId.CodeDesc;
    }
    if (type) {
      if (type == 'Non-Financial') {
        types = 'NF'
      }
      else if (type == 'Financial') {
        types = 'F'
      }
      else if (type == 'Referral') {
        types = 'R'
      }
    }
    let ReqObj = {
      "LoginId": this.userLoginId,
      "InsuranceId": this.insuranceId,
      "CreatedBy": this.loginId,
      "ProductId": this.selectedProductId,
      "IdType": types,
      "Ids": req
    }
    let urlLink = `${this.CommonApiUrl}admin/attachloginendtids`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.Result) {
          this.productEndorsement = false;
          this.existingProduct = true;
        }
      },
      (err) => { },
    );
  }
  editBranch(value) {
    this.branchDetailsPopup = true;
    this.brokerBranchName = value.BrokerBranchName;
    this.branchName = value.BranchCode;
    this.branchType = value.BranchType;
    this.salePointCode = value.SalePointCode;
    this.address1 = value.Address1;
    this.address2 = value.Address2;
    this.email = value.Email;
    this.mobile = value.Mobile;
    this.effectiveDate = value.EffectiveDateStart;
    this.remarks = value.Remarks;
    this.Status = value.Status;
    this.subSourceId = value.SourceType;
    this.DepartmentCode = "11";
    this.AttachedBranchCode = value.AttachedBranchCode;
    this.BranchCode = value.BrokerBranchCode;
    this.BrokerBranchCode = value.BrokerBranchCode;
    this.getMainBranchList();
  }
  onFormSubmit() {
    console.log('kkkkkkkkkk', this.customerCode);
    let ReqObj = {
      "Address1": this.address1,
      "Address2": this.address2,
      "BranchCode": this.branchName,
      "AttachedCompany": this.subInsuranceId,
      "BrokerBranchCode": this.BranchCode,
      "BranchType": this.branchType,
      "BrokerBranchName": this.brokerBranchName,
      "CreatedBy": this.loginId,
      "Email": this.email,
      "EffectiveDateStart": this.effectiveDate,
      "InsuranceId": this.insuranceId,
      "LoginId": this.brokerLoginId,
      "Mobile": this.mobile,
      "Remarks": this.remarks,
      "Status": this.Status,
      "SourceType": this.subSourceId,
      "DepartmentCode": this.DepartmentCode,
      "SalePointCode": this.salePointCode,
      "AttachedBranchCode": this.AttachedBranchCode
    }
    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      if (String(ReqObj.EffectiveDateStart).split('/').length == 1) ReqObj['EffectiveDateStart'] = this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj['EffectiveDateStart'] = "";
    }
    let urlLink = `${this.CommonApiUrl}admin/attachbranches`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.getBrokerBranchList(this.brokerLoginId)
          this.branchDetailsPopup = false;
        }
        else if (data.ErrorMessage) {
        }
      },
      (err) => { },
    );
  }
  getOptedProductDetails() {
    this.newList = [];
    this.newslist = [];
    let ReqObj = {
      "LoginId": this.userLoginId,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart": null,
      "Limit": "0",
      "Offset": "100000"
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanylistproduct`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let selectedList = data.Result;
          this.newList = [];
          this.newslist = [];
          console.log('KKKKKKKKKK', selectedList);
          if (selectedList.length != 0) {
            let i = 0;

            for (let product of selectedList) {
              // product['SelectedYN'] = 'Y';
              if (product?.CreditYn == null) product.CreditYn = 'N';
              if (product?.CheckerYn == null) product.CheckerYn = 'N';
              if (product?.SumInsuredEnd != null) { product.SumInsuredEnd = String(product?.SumInsuredEnd).split('.')[0]; this.CommaFormatted(product); }
              if (product?.EffectiveDateStart != null) {
                product['EffectiveDate'] = product?.EffectiveDateStart;

              }
              // if(product.SelectedYn=='Y'){
              //   this.newList = selectedList;
              // }
              if (product.SelectedYn != 'Y') {
                const today = new Date();

                product.EffectiveDateStart = today;
                product.EffectiveDate = today;
                this.newslist.push(product);
                // this.newslist=this.selectedList[i];
                console.log('MMMMMMMMMM', this.newslist);

              }
              else {
                this.newList.push(product);
                //this.newList=this.selectedList[i];
                console.log('RRRRRRRRRRR', this.newList);
              }

              i += 1;
              if (i == selectedList.length) {
                this.selectedProductList = this.newslist;
                // this.dataSource = new MatTableDataSource(this.selectedProductList);
                // this.dataSource.sort = this.sort;
                // this.dataSource.paginator = this.paginator;
                // console.log('Paginatorsss',this.dataSource.paginator);
                // this.applyFilter(this.filterValue);
                // console.log('OOOOOOOOOOOOOOO',this.dataSource);
                this.editSection = false;

                //this.getNonOptedProctList();
              }
              if (this.newList.length != 0) {
                //  this.dataSource1 = new MatTableDataSource(this.newList);
                // this.dataSource1.sort = this.sort;
                // this.dataSource1.paginator = this.secondPaginator;
                //  console.log('OOOOOOOOOOOOOOO',this.secondPaginator,this.dataSource1);
                // this.applyFilters(this.filterValue);
              }
            }
            // if(this.selectedList.length-1 == i){
            //   this.LossList = this.newList;
            //   console.log('JJJJJJJJJJJJJ',this.LossList);
            // }
          }
          else {
            this.selectedProductList = [];
            this.productData = this.selectedProductList;
            // this.dataSource = new MatTableDataSource(this.productData);
            // this.dataSource.sort = this.sort;
            // this.dataSource.paginator = this.paginator;
            // this.applyFilter(this.filterValue);
            this.editSection = false;
            //this.getNonOptedProctList();
          }
        }
      },
      (err) => { },
    );
  }
  onDateFormatInEdit(date) {
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2] + '-' + format[1] + '-' + format[0];
          return NewDate;
        }
      }
    }
  }
  CommaFormatted(rowData) {

    // format number
    if (rowData?.SumInsuredEnd) {
      rowData.SumInsuredEnd = rowData?.SumInsuredEnd.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  onSearchCustomer(value) {
    this.searchList = [];
    if (value == '' || value == null || value == undefined || value.length < 3) {
      this.searchLengthSection = true;
    }
    else {
      this.searchLengthSection = false;
      let ReqObj = {
        "BranchCode": null,
        "InsuranceId": this.insuranceId,
        "SearchValue": value,
        "SourceType": this.channelId
      }
      let urlLink = `${this.ApiUrl1}api/search/premiabrokercustomercode`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log("Searched Data", data);
          if (data.Result.length != 0) {
            if (data.Result.length == 1) {
              if (data.Result[0].CustomerCode != null) {
                this.searchList = data.Result;
              }
            }
            else this.searchList = data.Result;
          }

        },
        (err) => { },
      );
    }
  }
  selectBranch(value) {
    this.selectedBranchName = value.CodeDesc;
    this.selectedSPCode = value.Code;
  }
  selectProduct(value) {
    this.sampleCustomerCode = value.CustomerCode;
    this.sampleCustomerName = value.CustomerName;
  }
  SaveCustomer() {
    this.isValidCustomer = false;
    this.customerSearchvisible = false;
    this.customerCode = this.sampleCustomerCode;
    this.userName = this.sampleCustomerName;
    this.coreAppBrokerCode = this.sampleCustomerCode;
    this.getTiraNo();
  }
  validateCustomer(value) {
    this.searchValue = value;
    let ReqObj = {
      "BranchCode": null,
      "InsuranceId": this.insuranceId,
      "SearchValue": value,
      "SourceType": this.channelId
    }
    let urlLink = `${this.ApiUrl1}api/search/premiabrokercustomercode`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log("Searched Data", data);
        if (data.Result.length != 0) {
          if (data.Result.length == 1) {
            if (data.Result[0].CustomerCode != null) {
              this.searchList = data.Result;
            }
          }
          else this.searchList = data.Result;
        }
        if (this.searchList.length != 0) {
          if (this.insuranceId == '100002') {
            if (this.searchList.length != 0) {
              const matchedCustomer = this.searchList.find(
                item => item.CustomerCode == this.customerCode.trim()
              );
              if (matchedCustomer) {
                this.isValidCustomer = false;
              }
              else {
                this.isValidCustomer = true;
              }
            }
          }
          else {
            this.isValidCustomer = false;
          }
        }

      },
      (err) => { },
    );

  }
  getTiraNo() {
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "PremiaCode": this.customerCode
    }
    let urlLink = `${this.motorApiUrl}api/getbrokertiracode`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.regulatoryCode = data.Result.Code;
        }
      },
      (err) => { },
    );
  }
  PaymentTypes(value) {
    this.paymentTypesPopup = true;
    this.userLoginId = value.LoginId;
    this.UserType = value.UserType;
    this.agencyCode = value.AgencyCode;

    this.getProductList()
  }
  getProductList() {

    let ReqObj = {
      "LoginId": this.userLoginId,
      "InsuranceId": this.insuranceId,
      "EffectiveDateStart": null,
      "Limit": "0",
      "Offset": "100000"
    }
    let urlLink = `${this.CommonApiUrl}admin/getbrokercompanyproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.productData = data.Result;
          if (this.productData.length != 0) this.productId = this.productData[0].ProductId;
          else { this.productId = '99999' }
          this.getBranchList();
        }
      });
  }
  getBranchList() {
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          let obj = [{ Code: "99999", CodeDesc: "ALL" }];
          this.branchList = obj.concat(data?.Result);
          let docObj = JSON.parse(sessionStorage.getItem('paymentMasterId'))
          this.branchValue = "99999";
          this.getExistingPayment();
          //this.getIndustryList()
          //if(!this.branchValue){ this.branchValue = "99999"; this.getExistingPayment() }
        }
      },
      (err) => { },

    );
  }
  getExistingPayment() {
    let ReqObj = {
      "BranchCode": this.branchValue,
      "InsuranceId": this.insuranceId,
      "ProductId": this.existProduct,
      "AgencyCode": this.agencyCode,
      "UserType": "broker",
      "SubUserType": this.subUserType
    }
    let urlLink = `${this.CommonApiUrl}master/getallpayment`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.paymentData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  paymentEdit(value) {
    this.editSection = true;
    this.paymentTypesDetailPopup = true;
    if (value.EffectiveDateStart != '' && value.EffectiveDateStart != null && value.EffectiveDateStart != undefined) {
      if (String(value.EffectiveDateStart).split('/').length == 1) value['EffectiveDateStart'] = this.datePipe.transform(value.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      value['EffectiveDateStart'] = "";
    }


    // if (this.paymentdetalis?.EffectiveDateEnd != null) {
    //   this.paymentdetalis.EffectiveDateEnd = this.onDateFormatInEdit(this.paymentdetalis?.EffectiveDateEnd)
    // }
    this.CashYn = value.CashYn,
      this.ChequeYn = value.ChequeYn,
      this.CreditYn = value.CreditYn,
      this.OnlineYn = value.OnlineYn,
      this.MobileYn = value.MobilePaymentYn;
    this.RealPayYn = value.RealPayYn;
    //this.EffectiveDateStart=value.EffectiveDateStart,
    this.Status = value.Status
    this.agencyCode = value.AgencyCode
  }
  onProceedPayment() {
    this.UserType = this.userDetails.Result.UserType;
    // this.agencyCode=this.userDetails.Result.OaCode;
    this.loginId = this.userDetails.Result.LoginId;
    let ReqObj = {
      "BranchCode": this.branchValue,
      "CashYn": this.CashYn,
      "ChequeYn": this.ChequeYn,
      "CreatedBy": this.userLoginId,
      "AgencyCode": this.agencyCode,
      "CreditYn": this.CreditYn,
      "EffectiveDateStart": this.EffectiveDateStart,
      "InsuranceId": this.insuranceId,
      "ProductId": this.existProduct,
      "PaymentMasterId": "23",
      "Status": this.Status,
      "SubUserType": sessionStorage.getItem('brokerChannelId'),
      "UserType": "broker",
      "OnlineYn": this.OnlineYn,
      "MobilePaymentYn": this.MobileYn,
      "RealpayYn": this.RealPayYn
    }
    let urlLink = `${this.CommonApiUrl}master/insertpayment`;

    if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
      ReqObj['EffectiveDateStart'] = this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj['EffectiveDateStart'] = "";
    }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res: any = data;
        if (data.Result) {

          this.editSection = false;
          this.paymentTypesDetailPopup = false;
          this.paymentMasterId = null;
          this.paymentdetalis = null;
          this.getExistingPayment();

          //CRM Quote status update
          const LeadId = sessionStorage.getItem('LeadId');

          if (LeadId != null) {

            const EnqData = {
              "QuoteNo": sessionStorage.getItem('quoteNo'),
              "LeadId": LeadId,
              "QuoteStatus": 'quoteConv',
              "InsuranceId": this.insuranceId
            }

            let urlLink = `${this.CommonApiUrl}crm/updateEnquiryQuotestatus`;
            this.sharedService.onPostMethodSync(urlLink, EnqData).subscribe(
              (data: any) => {
                console.log(data);

              },
              (err) => {

              });

            const url = `${this.CommonApiUrl}crm/updateCRMEnquiryQuotestatus`;
            const UpdateEnqData = {
              "enqStatus": 'accEnq',
              "enqSeqNo": parseInt(sessionStorage.getItem('EnqId')),
              "leadSeqNo": parseInt(sessionStorage.getItem('LeadId'))
            }
            this.sharedService.onPostMethodSync(url, UpdateEnqData).subscribe(
              (data: any) => {
                console.log(data);
              },
              (err) => { },
            )
          }
        }

      },
      (err) => { },
    );
  }
  ChangePasswordClick() {
    this.password = '';
    this.repassword = '';
    this.passwordPopup = true;
  }
  depositList(value) {
    this.userLoginId = value;

    this.depositPopup = true;
    this.getBrokersBranchList();
  }
  getBrokersBranchList() {
    this.branchDatas = [];
    let urlLink = `${this.CommonApiUrl}deposit/get/CbcbyBrokerId/${this.userLoginId}`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Message != 'FAILED') {
          this.branchDatas = data?.Result;
          console.log('HHHHHHHHHHHHHHHHH', this.branchDatas);
        }
      },
      (err) => { },
    );

  }
  getDetails(cbcno) {
    this.branchDatas = [];
    this.cbcno = cbcno;
    let ReqObj = {
      "CbcNo": this.cbcno,
    }
    let urlLink = `${this.CommonApiUrl}deposit/get/Payment`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Message != 'FAILED') {
          this.CbcDatas = data?.Result;
          this.cbcnos = data?.Result[0].CbcNo;
          //console.log('HHHHHHHHHHHHHHHHH',this.branchDatas);
        }

      },
      (err) => { },
    );

  }
  getSave() {
    let chequeDate
    if (this.chequeDate != '' && this.chequeDate != null && this.chequeDate != undefined) {
      chequeDate = this.datePipe.transform(this.chequeDate, 'dd/MM/yyyy');
    }
    let refunddate
    if (this.refundDate && this.refundDate != null && this.refundDate != undefined) {
      refunddate = this.datePipe.transform(this.refundDate, 'dd/MM/yyyy');
    }
    let ReqObj = {
      "AccountNo": this.accountNo,
      "BalanceAmount": this.bamount,
      "CbcNo": this.cbcno,
      "ChargableType": this.chargabletype,
      "ChequeDate": chequeDate,
      "ChequeNo": this.chequeno,
      "DepositAmount": this.Premium,
      "DepositNo": this.depositno,
      "DepositType": this.deposiType,
      "IbanNumber": null,//this.ibanno,
      "LoginId": this.brokerLoginId,
      "MicrNo": this.micrno,
      "PayeeName": this.payeeName,
      "PaymentType": this.paymentid,
      "PolicyInsuranceFee": this.policyinsu,
      "Premium": this.Premium,
      "PremiumAmount": this.Premium,
      "ProductId": "",
      "QuoteNo": "",
      "ReceiptNo": this.reciptNo,
      "ReferenceNo": this.referenceno,
      "Status": "",
      "VatAmount": this.VatAmount,
      "CompanyId": this.insuranceId,
      "RefundDate": refunddate

    }
    let urlLink = `${this.CommonApiUrl}deposit/save/payment`;
    //   if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
    //     ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
    //   }
    //   else{
    //     ReqObj['EffectiveDateStart'] = "";
    //   }
    //   if (ReqObj.EffectiveDateEnd != '' && ReqObj.EffectiveDateEnd != null && ReqObj.EffectiveDateEnd != undefined) {
    //     ReqObj['EffectiveDateEnd'] =  this.datePipe.transform(ReqObj.EffectiveDateEnd, "dd/MM/yyyy")
    //   }
    //   else{
    //     ReqObj['EffectiveDateEnd'] = "";
    //   }
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.IsError = false) {
          // this.show=false;
          // this.getDetails();
          //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
          this.ExistingPaymentAddPopup = false;
        }
        else if (data.ErrorMessage) {
          if (data.ErrorMessage) {
            console.log("Error Iterate", data.ErrorMessage)
          }
        }
      },
      (err) => { },
    );
  }
  checkSelectedProductss(rowData) {
    return rowData.SelectedYn == 'N';
  }

  checkSelectedProducts(rowData) {
    return rowData.SelectedYn == 'Y';
  }
  changeEffectiveDate(rowData) {

    rowData['EffectiveDate'] = rowData.EffectiveDateStart;
  }
  onChangeSelectedProduct(rowData, check) {
    console.log('Checked Statusss', rowData, check)
    if (check) {
      return rowData.SelectedYn = 'Y';
    }
    else {
      return rowData.SelectedYn = 'N';
    }
  }
  onChangeSelectedProduc(rowData, check, h) {
    console.log('Checked Statusss', rowData, check)
    if (check) {
      rowData.SelectedYn = 'N';
      this.insertlist.push(rowData);
    }
    else {
      rowData.SelectedYn = 'Y';
      if (this.insertlist.length != 0) {
        let rows = this.insertlist.indexOf(rowData);
        console.log('NNNNNNNNN', rows, this.insertlist);
        this.insertlist.splice(rowData, h);
      }
    }
  }
  onDateChange(date: Date, productId: string) {
    const index = this.newslist.findIndex(x => x.ProductId === productId);
    if (index !== -1) {
      this.newslist[index].EffectiveDateStart = date;
    }
  }
  onSaveProductDetails() {
    //let selectedList = this.productData.filter(ele=>ele.SelectedYn=='Y');
    let selectedList = [];
    console.log('KKKKKKKKKKKKK', this.newslist);
    if (this.addProduct) {
      selectedList = this.newslist.filter(ele => ele.SelectedYn == 'Y');
    }
    else if (this.editProduct) {
      selectedList = this.newList.filter(ele => ele.SelectedYn == 'N');
    }
    let finalObj = []; let i = 0;
    console.log(selectedList, "sdfdsfsdf");

    for (let entry of selectedList) {
      let SumInsured = 0;
      if (entry.SumInsuredEnd.includes(',')) { SumInsured = entry.SumInsuredEnd.replace(/,/g, '') }
      else SumInsured = entry.SumInsuredEnd;
      console.log('Entry', entry)
      let effectiveDate = null;
      if (entry.EffectiveDateStart) {
        effectiveDate = this.datePipe.transform(entry.EffectiveDateStart, "dd/MM/yyyy");
      }

      let Obj = {
        "ProductId": entry.ProductId,
        "ProductName": entry.ProductName,
        "ProductDesc": entry.ProductDesc,
        "PolicyTypeId": entry.PolicyTypeId,
        "PolicyTypeDesc": entry.PolicyTypeDesc,
        "CommissionPercent": entry.CommissionPercent,
        "SumInsuredStart": "1",
        "SumInsuredEnd": SumInsured,
        "BackDays": entry.BackDays,
        "CreditYn": entry.CreditYn,
        "CheckerYn": entry.CheckerYn,
        "EffectiveDateStart": effectiveDate,
        "Status": entry.Status,
        "InsuranceId": this.insuranceId,
        "LoginId": this.userLoginId,
        "Remarks": "none",
        "CreatedBy": entry.CreatedBy,
        //"SelectedYn":entry.SelectedYn
      }
      finalObj.push(Obj);
      i += 1;
      if (i == selectedList.length) this.finalProceed(finalObj);
    }
  }
  finalProceed(finalObj) {
    let urlLink = `${this.CommonApiUrl}admin/updatebrokercompanylistproducts`;
    this.sharedService.onPostMethodSync(urlLink, finalObj).subscribe(
      (data: any) => {
        if (data.Result) {
          this.newslist = [];
          this.newList = []; this.insertlist = [];
          this.addProduct = false;
          this.editProduct = false;
          this.existingProduct = true;
          this.getOptedProductDetails();
          // this.productData = [];
          // this.newslist=[];
          // this.newList=[];
          // this.existings=false;
          // this.editSection=false;
          // this.getOptedProductDetails();
        }
      },
      (err) => { },
    );
  }
}
