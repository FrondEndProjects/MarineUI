import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
import { SharedService } from '../../../../../shared/shared.service';
import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';
import { Router } from '@angular/router';
/*
import { AuthenticateService } from '../../../../../../../authenticate.service';
import { BrokerMgmEditComponent } from '../../grid-button/broker-mgm-edit/broker-mgm-edit.component';
import { Router } from '@angular/router';
import { SearchFilterPipe } from '../../../search-filter/search-filter.pipe';*/


@Component({
  selector: 'app-existing-user-list',
  templateUrl: './existing-user-list.component.html',
  styleUrls: ['./existing-user-list.component.scss']
})
export class ExistingUserListComponent implements OnInit {
  userDetails: any;
  public filterValue;
  branchCode: any;
  public columnHeader: any[] = [];
 public AppConfig: any = (Mydatas as any).default;
 public ApiUrl1: any = this.AppConfig.ApiUrl1;
 public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
 branchList:any[]=[];
 branchValue:any;
 public adminData: any;
 AgencyCode:any;
 Agentcode:any;
 first:boolean=false;
  constructor( private masterSer: MastersService,
    private router: Router,private sharedService: SharedService,  private adminReferralService: AdminReferralService,) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      //this.userDetails = this.userDetails?.LoginResponse;
      console.log(this.userDetails);
      //this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     //const user = this.userDetails?.Result;
     //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
   
      let entry = JSON.parse(sessionStorage.getItem('editUserId'));
      console.log('llllllllllll',entry)
      if(entry) {
        this.branchValue = entry?.BranchCode;
      }
      else if (this.userDetails) {
        this.branchValue = this.userDetails?.LoginResponse.BranchCode;
      }
      //this.getBranchList()
        

    }

  ngOnInit(): void {
    let set=sessionStorage.getItem('item')
    this.AgencyCode=set;

    if(this.AgencyCode){
     console.log('MMMMMMMMMM',this.AgencyCode)
       this.Agentcode=this.AgencyCode;
       this.first=true;
       
    }
    else{
     this.Agentcode=null;
     console.log('kkkkkkkkk',this.first)
     this.first=false;
     sessionStorage.removeItem('item')
 
    }
    this.onGetBranchList();
  }

  back(){
    this.router.navigate(['/Marine/loginCreation/existingBrokers']);
    sessionStorage.removeItem('item');
  }
  onGetBranchList() {
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
  }

  goToAddNewPage(){
    //sessionStorage.setItem("password","true");
    let entry = {
      "BranchCode": this.branchValue,
      "LoginId":null, 
      "AgencyCode":null,
      "Edit":"N"
    }
    sessionStorage.setItem('editUserId',JSON.stringify(entry));

    this.router.navigate(['/Marine/loginCreation/existingUser/newUserDetails']);

   }

  getExistingAdmin(){

    let ReqObj = {
       "BranchCode": this.branchValue,
       "AgencyCode":this.Agentcode
   }

    let urlLink = `${this.ApiUrl1}admin/getUserMgtList`;
 this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
   (data: any) => {
     if (data?.Message === 'Success') {
       console.log(data);
       this.columnHeader = [
         {key: 'LoginId', display: 'Login Id'},
         {key: 'CompanyName', display: 'Company Name'},
         {key: 'BrokerName', display: 'Broker Name'},
         {key: 'UserType', display: 'User Type'},
         //{key: 'Branch', display: 'Branch'},
        {key: 'CreateDate', display: 'Create Date'},
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
}

onEdit(rowdata:any){
  let entry = {
    "BranchCode": this.branchValue,
    "LoginId": rowdata.LoginId,
    "AgencyCode":rowdata.AgencyCode,
    "Edit":"Y"

  }
  sessionStorage.setItem('editUserId',JSON.stringify(entry));
  //sessionStorage.setItem("password",'false');
  //sessionStorage.removeItem("password");
  this.router.navigate(['/Marine/loginCreation/existingUser/newUserDetails']);


}
public applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
}

/*getRowHeight: (params: any) => number;
  public columnDefs;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  searchValue: SearchFilterPipe;
  public p: number = 1;
  userSection: boolean;
  constructor(private service : AuthenticateService,private router:Router) {
    sessionStorage.removeItem('UserMgmEditData')
    this.getRowHeight = function(params) {
      if (params.node.level === 0)
        return 65;
    }
    this.setUserMgmList();
  }
  collapseone(val,index){
    console.log("#close"+index);
    if(val=='minus'){
      $("#close"+index).css("display","block");
      $("#open"+index).css("display","none")
    }
    if(val=='plus'){
      $("#open"+index).css("display","block")
      $("#close"+index).css("display","none")
    }
  }
  ngOnInit(): void {
    this.columnDefs=[
      { headerName: "S.No", valueGetter: "node.rowIndex + 1",minWidth : 65},
      { headerName : "UserName",field: "company_name",minWidth : 190, sortable : true, filter: true,  cellStyle: function(params){
        return {color: 'palegoldenro', 'font-size': '16px','white-space': 'normal !important'};}},
      { headerName : "UserCode",field: "agency_code",minWidth : 130, sortable : true, filter: true,  cellStyle: function(params){
        return {color: 'palegoldenro', 'font-size': '16px'};}},
      { headerName : "Login Id",field: "LOGIN_ID",minWidth : 130, sortable : true, filter: true,  cellStyle: function(params){
        return {color: 'palegoldenro', 'font-size': '16px'};}},
      { headerName : "BrokerName",field: "brokerName",minWidth : 130, sortable : true, filter: true,  cellStyle: function(params){
        return {color: 'palegoldenro', 'font-size': '16px'};}},
      { headerName : "Created Date",field: "cr_date",minWidth : 120, sortable : true, filter: true,  cellStyle: function(params){
        return {color: 'palegoldenro', 'font-size': '16px'};}},
      { headerName : "More",field: "gold",minWidth : 60,cellRendererFramework: BrokerMgmEditComponent},
      { headerName : "Status",field: "status",minWidth : 60, sortable : true, filter: true,  cellStyle: function(params){
        return {color: 'palegoldenro', 'font-size': '16px'};}},
    ]
  }
  onGridReady(params){
    this.gridApi = params.api;
    this.gridApi.setHeaderHeight(80);
    this.gridColumnApi = params.coulmnApi;
    params.api.sizeColumnsToFit();
    this.gridApi.paginationSetPageSize(10);
    let userReq = {
      "BranchCode":"01"
      }
    this.service.getUserManagementList(userReq)
              .subscribe(data=>{
         console.log(data);
         sessionStorage.setItem('userToken',data.DefaultValue.Token);
         //this.service.userToken = data.DefaultValue.Token;
         params.api.setRowData(data.UserDetails);
              });
  }
  editUserMgm(agencyCode,loginId){
    let editData;
    for(let data of this.rowData){
      if(data.AgencyCode == agencyCode){
        if(data.LoginId == loginId){
          editData = data;
        }
      }
    }
    let editReq = {
      "AgencyCode":editData.AgencyCode
    }
    this.service.getEditUserManagement(editReq)
              .subscribe(data=>{
                console.log("User Mgm Req",editReq);
                  console.log("Edit User Data",data);
                  sessionStorage.setItem('userToken',data.DefaultValue.Token);
                  sessionStorage.setItem('UserMgmEditData',JSON.stringify(data.UserDetailsResponse[0]));
                  this.router.navigate(['/viewUserMgm']);
              });
  }
    setUserMgmList(){
      let userReq = {
        "BranchCode":"01"
        }
      this.service.getUserManagementList(userReq)
                .subscribe(data=>{
           console.log("User Mgm List",data);
           sessionStorage.setItem('userToken',data.DefaultValue.Token);
           if(data.UserDetails !=null && data.UserDetails.length >0){
            this.userSection = true;
          }
          else{
            this.userSection = false;
          }
           //this.service.userToken = data.DefaultValue.Token;
           this.rowData = data.UserDetails;
                });
    }*/
}

