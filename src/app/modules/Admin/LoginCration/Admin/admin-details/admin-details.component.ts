import { OpenCoverComponent } from './../../../../open-cover/open-cover.component';
import { Component, OnInit, ViewChild,TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Admins } from './AdminModel';
import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';
import { MatDialog } from '@angular/material/dialog';
import { ExcludedPopUpComponent } from '../../ExcludedPopUp/excludedpopup.component';


@Component({
  selector: 'app-details-list',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdmindetailsComponent implements OnInit {
  public BrokerForm: FormGroup;
  branchValue:any;
  public min: Date = new Date();picker1;
  public AppConfig: any = (Mydatas as any).default;
 public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public userList:any[]=[];
  public userDetails: any;
  public branchList:any []=[];
 public regionList:any[]=[];
 MenuList:any[]=[];
 Menulist:any[]=[];

  StatusList:any[]=[]; regionId:any;
  branchId:any;
  AttachedBranchList:any[]=[];

  UnderWriter: any;
  Products:any;
  EmailId:any;
  Status:any;
  AttachedBranch:any;
  ExcludedMenus:any;
  Brokers:any;
  adminData:any[]=[];
  columnHeader:any[]=[];
  AdminDetails: any;
  BranchCode: any;
  LoginId: any;
  productNameList:any[]=[];
  password:any;
  editSection=false;
  userType:any[]=[];
  Brok: any;
  value:any="View";
  EPassword: any;
  NPassword: any;
  clickedModal:any;
  warrantyData:any[]=[];
  exportWarrantyList:any[]=[];
  importWarrantyList:any[]=[];
  BranchBrokerList:any[]=[];
  menuId: any;
  first: boolean=false;
  second: boolean=false;


  constructor(private masterSer: MastersService,private datePipe:DatePipe,
    private toastrService:NbToastrService, private router:Router, private adminReferralService: AdminReferralService,
    private dialog: MatDialog){
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.AdminDetails = new Admins();

    //this.onGetBranchList();
    this.onGetRegionList();
    //this.getEditAdminDetails();
    this.StatusList=[{"Code":"Y","CodeDesc":"Active"},
    {"Code":"N","CodeDesc":"DeActive"},
    {"Code":"D","CodeDesc":"Delete"},
    {"Code":"T","CodeDesc":"Lock"},
];
this.exportWarrantyList=[{
  "Export":"Export List"
}];
this.onGetProductList()

//this.brokert();
/*this.userList=[{"Code":"6","CodeDesc":"6"},
{"Code":"7","CodeDesc":"7"},
{"Code":"8","CodeDesc":"8"},
{"Code":"9","CodeDesc":"9"},
];*/
//this.userType=[{"Code":"admin","CodeDesc":"admin"}]

  }
  ngOnInit(): void {
    let AdminObj = JSON.parse(sessionStorage.getItem('editAdminId'));
    //let password =sessionStorage.removeItem("password");
    //let password=sessionStorage.getItem('password');
     this.BranchCode = AdminObj?.BranchCode;
     console.log('kkkkkkkkk',this.BranchCode)
     this.LoginId = AdminObj.LoginId;

    if(this.LoginId!=null && this.LoginId!=undefined){
      this.getEditAdminDetails();
      this.editSection=false;


    }

    else{
      this.AdminDetails = new Admins();
      this.BranchCode = AdminObj.BranchCode;
      this.AdminDetails.LoginId = AdminObj.LoginId;
      this.editSection=true;
      //if(this.CityDetails?.Status==null)  this.CityDetails.Status = 'Y';
    }
    this.onUserType();
    //this.brokert();
    

  }
  ongetBack()
  {
    this.router.navigate(['/Marine/loginCreation/admin'])
  }
  onProceed(){

  }
  /*getExistingAdmin(){

    let ReqObj = {
       "BranchCode": this.branchValue
   }

    let urlLink = `${this.ApiUrl1}admin/getAdminList`;
 this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
   (data: any) => {
     if (data?.Message === 'Success') {
       console.log(data);
       this.columnHeader = [
         {key: 'S.No', display: 'S.No'},
         {key: 'LoginId', display: 'Login Id'},
         {key: 'UserName', display: 'User Name'},
         {key: 'UserType', display: 'User Type'},
         {key: 'Branch', display: 'Branch'},
        {key: 'EffectiveDate', display: 'Effective Date'},
         {key: 'Status', display: 'Status'},
         {
           key: 'actions',
           display: 'Edit',
           config: {
             isEdit: true,
           }
         }
       ];
       this.adminData = data?.Result;
     }
   }, (err) => { }
 );
}*/
getEditAdminDetails(){

  let ReqObj =  {
    "BranchCode": this.BranchCode,
    "LoginId": this.LoginId,

}
  let urlLink = `${this.ApiUrl1}admin/getAdminEditList`;
this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
  (data: any) => {
    console.log(data);
    let res:any = data;
    if(res.Result){
      this.AdminDetails = res.Result[0];
           this.Status= res.Result[0].Status;
           //this.Brok=this.AdminDetails.BrokerCode;

      this.onGetBranchList('direct');
      this.CommaFormatted();
      this.BranchComma();
      this.UnderWriters();
      this.ProductComma();
      this.changeMenu('direct');
      //this.AttachedBranches(this.AdminDetails.AttachedRegion);
      if(this.AdminDetails){
        if(this.AdminDetails?.EffectiveDate!=null){

         this.AdminDetails.EffectiveDate = this.onDateFormatInEdit(this.AdminDetails?.EffectiveDate)
        }

        /*if(this.AdminDetails?.EffectiveDateEnd!=null){
          this.AdminDetails.EffectiveDateEnd = this.onDateFormatInEdit(this.AdminDetails?.EffectiveDateEnd)
        }*/
  
  


      }
    }
    console.log("Final Admin Class",this.AdminDetails);
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
onGetBranchList(para:any) {
  if(para=='change'){
    this.BranchCode=null;
  }
  const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
  const reqData = {
    'RegionCode': this.AdminDetails.RegionCode,
  };
  this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
    (data: any) => {
      console.log(data);
      this.branchList = data|| [];
      //this.onGetProductList();
      //this.onGetRegionList();
    },
    (err) => { },
  );
}
onGetRegionList() {
  const urlLink = `${this.ApiUrl1}admin/region/list`;
  const reqData = {
    "RegionCode": "01"
  };
  this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
    (data: any) => {
      console.log('yyyyyyyy',data.Result);
      this.regionList = data?.Result || [];
     
      //this.onGetProductList();
      this.onGetUnderwriter();
    },
    (err) => { },
  );
}

onGetProductList() {
    let login
  /*if(this.LoginId==null){
    login=null
  }
  else{
    login=this.LoginId;
  }*/
  const urlLink = `${this.ApiUrl1}opencover/dropdown/referral/quoteproduct`;
  const reqData = {
    "LoginId":this.LoginId,
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

onGetUnderwriter() {
  const urlLink = `${this.ApiUrl1}admin/getUnderWriterGradeList`;
  // const reqData = {
  //   "LoginId": this.LoginId,
  //   "BranchCode": this.BranchCode
  // };
  this.adminReferralService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      console.log(data);
      this.userList = data?.Result || [];
    },
    (err) => { },
  );
}
onSaveAdmin() {

  console.log('UnderWriter', this.AdminDetails.UnderWriter)

  let uwList= []; 
  if(this.AdminDetails.AttachedUnderWriter.length!=0){
    let i=0
    for(let uw of this.AdminDetails.AttachedUnderWriter){
      let entry = {"UnderWriter":uw}
      uwList.push(entry);
      i++;
      if(i==this.AdminDetails.AttachedUnderWriter.length) this.Product(uwList);
    }
   
  }
  else this.Product(uwList)

  
}

Product(uwList){
  let ProductList= [];
  if(this.AdminDetails.ProductId.length!=0){
    let i=0;
      for(let u of this.AdminDetails.ProductId){      
      let entryRegion={"ProductId":u}    
      ProductList.push(entryRegion);
      i++;
      if(i==this.AdminDetails.ProductId.length) this.region(uwList,ProductList);
    }
  
  }
  else this.region(uwList,ProductList)
}

changeMenu(para){

  let menuList=[];
     console.log('bbbbbbbbbbb',this.AdminDetails.ProductId)
  if(this.AdminDetails.ProductId.length!=0){
    let i=0;
    for(let uw of this.AdminDetails.ProductId){

      console.log('ueeee',uw)
      let entry = {"ProductId":uw}
      menuList.push(entry);
      console.log('uuuuuu',menuList)
      //i++;
      this.Menu(menuList,'change')
      //if(i==this.AdminDetails.ProductId) this.Menu(menuList,'change');
        /*if(para=='change'){
          this.Menu(menuList,'change');
        }
        else{
          this.Menu(menuList,'direct');
        }*/
      
      /*if(para=='change'){
        this.Menu(menuList,'change');
      }
      else{
        this.Menu(menuList,'direct');
      }*/
      //this.AttachedBranches(uwList);
    }
  }
  //else this.AttachedBranches(uwList)

}

region(uwList,ProductList){
  let RegionList= [];
  if(this.AdminDetails.AttachedRegion.length!=0){
    let i=0;
      for(let u of this.AdminDetails.AttachedRegion){      
      let entryRegion={"RegionCode":u}    
      RegionList.push(entryRegion);
      i++;
      if(i==this.AdminDetails.AttachedRegion.length) this.AttachedBranchFinal(uwList,RegionList,ProductList);
    }
  
  }
  else this.AttachedBranchFinal(uwList,RegionList,ProductList)
}
changeRegion(para:any){

  let uwList=[];
     console.log('hhh',this.AdminDetails.AttachedRegion)
  if(this.AdminDetails.AttachedRegion.length!=0){
    let i=0;
    for(let uw of this.AdminDetails.AttachedRegion){

      console.log('ueeee',uw)
      let entry = {"RegionCode":uw}
      uwList.push(entry);
      console.log('uuuuuu',uwList)
      i++;
      if(i==this.AdminDetails.AttachedRegion.length)
      if(para=='change'){
        this.AttachedBranches(uwList,'change')
      } 
      else{
        this.AttachedBranches(uwList,'direct');
      }
      //this.AttachedBranches(uwList,'direct');
    }
  }
  //else this.AttachedBranches(uwList)

}



AttachedBranchFinal(uwList,RegionList,ProductList){
  let BranchList= [];
  if(this.AdminDetails.AttachedBranch.length!=0){
    let i=0;
      for(let u of this.AdminDetails.AttachedBranch){      
      let entryRegion={"AttachedBranchId":u}    
      BranchList.push(entryRegion);
      i++;
      if(i==this.AdminDetails.AttachedBranch.length) this.AttachedMenu(uwList,RegionList,BranchList,ProductList) 
      //this.onFinalSubmit(uwList,RegionList,BranchList,ProductList);
    }
  
  }
  else this.AttachedMenu(uwList,RegionList,BranchList,ProductList) 
  //else this.onFinalSubmit(uwList,RegionList,BranchList,ProductList)
}

AttachedMenu(uwList,RegionList,BranchList,ProductList){
  let MenuList= [];
  if(this.AdminDetails.MenuId.length!=0){
    let i=0;
      for(let u of this.AdminDetails.MenuId){      
      let entryRegion={"MenuId":u}    
      MenuList.push(entryRegion);
      i++;
      if(i==this.AdminDetails.AttachedBranch.length) this.AttachBrokercode(uwList,RegionList,BranchList,ProductList,MenuList) 
      //this.onFinalSubmit(uwList,RegionList,BranchList,ProductList);
    }
  
  }
  else this.AttachBrokercode(uwList,RegionList,BranchList,ProductList,MenuList) 
}

AttachBrokercode(uwList,RegionList,BranchList,ProductList,MenuList){
  let BrokerList= [];
  if(this.Brok.length!=0){
    let i=0;
      for(let u of this.Brok){      
      let entryRegion={"BrokerCode":u}    
      BrokerList.push(entryRegion);
      console.log('lllllllllll',BrokerList)
      i++;
      if(i==this.AdminDetails.AttachedBranch.length) this.onFinalSubmit(uwList,RegionList,BranchList,ProductList,MenuList,BrokerList);
    }
  
  }
  else this.onFinalSubmit(uwList,RegionList,BranchList,ProductList,MenuList,BrokerList)
}
AttachedBranches(region,para){
  if(para =='change'){
    this.AdminDetails.AttachedBranch=null;
  }
  let ReqObj = 
  {
    "AgencyCode": "",
  "RegionCodeInfo":region 
}
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getAttachedBranchDetails`, ReqObj).subscribe(
    (data: any) => {
      console.log('ssssssss',data);
      this.AttachedBranchList= data || [];
    }
  )

}

/*onregion(){
  console.log('UnderWriter', this.AdminDetails.UnderWriter)

  let RegionList= [];
  if(this.AdminDetails.RegionCode.length!=0){
    let i=0;
    for(let uw of this.AdminDetails.RegionCode){
      let entry = {"RegionCode":uw}
      RegionList.push(entry);
      i++;
      if(i==this.AdminDetails.UnderWriter.length) this.onFinalSubmit();
    }
  }
  else this.onFinalSubmit(uwList)
}*/

CommaFormatted() {
  
  var str = this.AdminDetails.AttachedRegion;
this.AdminDetails.AttachedRegion= str.split(',');
this.AdminDetails.AttachedRegion = this.AdminDetails.AttachedRegion.filter(item => item);

  console.log('kk',this.AdminDetails.AttachedRegion);
  this.AttachedBranches(this.AdminDetails.AttachedRegion,'direct');
}

ProductComma(){
  var str = this.AdminDetails.ProductId;
this.AdminDetails.ProductId= str.split(',');
this.AdminDetails.ProductId = this.AdminDetails.ProductId.filter(item => item);
  console.log('pppppp',this.AdminDetails.ProductId);
}
BranchComma(){
  var str = this.AdminDetails.AttachedBranch;
this.AdminDetails.AttachedBranch= str.split(',');
this.AdminDetails.AttachedBranch = this.AdminDetails.AttachedBranch.filter(item => item);

// for(var i = 0; i < this.AdminDetails.AttachedBranch.length; i++)
// {
//    //console.log(this.AdminDetails.AttachedRegion[i]);
// }
  console.log('BBB',this.AdminDetails.AttachedBranch)
}

//ProductComma()
UnderWriters(){
  var str = this.AdminDetails.AttachedUnderWriter;
  this.AdminDetails.AttachedUnderWriter= str.split(',');
  
  /*for(var i = 0; i < this.AdminDetails.AttachedUnderWriter.length; i++)
  {
     //console.log(this.AdminDetails.AttachedRegion[i]);
  }*/
  this.AdminDetails.AttachedUnderWriter = this.AdminDetails.AttachedUnderWriter.filter(item => item);
  //var sparseArray = this.AdminDetails.AttachedUnderWriter;
  //this.AdminDetails.AttachedUnderWriter= sparseArray.filter(function () { return true });

    console.log('BBB',this.AdminDetails.AttachedUnderWriter)
}
onFinalSubmit(uwList,RegionList,BranchList,ProductList,MenuList,BrokerList){

  
  let ReqObj = {

    "AttachedBranchInfo": BranchList,
    "AttachedRegionInfo": RegionList,
    "BranchCode": this.BranchCode,
    "BrokerInfo":BrokerList,
    "Email":  this.AdminDetails.UserMail,
    "LoginId":  this.AdminDetails.LoginId,
    "MenuInfo":MenuList,
    "Mode":  this.AdminDetails.Mode,
    "Password":  this.password,
    /*"ProductInfo": [
      {
        "ProductId":  this.AdminDetails.ProductId,
      }
    ],*/
    "ProductInfo":ProductList,
    "RegionCode":  this.AdminDetails.RegionCode,
    "Status":  this.Status,
    "UnderWriterInfo": uwList,
    "UserName":  this.AdminDetails.UserName,
    "UserType":  this.AdminDetails.UserType,
    "EffectiveDate":this.AdminDetails.EffectiveDate
  }

let urlLink = `${this.ApiUrl1}admin/NewAdminInsert`;

if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
  ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
}
else{
  ReqObj['EffectiveDate'] = "";
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
                'Admin Details Inserted/Updated Successfully',
                'Admin Details',
                config);
                this.router.navigate(['/Marine/loginCreation/admin'])
                //this.router.navigate(['/Admin/countryMaster/cityList'])

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

onRedirect(value){
  this.value=value;
  if(value == 'View'){

  }
  else if(value == 'ChangePassword'){
  }

}


ChangePassword(){
  const urlLink = `${this.ApiUrl1}admin/IssuerChangePassword`;
  const reqData = {
    "LoginId":this.LoginId,
   "Password": this.EPassword,
   "RePassword": this.NPassword
  };
  this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
    (data: any) => {
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
                'Password Changed Successfully',
                config);
                this.router.navigate(['/Marine/loginCreation/admin'])
                //this.router.navigate(['/Admin/countryMaster/cityList'])

      }
      console.log("Change Password Done Successfully");
     
    },
    (err) => { },
  );
}
Back(){
  this.value="View"
}


Menu(menuList,para){

  console.log('jjjjjjjj',menuList)
  let ReqObj = 
  {
    "BranchCode": this.BranchCode,
    "ProductInfo":menuList
}
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getProductsWiseMenuList`, ReqObj).subscribe(
    (data: any) => {
      console.log('ssssssss',data);
      this.MenuList= data.Result[0].MenuInfo|| [];
        /*let i=0;  
      for(let menu of this.MenuList){
           this.Menulist=menu.MenuInfo;
           i++;
      }*/
      console.log('MEEEEEEEE',this.MenuList)
    }
  )

}


@ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
openDialogWithoutRef(war: string,menulist) {

console.log('kkkkkkkkkkkk',menulist)
  if (war === 'export') {
    this.first=true;
    this.second=false;
    this.clickedModal = war;
    this.warrantyData = menulist;
  }
  if (war === 'import') {
    this.second=true;
    this.first=false;
    this.clickedModal = war;
    this.warrantyData = this.BranchBrokerList;

  }
  this.dialog.open(this.secondDialog);

}

brokert(){


  let ReqObj = 
  {
    "BranchCode": this.BranchCode,
     "ApplicationId":"2"
}
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getAdminBrokerList`, ReqObj).subscribe(
    (data: any) => {
      console.log('ssssssss',data);
      this.BranchBrokerList= data.Result || [];
      this.openDialogWithoutRef('import', this.BranchBrokerList)
      console.log('NNNNNNNNNNNNN',this.BranchBrokerList)
    }
  )

}





onsubmit(){
  const selectedList: any[] = this.warrantyData.filter((ele: any) => ele.isChecked === true);
  let selectedListId: any = '';

  if(this.clickedModal === 'export'){
  for (let index = 0; index < selectedList.length; index++) {
    //const element = selectedList[index];
    const element = selectedList[index];
        if(index === 0){
          selectedListId += element.MenuId;
        }
        else if(index !== 0){
          selectedListId += ',' + element.MenuId;
         }
    this.dialog.closeAll();
  }
}

if(this.clickedModal === 'import'){
for (let index = 0; index < selectedList.length; index++) {
  //const element = selectedList[index];
  const element = selectedList[index];
      if(index === 0){
        selectedListId += element.CustomerId;
      }
      else if(index !== 0){
        selectedListId += ',' + element.CustomerId;
       }
  this.dialog.closeAll();
}
}
  if (this.clickedModal === 'import') {
    this.second=true;
    this.Brok=selectedListId;

  }
  if (this.clickedModal === 'export') {
   this.AdminDetails.MenuId=selectedListId;
   console.log('oooooooooo',this.AdminDetails.MenuId);

  }
}

onSelected(arrayaside:string){

}

onMoveAll(arrayside:string){

}

onMoveGroupWise(arrayside:string){

}


openDialog(){
  
            const dialogRef = this.dialog.open(ExcludedPopUpComponent,{
              data: {
                title: 'State Details',
                list: this.MenuList
              }
            });
        
            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);

              this.menuId=result.MenuId;
              console.log('jjjjjj',this.menuId)
            });
           
       
}


/*onSelected(arrayaside: string) {
  if (arrayaside === 'right') {
    const selectedCountry = this.excludedCountry.filter((ele: any) => ele.isOrigin === true);
    selectedCountry.map((ele: any) => ele.isOrigin = false);
    this.includedCountry.push(...selectedCountry);
    for (let index = 0; index < selectedCountry.length; index++) {
      const element = selectedCountry[index];
      const idx = this.excludedCountry.findIndex((ele: any) => ele.CodeValue === element.CodeValue);
      this.excludedCountry.splice(idx, 1);
    }
  }
  if (arrayaside === 'left') {
    const selectedCountry = this.includedCountry.filter((ele: any) => ele.isOrigin === true);
    selectedCountry.map((ele: any) => ele.isOrigin = false);
    this.excludedCountry.push(...selectedCountry);
    for (let index = 0; index < selectedCountry.length; index++) {
      const element = selectedCountry[index];
      const idx = this.includedCountry.findIndex((ele: any) => ele.CodeValue === element.CodeValue);
      this.includedCountry.splice(idx, 1);

    }
  }
}
onMoveAll(arrayaside: string) {
  if (arrayaside === 'right') {
    this.includedCountry = [...this.includedCountry, ...this.excludedCountry];
    this.excludedCountry = [];
  }
  if (arrayaside === 'left') {
    this.excludedCountry = [...this.excludedCountry, ...this.includedCountry];
    this.includedCountry = [];
  }
}

async onMoveGroupWise(name: string, arrayaside: string, list: any[]) {
  if (arrayaside === 'right') {
    let result: any[] = await this.excludedCountry.filter(ele => list.some(Code => ele.CodeValue === Code));
    if (result.length > 0) {
      this.includedCountry.push(...result);
      console.log(this.excludedCountry, result, list,this.includedCountry);
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        const idx = this.excludedCountry.findIndex((ele: any) => ele.CodeValue === element);
        if (idx !== -1) {
          this.excludedCountry.splice(idx, 1);
        }
      }
    }



  }
  if (arrayaside === 'left') {
    let result: any[] = await this.includedCountry.filter(ele => list.some(Code => ele.CodeValue === Code));
    if (result.length > 0) {
      console.log(result, this.includedCountry);
      this.excludedCountry.push(...result);
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        const idx = this.includedCountry.findIndex((ele: any) => ele.CodeValue === element);
        if (idx !== -1) {
          this.includedCountry.splice(idx, 1);
        }
      }
    }
  }
}*/
}
