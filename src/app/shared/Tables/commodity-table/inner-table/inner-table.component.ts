import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { OpenCoverService } from '../../../../modules/open-cover/open-cover.service';
import { CommodityTableComponent } from '../commodity-table.component';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-inner-table',
  templateUrl: './inner-table.component.html',
  styleUrls: ['./inner-table.component.scss']
})
export class InnerTableComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  @Input('data') tableData: any[] = [];
  @Input('no') Nan:any;
  @Input('title') nan:any;
  @Input('cols') columnHeader: any[] = [];
  @Input('filterValue') filterValue: any = '';
  @Output('onEdit') onEdit = new EventEmitter();
  @Output('onOpenCoverAction') onOpenCoverAction = new EventEmitter();
  @Output('isActionBtn') isActionBtn = new EventEmitter();

  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';



  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private commodityTableComponent: CommodityTableComponent,
    private openCoverService: OpenCoverService
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
  }


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
   //this.nan=tabledata.title
    //this.nan=this.dataSource.ismore

    console.log('IIIIIIIIII',)

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


  onSubmit() {
    console.log(this.commodityTableComponent.selectedData, this.tableData);
    const selectedData = this.commodityTableComponent.selectedData;
    const CommodityRateInfo: any[] = this.tableData.filter((x: any) => x.CommodityId == selectedData.CommodityId).map(z => ({
      "BaseRate": z.CommodityBaseRate,
      "CoverId": z.CoverId,
      "CoverName": z.CoverName,
      "ExcessDescription": z.DiscountDesc,
      "ExcessPercent": z.DiscountPercent,
      "ExcessValue": z.DiscountValue,
      "ModeOfTransport": z.ModeOfTransport,
      "ModeOfTransportName": z.ModeOfTransportDesc
    }));
    const urlLink = `${this.ApiUrl1}OpenCover/commodity/ratesetup/save`;


    const reqData = {
      "CommodityDetails": [
        {
          "CommodityDescription": this.commodityTableComponent.selectedData.CommodityName,
          "CommodityId": this.commodityTableComponent.selectedData.CommodityId,
          "CommodityName": this.commodityTableComponent.selectedData.CommodityName,
          "CommodityRateInfo": CommodityRateInfo
        }
      ],
      "ProposalNo": this.proposalNo
    }
    console.log(reqData);

    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err) => { },
    );

  }

  onPassData(element: any, name: any) {
    element['btnValue'] = name
    this.isActionBtn.emit(element);
  }

}
