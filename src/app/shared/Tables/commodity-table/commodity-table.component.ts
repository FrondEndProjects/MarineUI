import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
@Component({
  selector: 'app-commodity-table',
  templateUrl: './commodity-table.component.html',
  styleUrls: ['./commodity-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommodityTableComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  @Input('data') tableData: any[] = [];
  @Input('no') Nan:any;
  @Input('cols') columnHeader: any[] = [];
  @Input("innerData") innerTableData: any = [];
  @Input("innerCols") innerColumnHeader:any=[];
  @Input('filterValue') filterValue: any = '';
  @Input('show') show:any;
  @Output('onAdd') onAdd = new EventEmitter();
  @Output('isActionBtn') isActionBtn = new EventEmitter();
  @Output('onDelete') onDelete = new EventEmitter();
  @Output('onView') onView = new EventEmitter();
  @Output('onViews') onViews = new EventEmitter();
  //@Output('title') nan: any;


  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  public selectedData:any;
  nan:any;
 

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
  ) {
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
    // console.log('columnHeader',this.columnHeader,'tableData',this.tableData);

  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;

    console.log('kkkkkkkkkkk',this.dataSource)

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


  onPassData(element:any){
    if(element.isClicked){
      this.onAdd.emit(element);
      this.selectedData = element;
      console.log('lllllllllllll',this.selectedData)
        console.log('tttttttttttt',this.innerTableData[0]?.ismore)
       this.nan=this.innerTableData[0]?.ismore
    
      console.log('kkkkkkkkkk',this.nan)
    }

  }
}
