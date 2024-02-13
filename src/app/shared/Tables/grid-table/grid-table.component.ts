import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.scss'],
})
export class GridTableComponent implements OnInit, OnChanges, AfterViewInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  @Input('data') tableData: any[] = [];
  @Input('cols') columnHeader: any[] = [];
  @Input('filterValue') filterValue: any = '';
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onView') onView = new EventEmitter();
  @Output('onViews') onViews = new EventEmitter();
  @Output('onSelectCopy') onSelectCopy = new EventEmitter();
  @Output('onSelectCustomer') onSelectCustomer = new EventEmitter();
  @Output('onOpenCoverAction') onOpenCoverAction = new EventEmitter();
  @Output('onMenu') onMenu = new EventEmitter();
  @Output('onRating') onRating = new EventEmitter();

  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
  ) {

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
    console.log('Data in Grid', this.tableData);
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
