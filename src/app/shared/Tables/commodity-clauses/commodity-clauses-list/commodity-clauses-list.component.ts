import { map } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild, OnChanges, AfterViewInit, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { CommoditySelectionComponent } from '../../../../modules/open-cover/components/country-commodity-info/components/commodity-selection/commodity-selection.component';
import { OpenCoverService } from '../../../../modules/open-cover/open-cover.service';
import { SharedService } from '../../../shared.service';
import { CommodityClausesComponent } from '../commodity-clauses.component';

@Component({
  selector: 'app-commodity-clauses-list',
  templateUrl: './commodity-clauses-list.component.html',
  styleUrls: ['./commodity-clauses-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CommodityClausesListComponent implements OnInit {



  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public filterValue: any = '';
  public onViewData: any;
  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(CommoditySelectionComponent) commoditySelectionComponent: CommoditySelectionComponent;

  sortProperty: any = 'AllotedYN';
  sortDirection: any = 'desc';
  expandedElement: null;
  public iscollapse: any = '';
  public commodityData: any;
  public commodityList: any[] = [];
  public commodityHeaderList: any[] = [];


  public isEnabledDropdown: boolean = false;
  public clausesList: any[] = [];
  public selectedCoverId: any = null;
  public selectedData: any;
  @Input('callIncre') callIncre: any;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private openCoverService: OpenCoverService,
    private sharedService: SharedService,
    private commodityClausesComponent: CommodityClausesComponent,
    private cdr: ChangeDetectorRef,
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }
  ngOnInit() {
    this.onGetClauses();
    this.onGetcommoditySelectList();
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    console.log('clicked', this.callIncre);
    if (this.callIncre) {
      const selectedData = this.commodityClausesComponent.selectedData;
      this.onGetCoverClausesList(selectedData);
      this.commodityData = selectedData;
    }
  }

  onGetcommoditySelectList() {
    const urlLink = `${this.ApiUrl1}OpenCover/commodity/edit/list`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.commodityHeaderList = [
          {
            key: 'CommodityName',
            display: 'Commodity Name',
            config: {
              isCheckCommodity: true,
            },
          },

        ];
        this.commodityList = data?.Result || [];

      },
      (err) => { },
    );

  }
  onGetClauses() {
    const urlLink = `${this.ApiUrl1}OpenCover/transport/cover/clauses`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        const list:any[] = data?.Result;
        this.clausesList = [{CoverId:"0",CoverName:"All"},...list];
        this.selectedCoverId = this.clausesList[0].CoverId;
      },
      (err) => { },
    );
  }

  onCoverChange() {
    const selectedData = this.commodityClausesComponent.selectedData;
    selectedData.CoverId = this.selectedCoverId;
    this.onGetCoverClausesList(selectedData);
  }

  onGetCoverClausesList(item: any) {
    if (item.CoverName == 'Warranties') {
      item.CoverId = this.selectedCoverId;
      var urlLink = `${this.ApiUrl1}OpenCover/warranty/edit`;
      this.isEnabledDropdown = true;
      item.CoverId = this.selectedCoverId;

    }
    if (item.CoverName == 'Exclusions') {
      var urlLink = `${this.ApiUrl1}OpenCover/exclusion/edit`;
      this.isEnabledDropdown = true;
      item.CoverId = this.selectedCoverId;

    }
    if (item.CoverName == 'War') {
      var urlLink = `${this.ApiUrl1}OpenCover/war/edit`;
    }
    if (item.CoverName == 'Others') {
      var urlLink = `${this.ApiUrl1}OpenCover/optionalcondition/edit`;
      this.isEnabledDropdown = true;
      item.CoverId = this.selectedCoverId;

    }
    if (item.CoverName != 'Warranties' && item.CoverName != 'Exclusions' && item.CoverName != 'War' && item.CoverName != 'Others') {
      var urlLink = `${this.ApiUrl1}OpenCover/clauses/edit`;
      this.isEnabledDropdown = false;

    }



    const reqData = {
      "ProposalNo": this.proposalNo,
      "BranchCode": this.userDetails.BelongingBranch,
      "CoverId": item.CoverId
    };

    if (this.commodityClausesComponent.iscollapse == 'collapsed') {
      this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          if (item.CoverName == 'Warranties') {
            this.columnHeader = [
              {
                key: 'WarrantyId',
                display: 'Warrantry Id',
                sticky: false,
                config: {
                  isCheck: true
                }

              },
              {
                key: 'WarrantyDescription',
                display: 'Description',
                config: {
                  istextarea: true
                }
              },
              {
                key: 'commodity',
                display: 'Commodity',
                sticky: true,
                config: {
                  isEdit: true,
                },
              },
            ];
          } if (item.CoverName == 'Exclusions') {
            this.columnHeader = [
              {
                key: 'ExclusionId',
                display: 'Exclusion Id',
                sticky: false,
                config: {
                  isCheck: true
                }
              },
              {
                key: 'ExclusionDescription',
                display: 'Description',
                config: {
                  istextarea: true
                }
              },
              {
                key: 'commodity',
                display: 'Commodity',
                sticky: true,
                config: {
                  isEdit: true,
                },
              },
            ];
          }
          if (item.CoverName == 'War') {
            this.columnHeader = [
              {
                key: 'CoverName',
                display: 'Cover',
                sticky: true,
                config: {
                  isCheck: true
                }
              },
              {
                key: 'WarId',
                display: 'War Id',
              },
              {
                key: 'WarDescription',
                display: 'Description',
                sticky: false,
                config: {
                  istextarea: true
                }
              },

            ];
          }
          if (item.CoverName == 'Others') {
            this.columnHeader = [

              {
                key: 'OptionalId',
                display: 'Id',
                sticky: true,
                config: {
                  isCheck: true
                }
              },
              {
                key: 'OptionalDescription',
                display: 'Description',
                sticky: false,
                config: {
                  istextarea: true
                }
              },

            ];
          }


          if (item.CoverName != 'Warranties' && item.CoverName != 'Exclusions' && item.CoverName != 'War' && item.CoverName != 'Others') {
            this.columnHeader = [
              {
                key: 'ClausesId',
                display: 'Id',
                sticky: false,
                config: {
                  isCheck: true
                }
              },
              {
                key: 'ClausesDescription',
                display: 'Description',
                config: {
                  istextarea: true
                }
              },
              {
                key: 'commodity',
                display: 'Commodity',
                sticky: true,
                config: {
                  isEdit: true,
                },
              },
            ];
          }


          console.log('commodity', this.commodityList);

          this.tableData = data?.Result ? data.Result.map(x => ({
            ...x,
            isCheck: this.onCheckedOrNot(x),
            CommodityInfo: this.commodityList.map(y => ({
              ...y,
              isCheck: this.onCommodityCheckedOrNot(y,x)
            })),
          })):[];
          console.log('allData', this.tableData)
          this.dataSource = new MatTableDataSource(this.tableData);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

        },
        (err) => { },
      );
    }

  }

  onCheckedOrNot(item) {
    const selectedData = this.commodityClausesComponent.selectedData;

    if (selectedData.CoverName == 'Warranties') {
      if (item.OptedWarranty == 'Y') {
        return true;
      }
      else {
        return false;
      }
    }
    if (selectedData.CoverName == 'Exclusions') {
      if (item.OptedExclusion == 'Y') {
        return true;
      }
      else {
        return false;
      }
    }
    if (selectedData.CoverName == 'War') {
      if (item.OptedWar == 'Y') {
        return true;
      }
      else {
        return false;
      }
    }
    if (selectedData.CoverName == 'Others') {
      if (item.OptedOptional == 'Y') {
        return true;
      }
      else {
        return false;
      }
    }
    if (selectedData.CoverName != 'Warranties' && selectedData.CoverName != 'Exclusions' && selectedData.CoverName != 'War' && selectedData.CoverName != 'Others') {
      if (item.OptedClauses == 'Y') {
        return true;
      }
      else {
        return false;
      }
    }
  }

  onCommodityCheckedOrNot(item:any,list:any){
    console.log("Common Item",item,list)
   return list?.CommodityInfo?.some((ele:any) =>ele.CommodityId == item.CommodityCode);
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


  onPassData(element: any) {
    this.iscollapse = element === this.expandedElement ? 'expanded' : 'collapsed';
    this.sharedService.onGetDataSub(element);
    this.selectedData = element;
  }


  onSubmit() {
    const selectedData = this.commodityClausesComponent.selectedData;
    if (selectedData.CoverName == 'Warranties') {
      this.onSubmitWarranty(selectedData);
    }
    if (selectedData.CoverName == 'Exclusions') {
      this.onSubmitExclusion(selectedData);
    }
    if (selectedData.CoverName == 'War') {
      this.onSubmitWar(selectedData);
    }
    if (selectedData.CoverName == 'Others') {
      this.onSubmitOthers(selectedData);
    }
    if (selectedData.CoverName != 'Warranties' && selectedData.CoverName != 'Exclusions' && selectedData.CoverName != 'War' && selectedData.CoverName != 'Others') {
      this.onSubmitClausesCover(selectedData);
    }


  }

  onSubmitWarranty(selectedData: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/warranty/save`;
    const WarrantyInfo: any[] = this.tableData.filter(x => x.isCheck == true).map(z => ({
      "CommodityDetails": z.CommodityInfo.filter(y=>y.isCheck == true).map(l=>({
        "CommodityId": l.CommodityCode,
        "CommodityName": l.CommodityName
      })),
      "WarrantyDescription": z.WarrantyDescription,
      "WarrantyId": z.WarrantyId
    }))
    const reqData = {
      "ProposalNo": this.proposalNo,
      "WarrantyDetails": {
        "CoverId": selectedData.CoverId,
        "CoverName": selectedData.CoverName,
        "ModeOfTransport": selectedData.ModeOfTransport,
        "ModeOfTransportName": selectedData.ModeOfTransportName,
        "WarrantyInfo": WarrantyInfo
      }
    }
    console.log(reqData);
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        selectedData['isUpdated'] = true;
      },
      (err) => { },
    );
  }

  onSubmitExclusion(selectedData: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/exclusion/save`;
    const ExclusionInfo: any[] = this.tableData.filter(x => x.isCheck == true).map(z => ({
      "CommodityDetails": z.CommodityInfo.filter(y=>y.isCheck == true).map(l=>({
        "CommodityId": l.CommodityCode,
        "CommodityName": l.CommodityName
      })),
      "ExclusionDescription": z.ExclusionDescription,
      "ExclusionId": z.ExclusionId
    }))
    const reqData = {
      "ExclusionDetails": {
        "CoverId": selectedData.CoverId,
        "CoverName": selectedData.CoverName,
        "ExclusionInfo": ExclusionInfo,
        "ModeOfTransport": selectedData.ModeOfTransport,
        "ModeOfTransportName": selectedData.ModeOfTransportName,
      },
      "ProposalNo": this.proposalNo
    }
    console.log(reqData);
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        selectedData['isUpdated'] = true;
      },
      (err) => { },
    );
  }

  onSubmitOthers(selectedData: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/optionalcondition/save`;
    const OptionalInfo: any[] = this.tableData.filter(x => x.isCheck == true).map(z => ({
      "OptionalDescription": z.OptionalDescription,
      "OptionalId": z.OptionalId
    }))
    const reqData = {
      "BranchCode": this.userDetails.BranchCode,
      "OptionalDetails": {
        "CoverId": selectedData.CoverId,
        "CoverName": selectedData.CoverName,
        "ModeOfTransport": selectedData.ModeOfTransport,
        "ModeOfTransportName": selectedData.ModeOfTransportName,
        "OptionalInfo": OptionalInfo,
      },
      "ProposalNo": this.proposalNo
    }
    console.log(reqData);
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        selectedData['isUpdated'] = true;
      },
      (err) => { },
    );
  }

  onSubmitWar(selectedData: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/war/save`;
    const WarInfo: any[] = this.tableData.filter(x => x.isCheck == true).map(z => ({
      "CoverId": z.CoverId,
      "CoverName": z.CoverName,
      "WarDescription": z.WarDescription,
      "WarId": z.WarId
    }))
    const reqData = {
      "BranchCode": this.userDetails.BranchCode,
      "WarInfo": WarInfo,
      "ProposalNo": this.proposalNo
    }
    console.log(reqData);
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        selectedData['isUpdated'] = true;
      },
      (err) => { },
    );
  }

  onSubmitClausesCover(selectedData: any) {
    const urlLink = `${this.ApiUrl1}OpenCover/clauses/save`;
    const ClausesInfo: any[] = this.tableData.filter(x => x.isCheck == true).map(z => ({
      "ClausesDescription": z.ClausesDescription,
      "ClausesId": z.ClausesId,
      "CommodityDetails": z.CommodityInfo.filter(y=>y.isCheck == true).map(l=>({
        "CommodityId": l.CommodityCode,
        "CommodityName": l.CommodityName
      })),
    }))
    const reqData = {
      "ProposalNo": this.proposalNo,
      "ClausesDetails": {
        "ClausesInfo": ClausesInfo,
        "CoverId": selectedData.CoverId,
        "CoverName": selectedData.CoverName,
        "ModeOfTransport": selectedData.ModeOfTransport,
        "ModeOfTransportName": selectedData.ModeOfTransportName,
      },
    }
    console.log(reqData);
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        selectedData['isUpdated'] = true;
      },
      (err) => { },
    );
  }
  checkUpdated(){
    const selectedData = this.commodityClausesComponent.selectedData;
    if(selectedData){
        if(selectedData?.isUpdated){
          return false;
        }
        else return true;
    }
    else return true;
  }



}




