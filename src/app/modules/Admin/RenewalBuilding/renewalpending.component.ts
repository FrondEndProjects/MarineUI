import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../../app-config.json';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { MastersService } from '../Masters/masters.service';
import { OpenCoverService } from '../../open-cover/open-cover.service';

@Component({
  selector: 'app-renewalpending',
  templateUrl: './renewalpending.component.html',
  styleUrls: ['./renewalpending.component.scss']
})
export class RenewalPendingComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public searchForm!: FormGroup;
  public tabActive: number = 2;
  public productNameList: any[] = [];
  public regionList: any[] = [];
  public branchList: any[] = [];
  public routerBaseLink: any = '';
  public loginTypeList:any[]=[];
  public loginType:any;
  public tableSection: boolean = false;
public tableData: any;
public columnHeader: any[] = [];
branchValue:any;
public filterValue; regionCode:any=null; 
  constructor(
    private openCoverService: OpenCoverService,
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private menuService: NbMenuService,
    private masterSer: MastersService,

  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.loginId = this.userDetails.LoginId;
    this.searchForm = this.adminReferralService.searchForm;
    this.regionCode = this.userDetails?.RegionCode;
    /*this.columnHeader = [
        //{key: 'S.No', display: 'S.No'},
        {key: 'ProposalNo', display: 'Proposal No'},
        {key: 'CompanyName', display: 'Customer Name'},
        {key: 'OpenCoverStartDate', display: 'Policy Start Date'},
        {key: 'OpenCoverEndDate', display: 'Policy End Date'},
       //{key: 'EffectiveDate', display: 'Effective Date'},
        {key: 'MissippiOpenCoverNo', display: 'MissippiOpenCoverNo'},
        {
          key: 'actions',
          display: 'Edit',
          config: {
            isEdit: true,
          }
        }
      ];*/
    this.onGetLoginTypeDropdownList() 
      //this.onGetBranchList()
  }

  ngOnInit(): void {
   
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

  onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.regionCode,
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
        this.getExistingAdmin();
      },
      (err) => { },
    );
  }

  getExistingAdmin() {

    let ReqObj = {
      "BranchCode": this.userDetails?.BranchCode,
      "LoginId": this.loginType,
   }

    let urlLink = `${this.ApiUrl1}opencover/report/renewal/policy`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data?.Result) {
          console.log(data);
          this.columnHeader = [
            //{key: 'S.No', display: 'S.No'},
            {key: 'ProposalNo', display: 'Proposal No'},
            {key: 'CompanyName', display: 'Customer Name'},
            {key: 'OpenCoverStartDate', display: 'Policy Start Date'},
            {key: 'OpenCoverEndDate', display: 'Policy End Date'},
           //{key: 'EffectiveDate', display: 'Effective Date'},
            {key: 'MissippiOpenCoverNo', display: 'MissippiOpenCoverNo'},
            {
              key: 'actions',
              display: 'Renew',
              config: {
                isEdit: true,
              }
            },
            {
              key: 'actions',
              display: 'Renew',
              config: {
                isDelete: true,
              }
            }
          ];
          this.tableData = data?.Result;
        }
      }, (err) => { }
    );
  }

  get sF() {
    return this.searchForm?.controls;
  }
onEdit(row:any){
  const urlLink = `${this.ApiUrl1}OpenCover/renewal`;
  const reqData = { 
  "BranchCode": this.userDetails.BranchCode,
  "ProposalNo": row.ProposalNo
  };
  this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
    (data: any) => {
      console.log(data);
      if (data?.Result) {
        this.getExistingAdmin();
      }
      //this.branchList = data || [];
      //this.getExistingAdmin();
    },
    (err) => { },
  );
}

Delete(row:any){
  const urlLink = `${this.ApiUrl1}OpenCover/deactivate`;
  const reqData = { 
  "BranchCode": this.userDetails.BranchCode,
  "ProposalNo": row.ProposalNo
  };
  this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
    (data: any) => {
      console.log(data);
      if (data?.Result) {
        this.getExistingAdmin();
      }
      //this.branchList = data || [];
      //this.getExistingAdmin();
    },
    (err) => { },
  );
}

public applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
}

}
