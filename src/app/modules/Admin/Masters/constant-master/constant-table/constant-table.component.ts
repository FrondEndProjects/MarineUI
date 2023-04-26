import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-constant-table',
  templateUrl: './constant-table.component.html',
  styleUrls: ['./constant-table.component.scss']
})
export class ConstantTableComponent implements OnInit {
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
  constructor(
    private msaterSer: MastersService,
    private router: Router) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      
      if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse.branchCode;
      sessionStorage.removeItem('constantData');
     }

  // life cycle hooks
  ngOnInit(): void {
    this.getConstantList();
  }

  getConstantList() {
    let ReqObj = {
      "BranchCode": this.branchCode
    }
    this.msaterSer.onPostMethodSync(`${this.ApiUrl1}master/constant/list`, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Message == "Success") {
        this.columnHeader = [
          {key: 'CategoryId', display: 'Category ID'},
          {key: 'CategoryName', display: 'Category Name'},
          {key: 'Status', display: 'Status'},
          {
            key: 'actions',
            display: 'Edit',
            config: {
              isEdit: true
            }
          },
          {key: 'detail', display: 'Detail'}
         ];
         this.tableData = data.Result;
      }
    }, (err) => { }
    )
  }

  
  ngAfterViewInit(): void {
  }


public onEdit(event) {
  sessionStorage.setItem('constantData', event.CategoryId);
  this.router.navigateByUrl('Marine/masters/constant/add-edit');
}


}
