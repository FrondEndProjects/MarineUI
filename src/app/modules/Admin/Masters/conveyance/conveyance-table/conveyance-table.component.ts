import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
@Component({
  selector: 'app-conveyance-table',
  templateUrl: './conveyance-table.component.html',
  styleUrls: ['./conveyance-table.component.scss'],
})
export class ConveyanceTableComponent implements OnInit, AfterViewInit {

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
  public filterValue;

// constructor
  constructor (private masterSer: MastersService, private router: Router ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;
   }


  // life cycle hooks
  ngOnInit(): void {
    this.getExistingConveyance();
    // get call
  }

  getExistingConveyance() {
    const ReqObj = {
      'BranchCode': this.userDetails?.Result.BelongingBranch,
    };
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/conveyance/list`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        
        if (data?.Message === 'Success') {
          this.columnHeader = [
            {key: 'ConveyanId', display: 'Convey Id'},
            {key: 'ModeOfTransportDesc', display: 'Mode of transport'},
            {key: 'ConveyanDescription', display: 'Convey name'},
            {key: 'ConveyanRate', display: 'Convey rate'},
            {key: 'EffectiveDate', display: 'Effective Date'},
            {key: 'Status', display: 'Status'},
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
            ];
          this.tableData = data?.Result;

        }
      },
      (err) => { },
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

  public onEdit(event) {
    console.log(event);
    
    sessionStorage.setItem('conveyanceId', JSON.stringify(event.ConveyanId));
    sessionStorage.setItem('conveyanceTransport', JSON.stringify(event.ModeOfTransportId));
    this.router.navigateByUrl('Marine/masters/conveyance/add-edit');
  }

}
