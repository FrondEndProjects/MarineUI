import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';
import { LoginService } from '../../../../login/login.service';
import { DatePipe } from '@angular/common';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-new-broker-details',
  templateUrl: './new-broker-details.component.html',
  styleUrls: ['./new-broker-details.component.scss']
})
export class NewBrokerDetailsComponent implements OnInit {
  [x: string]: any;

  rTrue:boolean=false;
  ProId:any;
  btnNextPrev = {
    prev: true,
    next: false,
    index: 0
  }
  StatusList:any[]=[];
  displayProduct:any;
  PTrue:boolean=false;
  productin:boolean=false;
  Atrue:boolean=false;
  public BrokerForm: FormGroup;
  public min: Date = new Date();picker1;
  AgencyCode:any;
  Add:any;
  branchValue: any;
  IssuerDetails:any;
  public userDetails: any;
  pros:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  brokerCode: any;
  branchList :any[]=[];
  countryList :any[]=[];
  TitleList :any[]=[];
  NationalityList:any[]=[];
  Country: any;
  CityList:any[]=[];
  CompanyName:any;
  AttachedBranch:any[]=[];
  value:any="View";
tableData:any[]=[];
  TypeList:any[]=[];
  productNameList:any[]=[];
  ProductId:any;
   QuoteNo:any;
  public columnHeader: any[] = [];
  public columnHeaders: any[] = [];
  referralData:any
  QuoteData:any[]=[];
  Title: any;
  BranchValue:any;
  FirstName: any;
  Gender: any;
  LastName: any;
  DateOfBirth: any;
  Email: any;
  LoginId: any;
  BrokerTaxDetails:any
  PolicyFees: any;
  PolicyFeeStatus: any="N";
  TaxApplicable:any="both"
  BrokerEffectiveDate:any;
  EffectiveDate:any;
  Address1:any;
  Address2:any;
  Approver:any;
  Passwords:boolean=false;
  RetypePassword:boolean;
  regionList:any[]=[];
  RsaBrokerCode:any;
  RePassword:any;
  Password:any;
  AttachedRegionNo:any[]=[];
  AttachedBranchList:any[]=[];
  pendingvalue:any;
  public columnRefferal: any[] = [];
  public columnApprover: any[] = [];
  public columnReject: any[] = [];
  public columnBrokerCommison:any[]=[];
  RejectreferralData:any[]=[];
  ApprovedreferralData:any[]=[];
  AdminLogin :any;
  PendingreferralData:any[]=[];
  BrokerCommissionDetails:any[]=[];
  ProductEdit:any;
  pro:any;
  newAgencyCode:any;
  ExcecutiveLists:any[]=[];
  Executives:any;
  nation:any;
  OneOffCommission:any;
  OpenCoverCommission:any;
  CustomerId:any;
  Freight:any="N";
  Provision:any="N";
  minDate;
  Status:any;
  mode:any;

  constructor(private router:Router,private masterSer: MastersService,private adminReferralService: AdminReferralService,  private loginService: LoginService,private datePipe:DatePipe,
    private toastrService: NbToastrService,) {
      this.StatusList=[{"Code":"Y","CodeDesc":"Active"},
      {"Code":"N","CodeDesc":"DeActive"},
      {"Code":"D","CodeDesc":"Delete"},
      {"Code":"T","CodeDesc":"Lock"},
  ];

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log(this.userDetails);
     //let minsDate=new Date().getTime();
     //var yearMS = 365 * (1000 * 60 * 60 * 24);
     //this.minDate= minsDate- (18 * yearMS);
     var d = new Date();
     var year = d.getFullYear();
     var month = d.getMonth();
     var day = d.getDate();
   this.minDate= new Date(year - 18,month, day );

     console.log('kkkkkkkkkk',this.minDate)

    if (this.userDetails) this.AdminLogin = this.userDetails?.LoginResponse.LoginId;
    
    this.onGetBranchList('direct');
    this.onGetRegionList();

    this.columnBrokerCommison = [
      {key: 'ProductName', display: 'Products'},
     {key: 'InsuranceEndLimit', display: 'Sum Insured'},
     {key: 'Commission', display: 'Commission %'},
     {key: 'MinPremiumAmount', display: 'Min Premium'},
     {key: 'LoadingPremium', display: 'Loading % Max'},
     {key: 'DiscountPremium', display: 'Discount % MAx'},
     {key: 'BackDateAllowed', display: 'Back Days Allowed'},
     {
      key: 'actions',
      display: 'Edit',
      sticky: true,
      config: {
        isEdit: true,
      }
    }
     
   ];


   this.columnHeader = [
    //{key: 'S.No', display: 'S.No'},
    {key: 'OpenCoverNo', display: 'Core Application PolicyNo'},
    {key: 'ProposalNo', display: 'Proposal No'},
    {key: 'CompanyName', display: 'Customer Name'},
    {key: 'OpenCoverStartDate', display: 'Policy Start Date'},
    {key: 'OpenCoverEndDate', display: 'Policy End Date'},
    // {
    //   key: 'actions',
    //   display: 'Edit',
    //   config: {
    //     isEdit: true,
    //   }
    // }
  ];


  }

  ngOnInit(): void {
    let IssuerObj= JSON.parse(sessionStorage.getItem('AgencyId'));
   this.AgencyCode=IssuerObj.AgencyCode;
   this.branchValue=IssuerObj.BranchCode;
   this.RsaBrokerCode=IssuerObj.BrokerCode;
   this.CustomerId=IssuerObj.CustomerId;

console.log('jjjjjjjj',this.CustomerId)


   if(this.AgencyCode){
    this.getEditIssuerDetails();
    this.Passwords=false;
    this.mode='edit';
   }
else{
  this.Passwords=true;
  this.Pobox="";
  this.Status="Y";
  this.Gender="N";
  this.Occupation="";
  this.LoginId="";
  this.Password="";
  this.RePassword="";
  this.mode='new'

}

   //this.getCountryList()
   //this.getTitle();
   this.Executive();
   this.getUserAll();


  }
  goBack(){
  this.router.navigate(['/Marine/loginCreation/existingBrokers'])
  }

  onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    this.loginService.onGetMethodSync(urlLink).subscribe((data: any) => {
      console.log(data);
      this.regionList = data?.Result;

      //this.AttachedBranchs();
    });
  }
  onSave(RegionList,BranchList){
let Agent:any; let CustomerId:any;
    if(this.AgencyCode){
    Agent=this.AgencyCode
    }
    else{
      Agent="";
    }
      if(this.CustomerId!=null){
        CustomerId=this.CustomerId
      }
      else{
        CustomerId="";
      }
    console.log('eeeeee',this.EffectiveDate)
let ReqObj={
    "Address1": this.Address1,
    "Address2": this.Address2,
    "PoBox": this.Pobox,
    "AgencyCode": Agent,
    "Approvedby": this.ApproverBy,
    "AttachedBranchInfo":BranchList,
    "AttachedRegionInfo":RegionList, 
    "BorkerOrganization": this.CompanyName,
    "BranchCode": this.branchValue,
    "BrokerCode": this.brokerCode,
    "City": this.City,
    "Country": this.Country,
    "CustFirstName": this.FirstName,
    "CustLastName": this.LastName,
    "CustomerId":CustomerId,
    "DateOfBirth": this.DateOfBirth,
    "EffectiveDate": this.EffectiveDate,
    "Email": this.Email,
    "EmergencyFee": "",
    "EmergencyFund": "",
    "Executive": this.Executives,
    "Fax":this.Fax,
    "Gender": this.Gender,
    "GovetFee": "",
    "GovtFeeStatus": "",
    "LoginId": this.LoginId,
    "MissippiId": "",
    "MobileNo":this.MobileNo,
    "Mode":this.mode,
    "Nationality": this.nation,
    "Occupation": this.Occupation,
    "OneOffCommission":this.OneOffCommission,
    "OpenCoverCommission":this.OpenCoverCommission,
    "Password": this.Password,
    //"PoBox": this.PoBox,
    "PolicyFee": this.PolicyFees,
    "PolicyFeeStatus": this.PolicyFeeStatus,
    "RePassword":this.RePassword,
    "RegionCode":this.RegionNo,
    "Status":this.Status,
    "SubBranchCode": "02",
    "TaxApplicable": this.TaxApplicable,
    "TelephoneNo": this.TelephoneNo,
    "Title": this.Title,
    "ValidNcheck": ""
  }
    let urlLink = `${this.ApiUrl1}admin/AdminNewBrokerInsert`;

    if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
      ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDate'] = "";
    }
    if (ReqObj.DateOfBirth != '' && ReqObj.DateOfBirth != null && ReqObj.DateOfBirth != undefined) {
      ReqObj['DateOfBirth'] =  this.datePipe.transform(ReqObj.DateOfBirth, "dd/MM/yyyy")
    }
    else{
      ReqObj['DateOfBirth'] = "";
    }


  this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
let type: NbComponentStatus = 'success';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  'Broker Details Inserted/Updated Successfully',
                  'Broker Details',
                  config);
//this.router.navigate(['/Marine/loginCreation/issuer']);
 this.value='Product';
this.nav('next');
//this.productin=true;
this.newAgencyCode=data.Result.AgencyCode
//this.productInsert()
//this.router.navigate(['/Marine/loginCreation/existingBrokers'])


        }
        else if(data.ErrorMessage){
            if(res.ErrorMessage){
              /*for(let entry of res.ErrorMessage){
                let type: NbComponentStatus = 'danger';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  entry.Field,
                  entry.Message,
                  config);
              }*/
              console.log("Error Iterate",data.ErrorMessage)
              //this.loginService.errorService(data.ErrorMessage);
            }
        }
      },
      (err) => { },
    );
}

nav(n) {
  switch (n) {
    case 'next': {
      this.btnNextPrev.index++
      if (this.btnNextPrev.index > 3) {
        this.btnNextPrev.prev = false
        this.btnNextPrev.next = true
      } else {
        this.btnNextPrev.prev = false
      }
    }; break;
    case 'prev': {
      this.btnNextPrev.index--
      if (this.btnNextPrev.index == 0) {
        this.btnNextPrev.prev = true
        this.btnNextPrev.next = false
      } else {
        this.btnNextPrev.next = false
      }
    }; break;

  }
}

changeRegion(para){
  if(para=='change'){
  
  }
  let uwList=[];
     console.log('hhh',this.AttachedRegionNo)
  if(this.AttachedRegionNo.length!=0){
    let i=0;
    for(let uw of this.AttachedRegionNo){

      console.log('ueeee',uw)
      let entry = {"RegionCode":uw}
      uwList.push(entry);
      console.log('uuuuuu',uwList)
      i++;
      if(i==this.AttachedRegionNo.length) 
      if(para == 'change'){
        this.AttachedBranches(uwList,'change');
      }
      else{
        this.AttachedBranches(uwList,'direct');
      }
     
    }
  }
  //else this.AttachedBranches(uwList)

}

getUserAll(){
  let ReqObj={
      "BranchCode": this.branchValue
  }
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getUserMgtDropDown`, ReqObj).subscribe(
    (data: any) => {
      console.log(data);

      if (data.Message == 'Success') {
        this.countryList = data.Result.CountryDetails;
        this.CityList=data.Result.CityDetails;
        this.NationalityList=data.Result.NationalityDetails;
        this.TitleList=data.Result.TitleDetails;

        //this.city()
      }
    }
  )
}


  /*getCountryList() {
    let ReqObj = {
      "BranchCode": this.branchValue,
      "ProductId": "3"
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/originationcountry`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message == 'Success') {
          this.countryList = data.Result;
          this.city()
        }
      }
    )

  }*/

  Executive(){
      let ReqObj = {
        "BranchCode": this.branchValue,
        "ProductId": "11",
        "BrokerCode":this.RsaBrokerCode,
        "OpenCoverNo": null,
      }
      this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/executive`, ReqObj).subscribe(
        (data: any) => {
          console.log(data);

          if (data.Message == 'Success') {
            this.ExcecutiveLists = data.Result;
            //this.city()
          }
        }
      )

    }

  /*city(){


    let reqObj=
       {
        "OriginationCountryCode":this.Country
      }
      this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/originationcity`, reqObj).subscribe(
        (data: any) => {
          console.log(data);

          if (data.Message == 'Success') {
            this.CityList = data.Result;
          }
        }


      )
  }*/

  /*getTitle() {
    let ReqObj = {
      "BranchCode": this.branchValue,
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/title`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message == 'Success') {
          this.TitleList = data.Result;
        }
      }
    )

  }*/
  onGetBranchList(para) {
     if(para=='change'){
      this.branchValue=null;
     }
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.RegionNo,
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
         
      },
      (err) => { },
    );
  }
AttachedBranches(uwList,para){
  if(para=='change'){
    this.AttachedBranch=null;
  }
  let ReqObj = 
  {
    "AgencyCode": this.AgencyCode,
  "RegionCodeInfo":uwList
}
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getAttachedBranchDetails`, ReqObj).subscribe(
    (data: any) => {
      console.log('ssssssss',data);
      this.AttachedBranchList= data || [];
    }
  )

}
region(){
  let RegionList= [];
  if(this.AttachedRegionNo.length!=0){
    let i=0;
      for(let u of this.AttachedRegionNo){      
      let entryRegion={"RegionCode":u}    
      RegionList.push(entryRegion);
      i++;
      if(i==this.AttachedRegionNo.length) this.AttachedBranchFinal(RegionList);
    }
  }
  else this.AttachedBranchFinal(RegionList)
}
AttachedBranchFinal(RegionList){
  let BranchList= [];
  if(this.AttachedBranch.length!=0){
    let i=0;
      for(let u of this.AttachedBranch){      
      let entryRegion={"AttachedBranchId":u}    
      BranchList.push(entryRegion);
      i++;
      if(i==this.AttachedBranch.length) this.onSave(RegionList,BranchList);
    }
  
  }
  else this.onSave(RegionList,BranchList)
}



/*ProductComma(){
  var str:any[]=[] 
  str= this.AttachedRegionNo;
this.AttachedRegionNo= str.split(',');
this.AttachedRegionNo = this.AttachedRegionNo.filter(item => item);
  console.log('BBB',this.AttachedRegionNo);
  this.AttachedBranches(this.AttachedRegionNo,'direct');
}*/


/*Branchf(){
  var str = this.AttachedBranch;
this.AttachedBranch= str.split(',');
this.AttachedBranch = this.AttachedBranch.filter(item => item);
  console.log('ccccccccc',this.AttachedBranch);
  //this.AttachedBranches(this.AttachedBranch);
  
}*/
  getEditIssuerDetails(){

    let ReqObj =  {

  "AgencyCode":this.AgencyCode,
      "BranchCode": this.branchValue,

  }
    let urlLink = `${this.ApiUrl1}admin/getBrokerEdit`;
  this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      //this.productin=true;
      if(res.Result){
     
        this.IssuerDetails = res?.Result.BrokerDetails;
       

           this.BrokerTaxDetails=res?.Result.BrokerTaxDetails;
           this.BrokerCommissionDetails=res?.Result.BrokerCommissionDetails;


           this.PolicyFees=this.BrokerTaxDetails[0]?.PolicyFees;
           console.log('ppp',this.PolicyFeeStatus);
           console.log('ppp',this.PolicyFees);
           this.PolicyFeeStatus=this.BrokerTaxDetails[0]?.PolicyFeeStatus;
             this.TaxApplicable=this.BrokerTaxDetails[0]?.TaxApplicable;
              this.EffectiveDate=this.BrokerTaxDetails[0]?.effectiveDate;

              console.log('hhhhhhhhhhh', this.EffectiveDate)
           console.log('hhhhhhhhhhh', this.brokerCode)
           this.brokerCode=this.IssuerDetails[0]?.BrokerCode;
           this.Country=this.IssuerDetails[0]?.Country
           this.Title=this.IssuerDetails[0]?.Title

           this.FirstName= this.IssuerDetails[0]?.FirstName,
           this.CompanyName=this.IssuerDetails[0]?.CompanyName,

           this.Gender=this.IssuerDetails[0]?.Gender;
           this.City=this.IssuerDetails[0]?.City
           this.LastName=this.IssuerDetails[0]?.LastName;
           this.Status=this.IssuerDetails[0]?.Status;
           this.DateOfBirth=this.IssuerDetails[0]?.DateOfBirth
            this.Email=this.IssuerDetails[0]?.Email;
            this.LoginId=this.IssuerDetails[0]?.LoginId;
              this.MobileNo=this.IssuerDetails[0]?.MobileNo;
              this.nation=this.IssuerDetails[0]?.Nationality;
              this.Occupation=this.IssuerDetails[0]?.Occupation;
              this.ApproverBy=this.IssuerDetails[0]?.ApprovedPreparedBy;
              this.AttachedBranch=this.IssuerDetails[0]?.AttachedBranch;
              this.Country=this.IssuerDetails[0]?.Country;
              this.Address1=this.IssuerDetails[0]?.Address1;
              this.Address2=this.IssuerDetails[0]?.Address2;
              this.City=this.IssuerDetails[0]?.City;
              this.Pobox=this.IssuerDetails[0]?.Pobox;
              this.Fax=this.IssuerDetails[0]?.Fax;
              this.TelephoneNo=this.IssuerDetails[0]?.TelephoneNo;
              this.RegionNo=this.IssuerDetails[0]?.RegionCode;
              this.Executives=this.IssuerDetails[0]?.AcExecutiveId;
              this.OneOffCommission=this.IssuerDetails[0]?.IssuerCommissionOneOff;
              this.OpenCoverCommission=this.IssuerDetails[0]?.IssuerCommissionOpenCover;



            
              let AttachedRegions=this.IssuerDetails[0]?.AttachedRegion;
              /*if(AttachedRegions){
                for(let i=0;i<=AttachedRegions?.length;i++){
                  this.AttachedRegionNo=AttachedRegions.split(',')
                }
              }*/
              console.log('nnnnnnnn',this.AttachedRegios);
              let attached= AttachedRegions.split(',');
              this.AttachedRegionNo =attached.filter(item => item);
              this.AttachedBranches(this.AttachedRegionNo,'direct');
              let AttachedBranch=this.IssuerDetails[0]?.AttachedBranch;
              /*if(AttachedBranch){
                for(let i=0;i<=AttachedBranch?.length;i++){
                  this.AttachedBranch=AttachedBranch.split(',')
                }
              }*/
              console.log('sssssss',this.AttachedBranch);
              let branch= AttachedBranch.split(',');
              this.AttachedBranch =branch.filter(item => item);
            
              //this.getCountryList();
              this.onGetBranchList('direct');
              this.onGetRegionList();
              //this.ProductComma();
              //this.Branchf();
              this.getUserAll();
              //this.AttachedBranches(this.IssuerDetails.AttachedRegion);
              this.Executive();
       
             
             

        console.log('jjjjjjjjjjj',this.IssuerDetails);
if(this.IssuerDetails||this.BrokerTaxDetails ){
          if(this?.EffectiveDate!=null){

           this.EffectiveDate = this.onDateFormatInEdit(this?.EffectiveDate)

          }
          if(this.DateOfBirth!=null){

            this.DateOfBirth= this.onDateFormatInEdit(this.DateOfBirth)
           }
           if(this.BrokerEffectiveDate!=null){

            this.IssuerDetails.BrokerEffectiveDate = this.onDateFormatInEdit(this.IssuerDetails?.BrokerEffectiveDate)
           }
          /*if(this.AdminDetails?.EffectiveDateEnd!=null){
            this.AdminDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.AdminDetails?.EffectiveDateEnd)
          }*/
          //this.onGetRegionList()

        }
      }
      console.log("Final Admin Class",this.IssuerDetails);
    },
    (err) => { },
  );
  }

  onDateFormatInEdit(date) {
    console.log(date);
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
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }


  onRedirect(value){
    this.value=value;
    if(value == 'View'){
       //this.productin=true;
    }
    else if(value == 'ChangePassword'){
      this.productin=false;
    }

    else if(value == 'OpenCover'){
     this.openCover();
     this.productin=false;
    }

    else if(value == 'Referral'){
      this.productin=false;

    }
    else if(value == 'Product'){

    }
    else if(value == 'UserDetails'){
this.router.navigate(['/Marine/loginCreation/existingUser'])
    }


  }

  onRedirects(value){
    this.pendingvalue=value;
    if(this.pendingvalue == 'Pending'){
     this.onGetProductList()
    }
    else if( this.pendingvalue == 'Approved'){
      this.onGetProductList()  
    }

    else if(this.pendingvalue == 'RejectedQuotes'){
      this.onGetProductList()
    }
  }
onsearch(QuoteNo){
  const urlLink = `${this.ApiUrl1}opencover/report/search/referralquote`;
  const reqData = {
      "QuoteNo": QuoteNo   
  };
  this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
    (data: any) => {

      console.log('data',data)
      let res:any = data;
      if(res.Result){
      this.columnHeaders = [
//{key: 'S.No', display: 'S.No'},
        {key: 'BrokerName', display: 'Broker Organization'},
        {key: 'QuoteCreated', display: 'Quote Created By'},
        {key: 'CustomerName', display: 'Customer Name'},
        {key: 'QuoteNo', display: 'QuoteNo'},
        {key: 'Remarks', display: 'Remarks'},
        {key: 'Status', display: 'Status'},
        // {
        //   key: 'actions',
        //   display: 'Edit',
        //   config: {
        //     isEdit: true,
        //   }
        // }
      ];
    
      // this.QuoteData=res?.Result;
      // console.log("Referral Quote",this.QuoteData);
      this.QuoteData.push({'QuoteNo':res.Result.QuoteNo,'BrokerName':res.Result.BrokerName,'QuoteCreated':
      res.Result.QuoteCreated,'Remarks':res.Result.Remarks,'CustomerName':res.Result.CustomerName,'Status':res.Result.Status})
      console.log('hhhhhhhhh',this.QuoteData)
    }
      
    },
    (err) => { },
  );
}


  ChangePassword(){
    const urlLink = `${this.ApiUrl1}admin/getBrokerPasswordChange`;
    const reqData = {
      "AgencyCode": this.AgencyCode,
     "Password": this.EPassword,
     "RePassword": this.NPassword
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        console.log("Change Password Done Successfully");
         if(data.Result){
          let type: NbComponentStatus = 'success';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  'Password Changed Successfully',
                  'Password Changed',
                  config);
                  this.router.navigate(['/Marine/loginCreation/existingBrokers'])
                  //this.router.navigate(['/Marine/loginCreation/issuer']);

        }
       
       
      },
      (err) => { },
    );
  }


  openCover(){
    const urlLink = `${this.ApiUrl1}opencover/report/policyregister`;
    const reqData = {
      "BranchCode": this.branchValue,
      "LoginId": this.LoginId
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        /*this.columnHeader = [
          //{key: 'S.No', display: 'S.No'},
          {key: 'OpenCoverNo', display: 'Core Application PolicyNo'},
          {key: 'ProposalNo', display: 'Proposal No'},
          {key: 'CompanyName', display: 'Customer Name'},
          {key: 'OpenCoverStartDate', display: 'Policy Start Date'},
          {key: 'OpenCoverEndDate', display: 'Policy End Date'},
          // {
          //   key: 'actions',
          //   display: 'Edit',
          //   config: {
          //     isEdit: true,
          //   }
          // }
        ];*/
        if(data.Result){
        this.tableData = data?.Result; 
        }

      },
      (err) => { },
    );
  }


  onGetProductList() {
    const urlLink = `${this.ApiUrl1}admin/IssuerProductDetails`;
    const reqData = {
      
      "BranchCode": this.branchValue,
      "AgencyCode":this.AgencyCode
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.productNameList = data?.Result || [];
      },
      (err) => { },
    );
  }

  Search(){
    this.PTrue=true;
    const urlLink = `${this.ApiUrl1}opencover/report/pending/referralquote`;
    const reqData = {
      "BranchCode": this.BranchValue,
      "LoginId": this.AdminLogin ,
      "ProductId": this.ProductId,
      "RegionCode": this.RegionNo
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res:any = data;
        if(res.Result){
          
        this.columnReferral = [
           {key: 'BrokerName', display: 'Broker Organization'},
          {key: 'QuoteCreated', display: 'Quote Created By'},
          {key: 'CustomerName', display: 'Customer Name'},
          {key: 'QuoteNo', display: 'QuoteNo'},
          {key: 'Remarks', display: 'Remarks'},
          {key: 'Status', display: 'Status'},
        ];
      this.PendingreferralData=res?.Result;
       console.log('pppppppppp',this.PendingreferralData)
      }
      },
      (err) => { },
    );
  }

  SearchApprover(){
    this.ATrue=true;
    const urlLink = `${this.ApiUrl1}opencover/report/approved/referralquote`;
    const reqData = {
      "BranchCode": this.BranchValue,
      "LoginId": this.AdminLogin,
      "ProductId": this.ProductId,
      "RegionCode": this.RegionNo
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res:any = data;
        if(res.Result){
          
        this.columnApprover = [
          {key: 'BrokerName', display: 'Broker Organization'},
         {key: 'QuoteCreated', display: 'Quote Created By'},
         {key: 'CustomerName', display: 'Customer Name'},
         {key: 'QuoteNo', display: 'QuoteNo'},
         {key: 'Remarks', display: 'Remarks'},
         {key: 'Status', display: 'Status'},
       ];
      this.ApprovedreferralData=res?.Result;
       console.log('AAAAAAAA',this.ApprovedreferralData);
      }
      },
      (err) => { },
    );
  }
  SearchReject(){
    this.rTrue=true;
    const urlLink = `${this.ApiUrl1}opencover/report/rejected/referralquote`;
    const reqData = {
      "BranchCode": this.BranchValue,
      "LoginId": this.AdminLogin,
      "ProductId": this.ProductId,
      "RegionCode": this.RegionNo
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res:any = data;
        if(res.Result){
          
        this.columnReject = [
          {key: 'BrokerName', display: 'Broker Organization'},
         {key: 'QuoteCreated', display: 'Quote Created By'},
         {key: 'CustomerName', display: 'Customer Name'},
         {key: 'QuoteNo', display: 'QuoteNo'},
         {key: 'Remarks', display: 'Remarks'},
         {key: 'Status', display: 'Status'},
       ];

      this.RejectreferralData=res?.Result;
       console.log('nnnnnnnnnnnn',this.RejectreferralData)
      }
      },
      (err) => { },
    );
  }

  Addnew(){
    this.Add=true;
    this.pro=false;
    this.onGetProductList() 
  }

  prof(){
    console.log('NNNNNNNNN',this.ProId)
    if(this.ProId!=null || this.ProId!="" || this.ProId!=undefined){
       this.productInsert();
    }
    else{
      this.toastrService.danger("Please enter Product Id");
    }
  }
  productInsert(){
     
let agent;let CustomerId
    if(this.AgencyCode){
agent=this.AgencyCode
    }
    else{
      agent=this.newAgencyCode
    }
    if(this.CustomerId!=null){
      CustomerId=this.CustomerId
    }
    else{
      CustomerId="";
    }
    if(this.Freight=='N'){
      this.LoadingPremium="";
      this.DiscountPremium="";
    }

    if(this.ProId=='11'){
      this.BackDateAllowed='0';
      this.Commission='0';
      this.DiscountPremium='0';
      this.LoadingPremium="0";
      this.InsuranceEndLimit="0";
      this.MinPremiumAmount="0";
      this.Provision="N";
      this.Freight="N"

    }

    /*if(this.ProductEdit.CustomerId ==''|| this.ProductEdit.CustomerId == undefined || this.ProductEdit.CustomerId == null ){
      this.ProductEdit.CustomerId="";
    }*/
let ReqObj={
  "AgencyCode":agent,
  "BackDateAllowed":this.BackDateAllowed,
  "Commission": this.Commission,
  "CustomerId":CustomerId,
  "CustomerName": null,
  "DiscountPremium": this.DiscountPremium,
  "Freight": this.Freight,
  "InsuranceEndLimit": this.InsuranceEndLimit,
  "LoadingPremium": this.LoadingPremium,
  "MinPremiumAmount": this.MinPremiumAmount,
  "PayReceipt":"N",
  "ProductId": this.ProId,
  "Provision": this.Provision,
  "Remarks": "N",
  "UserId": ""
}

let urlLink = `${this.ApiUrl1}admin/BrokerProductInsert`;
this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
      console.log(data);
      let res:any=data;
      if(data.Result){
let type: NbComponentStatus = 'success';
              const config = {
                status: type,
                destroyByClick: true,
                duration: 4000,
                hasIcon: true,
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                preventDuplicates: false,
              };
              this.toastrService.show(
                'Product Details Inserted/Updated Successfully',
                'Product Details',
                config);
//this.router.navigate(['/Marine/loginCreation/issuer']);


this.router.navigate(['/Marine/loginCreation/existingBrokers'])


      }
      else if(data.ErrorMessage){
          if(res.ErrorMessage){
            for(let entry of res.ErrorMessage){
              let type: NbComponentStatus = 'danger';
              const config = {
                status: type,
                destroyByClick: true,
                duration: 4000,
                hasIcon: true,
                position: NbGlobalPhysicalPosition.TOP_RIGHT,
                preventDuplicates: false,
              };
              this.toastrService.show(
                entry.Field,
                entry.Message,
                config);
            }
            console.log("Error Iterate",data.ErrorMessage)
            //this.loginService.errorService(data.ErrorMessage);
          }
      }
    },
    (err) => { },
  );
  }



  editProduct(rowData){
    const urlLink = `${this.ApiUrl1}admin/getBrokerProductEdit`;
let ReqObj={
    "AgencyCode": this.AgencyCode,
    "ProductId": rowData.ProductId  
}
this.adminReferralService.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    
    console.log(data);
    this.pro=true;
    this.ProId=""
    this.ProductEdit = data?.Result[0];
     
    //this.pro=true;
    this.displayProduct=data?.Result[0].ProductName;
    this.ProId=data?.Result[0].ProductId;
    this.Commission=data?.Result[0].Commission;
    this.InsuranceEndLimit=data?.Result[0].InsuranceEndLimit;
    this.MinPremiumAmount=data?.Result[0].MinPremiumAmount;
    this.BackDateAllowed=data?.Result[0].BackDateAllowed;
    this.Freight=data?.Result[0].Freight;
    this.LoadingPremium=data?.Result[0].LoadingPremium;
    this.DiscountPremium=data?.Result[0].DiscountPremium;
    this.Provision=data?.Result[0].Provision;

    console.log('hhhhhhh',this.displayProduct)
    console.log('pppppp',this.ProductEdit)
  },
  (err) => { },
);

  }

  proDelete(){
    const urlLink = `${this.ApiUrl1}admin/getBrokerProductDelete`;
    let ReqObj={
      "AgencyCode": this.AgencyCode,
      "ProductId": this.pros,  
  }
  this.adminReferralService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      
      console.log(data,"Delete Success");
      if(data.Result){
        let type: NbComponentStatus = 'success';
                      const config = {
                        status: type,
                        destroyByClick: true,
                        duration: 4000,
                        hasIcon: true,
                        position: NbGlobalPhysicalPosition.TOP_RIGHT,
                        preventDuplicates: false,
                      };
                      this.toastrService.show(
                        'Product Deleted Successfully',
                        'Product Details',
                        config);
        //this.router.navigate(['/Marine/loginCreation/issuer']);
        
        
        this.router.navigate(['/Marine/loginCreation/existingBrokers'])
        
        
              }
    
    },
    (err) => { },
  );
}

}
