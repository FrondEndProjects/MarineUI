import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../../app-config.json';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { MastersService } from '../Masters/masters.service';
import { OpenCoverService } from '../../open-cover/open-cover.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-expiredopencover',
  templateUrl: './expiredopencover.component.html',
  styleUrls: ['./expiredopencover.component.scss']
})
export class ExpiredComponent implements OnInit {
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
  public innerColumnHeader:any[]=[];
  public innerTableData:any[]=[];
  public loginTypeList:any[]=[];
  public loginType:any;
  branchValue: any;
  public filterValue;
  usertype: any;
  constructor(
    private openCoverService: OpenCoverService,
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private menuService: NbMenuService,
    private masterSer: MastersService,
    private sharedService: SharedService,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.searchForm = this.adminReferralService.searchForm;
    this.loginId = this.userDetails.LoginId;
    this.usertype=this.userDetails.UserType
    /*this.columnHeader = [
      {
        key: "more",
        display: "More View",
        config: {
          isMoreVechView: true,
          actions: ["VIEW"]
        }
      },
      //{ key: 'S.No', display: 'S.No' },
      { key: 'OriginalPolicyNo', display: 'Core Application PolicyNo' },
      { key: 'ProposalNo', display: 'Proposal No' },
      { key: 'CompanyName', display: 'Customer Name' },
      { key: 'BranchName', display: 'Balance SumInsured' },
      //{key: 'EffectiveDate', display: 'Effective Date'},
      { key: 'OpenCoverStartDate', display: 'Policy Start Date' },
      { key: 'OpenCoverEndDate', display: 'Policy End Date' },
      { key: 'EndtStatus', display: 'Endrose' },
      //{key: 'Draft', display: 'View'},
      //{key: 'Schedule', display: 'Schedule'},
      //{key: 'PolicyWordings', display: 'PolicyWordings'},
      //{key: 'Documents', display: 'Documents'},
      //{key: 'End Schedule', display: 'End Schedule'},
      //{key: 'Deactivate', display: 'Deactivate'},
    ];*/

    this.innerColumnHeader =  [
      {key: 'Draft', display: 'View'},
      {key: 'Schedule', display: 'Schedule'},
      {key: 'PolicyWordings', display: 'PolicyWordings'},
      {key: 'Documents', display: 'Documents'},
      {key: 'End Schedule', display: 'End Schedule'},
      {key: 'Deactivate', display: 'Deactivate'},
      // {
      //   key: 'actions',
      //   display: 'Action',
      //   config: {
      //     isEdit: true,
      //   },
      // },

    ];
    //this.onGetBranchList(); 
    this.onGetLoginTypeDropdownList() 
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
      'RegionCode': '100019',
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
  onEdit(event: any) {
    console.log(event);
      this.onEndorse(event)
    }
  
    onEndorse(event:any) {
      const urlLink = `${this.ApiUrl1}OpenCover/endorsement`;
      const reqData = {
        'ProposalNo': event.ProposalNo,
      };
      this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          sessionStorage.setItem('ProposalNo',data.ProposalNo);
          this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);
  
        },
        (err) => { },
      );
    }
  getExistingAdmin() {

    let ReqObj = {
      "BranchCode":  this.userDetails?.BranchCode,
      "LoginId": this.loginType,
      "PolicyNo":null
   }

    let urlLink = `${this.ApiUrl1}OpenCover/expired`;
    this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if (data.Result) {
          console.log(data);
          this.columnHeader = [
            {
              key: "more",
              display: "More View",
              config: {
                isMoreView: true,
                actions: ["VIEW"]
              }
            },
           
            { key: 'OriginalPolicyNo', display: 'Core Application PolicyNo' },
            { key: 'ProposalNo', display: 'Proposal No' },
            { key: 'CompanyName', display: 'Customer Name' },
            { key: 'BranchName', display: 'Balance SumInsured' },
            //{key: 'EffectiveDate', display: 'Effective Date'},
            { key: 'OpenCoverStartDate', display: 'Policy Start Date' },
            { key: 'OpenCoverEndDate', display: 'Policy End Date' },
            { key: 'EndtStatus', display: 'Endrose' },
           
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


}
