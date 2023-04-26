import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { OpenCoverService } from '../../../../../modules/open-cover/open-cover.service';
import { SharedService } from '../../../../shared.service';
import { CommodityClausesListComponent } from '../commodity-clauses-list.component';

@Component({
  selector: 'app-commodity-selection',
  templateUrl: './commodity-selection.component.html',
  styleUrls: ['./commodity-selection.component.scss']
})
export class CommoditySelectionComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public proposalNo = '';
  public userDetails: any;
  @Input('data') tableData: any[] = [];
  @Input('cols') columnHeader: any[] = [];

  @Input('filterValue') filterValue: any = '';

  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  public onViewData: any;


  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private openCoverService: OpenCoverService,
    private sharedService: SharedService,
    private commodityClausesListComponent: CommodityClausesListComponent


  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;

    // this.onViewData = this.sharedService.onViewDataSub.subscribe((data: any) => {
    //   if (data != null) {
    //     console.log(data)
    //     this.onGetcommoditySelectList(data);
    //   }
    // });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.tableData.length > 0) {
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.applyFilter();
    }
  }

  onGetcommoditySelectList(item: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/commodity/edit/list`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    if (this.commodityClausesListComponent.iscollapse == 'collapsed') {
      this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          this.columnHeader = [
            {
              key: 'CommodityName',
              display: 'Commodity Name',
              config: {
                isCheckCommodity: true,
              },
            },

          ];
          this.tableData = data?.Result || [];
          this.tableData = data?.Result.map(x => ({
            ...x,
            isCheck: this.onCheckedOrNot(x)
          }));
          this.dataSource = new MatTableDataSource(this.tableData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (err) => { },
      );
    }

  }

  onCheckedOrNot(item:any){
    console.log(item);
   const selectedData = this.commodityClausesListComponent.selectedData;
   const idx = this.commodityClausesListComponent.tableData.findIndex((ele:any)=>ele.ClausesId == selectedData.ClausesId);
   const tData:any[] = this.commodityClausesListComponent?.tableData[idx]?.CommodityInfo || [];
   return tData.some(y=>y.CommodityId == item.CommodityCode);
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
