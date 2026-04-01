import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../app/shared/shared.service';
import Swal from 'sweetalert2';
import * as Mydatas from '../../../app-config.json';
import { DatePipe } from '@angular/common';
import { Product } from '../../product';

@Component({
  selector: 'app-insurence-emp',
  templateUrl: './insurence-emp.component.html',
  styleUrls: ['./insurence-emp.component.scss']
})
export class InsurenceEmpComponent {
  sourceProducts!: Product[];

    targetProducts!: Product[];

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.AdminUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public AdminUrl: any = this.AppConfig.AdminUrl;
  AddIssuerVisible:boolean=false;
  AddIssuerPopup: boolean=false;
  editsSection: boolean=false;
  EndorsPopupTable: boolean=false;
  visibleIssuerDetails:boolean=false;
  companyList: any;loginId:any;
  insuranceId: any;channelId:any="broker";
  productId: string;
  IssuerDetails: any;
  subUserType: string;
  channelList: any[]=[];
  loginInformation: any;
  PersonalInformation: any;
  CbcDeposit: any[]=[];
  designation: any;
  contactPersonName: any;
  coreAppBrokerCode: any;
  regulatoryCode: any;
  custConfirmYN: any='Y';
  makerYN: any='Y';
  mobileCode: any='255';
  pobox: any;
  remarks: any;
  userMail: any;
  userMobile: any;
  userName: any;
  brokerLoginId: any;
  whatsAppCode: any='255';
  whatsAppNo: any;
  vatRegNo: any=null;
  countryCode: any;
  cityCode: any;
  cityName: any;
  customerCode: any=null;
  address1: any;
  address2: any;
  companyName: any;
  stateName: any;
  stateCode: any;
  creditLimit: any;
  Status: any='Y';
  mobileCodeList: any[]=[];
  countryList:any[]=[];
  editSection: boolean=false;
  stateList: any;
  cityList: any;
  agencyCode: any=null;
  brokerCompanyYn: any;
  taxExcemptedYN: any='N';
  taxExcemptedCode: any;
  companyCode: any;
  commissionVatYN: any='N';
  checkerYN: any='Y';
  cbcno: any=null;
  password: any;
  statusValue: String='Y';
  effectiveDate: any;
  changePasswordYN: string='N';
  repassword: null;
  bankCode: null;
  subUser: string;
  branchData: any[]=[];
  issuerData:any[]=[];
  ChangePass: boolean=false;
  branchPopup: boolean=false;
  ProductsPopupTable: boolean=false;
  branchDetailsPopup: boolean=false;branchList:any[]=[]
  productPopup: boolean=false;branchIds:any[]=[];branchValue: string;
  addProduct:boolean=false;productList:any[]=[];
  ProductsPopup:boolean=false;insuranceIds:any[]=[];
  existingProduct:boolean=true;userDetails:any=null;
  issuerType: any=null;productIds: any[]=[];typeList:any[]=[];
  issuerLoginId: any;
  ReferralIds: any[]=null;
  issuerList:  any[]=[];
  userList: any[]=[];
  includedUserList:any[]=[];
  includedIssuerList:any[]=[];
  IsDesti: any;
  userType: any;
  columnList: any[]=[];
  productSection: boolean;
  referralSection: boolean;
  endorseSection: boolean;
  categoryId: string;dmlValue:any='N';
  categoryList: { Code: string; CodeDesc: string; }[];
  endorseData: any[]=[];
  ViewProducts: any[]=[];
  LastLoginDate: any=null;
  LastPolicyDate: any=null;
  LastQuoteDate: any=null;
  CollectedPremium: any=null;
  PolicyCommission: any=null;
  companyId: any=null;DmlList:any[]=[];
  viewIssuerDetails: any=null;
  selectedProductId: any;
  brokerBranchName:any;
  branchName: any;
  branchType: any;
  salePointCode: any;
  email: any;
  mobile: any;
  subInsuranceId: any=null;
  subSourceId: any;
  DepartmentCode: any;
  AttachedBranchCode: any;
  BranchCode: any=null;
  BrokerBranchCode: any;branchSPDetailsPopup:boolean=false;
  brokerValue: any;subBranchId:any=null;
  OaCode: any;subBranchList:any[]=[];CoverType:any='1';
  sourceList: any[]=[];SalePointCodeList: any[]=[];
  selectedBranchName: any=null;selectedSPCode: any=null;SalePointCode: any=null;
  viewBrokerDetails: any;productEndorsement: boolean=false;
  existProduct: any;
  searchBranchValue:any=null;
  searchLengthSection: boolean=false;
  EmpAddInfo: boolean=false;
  issuerLevelList: any[]=[];
  FinaliseYN: any='Y';
  EscalateYN: any='Y';
  Hierarchy: any;
  selectedBranchCode: string;
  loginCreationYN: string = 'N';        // Default No
referralManagementYN: string = 'N';   // Default No
reportManagementYN: string = 'N';   // Default No
claimCustomerCreationYN: string = 'N';   // Default No
  moduleIds: any[]=[];moduleList: any[]=[];
  filteredModuleList: any[] = [];
  moduleError: boolean;


  constructor(private router:Router,
    private sharedService:SharedService,public datePipe:DatePipe) {
      this.selectedBranchCode = sessionStorage.getItem('selectedBranchCode');
     this.productId =  sessionStorage.getItem('companyProductId');
     this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     const user = this.userDetails?.Result;

     this.insuranceId = user.InsuranceId;
     this.companyId = user.LoginBranchDetails[0].InsuranceId;
     this.loginId = user.LoginId;
     this.userType=user.UserType;
     this.subUser = sessionStorage.getItem('typeValue');
     let channelId =  sessionStorage.getItem('brokerChannelId');
     //this.insuranceId= sessionStorage.getItem('InsuranceId');
     this.subUserType=channelId;
     if(channelId) this.channelId = channelId;
     this.typeList = [
      { "Code":"SuperAdmin","CodeDesc":"SuperAdmin" },
      { "Code":"low","CodeDesc":"Quotation"},
      { "Code":"high","CodeDesc":"Approver" },
      { "Code":"both","CodeDesc":"Quotation & Approver" },
     { "Code":"claimofficer","CodeDesc":"claimofficer" },
      { "Code":"garage","CodeDesc":"garage" },
      { "Code":"surveyor","CodeDesc":"surveyor" },
    ];
    this.DmlList = [
      { "Code":"Y","CodeDesc":"Yes" },{ "Code":"N","CodeDesc":"No" }
    ];
      this.getCompanyList();
      this.getCountryList();
      this.getMobileCodeList();

    //  this.getChannelList();
   }

   ngOnInit(){
    //  this.getMobileCodeList();
    //  this.getCountryList();
    let date = new Date();
    if(String(date).split('/').length==1) this.effectiveDate =  this.datePipe.transform(date, "dd/MM/yyyy")
    else{this.effectiveDate = this.effectiveDate;}
   // alert(this.effectiveDate)
   }
   getCountryList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}master/dropdown/country`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            let obj = [{"Code":null,"CodeDesc":"---Select---"}]
            this.countryList = obj.concat(data.Result);
            if(this.countryList.length==2){
              this.countryCode = this.countryList[1].Code;
              this.onCountryChange('change');
            }
        }
      },
      (err) => { },
    );
   }
   getMobileCodeList(){
    let ReqObj = { "InsuranceId": this.insuranceId}
    let urlLink = `${this.CommonApiUrl}dropdown/mobilecodes`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj = [{"Code":null,"CodeDesc":"-Select-"}]
            this.mobileCodeList = obj.concat(data.Result);
          }
        },
        (err) => { },
      );
    }
   getCompanyList(){
    // let urlLink = `${this.CommonApiUrl}master/dropdown/superadmincompanies`;
    let urlLink = `${this.AdminUrl}master/dropdown/superadmincompanies`;
    let ReqObj ={
      "BrokerCompanyYn": "N",
      "LoginId": this.loginId
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          if(this.issuerType=='SuperAdmin'){
            this.companyList = data.Result;
          }
          else if(this.issuerType!='SuperAdmin'){
            let obj = [{"Code":null,"CodeDesc":"---Select---"}]
            this.companyList = obj.concat(data.Result);
          }

            if(this.insuranceId) this.getIssuerList();

        }
      },
      (err) => { },
    );
   }
   getIssuerList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "UserType": "Issuer",
      "SubUserType":"",
      "Limit":"0",
      "Offset":"1000"
      }
      let urlLink = `${this.CommonApiUrl}admin/getallissuers`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          if(data.Result){
            this.issuerData = data.Result;
          }
        },
        (err) => { },
      );
  }
  onIssuerTypeChange(){
    if(this.issuerType!='both' && this.issuerType!='high'){
      this.loginCreationYN='N';
      this.referralManagementYN='N';
      this.reportManagementYN='N';
    }
    if(this.issuerType!='claimofficer'){
        this.claimCustomerCreationYN='N'
    }
    if(this.issuerType!='low'){
          this.productIds = [];
          this.onCompanyChange(null,null,null);
    }
     this.applyModuleFilter();
   }

   applyModuleFilter() {
  if (['claimofficer', 'garage', 'surveyor'].includes(this.issuerType)) {
    this.filteredModuleList = this.moduleList.filter(
      module => module.id === 'claims'
    );
  } else {
    this.filteredModuleList = this.moduleList.filter(
      module => module.id !== 'claims'
    );
  }
}
   onCompanyChange(type,branches,products){
    if(this.issuerType=='SuperAdmin'){
        this.branchIds = [];this.moduleIds=[];
    }
    else if(this.insuranceId!='' && this.insuranceId!= undefined){
     if(this.insuranceId=='100046' || this.insuranceId=='100047' || this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050'){ this.getModuleList();}
      let urlLink = `${this.ApiUrl1}master/dropdown/companyproducts`;
      let ReqObj ={
        "InsuranceId": this.insuranceId
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.productList = data.Result;
              console.log(this.productList,"productList");

              if(type=='direct'){
                this.productIds = products;
              }
              this.getBranchList();
          }
        },
        (err) => { },
      );
    }
   }
   getModuleList(){
      let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/getModuleList`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          this.moduleList = data?.Result;
          this.filteredModuleList = [...this.moduleList];
          this.applyModuleFilter();
        }
      });
   }
  getBranchList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [{Code:"",CodeDesc:"--Select--"}];
        this.branchList = obj.concat(data?.Result);
        let docObj = JSON.parse(sessionStorage.getItem('paymentMasterId'))
          this.branchValue="99999";
          //this.getIndustryList()
        //if(!this.branchValue){ this.branchValue = "99999"; this.getExistingPayment() }
      }
    },
    (err) => { },

  );
  }
  showDialogBrokerDetails(type){
  if(type=='AddIssuer'){
    this.formRest();
      if(this.insuranceId){this.onCompanyChange('change',null,null)}
      this.AddIssuerPopup=true;
      this.editsSection=false;
    }
    else if (type=='editBranchDetail'){
      this.branchDetailsPopup=true;
    }
    else if (type=='branchDetail'){
      this.branchDetailsPopup=true;
      this.getBranchList();
      this.branchFormReset();

    }
    else if(type=='branchSPDetail'){
      this.branchSPDetailsPopup=true;
    }
    else if(type=='AddProduct'){
      this.addProduct=true;
      this.existingProduct=false;
    }
  }
  quotationMenuList(value){
      this.issuerLoginId=value.LoginId;
      this.subUserType=value.SubUserType;


    this.ProductsPopup=true;
     this.getIssuerMenuList()
  }
  brokerDetailsView(value){
    this.issuerLoginId=value.LoginId;
    this.subUserType=value.SubUserType;
    this.userType=value.UserType;
    this.viewIssuerDetails = value;
    this.visibleIssuerDetails=true;
    this.getEditIssuerDetails();
    this.issuerProducts();
    this.editSection = true;

  }
  EditDetailsView(loginData){
   this.issuerLoginId=loginData.LoginId;
    this.AddIssuerPopup=true;
    this.getEditIssuerDetails();
  }
  issuerProducts(){
    let ReqObj ={
      // "LoginId": this.brokerLoginId
      "BrokerBranchCode": "",
    "BranchCode": "",
    "InsuranceId": this.insuranceId,
    "LoginId": this.issuerLoginId,
    "ApplicationId": "1",
    "UserType": this.userType,
    "SubUserType": this.subUserType,
    "SourceType": "",
    "BdmCode": null,
    "ProductId": "",
    "Limit": 0,
    "Offset": 1000
      }
    let urlLink = `${this.CommonApiUrl}api/viewlogindetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          console.log(data.Result,"brokerProducts1");

            this.ViewProducts = data.Result.ProductDetails;
           // this.dates =data.Result;
            this.LastLoginDate=data.Result.LastLoginDate;
            this.LastPolicyDate=data.Result.LastPolicyDate;
            this.LastQuoteDate=data.Result.LastQuoteDate;
            this.CollectedPremium=data.Result.CollectedPremium;
            this.PolicyCommission=data.Result.PolicyCommission;

        }
      },
      (err) => { },
    );
   }
  passChanged(){
    this.changePasswordYN=='Y'
    this.onProceed('viewChangePass');

  }
  passwordField(){
    this.ChangePass=true;
  }
  branchDataList(value){
    this.branchPopup=true;
    this.getBrokerBranchList(value);
  }
  getBrokerBranchList(LoginId){
    //this.getEditBrokerDetails(LoginId);
    //let brokerLoginId =sessionStorage.getItem('brokerLoginId')
    let ReqObj = {
      "LoginId": LoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getallbrokercompanybranch`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.branchData = data?.Result;
          this.brokerLoginId = LoginId
        }
      },
      (err) => { },
    );

  }
  onProceed(type) {
    this.moduleError=false;
    if (this.editSection && this.changePasswordYN=='N') {
      let i=0;
      if(this.insuranceId=='100046' || this.insuranceId=='100047' || this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050'){
        if(this.moduleIds==null || this.moduleIds.length==0 || this.moduleIds==undefined){this.moduleError=true;}
        else this.onSubmit(type);
      }
      else this.onSubmit(type);
    }
    else {
      if (this.password == null || this.password == "" || this.password == undefined) {
               Swal.fire({
                  title: '<strong>Password Details</strong>',
                  icon: 'error',
                  html:
                    `Please enter Password`,
                  showCloseButton: true,
                  focusConfirm: false,
                  showCancelButton:false,
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
            showCancelButton:false,
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
              showCancelButton:false,
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
          else {
           if(this.insuranceId=='100046' || this.insuranceId=='100047' || this.insuranceId=='100048' || this.insuranceId=='100049' || this.insuranceId=='100050'){
              if(this.moduleIds==null || this.moduleIds.length==0 || this.moduleIds==undefined){this.moduleError=true;}
              else this.onSubmit(type);
            }
            else this.onSubmit(type);
          }
        }

      }



    }
    //this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerConfigure'])
  }

  getEditIssuerDetails(){
    this.editSection=true;
    let ReqObj = {
      "LoginId": this.issuerLoginId
    }
    let urlLink = `${this.CommonApiUrl}admin/getissuerbyid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let loginInformation = data?.Result?.LoginInformation;
          let personalInfo = data?.Result?.PersonalInformation;
          if(loginInformation?.Status==null)  loginInformation.Status = 'N';
          this.effectiveDate= loginInformation?.EffectiveDateStart;
          this.issuerType = loginInformation?.SubUserType;
          if(data?.Result?.ModuleIds){
            this.moduleIds =[];
            let modules = data?.Result?.ModuleIds;
            for(let mod of modules){this.moduleIds.push(Number(mod))}
          }
          //this.insuranceId = loginInformation?.InsuranceId;
          this.onCompanyChange('direct',loginInformation?.AttachedBranches,loginInformation?.ProductIds)

          // let n=sessionStorage.getItem('ReferralId')
          // if(n!="null" || n!=undefined){
          // this.ReferralIds.push(n);
          // }
          this.userName = personalInfo?.UserName;
          this.userMobile = personalInfo?.UserMobile;
          this.userMail = personalInfo?.UserMail;
          this.loginCreationYN=personalInfo?.LoginAccess;
          this.referralManagementYN=personalInfo?.RefferalAccess;
          this.reportManagementYN=personalInfo?.ReportAccess;
          this.claimCustomerCreationYN=personalInfo?.ClaimCustomerAccess;
          if(loginInformation?.DmlYN!=null && loginInformation?.DmlYN!=undefined && loginInformation?.DmlYN!='') this.dmlValue=loginInformation?.DmlYN
          else this.dmlValue = 'N';
          this.agencyCode = loginInformation?.AgencyCode;
          this.issuerLoginId = loginInformation?.LoginId;
          this.statusValue = loginInformation?.Status;

          // if(loginInformation?.AttachedCompanies){
          //   if(loginInformation?.AttachedCompanies.length!=0){
          //     if(this.issuerType=='SuperAdmin') this.insuranceIds = loginInformation?.AttachedCompanies;
          //     else this.insuranceId = loginInformation?.AttachedCompanies[0];
          //   }
          // }
          this.address1 = personalInfo?.Address1;
          this.address2 = personalInfo?.Address2;
          this.countryCode = personalInfo?.CountryCode;
          this.stateCode = personalInfo?.StateCode;

         this.onCountryChange('direct');
         // this.onStateChange('direct');
          this.cityName = personalInfo?.CityName;
         // this.cityName = personalInfo?.CityName;
          this.mobileCode = personalInfo?.MobileCode;
          this.whatsAppCode = personalInfo?.WhatappCode;
          this.whatsAppNo = personalInfo?.WhatsappNo;
          this.remarks = personalInfo?.Remarks;
          this.ReferralIds=null;
          //this.companyName=personalInfo?.CompanyName;

        //  this.stateName=personalInfo?.StateName;
        }
      },
      (err) => { },
    );
}
onDateFormatInEdit(date) {
  if (date) {
    let format = date.split('-');
    if(format.length >1){
      var NewDate = new Date(new Date(format[0], format[1], format[2]));
      NewDate.setMonth(NewDate.getMonth() - 1);
      return NewDate;
    }
    else{
      format = date.split('/');
      if(format.length >1){
        //var NewDate = new Date(new Date(format[2], format[1], format[0]));
        //NewDate.setMonth(NewDate.getMonth() - 1);
        let NewDate = format[2]+'-'+format[1]+'-'+format[0];
        return NewDate;
      }
    }
  }
}
  // getEditBrokerDetails(value){
  //   // this.editSection=true;
  //   // this.userName=value.UserName;
  //   // this.issuerType=value.SubUserType;
  //   // this.insuranceIds=value.AttachedCompanies;
  //   // this.insuranceId=value.InsuranceId;
  //   // this.productIds=value.ProductIds;
  //   // this.branchIds=value.AttachedBranches;
  //   // this.address1=value.Address1;
  //   // this.address2=value.Address2;
  //   // this.userMail=value.UserMail;
  //   // this.countryCode=value.CountryCode;
  //   // this.stateCode=value.StateCode;
  //   // this.cityCode=value.CityName;
  //   // this.mobileCode=value.MobileCode;
  //   // this.userMobile=value.UserMobile;
  //   // this.whatsAppCode=value.WhatappCode;
  //   // this.whatsAppCode=value.WhatsappNo;
  //   // this.issuerLoginId=value.LoginId;
  //   // //this.changePasswordYN=value.ChangePasswordYN;
  //   // this.password=value.Password;
  //   // this.effectiveDate=value.EffectiveStartDate;
  //   // this.remarks=value.Remarks;
  //   // this.statusValue=value.Status;
  //   // this.effectiveDate=value.EffectiveStartDate;
  //   // this.remarks=value.Remarks;

  // }
  onSubmit(type) {
    let referral:any;
    if(this.ReferralIds!=null){
    referral=this.ReferralIds;
    }
    else{
      referral=[];
    }
    if(this.issuerType!='SuperAdmin' && this.insuranceId!=null && this.insuranceId!=undefined){
      this.insuranceIds=[];
      this.insuranceIds.push(this.insuranceId);
    }
    else this.insuranceId = null;
    let dmlYN=null;
    if(this.dmlValue==null || this.dmlValue=='')  dmlYN = 'N';
    else dmlYN = this.dmlValue;
    let ReqObj = {

      "LoginInformation": {
        "LoginId": this.issuerLoginId,
        "UserType": "Issuer",
        "SubUserType": this.issuerType,
        "Createdby": this.loginId,
        "OaCode": this.agencyCode,
        "AgencyCode": this.agencyCode,
        "Password": this.password,
        "Status": this.statusValue,
         "AttachedBranches": this.branchIds,
         "AttachedCompanies" : this.insuranceIds ,
        "ProductIds": this.productIds,
        "InsuranceId": this.insuranceId,
        "EffectiveDateStart": this.effectiveDate,
        "ReferralIds": ["null"],
        "DmlYN": dmlYN,
        "BranchCode":  this.selectedBranchCode,
        "LoginCreationAccess":this.loginCreationYN,
        "ReffereralManageAccess":this.referralManagementYN,
        "ReportManageAccess":this.reportManagementYN,
        "ClaimCustomerAccess":this.claimCustomerCreationYN,
        "ModuleIds": this.moduleIds
      },
      "PersonalInformation": {
        "Address1": this.address1,
        "Address2": this.address2,
        "CityName": this.cityName,
        "StateCode":this.stateCode,
        "CountryCode": this.countryCode,
        "MobileCode": this.mobileCode,
        "Remarks": this.remarks,
        "UserMail": this.userMail,
        "UserMobile": this.userMobile,
        "UserName": this.userName,
        "WhatappCode": this.whatsAppCode,
        "WhatsappNo": this.whatsAppNo
      }
    }
    if (ReqObj.LoginInformation.EffectiveDateStart != '' && ReqObj.LoginInformation.EffectiveDateStart != null && ReqObj.LoginInformation.EffectiveDateStart != undefined) {
     if(String(ReqObj.LoginInformation.EffectiveDateStart).split('/').length==1) ReqObj.LoginInformation['EffectiveDateStart'] = this.datePipe.transform(ReqObj.LoginInformation.EffectiveDateStart, "dd/MM/yyyy")
    }
    else {
      ReqObj.LoginInformation['EffectiveDateStart'] = "";
    }
    let doc = null;
    let urlLink = `${this.CommonApiUrl}admin/createissuer`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          if(type==null) this.formRest()
          this.getIssuerList()
          this.ChangePass=false;
          this.AddIssuerPopup=false;
          this.moduleIds=null;

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
  formRest(){
    this.userName='';this.issuerType=null;
    this.brokerLoginId=null;this.whatsAppNo=null;
    this.userMobile='';this.userMail='';this.remarks='';
    this.pobox='';this.creditLimit='';this.taxExcemptedCode='';
    this.taxExcemptedYN='';this.designation='';this.countryCode=''
    this.coreAppBrokerCode='';this.contactPersonName='';
    this.companyCode='';this.stateCode='';this.cityName='';
    this.cityCode='';this.address2='';this.issuerLoginId='';
    this.address1='';this.subUserType='';this.statusValue='Y';
    this.effectiveDate='';this.brokerCompanyYn='';this.cbcno='';
    this.productIds=[];this.branchIds=[];this.editSection=false;
}
onCountryChange(type) {
  let ReqObj = {
    "CountryId": this.countryCode
  }
  let urlLink = `${this.CommonApiUrl}master/dropdown/state`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let obj = [{"Code":null,"CodeDesc":"---Select---"}]
      this.stateList = obj.concat(data.Result);
      if (type == 'change') {
      }
      else {
      //   let entry = this.stateList.find(ele=>ele.Code==this.stateCode);
      //   this.stateCode = entry.CodeDesc;
      //  this.onStateChange('direct');
      }
    },
    (err) => { },
  );
}
onStateChange(type) {
  let ReqObj = {
    "CountryId": this.countryCode,
    "RegionCode": this.stateCode
  }
  let urlLink:any=null;
  if(this.insuranceId!='100020') urlLink = `${this.CommonApiUrl}master/dropdown/regionstate`;
  else urlLink = `${this.CommonApiUrl}master/dropdown/stategroups`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      let obj = [{"Code":null,"CodeDesc":"---Select---"}]
      this.cityList = obj.concat(data.Result);
      if (type == 'change') {
        this.cityCode = null;
      }
      else {
        let entry = this.cityList.find(ele=>ele.Code==this.cityCode);
        if(this.cityCode) this.cityName = entry.CodeDesc;
        if(!entry) this.cityCode = null;
      }
    },
    (err) => { },
  );
}
onChange(item,i){
  let index = this.userList.find(ele => ele.id == item.id)
  if(index){
    this.userList[i].IsDesti=true;
  }
  else{
    this.userList[i].IsDesti=false;
  }

}
onChangeissuer(item,i){
  console.log('INSUUUUUUUUU',item);
  console.log('New Items Index',i);
  let index = this.issuerList.find(ele => ele.id == item.id)
  console.log('UUUUUUUUUUU',index);
  if(index){
    this.issuerList[i].IsDesti=true;
    console.log('YYYYYYYYYY',this.issuerList[i].IsDesti);
    console.log('MMMMMMMMMMM',this.issuerList);
  }
  else{
    this.issuerList[i].IsDesti=false;
  }
}
onChangeissuerexclude(item,i){
  console.log('INSUUUUUUUUU',item);
  console.log('New Items Index',i);
  let index = this.includedIssuerList.find(ele => ele.id == item.id)
  console.log('UUUUUUUUUUU',index);
  if(index){
    this.includedIssuerList[i].IsDesti=true;
    console.log('YYYYYYYYYY',this.includedIssuerList[i].IsDesti);
    console.log('MMMMMMMMMMM',this.includedIssuerList);
  }
  else{
    this.includedIssuerList[i].IsDesti=false;
  }
}
onExcludeChange(item,i){
  console.log('PPPPPPPPPPPP',item);
  console.log('New Items Index',i);
  let index = this.includedUserList.find(ele => ele.id == item.id)
  console.log('UUUUUUUUUUU',index);
  if(index){
    this.includedUserList[i].IsDesti=true;
    console.log('YYYYYYYYYY',this.includedUserList[i].IsDesti);
    console.log('MMMMMMMMMMM',this.includedUserList);
  }
  else{
    this.includedUserList[i].IsDesti=false;
  }

}
unselect(): void {
  this.IsDesti = undefined;
}
checkUncheckAll() {
  for (var i = 0; i < this.userList.length; i++) {
    this.userList[i].isSelected = this.IsDesti;
  }
  this.getMenuIds();
}
getIssuerMenuList(){
    let ReqObj = {
      "UserType":this.userType,
      "SubUserType":this.subUserType,
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}master/menu`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
            //this.userList = data?.Result?.UserList;
            //this.userList = data?.Result?.AdminList;
           this.userList = data?.Result?.MenuList;
           this.includedUserList = [];
            this.getMenuIds();
        }
      },
      (err) => { },
  );
}
getMenuIds(){
  // let i=0; let j=0;
    let ReqObj = { "LoginId":this.issuerLoginId}
    let urlLink = `${this.CommonApiUrl}admin/getmenuids`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log('pppppppppp',data);
        if(data.Result){
          let menuList:any[]=[];
          menuList= data.Result?.MenuId;
          if(menuList.length!=0){
            console.log('IN Menu User Id',this.userList);
            for(let entry of menuList){

              const result = (this.userList?.find(x => x.id === entry) ) ? true : false;
              if(result){
                if(this.userList.length!=0){
                let index = this.userList?.findIndex(ele=>ele.id==entry);
                console.log('ooooooooooooooooo',index);
                if(index!=null && index!=undefined){
                this.includedUserList.push(this.userList[index]);
                this.userList.splice(index,1);
                console.log("Checked",result);
                }
                 }
                }
              else{
                if(this.issuerList.length!=0){
                let index = this.issuerList?.findIndex(ele=>ele.id==entry);
                if(index>0){
                  this.includedIssuerList.push(this.issuerList[index]);
                  this.issuerList.splice(index,1);
                }

                }
              }

            }


          }
        }
      },
      (err) => { },
      );
}
onSelected(arrayaside: string) {
  console.log('SSSSSSSSSSS',arrayaside);
  if (arrayaside === 'right') {
      console.log("User List",this.userList)
    let filteredList = this.userList.filter(ele=>ele?.IsDesti==true);
      console.log('iiiiiiiiiii',filteredList);
      console.log('lllllllllll',this.userList[0].IsDesti);
      if(filteredList.length!=0){
        let index = 0;
          for(let entry of filteredList){
              entry.IsDesti = false;
              this.includedUserList = [entry].concat(this.includedUserList);
              this.userList = this.userList.filter(item => item.id != entry.id);
              index+=1;
              if(index==filteredList.length){
                console.log("Final User",this.userList);
              }
          }
      }
  //   let obj:any = this.userList[index];
  //   if(obj){
  //     this.includedUserList.push(obj);
  //     this.userList.splice(index,1);
  //   }
  }
  if (arrayaside === 'left') {
      let filteredList = this.includedUserList.filter(ele=>ele.IsDesti==true);
      console.log(filteredList);
    if(filteredList.length!=0){
        for(let entry of filteredList){
            entry.IsDesti = false;
            this.userList = [entry].concat(this.userList);
            this.includedUserList = this.includedUserList.filter(item => item.id != entry.id);
        }
    }

  //   let obj:any = this.includedUserList[index];
  //   if(obj){
  //     this.userList.push(obj);
  //     this.includedUserList.splice(index,1);
  //   }
  }
}
onIssuerSelected(arrayaside: string){
  if (arrayaside === 'right') {
      let filteredList = this.issuerList.filter(ele=>ele.IsDesti==true);
        console.log('lllllllllll',this.issuerList[0].IsDesti);
        if(filteredList.length!=0){
          let i=0;
            for(let entry of filteredList){
                entry.IsDesti = false;
                this.includedIssuerList = [entry].concat(this.includedIssuerList);
                this.issuerList = this.issuerList.filter(item => item.id != entry.id);
                i+=1;
                if(i==filteredList.length){
                  console.log("Final Issuer",this.issuerList)
                }
            }

        }
    //   let obj:any = this.userList[index];
    //   if(obj){
    //     this.includedUserList.push(obj);
    //     this.userList.splice(index,1);
    //   }
    }
    if (arrayaside === 'left') {
        let filteredList = this.includedIssuerList.filter(ele=>ele.IsDesti==true);
        console.log(filteredList);
      if(filteredList.length!=0){
          for(let entry of filteredList){
              entry.IsDesti = false;
              this.issuerList = [entry].concat(this.issuerList);
              this.includedIssuerList = this.includedIssuerList.filter(item => item.id != entry.id);
          }
      }
    //   let obj:any = this.includedUserList[index];
    //   if(obj){
    //     this.userList.push(obj);
    //     this.includedUserList.splice(index,1);
    //   }
    }
}
onMoveAll(arrayaside: string) {
  if (arrayaside === 'right') {
    this.includedUserList = [...this.includedUserList, ...this.userList];
    this.userList = [];
  }
  if (arrayaside === 'left') {this.userList = [...this.userList, ...this.includedUserList];
    this.includedUserList = [];
  }
}
onMoveIssuerAll(arrayaside: string) {
  if (arrayaside === 'right') {
    this.includedIssuerList = [...this.includedIssuerList, ...this.issuerList];
    this.issuerList = [];
  }
  if (arrayaside === 'left') {this.issuerList = [...this.issuerList, ...this.includedIssuerList];
    this.includedIssuerList = [];
  }
}
ongetBack(){
  //this.router.navigate(['/Admin/issuerList/newIssuerDetails'])
}
onProceedMenu(){
  let excludedList = [];
  if(this.includedUserList.length!=0){
      let i =0;
      for(let entry of this.includedUserList){
          if(entry.id){
            excludedList.push(entry.id);
          }

          i+=1;
          if(i==this.includedUserList.length){
              this.includeIssuerList(excludedList);
          }
      }
  }
  else{
      this.includeIssuerList(excludedList)
  }
  //excludedList = this.includedIssuerList.concat(this.includedUserList);

  //this.router.navigate(['/Admin/issuerList'])
}
includeIssuerList(excludedList){
    if(this.includedIssuerList.length!=0){
        let i=0;
        for(let entry of this.includedIssuerList){
            if (!excludedList.includes(entry.id)) {
                excludedList.push(entry.id);

            }
            i+=1;
            if(i==this.includedIssuerList.length){
                this.onSubmitMenu(excludedList);
            }
        }
    }
    else{
        this.onSubmitMenu(excludedList)
    }
}
onSubmitMenu(excludedList){
  let ReqObj = {
      "LoginId": this.issuerLoginId,
      "MenuIds": excludedList
  }
  let urlLink = `${this.CommonApiUrl}admin/savemenuids`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){

            sessionStorage.removeItem('issuerTypeDetails');
            this.ProductsPopup=false;
        }
        else if(data.ErrorMessage){
          for(let entry of data.ErrorMessage){

          }
          console.log("Error Iterate",data.ErrorMessage)
          //this.loginService.errorService(data.ErrorMessage);
        }
      },
      (err) => { },
  );
}
issuerProduct(value){
  this.ProductsPopupTable=true
  this.issuerLoginId=value.LoginId;
  sessionStorage.setItem('subUserType',value.SubUserType)
  //this.subUserType=value.SubUserType;
  this.getProductList();
}
getProductList(){
  if(this.insuranceId!='' && this.insuranceId!= undefined){
    let urlLink = `${this.CommonApiUrl}admin/getissuerproductbyid`;
    let ReqObj ={
      "LoginId": this.issuerLoginId,
      "InsuranceId": this.insuranceId,
      "UserType": 'Issuer'
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            let productList = data.Result;
            if(productList.length!=0){
              let i=0,products = [];
              for(let product of productList){
                if(product.AllAvailableHierarchy.length!=0){
                  product.AllAvailableHierarchy['HierarchyValue'] = ""
                  product.AllAvailableHierarchy['HierarchyLevel'] = "---Select---"
                }
                  if(product?.IsOptedYn=='Y') {
                    product['Checked'] = true;
                     //this.getIssuerLevel(product);
                  }
                  else product['Checked'] = false;
                  if(product?.IsOptedYn =='Y'){
                    this.onTableChange(product.TableName)
                  }
                  this.onChangeSumInsuredStart(product);
                  products.push(product);
                  i+=1;
                  if(i==productList.length){
                    this.productList = productList;


                  }
              }
            }
        }
      },
      (err) => { },
    );
  }
}
getIssuerLevel(rowData){
  let ReqObj = {
      "CompanyId": this.insuranceId,
      "ProductId": rowData.ProductId
  }
  let urlLink = `${this.CommonApiUrl}hierarchy/getall`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        let obj = [{"HierarchyValue":null,"HierarchyLevel":"---Select---"}]
        this.issuerLevelList = obj.concat(data.Result);
      }
    },
    (err) => { },
  );
}
onTableChange(rowData){
  if(rowData!= null && rowData!= ''){
    let ReqObj = {"TableName": rowData}
    let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj = [{"Code":null,"CodeDesc":"---Select---"}]
          this.columnList = obj.concat(data.Result);
        }
      },
      (err) => { },
    );
  }
}
onChangeSumInsuredStart(rowData){
  if (rowData.SumInsuredStart) {
    rowData.SumInsuredStart = rowData.SumInsuredStart.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  if (rowData.SumInsuredEnd) {
    rowData.SumInsuredEnd = rowData.SumInsuredEnd.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
checkSelectedProducts(rowData){
  return rowData.IsOptedYn=='Y';
}
onCheckEndorseSelect(rowData){
  return rowData.SelectedYn=='Y';
}
onChangeSelectedProduct(rowData,check){
  console.log('Checked Statusss',rowData,check)
  if(check){
    rowData['Checked'] = true;
    rowData.IsOptedYn = 'Y';
    this.onTableChange(rowData.TableName)
  }
  else{
    rowData['Checked'] = false;
    rowData.IsOptedYn = 'N';
  }
}
onProceedIssuer(type){
  console.log('MMMMMMMMMM',this.productList);
  this.onProceedendorse(type);

 }
 onProceedendorse(type){
  console.log('kkkkkkkkkkkk',this.productList)
  if (this.productList.length != 0){
      let reqList=[];let i=0;
      for(let s of this.productList){
        let sumInsured; let startsuminsured;
        console.log('HHHHHHHHHHHHHHHH',s.SumInsuredEnd);
        if(s.SumInsuredEnd == undefined || s.SumInsuredEnd == null)sumInsured = null;
        if(String(s?.SumInsuredEnd).split(',').length>1){
            sumInsured = s.SumInsuredEnd.replace(/,/g, '');
            console.log('MMMMMMMMMMMM',sumInsured);
        }
        else sumInsured=s?.SumInsuredEnd
        //else {sumInsured = s.SuminsuredEnd;}

        if(s.SumInsuredStart==undefined || s.SumInsuredStart==null) {startsuminsured = null;}
        else if(String(s.SumInsuredStart).split(',').length>1){  startsuminsured= s.SumInsuredStart.replace(/,/g, '') }
        else {startsuminsured= s.SumInsuredStart;}
           if(s.Checked==true){
            console.log('FFFFFFFFFFFFFFFF',s.Checked);
          let data = {
                  "ProductId": s.ProductId,
                    "ReferralIds":s.ReferralIds,
                    "EndorsementIds":s.EndorsementIds,
                    "SuminsuredEnd":sumInsured,
                    "SuminsuredStart":startsuminsured,
                     "ColumnName" :s.ColumnName,
                     "Status" :s.Status,
                     "HierarchyValue": s.HierarchyValue,
                     "HierarchyLevel": this.issuerLevelList.find(ele=>ele.HierarchyValue==s.HierarchyValue)?.HierarchyLevel,
                     "CanFinalize": null,
                     "CanEscalate": null,
                    }
              reqList.push(data)
            }
             i+=1;
             if(i==this.productList.length){
              this.onsubmit(reqList,type);
            }
          }
      }
}
onsubmit(reqList,type){
  let ReqObj = {
     "LoginId":this.issuerLoginId,
     "InsuranceId":this.insuranceId,
     "CreatedBy":this.loginId,
      "IssuerProduct":reqList
    }
  let urlLink = `${this.CommonApiUrl}admin/attachissuerproducts`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          console.log(data);
          let res:any=data;
          if(data.Result){
            this.getProductList();
            if(type=='direct'){
              this.productSection=true;
              this.referralSection = false;
              this.endorseSection = false;
              this.ProductsPopupTable=false
              this.ProductsPopup=true;
              this.subUserType=sessionStorage.getItem('subUserType')

              this.quotationMenuList({"LoginId":this.issuerLoginId,"SubUserType":this.subUserType});
            }
            else{
            this.productSection = false;
            this.referralSection = false;
            this.endorseSection = true;
            this.EndorsPopupTable=false
           // this.ProductsPopup=false;
            }


          //.referralSection = false;
         //this.router.navigate(['/Admin/userList/UserproductList']);
          }

        },
        (err) => { },
      );

}
showEndorsement(row){
  this.productSection = false;
  this.referralSection = false;
  this.endorseSection = true;
  this.EndorsPopupTable=true;
  this.categoryId="1";
  this.selectedProductId = row.ProductId
  //this.productIds=row.ProductId;
  this.getEndorsementList();

  if(this.productIds){
    this.categoryList = [
      {"Code":"1","CodeDesc":"Non-Financial"},
      {"Code":"2","CodeDesc":"Financial"}
    ]
  }
}
onSelectendorse(rowData,event,i){
  if(event){
      rowData.SelectedYn = 'Y';
      //rowData.Checked = true;
  }
  else{
      rowData.SelectedYn = 'N';
  }
}
getEndorsementList(){
  let s=sessionStorage.getItem('userproduct')
  let ReqObj={
    "CompanyId":this.insuranceId,
    "EndtTypeCategoryId": this.categoryId,
    "ProductId": this.selectedProductId,
    "LoginId":this.issuerLoginId//this.loginId
    //"LoginId":this.issuerLoginId
  }
  let urlLink = `${this.CommonApiUrl}master/getactiveendorsement`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;

      console.log('rrrrrr',res)
      if(res){
     console.log('dddddddddd',res?.Result.EndorsementMasterListRes)
      if(res?.Result[0].EndorsementMasterListRes){
          this.endorseData = res?.Result[0]?.EndorsementMasterListRes;
        console.log('eeeeeeee',this.endorseData);
        console.log('BBBBBBBBBBBB',this.productList);

        if(this.categoryId!=undefined && this.categoryId!=null){
          let docObj = {"ItemType":this.categoryId};
          sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
        }
      }
  }
    },
    (err) => { },
  );
}
onProceedEndorse(type){
  console.log('MMMMMMMMMM',this.productList);
  this.onProceedendorse(type);
 //  if(rowData.Checked == true){
 //   rowData[event].IsOptedYn ='Y'
 //  }
 //  else if(rowData.Checked == false){
 //   rowData[event].IsOptedYn ='N'
 //  }
 }
 onsubmitsEndorse(){
  this.onProceedIssuer('direct');
  let i=0; let req:any=[];
  let selectedList = this.endorseData.filter(ele=>ele.SelectedYn=='Y');
  for(let s of selectedList){
  req.push(s.EndtTypeId);
  i+=1;
  }
  let product:any;let productid=this.productIds;
  if(productid){
     product=productid
  }
  else{
    product=null;
  }
  let type:any;let types:any;
  let categoryId=this.categoryList.find(ele=>ele.Code==this.categoryId)
  if(categoryId){
    type=categoryId.CodeDesc;
  }
  if(type){
    if(type=='Non-Financial'){
      types='NF'
    }
    else if(type=='Financial'){
      types='F'
    }
    else if(type=='Referral'){
      types='R'
    }
  }
  let ReqObj = {
     "LoginId":this.issuerLoginId,
     "InsuranceId":this.insuranceId,
     "CreatedBy":this.loginId,
     "ProductId":this.selectedProductId,
     "IdType":types,
     "Ids":req
    }

  let urlLink = `${this.CommonApiUrl}admin/attachloginendtids`;
  setTimeout(() => {
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          console.log(data);
          let res:any=data;
          if(data.Result){
            this.productSection=true;
            this.referralSection = false;
            this.endorseSection = false;
            this.EndorsPopupTable = false;
            //this.getProductList();

            //this.router.navigate(['/Admin/issuerList/issuerMenuCongifuration']);

            //.referralSection = false;
         //this.router.navigate(['/Admin/userList/UserproductList']);
          }

        },
        (err) => { },
      );
  }, (2000));


}
onFormSubmit(){
  console.log('kkkkkkkkkk',this.customerCode);
  let ReqObj = {
    "Address1": this.address1,
    "Address2": this.address2,
    "BranchCode": this.branchName,
    "AttachedCompany": this.subInsuranceId,
    "BrokerBranchCode": this.BranchCode,
    "BranchType":this.branchType,
    "BrokerBranchName": this.brokerBranchName,
    "CreatedBy": this.loginId,
    "Email": this.email,
    "EffectiveDateStart": this.effectiveDate,
    "InsuranceId": this.insuranceId,
    "LoginId": this.brokerLoginId,
    "Mobile": this.mobile,
    "Remarks": this.remarks,
    "Status": this.statusValue,
    "SourceType":this.subSourceId,
    "DepartmentCode":this.DepartmentCode,
    "SalePointCode":this.salePointCode,
    "AttachedBranchCode":this.AttachedBranchCode
  }
  if (ReqObj.EffectiveDateStart != '' && ReqObj.EffectiveDateStart != null && ReqObj.EffectiveDateStart != undefined) {
    if(String(ReqObj.EffectiveDateStart).split('/').length==1) ReqObj['EffectiveDateStart'] =  this.datePipe.transform(ReqObj.EffectiveDateStart, "dd/MM/yyyy")
  }
  else{
    ReqObj['EffectiveDateStart'] = "";
  }
  let urlLink = `${this.CommonApiUrl}admin/attachbranches`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
        this.getBrokerBranchList(this.brokerLoginId)
        this.branchDetailsPopup=false;
      }
      else if(data.ErrorMessage){
       }
    },
    (err) => { },
  );
}
searchBranchName(type,value,modal){
  this.searchLengthSection = false;
  this.selectedBranchName = this.branchName;
  this.selectedSPCode = this.salePointCode;
  this.SalePointCodeList = [];
  if(type=='change') this.searchBranchValue = value;
  if(this.searchBranchValue==null){
    this.searchBranchValue=this.regulatoryCode;
  }
  let ReqObj = {
    "InsuranceId": this.insuranceId,
    "SpCode": this.searchBranchValue
  }
  let urlLink = `${this.motorApiUrl}api/getbrokerspcode`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
      if(data.Result){
        this.SalePointCodeList = data.Result;
      }
    },
    (err) => { },
  );
}
editBranch(value){
  this.branchDetailsPopup=true;
  this.brokerBranchName=value.BrokerBranchName;
  this.branchName=value.BranchCode;
  this.branchType=value.BranchType;
  this.salePointCode=value.SalePointCode;
  this.address1=value.Address1;
  this.address2=value.Address2;
  this.email=value.Email;
  this.mobile=value.Mobile;
  this.effectiveDate=value.EffectiveDateStart;
  this.remarks=value.Remarks;
  this.Status=value.Status;
  this.subSourceId = value.SourceType;
  this.DepartmentCode="11";
  this.AttachedBranchCode=value.AttachedBranchCode;
  this.BranchCode=value.BrokerBranchCode;
  this.BrokerBranchCode=value.BrokerBranchCode;
  this.getMainBranchList();
}
branchFormReset(){
  this.branchName=null,this.brokerBranchName=null;this.branchType='Main';this.salePointCode=null;
  this.address1=null;this.address2=null;this.email=null;this.mobile=null;this.effectiveDate=this.effectiveDate;
  this.remarks=null;this.Status='Y';this.BranchCode=null;
  this.getMainBranchList();
}
getMainBranchList(){
  let ReqObj = {"InsuranceId": this.insuranceId}
  let urlLink = `${this.CommonApiUrl}master/dropdown/branchmaster`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let obj=[{"Code":null,"CodeDesc":"---Select---"}]
            this.branchList = obj.concat(data.Result);
        }
      },
      (err) => { },
    );
}
}
