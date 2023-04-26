import { SharedService } from './../../shared.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { CommodityClausesTableComponent } from '../../../modules/open-cover/components/commodity-info/components/commodity-clauses-table/commodity-clauses-table.component';
import { OpenCoverService } from '../../../modules/open-cover/open-cover.service';
@Component({
  selector: 'app-commodity-clauses',
  templateUrl: './commodity-clauses.component.html',
  styleUrls: ['./commodity-clauses.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CommodityClausesComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  @Input('data') tableData: any[] = [];
  @Input('cols') columnHeader: any[] = [];
  @Input('filterValue') filterValue: any = '';
  expandedElement: null;
  public iscollapse: any = '';
  public callIncre: boolean = false;


  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';

  public clausesList: any[] = [];
  public selectedCoverId: any = '';
  public selectedData:any;


  public isEnabledDropdown:boolean=false;


  constructor(
    private cdr: ChangeDetectorRef,
    private openCoverService: OpenCoverService,
    private sharedService:SharedService
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }



  ngOnChanges(changes: SimpleChanges) {
    if (this.tableData.length > 0) {
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.applyFilter();
    }
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.sortProperty = 'AllotedYN';
    this.sortDirection = 'desc';
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
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

  onPassData(element: any) {
    this.iscollapse = element === this.expandedElement ? 'expanded' : 'collapsed';
    this.selectedData = element;
    this.sharedService.onGetData(element);
    this.callIncre = true;

  }
}
