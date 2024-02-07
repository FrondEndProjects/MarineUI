import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../../Masters/masters.service';
import { AdminReferralService } from '../../../../admin-referral/admin-referral.service';

@Component({
  selector: 'app-existing-broker-list',
  templateUrl: './existing-broker-list.component.html',
  styleUrls: ['./existing-broker-list.component.scss']
})
export class ExistingBrokerListComponent implements OnInit {

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
public tableData: any;
public columnHeader: any[] = [];
public AppConfig: any = (Mydatas as any).default;
public ApiUrl1: any = this.AppConfig.ApiUrl1;
public userDetails: any;
public branchCode: any;
branchList:any[]=[];
branchValue:any;
public filterValue;regionCode: any;
  constructor( private masterSer: MastersService,
  private router: Router,private adminReferralService: AdminReferralService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log(this.userDetails);
    this.regionCode = this.userDetails?.LoginResponse.RegionCode;
    let entry = JSON.parse(sessionStorage.getItem('AgencyId'));
    if(entry) 
    {
      this.branchValue = entry?.BranchCode;
    }
    else if (this.userDetails) 
    {
      this.branchValue = this.userDetails?.LoginResponse.BranchCode;
    }
   

  }

  ngOnInit(): void {
    //this.getExistingBroker();
    this. onGetBranchList()
  }
  /*getExistingBroker(){
    this.masterSer.onGetMethodSync(`${this.ApiUrl1}master/bank/list`).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          console.log(data);
          this.columnHeader = [
            {key: 'S.No', display: 'S.No'},
            {key: 'BrokerName', display: 'Broker Name'},
            {key: 'BrokerCode', display: 'Broker Code'},
            {key: 'LoginId', display: 'Login Id'},
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
          this.tableData = data?.Result;
        }
      }, (err) => { }
    );
  }*/


  getExistingBroker() {

    const reqData = {
        "ApplicationId": "2",
        "BranchCode": this.branchValue

    };
    const urlLink = `${this.ApiUrl1}admin/getAdminBrokerList`;
    this.masterSer.onPostMethodSync(urlLink, reqData).subscribe(
      /*(data: any) => {
        console.log(data);
        this.branchList = data || [];
        this.getExistingIssuer();
      },
      (err) => { },*/
      (data: any) => {
        if (data?.Message === 'Success') {
          console.log(data);
          this.columnHeader = [
            //{key: 'S.No', display: 'S.No'},
            {key: 'CompanyName', display: 'Company Name'},
            {key: 'RsaBrokerCode', display: 'Broker Code'},
            {key: 'LoginId', display: 'Login Id'},
            {key: 'CreateDate', display: 'CreateDate'},
            {key: 'Status', display: 'Status'},
            {
              key: 'actions',
              display: 'Edit',
              config: {
                isEdit: true,
              }
            }
          ];
          this.tableData = data?.Result;
        }
      }, (err) => { }
    );
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
        this.getExistingBroker();

      },
      (err) => { },
    );
  }
  goToAddNewPage(){
    let entry = {
      "BranchCode": this.branchValue,
      "AgencyCode": null,
      "BrokerCode":null,
      "CustomerId":null,
    }
    sessionStorage.setItem('AgencyId',JSON.stringify(entry));
    this.router.navigate(['Marine/loginCreation/existingBrokers/newBrokerDetails']);
  }

  onEdit(event:any){
    //"AgencyCode":event.AgencyCode
    let entry = {
      "BranchCode": this.branchValue,
      "AgencyCode": event.AgencyCode,
      "BrokerCode":event.RsaBrokerCode,
      "CustomerId":event.CustomerId
    }
    sessionStorage.setItem('AgencyId',JSON.stringify(entry));
    //sessionStorage.setItem('AgencyId',event.AgencyCode);
    this.router.navigate(['Marine/loginCreation/existingBrokers/newBrokerDetails']);

  }
  ngAfterViewInit(): void {
    // connect table and paginator
    this.dataSource.paginator = this.paginator;
  }
  public applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
}
}
