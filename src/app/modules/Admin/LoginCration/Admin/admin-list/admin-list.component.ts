import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
import { SharedService } from '../../../../../shared/shared.service';
import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';
//import { AdminReferralService } from './admin-referral.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;

  // public property
  public  ELEMENT_DATA = [
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
 ];

 //public AppConfig: any = (Mydatas as any).default;
 //public ApiUrl1: any = this.AppConfig.ApiUrl1;

 public tableSection: boolean = false;
 public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
 public adminData: any;
 public columnHeader: any[] = [];
 public AppConfig: any = (Mydatas as any).default;
 public ApiUrl1: any = this.AppConfig.ApiUrl1;
 public CommonApiUrl1: any = this.AppConfig.CommonApiUrl;
 public userDetails: any;
 public branchCode: any;
 insuranceId:any;
 branchList:any[]=[];
 branchValue:any;
 public filterValue;branch: any;
  constructor( private masterSer: MastersService,
   private router: Router,private sharedService: SharedService,  private adminReferralService: AdminReferralService,) {
     this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     //this.userDetails = this.userDetails?.LoginResponse;
     console.log(this.userDetails);
     //this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    //const user = this.userDetails?.Result;
    //this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    let entry = JSON.parse(sessionStorage.getItem('editAdminId'));
    if(entry) this.branchValue = entry?.BranchCode;
     else if (this.userDetails) this.branchValue = this.userDetails?.LoginResponse.BranchCode;
     //this.getBranchList()
     

   }

   ngOnInit(): void {

    this.onGetBranchList();
     //this.getExistingAdmin();
     //this.getList();
     //this.getExistingIssuer();
   }


  /* getExistingAdmins(){
    let ReqObj = {
      "BranchCode": "99999"
   }

    let urlLink = `${this.ApiUrl1}admin/getAdminList`;

    /*this.sharedService.onGetMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.cityData = data?.Result;
        }
      },
      this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
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
      /*get sF() {
        return this.searchForm?.controls;
      }*/
      onEdit(rowdata:any){
        let entry = {
          "BranchCode": this.branchValue,
          "LoginId": rowdata.LoginId,
        }
        sessionStorage.setItem('editAdminId',JSON.stringify(entry));
        //sessionStorage.setItem("password",'false');
        //sessionStorage.removeItem("password");
        this.router.navigate(['/Marine/loginCreation/admin/adminDetails']);


      }
      getExistingAdmin(){

        let ReqObj = {
           "BranchCode": this.branchValue
       }

        let urlLink = `${this.ApiUrl1}admin/getAdminList`;
     this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
       (data: any) => {
         if (data?.Message === 'Success') {
           console.log(data);
           this.columnHeader = [
             //{key: 'S.No', display: 'S.No'},
             {key: 'LoginId', display: 'Login Id'},
             {key: 'UserName', display: 'User Name'},
             {key: 'UserType', display: 'User Type'},
             {key: 'BranchName', display: 'Branch'},
            //{key: 'EffectiveDate', display: 'Effective Date'},
             {key: 'Status1', display: 'Status'},
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
    }
    sessionStorage.setItem('editAdminId',JSON.stringify(entry));

    this.router.navigate(['/Marine/loginCreation/admin/adminDetails']);

   }
   ngAfterViewInit(): void {
     // connect table and paginator
     this.dataSource.paginator = this.paginator;
   }
   public applyFilter(event: Event) {
     this.filterValue = (event.target as HTMLInputElement).value;
 }
 }


