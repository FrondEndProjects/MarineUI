import { SessionStorageService } from './../../../../shared/storage/session-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { OpenCoverService } from '../../open-cover.service';
import { SessionStorageModel } from '../../../../shared/storage/session-storage-model';
@Component({
  selector: 'app-exist-open-cover',
  templateUrl: './exist-open-cover.component.html',
  styleUrls: ['./exist-open-cover.component.scss'],
})
export class ExistOpenCoverComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginTypeList: any[] = [];
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public FilterValue: any = '';
  public loginType: any = null;
  public routerBaseLink:any='';
  public sessionStorgaeModel:SessionStorageModel

  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.sessionStorgaeModel = this.sessionStorageService.sessionStorgaeModel
    console.log('storagemodel',this.sessionStorgaeModel);
  }

  ngOnInit(): void {
    this.onGetLoginTypeDropdownList();
  }
  onGetLoginTypeDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/existing/brokerList`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.loginTypeList = data?.Result;
        }
      },
      (err) => { },
    );
  }
  onChangeLoginType() {
    this.onGetExistQuoteList();
  }
  onGetExistQuoteList() {
    const urlLink = `${this.ApiUrl1}opencover/report/quoteregister`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'LoginId': this.loginType,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.columnHeader = [

            { key: 'ProposalNo', display: 'Proposal No' },
            { key: 'CompanyName', display: 'Customer Name' },
            { key: 'PolicyStartDate', display: 'Policy Start Date' },
            { key: 'PolicyEndDate', display: 'Policy End Date' },

            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: 'Edit',
                isNgxIcon:'fas fa-marker',
                bg: 'primary'
              }
            },
          ];
          this.tableData = data?.Result;

        }
      },
      (err) => { },
    );
  }

  onEdit(item: any) {
    sessionStorage.setItem('ProposalNo', item.ProposalNo);
    this.router.navigate([`/${this.routerBaseLink}/new-open-cover/new-open-cover-form`], { queryParams: {ProposalNo: item.ProposalNo}});
  }

}
