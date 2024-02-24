import { Component, OnInit,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';
import { User } from './UserModel';
import { OpenCoverDocument } from '../../opencover/opencover.component';
import { LoginService } from '../../../../login/login.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-new-user-details',
  templateUrl: './new-user-details.component.html',
  styleUrls: ['./new-user-details.component.scss']
})
export class NewUserDetailsComponent implements OnInit {
  btnNextPrev = {
    prev: true,
    next: false,
    index: 0
  }
  StatusList:any[]=[];
  value:any="View";
  Status:any;
  BrokerName:any;
  userType:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  BranchCode: any;
  LoginId: any;
  UserDetails:any;
  branchList:any[]=[];
  TitleList:any[]=[];
  Title:any;
  FirstName:any;
  LastName:any;
  Gender:any;
  DateOfBirth:any;
  Occupation:any;
  countryList:any[]=[];
  CityList:any[]=[];
  Country: any;
  Pobox:any;
  TelephoneNo:any;
  Address1:any;
  Address2:any;
  Mobile:any;
  Fax:any;
  Email:any;
  AttachedBranch:any;
  AttachedRegion:any;
  Password:any;
  RePassword:any;
  City:any;
  AgencyCode:any;
  brokerType:any[]=[];
  open: boolean;
  AgentCode: any;
  UserAgentCode: any;
  CustomerId: any;
  ProductInfo:any[]=[];
  EPassword: any;
  NPassword: any;
  productEdit:any[]=[];
  productNameList:any[]=[];
  ProductInfos:any[]=[];
  Iss: boolean;
  List:any[]=[];
  onActive= new EventEmitter();
  ProList:any[]=[];
  pass:any;
  regionList :any[]=[];
  AttachedBranchList:any[]=[];
  NationalityList:any[]=[];
  pro:any;
  agentCode: any;
  Uacode: any;
  CustomerIds: any;
  openCover: any;
  openCovers:any[]=[];
  speciAmount: any;
  InsuAmount: any;
  freig: any;
  minDate;
  edit: any;
  mode: string;
  disable = false;
  disabled: boolean;
  regionCode:any=null;userDetails:any=null;
  editspro: any;

  constructor(private masterSer: MastersService,private datePipe:DatePipe,
    private toastrService:NbToastrService, private router:Router, private adminReferralService: AdminReferralService,public dialog: MatDialog, private loginService: LoginService) {
      this.StatusList=[{"Code":"Y","CodeDesc":"Active"},
      {"Code":"N","CodeDesc":"DeActive"},
      {"Code":"D","CodeDesc":"Delete"},
      {"Code":"T","CodeDesc":"Lock"},
  ];
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
this.minDate= new Date(year - 18,month, day );
this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  this.regionCode = this.userDetails?.LoginResponse.RegionCode;
  
  this.UserDetails=new User();
 


/*this.ProductInfo= [{
    "InsuranceEndLimit": "",
    "PayReceipt": "",
    "ProductId": "3",
    "ProductName": "MARINE CARGO INDIVIDUAL POLICY",
    //"ProductName":"",
    "ProductYN": "",
    "SpecialDiscount": "0.0",
    "UserFreight": "N"
  },
  {
    "InsuranceEndLimit": "0.0",
    "PayReceipt": "",
    "ProductId": "11",
    "ProductName": "MARINE CARGO - OPEN COVER",
    //"ProductName":"",
    "ProductYN": "",
    "SpecialDiscount": "0.0",
    "UserFreight": "N"
  },
]*/

/*this.ProductInfos=[
  {
    "InsuranceEndLimit": "",
    "PayReceipt": "",
    "ProductId": "11",
    "ProductName": "MARINE CARGO - OPEN COVER",
    "ProductYN": "",
    "SpecialDiscount": "",
    "UserFreight": "N"
  },
]*/

     }

  ngOnInit(): void {


    let AdminObj = JSON.parse(sessionStorage.getItem('editUserId'));
    //let password =sessionStorage.removeItem("password");
    //let password=sessionStorage.getItem('password');
     this.BranchCode = AdminObj?.BranchCode;
     this.LoginId = AdminObj.LoginId;
     this.AgencyCode=AdminObj.AgencyCode;

     this.edit=AdminObj.Edit;
     

     if(this.AgencyCode!=null && this.AgencyCode!=undefined){
      this.getEditAdminDetails();
      this.mode="edit";
     
      //this.editSection=false;
    }
    else{
      this.UserDetails = new User();
      this.pass=true;
      this.UserDetails.AttachedRegion=[];
      this.UserDetails.AttachedBranch=[];
      this.UserDetails.LoginId="";
      this.UserDetails.Password="";
      this.UserDetails.RePassword="";
      this.mode="new";
      this.Status="Y";
      this.UserDetails.Gender='M';
      // this.BranchCode = IssuerObj.BranchCode;
      // this.IssuerDetails.LoginId = IssuerObj.LoginId;
      // this.editdata=true;
      //if(this.CityDetails?.Status==null)  this.CityDetails.Status = 'Y';
    }
    //this.getCountryList()
    this.onUserType();
    this.getUserAll();
    //this.getTitle();
    this.getBroker();
    this.onGetProductList();
    this.onGetRegionList();
    this.UserDetails.UserType="User";



  }

  change(){
   if(this.AgencyCode!=null){
    this.disabled = true;
   }
   else{
    this.disabled = false;
   }
  }
  ProductComma(){
    var str = this.UserDetails.AttachedRegion;
  this.UserDetails.AttachedRegion= str.split(',');
  this.UserDetails.AttachedRegion = this.UserDetails.AttachedRegion.filter(item => item);
    console.log('BBB',this.UserDetails.AttachedRegion);
    this.AttachedBranches(this.UserDetails.AttachedRegion,'direct')
  }
  Branchf(){
    var str = this.UserDetails.AttachedBranch;
  this.UserDetails.AttachedBranch= str.split(',');
  this.UserDetails.AttachedBranch = this.UserDetails.AttachedBranch.filter(item => item);
    console.log('BBB',this.UserDetails.AttachedBranch);

  }

  onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    this.loginService.onGetMethodSync(urlLink).subscribe((data: any) => {
      console.log(data);
      this.regionList = data?.Result;

    });
  }
  regions(para){

  
    let RegionList= [];
    if(this.UserDetails.AttachedRegion.length!=0){
      let i=0;
        for(let u of this.UserDetails.AttachedRegion){      
        let entryRegion={"RegionCode":u}    
        RegionList.push(entryRegion);
        i++;
        if(i==this.UserDetails.AttachedRegion.length){ 
        console.log('IIIIIIIIIIICCCCCCCC',i,this.UserDetails.AttachedRegion.length)
        if(para=='change'){
          this.AttachedBranches(RegionList,'change');
        }
        else{
          this.AttachedBranches(RegionList,'direct');
        }
      }
        //this.AttachedBranches(RegionList);
      }
    
    }

  }

  AttachedBranches(uwList,para){

    if(para=='change'){
      this.UserDetails.AttachedBranch=null;
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
  onActiveDetails(rowData){

    console.log('hhhhh',rowData)
    this.ProList=rowData
    console.log('jjjjjjj',this.ProList)
    //this.productInsert(rowData);
  }


Open(){

  let ReqObj = {
"AgencyCode":this.agentCode,
"UAgencyCode":this.Uacode
  }
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getUserMgtOCCertificate`, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
          
      this.List=data.Result;
      console.log('DataResults',this.List);
      if (data.Message == 'Success') {
        const dialogRef = this.dialog.open(OpenCoverDocument, {
          maxWidth: '100vw',
          width: '1200px',
          height: '80vh',
          data: {
         list:data.Result,
         lists:this.editspro
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          {
            this.openCover=result;
            console.log('jjjjjjjj',this.openCover);
            let i=0;
            if(this.openCover.length!=0){
              for(let n of this.openCover){
                let entry ={
                  "OpenCoverNo":n
                }
                this.openCovers.push(entry);
                console.log('Entrysssssss',this.openCovers)
                i+1;
              }
            }
            // this.openCovers=[{
            //   "OpenCoverNo":this.openCover
            // }]
          }
        });
       
      }
    }
  ) 
  
}


  onRedirect(value){
    this.value=value;
    if(value == 'View'){
          this.Iss=false;
    }
    else if(value == 'ChangePassword'){
      this.Iss=false;
    }
    else if(value=='Product'){
      this.Iss=true;
    }
  
  
  }
  getEditAdminDetails(){

    let ReqObj =  {
      "AgencyCode": this.AgencyCode,
      "BranchCode": this.BranchCode,
      //"UAgencyCode": this.AgencyCode

  }

    let urlLink = `${this.ApiUrl1}admin/getUserMgtEditList`;
  this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.UserDetails = res.Result[0];
        this.Status=res.Result[0].Status;
        this.CustomerIds=res.Result[0].CustomerId

           
                //this.Iss=true;
                this.getBroker();
                this.onUserType();
                //this.getCountryList();
                this.ProductComma();
                //this. AttachedBranches(this.UserDetails.AttachedRegion)
                this.Branchf();
                this.getUserAll();
                //this.productedit();
                

                
                this.AgencyCode=res.Result[0].AgencyCode

                this.agentCode=res.Result[0].AgencyCode;
                this.Uacode=res.Result[0].UserAgencyCode;
                this.productedit();

                console.log('ghhggggggggggggg',this.agentCode);
                console.log('kkkkkkkkkkkkk',this.Uacode);


        if(this.UserDetails){
          if(this.UserDetails?.DateOfBirth!=null){

           this.UserDetails.DateOfBirth = this.onDateFormatInEdit(this.UserDetails?.DateOfBirth)
          }
          /*if(this.AdminDetails?.EffectiveDateEnd!=null){
            this.AdminDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.AdminDetails?.EffectiveDateEnd)
          }*/
          this.onGetBranchList();

        }
      }
      console.log("Final Admin Class",this.UserDetails);
    },
    (err) => { },
  );
  }


 Atregion(){

  console.log('hhhhhhhhhh')
    let RegionList= [];
    if(this.UserDetails.AttachedRegion.length!=0){
      let i=0;
        for(let u of this.UserDetails.AttachedRegion){      
        let entryRegion={"RegionCode":u}    
        RegionList.push(entryRegion);
        i++;
        if(i==this.UserDetails.AttachedRegion.length) this.AttachedBranchFinal(RegionList);
      }
    
    }
    else this.AttachedBranchFinal(RegionList)
  }

  AttachedBranchFinal(RegionList){
    let BranchList= [];
    if(this.UserDetails.AttachedBranch.length!=0){
      let i=0;
        for(let u of this.UserDetails.AttachedBranch){      
        let entryRegion={"AttachedBranchId":u}    
        BranchList.push(entryRegion);
        i++;
        if(i==this.UserDetails.AttachedBranch.length) this.onSave(RegionList,BranchList);
      }
    
    }
    else this.onSave(RegionList,BranchList)
  }
  
  onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.regionCode,
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
        //this.onGetRegionList();
      },
      (err) => { },
    );
  }

  getBroker() {
    let ReqObj = {
      "BranchCode": this.BranchCode,
      "ApplicationId": "2",
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getAdminBrokerList`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message == 'Success') {
          this.brokerType= data.Result;
        }
      }
    )

  }


  getUserAll(){
    let ReqObj={
        "BranchCode": this.BranchCode
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
      "BranchCode": this.BranchCode,
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



  /*city(){


    let reqObj=
       {
        "OriginationCountryCode":this.UserDetails.Country
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
  goBack(){
    this.router.navigate(['/Marine/loginCreation/existingUser'])
  }

  Vback(){
    this.value='View'
  }
  onSave(RegionList,BranchList){
    let cus:any;
    let Agent:any
    if(this.AgencyCode){
    Agent=this.AgencyCode
    }
    else{
      Agent="";
    }
  

    if(this.CustomerIds!=null){
      cus=this.CustomerIds
    }
    else{
      cus="";
    }

    /*if(this.UserDetails.UserId!=undefined && this.UserDetails.UserId!=null && this.UserDetails.UserId!=''){
      //let code = this.productItem
      let code = this.userType.find(ele=>ele.Code==this.UserDetails.UserId)
      console.log('codes',code)
      this.UserDetails.UserType=code.CodeDescription;
      //code.label

      //this.mobileCodeList.label = this.productItem.MobileCod['CodeDesc'];
     }*/


let ReqObj={

    "Address1": this.UserDetails.Address1,
    "Address2": this.UserDetails.Address2,
    "AgencyCode":this.AgencyCode ,
    "AttachedBranchInfo":BranchList,
    "AttachedRegionInfo":RegionList,
    "City":this.UserDetails.City,
    "Country": this.UserDetails.Country,
    "CustFirstName":this.UserDetails.FirstName,
    "CustLastName": this.UserDetails.LastName,
    "CustomerId": cus,
    "DateOfBirth":this.UserDetails.DateOfBirth,
    "Email":this.UserDetails.Email,
    "Fax": this.UserDetails.Fax,
    "Gender": this.UserDetails.Gender,
    "LoginId": this.UserDetails.LoginId,
    "MobileNo": this.UserDetails.MobileNo,
    "Mode":this.mode,
    "Nationality":this.UserDetails.Nationality,
    "Occupation": this.UserDetails.Occupation,
    "Password": this.UserDetails.Password,
    "PoBox": this.UserDetails.Pobox,
    "RePassword": this.UserDetails.RePassword,
    "Status": this.Status,
    "SubBranchCode":this.UserDetails.SubBranchCode,
    "TelephoneNo": this.UserDetails.TelephoneNo,
    "Title": this.UserDetails.Title,
    "UserAgencyCode": this.UserDetails.UserAgencyCode,
    "UserId": "1",
    "UserType": this.UserDetails.UserType
}
let urlLink = `${this.ApiUrl1}admin/UserMgtInsertOrUpdate`;

/*if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
  ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
}
else{
  ReqObj['EffectiveDate'] = "";
}*/
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

      this.open=true;
      //this.Iss=true;
      this.value='Product'
      this.nav('next');
      //this.AgentCode=data.Result.AgencyCode;
      this.UserAgentCode=data.Result.UserAgencyCode;
      this.CustomerId=data.Result.CustomerId;

      this.Uacode=data.Result.UserAgencyCode;
      this.agentCode=data.Result.AgencyCode;
          
      if(this.edit=='N'){
        this.productedit();
      }
      //this.productedit();
      
      //this.productInsert()
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
              'User Details Inserted/Updated Successfully',
              'User Details',
              config);
//this.router.navigate(['/Marine/loginCreation/issuer']);


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
  onGetProductList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/referral/quoteproduct`;
    const reqData = {
      "LoginId": this.LoginId,
     "BranchCode": this.BranchCode
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.productNameList = data?.Result?.ProductionDetails || [];
      },
      (err) => { },
    );
  }

  handleSelected($event,row,index) {

    console.log('kkkkkkk',$event.target.checked)
    let entry;let pro
    console.log('llllllll',row);
  
    if($event.target.checked==true){
      this.pro="Y"
    }
    else{
      this.pro="N"
    }

    let open
     
    if(this.openCover){
    open=this.openCover
    }
    else{
      open=null;
    }
    if($event.target.checked==true){
        this.ProductInfo[index]['InsuranceEndLimit'] = row.value;
        this.ProductInfo[index]['SpecialDiscount'] = row.value;
        this.ProductInfo[index]['UserFreight'] = row.value;
        this.ProductInfo[index]['ProductYN'] = "Y";
        this.ProductInfo[index]['OpenCoverNo']=open
}
else if($event.target.checked ==false){
  this.ProductInfo[index]['ProductYN'] = "";
}
 

  
  //this.pro.push(entry);

 
  
    /*if ($event.target.checked == true) {

      this.ProductInfo= [{
      "InsuranceEndLimit":row.InsuranceEndLimit,
      "PayReceipt": "Y",
      "ProductId": row.ProductId,
      "ProductName":row.ProductName,
      "ProductYN": pro,
      "SpecialDiscount":row.SpecialDiscount,
      "UserFreight": row.Freight
  }];
  //this.pro.push(entry);

  console.log('uuuuuuuu',this.pro)
  
}*/

 }

 special(rowData,value,index){
  console.log('jjjjjj',value,rowData,index);
  this.ProductInfo[index]['SpecialDiscount'] = value;
  console.log('kkkkkkkk',this.pro[index]['SpecialDiscount'])
  //return rowData.SpecialDiscount = value;
  //console.log('hhhhhh',rowData.SpecialDiscount);
  //this.speciAmount=rowData.SpecialDiscount;
  console.log('hhhhhhh',this.speciAmount)
 }
 Insurance(row,value,index){
  console.log('llllll',value,index);
  //this.InsuAmount=row.InsuranceEndLimit;
  this.ProductInfo[index]['InsuranceEndLimit'] = value;
  //return row.InsuranceEndLimit= value;
  console.log('kkkkkkkk',this.InsuAmount);
 }
 freight(row,value,index){
  //return row.Freight=value;
  this.ProductInfo[index]['UserFreight'] = value;
  this.freig=row.Freight;
  console.log('ggggggggggg',this.freig);
 }


 productedit(){
  const urlLink = `${this.ApiUrl1}admin/user/product/edit`;
    const reqData = {
      "AgencyCode": this.agentCode,
     "BranchCode": this.BranchCode,
     "UserAgencyCode":this.Uacode
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.ProductInfo = data?.Result.CommisionResponse;
        this.pro=data?.Result.CommisionResponse;
        this.editspro = data?.Result.CommisionResponse[1];
        console.log('ttttttt',this.ProductInfo)
      },
      (err) => { },
    );
 }
  productInsert($event,row){
    /*let product = [{
      "InsuranceEndLimit":row.InsuranceEndLimit,
      "PayReceipt": "",
      "ProductId": "11",
      "ProductName":row.ProductName,
      "ProductYN": "",
      "SpecialDiscount":row.SpecialDiscount,
      "UserFreight": row.UserFreight
  }];*/
  let product;let open:any;

  /*if(this.pro='Y'){
    this.ProductInfo=[{
      "InsuranceEndLimit":row.InsuranceEndLimit,
      "PayReceipt": "Y",
      "ProductId": row.ProductId,
      "ProductName":row.ProductName,
      "ProductYN": this.pro,
      "SpecialDiscount":row.SpecialDiscount,
      "UserFreight":row.Freight,
    }]
  }*/
  
  if(this.openCover){
    open=this.openCover
  }
  else{
    open=null
  }
  if(this.openCovers!=null){
    product=this.openCovers
  }
  else{
    product=null;
  }
  console.log('kkkkkkkk',$event);
  console.log('rrrrrrrr',row);
 
/*if ($event.isTrusted === true) {
    product = [{
    "InsuranceEndLimit":row.InsuranceEndLimit,
    "PayReceipt": "",
    "ProductId": "11",
    "ProductName":row.ProductName,
    "ProductYN": "",
    "SpecialDiscount":row.SpecialDiscount,
    "UserFreight": row.UserFreight
}];
}*/

/*product = [{
  "InsuranceEndLimit":row.InsuranceEndLimit,
  "PayReceipt": "",
  "ProductId": "11",
  "ProductName":row.ProductName,
  "ProductYN": "",
  "SpecialDiscount":row.SpecialDiscount,
  "UserFreight": row.UserFreight
}];*/
console.log('jjjjjjjj',row);
    let ReqObj={
      
  "AgencyCode": this.AgencyCode,
  "CustomerId":  this.CustomerId,
  "CustomerName": "",
  "OpenCoverInfo":product,
  "ProductInfo":this.ProductInfo, 
  "UserAgencyCode":this.Uacode
    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/UserMgtProductInsert`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Message=='Success'){
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
          this.router.navigate(['/Marine/loginCreation/existingUser'])

        }
       
      }

    )
  }

  checkUWValue(rowData,value) {
    //console.log('FFFFFFFFFFFFFFF',rowData)
    return rowData.Freight == value;
   
  }

  checkUWValues(rowData,value){
    //this.handleSelected(rowData);
    return rowData.ProductYN == value;
  }


  region(){

    console.log('HHHHHHHH')
    let RegionList= [];

    RegionList.push(this.ProList)
    //this.productInsert(RegionList)
    console.log('NNNNNNNNNN',RegionList)

  }

  onUserType() {
    const urlLink = `${this.ApiUrl1}admin/getAdminUserTypeList`;
    const reqData = {
      "ApplicationId": "2",
      "BranchCode": this.BranchCode
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.userType= data?.Result|| [];
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
  /*getTitle() {
    let ReqObj = {
      "BranchCode": this.BranchCode
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


  ChangePassword(){
    const urlLink = `${this.ApiUrl1}admin/IssuerChangePassword`;
    const reqData = {
      "LoginId":this.LoginId,
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
        }

       
      },
      (err) => { },
    );
  }

  onAddRow(){
    let entry = [{
      "InsuranceEndLimit": "",
      "PayReceipt": "",
      "ProductId": "11",
      "ProductName": "",
      "ProductYN": "",
      "SpecialDiscount": "",
      "UserFreight": ""
    }]
    this.ProductInfo = entry.concat(this.ProductInfo);
  }

}

 