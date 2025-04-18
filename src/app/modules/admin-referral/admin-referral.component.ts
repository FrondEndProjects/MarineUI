import { Router } from '@angular/router';
import { AdminReferralService } from './admin-referral.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../app-config.json';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
import { LoginService } from '../login/login.service';
import { log } from 'node:console';

@Component({
  selector: 'app-admin-referral',
  templateUrl: './admin-referral.component.html',
  styleUrls: ['./admin-referral.component.scss']
})
export class AdminReferralComponent implements OnInit {
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
  InsuranceId: any;
  constructor(
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private menuService: NbMenuService,
    private loginService: LoginService

  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.searchForm = this.adminReferralService.searchForm;
    this.InsuranceId = this.userDetails?.InsuranceId;    
  }

  ngOnInit(): void {
    this.onLoadDropdownList(); 
    this.router.navigate([`${this.routerBaseLink}/admin-referral/pending-quote`]);
    this.menuService.onItemClick().subscribe((data) => {
      if (data.item.link === `/${this.routerBaseLink}/admin-referral/pending-quote`) {
        this.tabActive = 2;
        this.onLoadGrid();
      }
    });
    let s= sessionStorage.getItem('AAA');
    if(s!=null){
      this.Load();
    }
  }

  get sF() {
    return this.searchForm?.controls;
  }

  Load(){
    let s= sessionStorage.getItem('AAA');
    console.log('WWWWWWWWWW',s);
    if(s=='1'){
     this.tabActive = 1;
     this.onLoadGrid(); 
     sessionStorage.removeItem('AAA');

    }
    else if(s=='3'){
      this.tabActive = 3;
      this.onLoadGrid(); 
      sessionStorage.removeItem('AAA');
    }
    else if(s=='2'){
      this.tabActive = 2;
      this.onLoadGrid(); 
      sessionStorage.removeItem('AAA');

    }
  }
  onLoadDropdownList() {
    this.onGetProductList();
    this.onGetRegionList();
    this.onGetBranchList();
  }

  onGetProductList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/referral/quoteproduct`;
    const reqData = {
      "LoginId": this.userDetails?.LoginId,
      "BranchCode": this.userDetails?.BranchCode
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.productNameList = data?.Result?.ProductionDetails || [];
        if(this.productNameList.length!=0){
            this.searchForm.controls['productName'].setValue(this.productNameList[0].ProductId);
        } 
      },
      (err) => { },
    );
  }
  /*onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    const reqData = {
      "RegionCode": "01"
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.regionList = data?.Result || [];
      },
      (err) => { },
    );
  }*/
  onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    this.loginService.onGetMethodSync(urlLink).subscribe((data: any) => {
      console.log(data);
      this.regionList = data?.Result;

      //this.AttachedBranchs();
    });
  }
  onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.InsuranceId,
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
        if(this.branchList.length!=0){
            this.searchForm.controls['branch'].setValue(this.branchList[0].BranchCode);
            if(this.searchForm.controls['regions'].value!='' && this.searchForm.controls['productName'].value!=''){
              this.onLoadGrid();
            }
        }
      },
      (err) => { },
    );
  }
  onChangeProduct(){
    sessionStorage.setItem('productId', this.sF.productName.value);
    this.sessionStorageService.set('productId',this.sF.productName.value);
    if(this.searchForm.controls['regions'].value!='' && this.searchForm.controls['branch'].value!=''){
      this.onLoadGrid();
    }

  }

  onLoadGrid() {
    sessionStorage.removeItem('productId');
    sessionStorage.setItem('productId', this.sF.productName.value);
    let urlLink = ''
    if (this.tabActive === 1) {
      urlLink = `${this.ApiUrl1}opencover/report/approved/referralquote`;
    }
    if (this.tabActive === 2) {
      urlLink = `${this.ApiUrl1}opencover/report/pending/referralquote`;
    }
    if (this.tabActive === 3) {
      urlLink = `${this.ApiUrl1}opencover/report/rejected/referralquote`;
    }
    const reqData = {
      "LoginId": this.userDetails?.LoginId,
      "ProductId": this.sF.productName.value,
      "BranchCode": this.sF.branch.value,
      "RegionCode":this.InsuranceId
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        const list: any[] = data?.Result || [];
        const header: any[] = [
          { key: 'BrokerName', display: 'Broker Organisation' },
          { key: 'QuoteCreated', display: 'Quote Created By' },
          { key: 'CustomerName', display: 'Customer Name' },
          { key: 'EntryDate', display: 'Quote Date' },
          { key: 'QuoteNo', display: 'Quote No' },
          { key: 'Remarks', display: 'Remarks' },
          { key: 'Status', display: 'Status' },
          {
            key: "edit",
            display: "Edit",
            sticky: true,
            config: {
              isActionBtn: true,
              isActionBtnName: "Edit",
              isNgxIcon: "fas fa-pen-alt",
              bg: "primary",
            },
          },
        ]

        this.adminReferralService.onSetTableData(list, header);

      },
      (err) => { },
    );
  }

  onTabActive(val: number) {
    this.adminReferralService.onSetTableData([], []);
    if (val === 1) {
      this.router.navigate([`/${this.routerBaseLink}/admin-referral/approved-quote`]);
    }
    if (val === 2) {
      this.router.navigate([`/${this.routerBaseLink}/admin-referral/pending-quote`]);
    }
    if (val === 3) {
      this.router.navigate([`/${this.routerBaseLink}/admin-referral/rejected-quote`]);
    }

    this.tabActive = val;
  }

}
