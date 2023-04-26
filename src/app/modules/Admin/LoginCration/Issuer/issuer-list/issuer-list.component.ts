import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';

@Component({
  selector: 'app-issuer-list',
  templateUrl: './issuer-list.component.html',
  styleUrls: ['./issuer-list.component.scss']
})
export class IssuerListComponent implements OnInit {
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


 public tableSection: boolean = false;
 public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
 public issuerData: any;
 public columnHeader: any[] = [];
 public AppConfig: any = (Mydatas as any).default;
 public ApiUrl1: any = this.AppConfig.ApiUrl1;
 public userDetails: any;
 public branchCode: any;
 branchList:any[]=[];
 branchValue:any;
 public filterValue;  constructor( private masterSer: MastersService,
   private router: Router,private adminReferralService: AdminReferralService) {
     this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
     console.log(this.userDetails);

     if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse.BranchCode;
     this.onGetBranchList()

   }

   ngOnInit(): void {
     this.getExistingIssuer();
   }
   /*getExistingIssuer(){
     this.masterSer.onGetMethodSync(`${this.ApiUrl1}master/bank/list`).subscribe(
       (data: any) => {
         if (data?.Message === 'Success') {
           console.log(data);
           this.columnHeader = [
             {key: 'S.No', display: 'S.No'},
             {key: 'LoginId', display: 'Login Id'},
             {key: 'IssuerName', display: 'Issuer Name'},
             {key: 'IssuerType', display: 'Issuer Type'},

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
           this.issuerData = data?.Result;
         }
       }, (err) => { }
     );
   }*/
   getExistingIssuer(){

    let ReqObj = {
       "BranchCode": this.branchValue
   }

    let urlLink = `${this.ApiUrl1}admin/getAdminIssuerList`;
 this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
   (data: any) => {
     if (data?.Message === 'Success') {
       console.log(data);
       this.columnHeader = [
//{key: 'S.No', display: 'S.No'},
         {key: 'LoginId', display: 'Login Id'},
         {key: 'CompanyName', display: 'User Name'},
         {key: 'UserType', display: 'User Type'},
         //{key: 'Branch', display: 'Branch'},
         {key: 'CreateDate', display: 'Effective Date'},
         {key: 'Status', display: 'Status'},
         {
           key: 'actions',
           display: 'Edit',
           config: {
             isEdit: true,
           }
         }
       ];
       this.issuerData = data?.Result;
     }
   }, (err) => { }
 );
}
   goToAddNewPage(){
    //sessionStorage.removeItem('editIssuerId')
    let entry = {
      "BranchCode": this.branchValue,
      "LoginId": null,
    }
    sessionStorage.setItem('editIssuerId',JSON.stringify(entry));
    this.router.navigate(['/Marine/loginCreation/issuer/issuerDetails']);

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
        this.getExistingIssuer();
      },
      (err) => { },
    );
  }
   ngAfterViewInit(): void {
     // connect table and paginator
     this.dataSource.paginator = this.paginator;
   }
   public applyFilter(event: Event) {
     this.filterValue = (event.target as HTMLInputElement).value;
 }
 onEdit(rowdata:any){
  let entry = {
    "BranchCode": this.branchValue,
    "LoginId": rowdata.LoginId,
  }
  sessionStorage.setItem('editIssuerId',JSON.stringify(entry));
  //sessionStorage.setItem("password",'false');
  //sessionStorage.removeItem("password");
  this.router.navigate(['/Marine/loginCreation/issuer/issuerDetails']);


}
}
