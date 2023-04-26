import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { OpenCoverService } from '../../../modules/open-cover/open-cover.service';

@Component({
  selector: 'app-trans-cover-table',
  templateUrl: './trans-cover-table.component.html',
  styleUrls: ['./trans-cover-table.component.scss']
})
export class TransCoverTableComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  @Input('data') tableData: any[] = [];
  @Input('cols') columnHeader: any[] = [];
  @Input('currencyList') currencyList: any[] = [];

  @Input('filterValue') filterValue: any = '';
  @Output('onSelectCustomer') onSelectCustomer = new EventEmitter();

  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';

  public userDetails: any;
  public proposalNo: any = '';

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private openCoverService: OpenCoverService,

  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  }



  ngOnChanges() {
    console.log(this.tableData);
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
    console.log(this.filterValue);
  }


  ngOnInit() {
    console.log(this.tableData);
    this.dataSource = new MatTableDataSource(this.tableData);
    console.log(this.dataSource);
    this.dataSource.sort = this.sort;


  }

  ngAfterViewInit() {
    this.sortProperty = 'AllotedYN';
    this.sortDirection = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  keyupvalue(e) {
   return e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  
  }

  get keys() {
    return this.columnHeader.map(({ key }) => key);
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue?.trim().toLowerCase();
  }

  private _filter(value: any, data: any[]): any[] {
    if (value == null) {
      value = '';
    }
    const filterValue = value.toLowerCase();
    return data.filter((option) => option?.CodeDescription?.toLowerCase().includes(filterValue));
  }

}
