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
  selector: 'app-lapsedpolicy',
  templateUrl: './lapsedpolicy.component.html',
  styleUrls: ['./lapsedpolicy.component.scss']
})
export class LapsedComponent implements OnInit {
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
  public tableSection: boolean = false;
public tableData: any;
public columnHeader: any[] = [];
branchValue:any;
public filterValue; 
public loginTypeList:any[]=[]; 
public loginType:any;
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
    /*this.columnHeader = [
        //{key: 'S.No', display: 'S.No'},
        {key: 'ProposalNo', display: 'Proposal No'},
        {key: 'CompanyName', display: 'Customer Name'},
        {key: 'OpenCoverStartDate', display: 'Policy Start Date'},
        {key: 'OpenCoverEndDate', display: 'Policy End Date'},
       //{key: 'EffectiveDate', display: 'Effective Date'},
        {key: 'Draft', display: 'Draft'},
        {
          key: 'actions',
          display: 'Edit',
          config: {
            isEdit: true,
          }
        }
      ];*/
      //this.onGetBranchList()
      this.onGetLoginTypeDropdownList(); 
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

  /*onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': '01',
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
        this.getExistingAdmin();
      },
      (err) => { },
    );
  }*/

  getExistingAdmin() {

    let ReqObj = {
      "BranchCode":this.userDetails?.BranchCode,
      "LoginId": this.loginType,
   }

    let urlLink = `${this.ApiUrl1}OpenCover/portfolio/lapsed`;
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
            {key: 'Draft', display: 'Draft'},
            {
              key: 'actions',
              display: 'Edit',
              config: {
                isEdit: true,
              }
            }
          ];
          this.tableData = data?.Result;
        }
      }, (err) => { }
    );
  }

  public applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }


  get sF() {
    return this.searchForm?.controls;
  }
onEdit(row:any){}

}
