import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { OpenCoverService } from '../../../modules/open-cover/open-cover.service';
import { table } from 'console';

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
    //this.getTotalSICost(this.tableData)
    //this.CommaFormatted(this.tableData)
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
    console.log(this.filterValue);
    console.log('RRRRRRRRRR',this.tableData);
    this.CommaFormatted(this.tableData);
    this.secondcommaseporator(this.tableData);
  }


  ngOnInit() {
    console.log('sssssssss',this.tableData);
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

  onSIValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  CommaFormatted(tableData) {
    let i=0;
    console.log('hhhhhhhhhhhhhhh',tableData)
          let entry = this.tableData;
          console.log("Entry Came")
          if(entry.length!=0){
            for(let build of this.tableData){
              if(build.PerBottomLimit!=null||build.PerBottomLimit!=undefined){
              console.log("Entry Came 1",build)
            let value = build.PerBottomLimit.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.tableData[i].PerBottomLimit = value;
              }
            console.log('jjjjjjjjjj',tableData.PerBottomLimit)
           i++;
            }    //this.getTotalSICost('building');
          } 
          //this.secondcommaseporator(this.tableData);     //return tableData.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   
  }

  secondcommaseporator(tableData){
    let i=0;
    console.log('SSEEEEEEEEEEEEEEE',tableData)
          let entry = this.tableData;
          if(entry.length!=0){
            for(let build of this.tableData){
              if(build.LocationLimit!=null||build.LocationLimit!=undefined){
              console.log("Entry Came 2",build)
            let value = build.LocationLimit.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.tableData[i].LocationLimit= value;
              }
            console.log('jjjjjjjjjj',tableData.LocationLimit)
           i++;
            }
          }
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
