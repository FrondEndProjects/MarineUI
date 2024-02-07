import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-deposit-master-table',
  templateUrl: './deposit-master-table.component.html',
  styleUrls: ['./deposit-master-table.component.scss']
})
export class DepositMasterTableComponent implements OnInit {

  // View child
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
public tableData: any[]=[];
public columnHeader: any[] = [];
public AppConfig: any = (Mydatas as any).default;
public ApiUrl1: any = this.AppConfig.ApiUrl1;
public userDetails: any;
public branchCode: any;
public filterValue;tableData2:any[]=[];
columnHeader2: any[] = [];
loginId:any=null;subSection:boolean=false;
  cbcNo: any;
// constructor
  constructor(
    private masterSer: MastersService,
    private router: Router) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      console.log(this.userDetails);
      this.loginId = this.userDetails.LoginResponse.LoginId;
      if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse.BranchCode;
      sessionStorage.removeItem('bankId');
     }

  // life cycle hooks
  ngOnInit(): void {
    this.getExistingBank();
  }

  getExistingBank() {
    this.masterSer.onGetMethodSync(`${this.ApiUrl1}deposit/get/CbcDetail`).subscribe(
      (data: any) => {
          this.columnHeader = [
            {key: 'CbcNo', display: 'CBC No'},
            {key: 'DepositAmount', display: 'Deposit Amount'},
            {key: 'DepositUtilised', display: 'Utilised Amount'},
            {key: 'PolicyRefundAmt', display: 'Refund Amount'},
            {
              key: 'actions',
              display: 'Receipt Details',
              config: {
                isViews: true,
              }
            },
            {
              key: 'BrokerId',
              display: 'Transaction Details',
              config: {
                isView: true,
              }
            }
          ];
          this.tableData = data?.Result;
      }, (err) => { }
    );
  }

  ngAfterViewInit(): void {
    // connect table and paginator
    this.dataSource.paginator = this.paginator;
  }

  // PUBLIC METHODS

 // filter table value based on search value
 public applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
}
onViews(rowData){
  this.masterSer.onGetMethodSync(`${this.ApiUrl1}deposit/get/depositDetailById/${rowData.CbcNo}/D`).subscribe(
    (data: any) => {
      if(data.Result.length!=0){
        this.cbcNo = rowData.CbcNo;
        this.columnHeader2 = [
          {key: 'QuoteNo', display: 'Quote No'},
          {key: 'DepositNo', display: 'Deposit No'},
          {key: 'PremiumAmt', display: 'Premium Amount'},
          {key: 'VatAmount', display: 'Vat Amount'},
          {key: 'DepositType', display: 'Deposit Type'},
          {key: 'BalanceAmt', display: 'Balance Amount'},
          
        ];
        this.tableData2 = data.Result;
        this.subSection = true;
      }
          console.log("Final Listt",data)
    }, (err) => { }
    );
}
onView(rowData){
  this.masterSer.onGetMethodSync(`${this.ApiUrl1}deposit/get/depositDetailById/${rowData.CbcNo}/Y`).subscribe(
    (data: any) => {
      if(data.Result.length!=0){
        this.cbcNo = rowData.CbcNo;
        this.columnHeader2 = [
          {key: 'QuoteNo', display: 'Quote No'},
          {key: 'DepositNo', display: 'Deposit No'},
          {key: 'PremiumAmt', display: 'Premium Amount'},
          {key: 'VatAmount', display: 'Vat Amount'},
          {key: 'DepositType', display: 'Deposit Type'},
          {key: 'BalanceAmt', display: 'Balance Amount'},
          
        ];
        this.tableData2 = data.Result;
        this.subSection = true;
      }
    }, (err) => { }
    );
}
goBack(){
  this.subSection = false;
  this.tableData2=[];
  this.columnHeader2=[];
  this.cbcNo = null;
}
public onEdit(event) {
  console.log(event);
  sessionStorage.setItem('editBankId', event.BankId);
  this.router.navigateByUrl('Marine/masters/bank-master/add-edit');
}

}
