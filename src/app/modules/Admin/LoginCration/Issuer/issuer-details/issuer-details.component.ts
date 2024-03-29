import { SessionStorageModel } from './../../../../../shared/storage/session-storage-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
//import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Issuer } from './IssuerModel';
import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../../login/login.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
@Component({
  selector: 'app-issuer-details',
  templateUrl: './issuer-details.component.html',
  styleUrls: ['./issuer-details.component.scss']
})
export class IssuerDetailsComponent implements OnInit {
  public userList:any[]=[];
  
  activeMenu:any;
  public IssuerForm: FormGroup;
  public min: Date = new Date();picker1
  public branchList:any []=[];
  userType:any;userName:any;LoginId:any;
  public regionList:any[]=[];
  password:any;
  NPassword:any;
  EPassword:any;
  StatusList:any[]=[]; regionId:any;
  branchId:any;
  Password:any;
  UnderWriter: any;
  Products:any;
  EmailId:any;
  Status:any;
  AttachedBranch:any;
  ExcludedMenus:any;
  Brokers:any;
  value:any="View";
  BranchCode: any;
  IssuerDetails:any;
  editdata=false;
  productNameList:any[]=[];
  coverList:any[]=[];
  ExcludedList:any[]=[];
  minDate:any;
  UserName:any;
  public AppConfig: any = (Mydatas as any).default;
 public ApiUrl1: any = this.AppConfig.ApiUrl1;
  LoginUserType: any;
  OptionMode: any;
  BrokerLinkLocation: any;
  AttachedBranchList:any[]=[];
  columnIncluded:any[]=[];
  IncludedData:any[]=[];
  ExcludedData:any[]=[];
  columnExcluded:any[]=[];
  userDetails:any;ProductInfos:any[]=[];
  

  constructor(private router: Router,private masterSer: MastersService,private adminReferralService: AdminReferralService,private datePipe:DatePipe,
    private toastrService:NbToastrService,private loginService: LoginService) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.activeMenu = "Issuer";
    this.IssuerDetails=new Issuer();
    this.minDate=new Date();
    this.StatusList=[{"Code":"Y","CodeDesc":"Active"},
    {"Code":"N","CodeDesc":"DeActive"},
    {"Code":"D","CodeDesc":"Delete"},
    {"Code":"T","CodeDesc":"Lock"},
];
  }
  ngOnInit(): void {
    let IssuerObj= JSON.parse(sessionStorage.getItem('editIssuerId'));
    this.BranchCode = IssuerObj?.BranchCode;
     this.LoginId = IssuerObj.LoginId;

    if(this.LoginId!=null && this.LoginId!=undefined){
      this.getEditIssuerDetails();
      this.editdata=false;
        this.OptionMode="edit"
      
    }
    else{
      this.IssuerDetails = new Issuer();

      this.BranchCode = IssuerObj.BranchCode;
      console.log('jjjjjjjj',this.BranchCode);
      this.IssuerDetails.LoginId = IssuerObj.LoginId;
      this.editdata=true;
      this.OptionMode="";
      this.Status="Y";
      this.IssuerDetails.LoginId=""
      this.IssuerDetails.AttachedRegion=[];
      this.IssuerDetails.AttachedBranch=[];
      this.IssuerDetails.ProductId=[];
      //if(this.CityDetails?.Status==null)  this.CityDetails.Status = 'Y';
    }

this.onGetRegionList();
  }
  ongetBack()
  {
    this.router.navigate(['/Marine/loginCreation/issuer']);
  }
  onProceed(){

  }
  onRedirect(value){
    this.value=value;
    if(value == 'View'){

    }
    else if(value == 'ChangePassword'){
    }

    else if(value == 'Included'){
      this.Search();
    }
    else if(value == 'Excluded'){
        this.SearchExcluded();
    }

  }
  getEditIssuerDetails(){

    let ReqObj =  {
      "BranchCode": this.BranchCode,
      "LoginId": this.LoginId,

  }
    let urlLink = `${this.ApiUrl1}admin/getIssuerInformation`;
  this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      let res:any = data;
      if(res.Result){
        this.IssuerDetails = res.Result[0];
        this.Status= this.IssuerDetails.Status;

        this.CommaFormatted();
        this.BranchComma();
        //this.AttachedBranches(this.IssuerDetails.AttachedRegion);
        this.onGetBranchList('direct');
        this.onGetRegionList();
        this.ProductComma();
        if(this.IssuerDetails){
          if(this.IssuerDetails?.InceptionDate!=null){

           this.IssuerDetails.InceptionDate = this.onDateFormatInEdit(this.IssuerDetails?.InceptionDate)
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

  onGetBranchList(para:any) {
    if(para=='change'){
      this.BranchCode=null;
    }
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.IssuerDetails.RegionCode,
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
        this.onGetProductList(); 

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
  /*onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    const reqData = {
      "RegionCode": "01"
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.regionList = data?.Result || [];
        this.onGetProductList();
      },
      (err) => { },
    );
  }*/

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

  changeRegion(para){

    let uwList=[];
       console.log('hhh',this.IssuerDetails.AttachedRegion)
    if(this.IssuerDetails.AttachedRegion.length!=0){
      let i=0;
      for(let uw of this.IssuerDetails.AttachedRegion){
  
        console.log('ueeee',uw)
        let entry = {"RegionCode":uw}
        uwList.push(entry);
        console.log('uuuuuu',uwList)
        i++;
        if(i==this.IssuerDetails.AttachedRegion.length) 
        if(para=='change'){
          this.AttachedBranches(uwList,'change');
        }
        else{
          this.AttachedBranches(uwList,'direct');
        }
        //this.AttachedBranches(uwList);
      }
    }
    //else this.AttachedBranches(uwList)
  
  }
  AttachedBranches(region,para){
    if(para=='change'){
      this.IssuerDetails.AttachedBranch=null;
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
  region(){
    let RegionList= [];
    if(this.IssuerDetails.AttachedRegion.length!=0){
      let i=0;
        for(let u of this.IssuerDetails.AttachedRegion){      
        let entryRegion={"RegionCode":u}    
        RegionList.push(entryRegion);
        i++;
        if(i==this.IssuerDetails.AttachedRegion.length) this.AttachedBranchFinal(RegionList);
      }
    
    }
    else this.AttachedBranchFinal(RegionList)
  }

  AttachedBranchFinal(RegionList){
    let BranchList= [];
    if(this.IssuerDetails.AttachedBranch.length!=0){
      let i=0;
        for(let u of this.IssuerDetails.AttachedBranch){      
        let entryRegion={"AttachedBranchId":u}    
        BranchList.push(entryRegion);
        i++;
        if(i==this.IssuerDetails.AttachedBranch.length) this.ProductsList(RegionList,BranchList);
      }
    
    }
    else this.ProductsList(RegionList,BranchList)
  }
  
 ProductsList(RegionList,BranchList){
    let ProductList= [];
    if(this.IssuerDetails.ProductId.length!=0){
      let i=0;
        for(let u of this.IssuerDetails.ProductId){      
        let entryRegion={"ProductId":u}    
        ProductList.push(entryRegion);
        i++;
        if(i==this.IssuerDetails.ProductId.length) this.onSaveIssuer(RegionList,BranchList,ProductList); 
      }
    
    }
    else this.onSaveIssuer(RegionList,BranchList,ProductList)
  }

  
  onSaveIssuer(RegionList,BranchList,ProductList) {
    if(this.LoginUserType==null || this.LoginUserType==undefined)
    {
 this.LoginUserType="";
    }
    if(this.OptionMode==null || this.OptionMode==undefined)
    {
  this.OptionMode="";
    }

    
    if(this.BrokerLinkLocation==null || this.BrokerLinkLocation==undefined)
    {
      this.BrokerLinkLocation="";
    }
    if(this.password==null || this.password==undefined)
    {
      this.Password="";
    }

    let ReqObj = {

        "AttachedBranchInfo":BranchList, 
        "AttachedRegionInfo":RegionList,
        "BranchCode": this.BranchCode,
        "BrokerLinkLocation": this.BrokerLinkLocation,
        "CoreLoginId": this.IssuerDetails.CoreLoginId,
        "EffectiveDate": this.IssuerDetails.InceptionDate,
        "EmailId": this.IssuerDetails.UserMail,
        "IssuerName": this.IssuerDetails.UserName,
        "LoginId": this.IssuerDetails.LoginId,
        "LoginUserType":"Issuer",
        "OptionMode": this.OptionMode,
        "Password": this.password,
        "ProductInfo":ProductList,
        "RegionCode":this.IssuerDetails.RegionCode,
        "Status": this.Status,

      }
      let urlLink = `${this.ApiUrl1}admin/AdminNewIssuerInsert`;

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
                    'Issuer Details Inserted/Updated Successfully',
                    'Issuer Details',
                    config);
                    this.router.navigate(['/Marine/loginCreation/issuer']);

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

  CommaFormatted() {
     var str = this.IssuerDetails.AttachedRegion;
  this.IssuerDetails.AttachedRegion= str.split(',');
  this.IssuerDetails.AttachedRegion = this.IssuerDetails.AttachedRegion.filter(item => item);
    console.log('kk',this.IssuerDetails.AttachedRegion);
    this.AttachedBranches(this.IssuerDetails.AttachedRegion,'direct');
  }

  BranchComma(){
    var str = this.IssuerDetails.AttachedBranch;
  this.IssuerDetails.AttachedBranch= str.split(',');
  this.IssuerDetails.AttachedBranch = this.IssuerDetails.AttachedBranch.filter(item => item);
    console.log('BBB',this.IssuerDetails.AttachedBranch)
  }

  ProductComma(){
    var str = this.IssuerDetails.ProductId;
  this.IssuerDetails.ProductId= str.split(',');
  this.IssuerDetails.ProductId = this.IssuerDetails.ProductId.filter(item => item);
    console.log('BBB',this.IssuerDetails.ProductId)
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
                  this.router.navigate(['/Marine/loginCreation/issuer']);

        }
       
      },
      (err) => { },
    );
  }

  Search(){
    const urlLink = `${this.ApiUrl1}admin/IssuerIncludedBroker`;
    const reqData = {
      "BranchCode": this.BranchCode,
      "LoginId": this.LoginId ,  
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res:any = data;
        this.columnIncluded = [
          {
            key: 'actions',
            display: 'select',
            config: {
              isChecked: true,
            }
          },
          {key: 'CompanyName', display: 'Broker Organization'},
         {key: 'ApprovedPreparedBy', display: 'ApprovedPreparedBy'},
         {key: 'ContactPerson', display: 'Customer Name'},
         {key: 'Status', display: 'Status'},
       ];
        if(res.Result){
          
      this.IncludedData=res?.Result;
       console.log('pppppppppp',this.IncludedData)
      }
      },
      (err) => { },
    );
  }


  /*AttachedBranchFinal(uwList,RegionList,ProductList){
    let BranchList= [];
    if(this.AdminDetails.AttachedBranch.length!=0){
      let i=0;
        for(let u of this.AdminDetails.AttachedBranch){      
        let entryRegion={"AttachedBranchId":u}    
        BranchList.push(entryRegion);
        console.log('jjjjjjjjjjjjj',BranchList)
        i++;
        if(i==this.AdminDetails.AttachedBranch.length) 
      this.AttachedMenu(uwList,RegionList,BranchList,ProductList) 
        //this.onFinalSubmit(uwList,RegionList,BranchList,ProductList);
      }
    
    }
    else //this.AttachedMenu(uwList,RegionList,BranchList,ProductList) 
    //else this.onFinalSubmit(uwList,RegionList,BranchList,ProductList)
  }*/
onselects(row){
  console.log('Rowssssss',row)
  let AttachedRegionNo= [];
  this.ProductInfos=[];
  AttachedRegionNo =row?.ProductId.split(',');
  let i=0;
  if(row?.ProductId){
    console.log('KKKKKKKKK',AttachedRegionNo)
    for(let s of AttachedRegionNo){
      let ProductInfo={"ProductId":s}  
      this.ProductInfos.push(ProductInfo);
      console.log('NNNNNN',this.ProductInfos);
      i+1;
          //ProductId.push(row?.ProductId);
    }
    this.onSelectCustomer(row,'direct');
  }
  
}

  onSelectCustomer(row:any,template){
    console.log("RowData",row.undefined);

    // let ProductInfo=this.onselects(row);
    console.log('jjjjjjjjjjjjjj',this.ProductInfos);
    let ProductId:any;
  console.log('jjjjjjjjjjjjjj');
    if(row.undefined== true){
     
        let entry =  {
          "BranchCode": row.BranchCode,
          "BrokerInfo": [
            {
              "BrokerCode": row?.AgencyCode,
              "ProductInfo":this.ProductInfos
            }
          ],
          "LoginId": this.LoginId
        
        }
        //this.onsubmitInclude(this.coverList);
        this.coverList.push(entry);
  
      console.log("Cover List",this.coverList);
    }
    else if(row.undefined == false){
      let index = this.coverList.findIndex(ele=>ele.AgencyCode==row.AgencyCode);
      this.coverList.splice(index,1);
    }

  }

  onselectexclude(row:any){
    let ProductId:any;
  console.log('jjjjjjjjjjjjjj');
    if(row.undefined== true){
     
        let entry =  {
          "BrokerInfo": [
            {
              "BrokerCode": row?.AgencyCode
            }
          ],
          "LoginId": this.LoginId
        }
        this.ExcludedList.push(entry);
    }
    else if(row.undefined == false){
      let index = this.ExcludedList.findIndex(ele=>ele.AgencyCode==row.AgencyCode);
      this.ExcludedList.splice(index,1);
    }

  }
  includesubmit(value){
     
    if(value=='Included'){
     this.onsubmitInclude(this.coverList,value);
    }
    else if(value=='Excluded'){
      //this.onsubmitInclude(this.coverList,value);
       this.onsubmitExclude(this.ExcludedList,value);
    }
  }

  onsubmitInclude(reqData,types){
    const urlLink = `${this.ApiUrl1}admin/IssuerIncludedInsert`;
let i=0;
    for(let n of reqData){
      this.adminReferralService.onPostMethodSync(urlLink, n).subscribe(
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
                    'Included Successfully',
                    'Included Broker Successfully',
                    config);
                    this.coverList=[];
                    if(types=='Excluded'){
                       this.SearchExcluded()
                    }
                    else if(types=='Included'){
                      this.Search();
                    }
                    //this.router.navigate(['/Marine/loginCreation/issuer']);
  
          }
         
        },
        (err) => { },
      );
      i+1;
    }
  
  }

  onsubmitExclude(reqData:any,value){
    const urlLink = `${this.ApiUrl1}admin/included/delete`;
    let i=0;
    for(let n of reqData){
      this.adminReferralService.onPostMethodSync(urlLink, n).subscribe(
        (data: any) => {
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
                    'Excluded Successfully',
                    'Excluded Broker Successfully',
                    config);
                    this.ExcludedList=[];
                    this.SearchExcluded();
          }
         
        },
        (err) => { },
      );
      i+1;
    }
  }
  SearchExcluded(){
    const urlLink = `${this.ApiUrl1}admin/IssuerExcludedBroker`;
    const reqData = {
      "BranchCode": this.BranchCode,
      "LoginId": this.LoginId ,  
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res:any = data;
        this.columnExcluded = [
          {
            key: 'actions',
            display: 'select',
            config: {
              isChecked: true,
            }
          },
          {key: 'BrokerName', display: 'Broker Organization'},
         {key: 'BrokerCode', display: 'BrokerCode'},
         {key: 'Branch', display: 'Branch'},
         {key: 'Products', display: 'Products'},
         {key: 'Remarks', display: 'Remarks'},
         {key: 'Status', display: 'Status'},
       ];
        if(res.Result){    
      this.ExcludedData=res?.Result;
       console.log('pppppppppp',this.ExcludedData)
      }
      },
      (err) => { },
    );
  }
}
