import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
})
export class MaterialTableComponent implements OnInit, OnChanges, AfterViewInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public choosedRowData:any;
  @Input('data') tableData: any[] = [];
  @Input('cols') columnHeader: any[] = [];
  @Input('filterValue') filterValue: any = '';
  @Input('btnConfig') btnConfig :any;
  @Input('customerId') customerId :any=null;

  @Output('onSelectCustomer') onSelectCustomer = new EventEmitter();
  @Output('onRemoveWar') onRemoveWar = new EventEmitter();
  @Output('onAddWar') onAddWar = new EventEmitter();
  @Output('isActionBtn') isActionBtn = new EventEmitter();
  @Output('choosedRow') choosedRow = new EventEmitter();
  @Output('onMenu') onMenu = new EventEmitter();





  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
  ) {

  }
  onCheckCustomerId(rowData){
      return rowData.CustomerId ==this.customerId;
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
  }

  onRemoveDta (event:any) {
    let dsData = this.dataSource.data;
    const itemIndex = dsData.findIndex(obj => obj.id == event.id);
    this.dataSource.data.splice(itemIndex, 1);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    this.sortProperty = 'AllotedYN';
    this.sortDirection = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  get keys() {
    return this.columnHeader?.map(({ key }) => key);
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

  onAction(element:any,name:any){
    element['btName'] = name || '';
    this.isActionBtn.emit(element)
  }



}
