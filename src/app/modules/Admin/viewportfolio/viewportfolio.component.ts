import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { OpenCoverService } from '../../open-cover/open-cover.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-viewportfolio',
  templateUrl: './viewportfolio.component.html',
  styleUrls: ['./viewportfolio.component.scss'],

})
export class ViewPortfolioComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];

  public brokerList: any[] = [];
  public selectedBroker: any = null;
  public OpenCover: any;
  public routerBaseLink: any = '';
  pendingvalue: any = 'View';
  public filterValue;
  comodityHeader: any[] = [];
  viewlist: any;
  bussinesTypeList: any[] = [];
  openCoverTypeList: any[] = [];
  excutiveList: any[] = [];
  currencyList: any[] = [];
  DeclarationTypeList: any[] = [];
  editCountryList: any[] = [];
  bussinesstype: any;
  bussiness: any;
  opencover: any;
  opproduct: any;
  brokerId: any;
  brokerid: any;
  ExecutiveId: any;
  Executiveid: any;
  currency: any;
  currencyid: any;
  DecType: any;
  Decid: any;
  countrylist: any[] = [];
  uw: any;
  orginCountry: any[] = [];
  destCountryList: any[] = [];
  ProposalNo: string;




  constructor(
    private sharedService: SharedService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private adminReferralService: AdminReferralService,
    private openCoverService: OpenCoverService,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));

    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails.LoginId;
    }
    this.columnHeader = [
      //{key: 'S.No', display: 'S.No'},
      { key: 'ProposalNo', display: 'Proposal No' },
      { key: 'CompanyName', display: 'Customer Name' },
      { key: 'OpenCoverStartDate', display: 'Policy Start Date' },
      { key: 'OpenCoverEndDate', display: 'Policy End Date' },
      //{key: 'EffectiveDate', display: 'Effective Date'},
      { key: 'MissippiOpenCoverNo', display: 'MissippiOpenCoverNo' },
      /*{
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
      }*/
    ];
    this.comodityHeader = [
      {
        key: 'CommodityName',
        display: 'Commodity Name',
        sticky: true,

      },
      {
        key: 'edit',
        display: 'Rate',
        sticky: false,
        config: {
          isCollapse: true,
          isCollapseName: 'Add rate'
        },
      },
    ];
    this.onGetCountryList();
    let viewproposalNo = sessionStorage.getItem('ViewProposalNo')

    if (viewproposalNo) {
      this.ProposalNo = viewproposalNo
      this.viewedit(viewproposalNo)
      this.onGetCountry(viewproposalNo);
      this.onGetdestCountry(viewproposalNo);
      this.onGetCustomerList();
    }
  }

  ngOnInit(): void {
    this.onLoadDropdownList();
  }

  onLoadDropdownList() {
    this.onGetBusinessTypeDropdownList();
    this.onGetOpenCoverTypeDropdownList();
    this.onGetBrokerDetailsDropdownList();
    this.onGetExcutiveDropdownList();
    this.onGetCurrencyDropdownList();
    this.onGetDeclarationDropdownList();
  }


  viewedit(viewproposalNo) {

    const urlLink = `${this.ApiUrl1}OpenCover/quote/edit`;
    const reqData = {
      "BranchCode": this.userDetails.BranchCode,
      "ProposalNo": viewproposalNo,
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.viewlist = data.Result;
        console.log('kkkkkkkkkkkkk', this.viewlist);
        this.onGetBusinessTypeDropdownList();
        this.bussinesstype = this.viewlist.BusinessType;
        this.brokerId = this.viewlist.BrokerId;
        this.ExecutiveId = this.viewlist.ExecutiveId;
        this.opencover = this.viewlist.ProductId;
        this.currency = this.viewlist.Currency;
        this.DecType = this.viewlist.DecType;



        if (this.bussinesstype) {
          this.onGetBusinessTypeDropdownList();
        }
        if (this.opencover) {
          this.onGetOpenCoverTypeDropdownList();
        }
        if (this.brokerId) {
          this.onGetBrokerDetailsDropdownList()
        }
        if (this.ExecutiveId) {
          this.onGetExcutiveDropdownList()
        }
        if (this.currency) {
          this.onGetCurrencyDropdownList()
        }
        if (this.DecType) {
          this.onGetDeclarationDropdownList()
        }


        //sessionStorage.setItem('ProposalNo',data.ProposalNo);
        //this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);

      },
      (err) => { },
    );
  }

  onGetBusinessTypeDropdownList() {
    console.log(this.userDetails, "this.userDetailsthis.userDetailsthis.userDetails");

    const urlLink = `${this.ApiUrl1}opencover/dropdown/businesstype`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.bussinesTypeList = data?.Result;
          console.log('kkkkkkkkkkkkkkkk', this.bussinesstype, this.bussinesTypeList)
          const bussinessList: any = this.bussinesTypeList.find(ele => ele.Code == this.bussinesstype);
          console.log('llllllllllll', bussinessList)
          this.bussiness = bussinessList?.CodeDescription;
        }
      },
      (err) => { },
    );
  }
  onGetOpenCoverTypeDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/productdetails`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.openCoverTypeList = data?.Result;
          console.log('kkkkkkkkkkkkkkkk', this.opencover, this.openCoverTypeList)
          const bussinessList: any = this.openCoverTypeList.find(ele => ele.Code == this.opencover);
          console.log('llllllllllll', bussinessList)
          this.opproduct = bussinessList?.CodeDescription;
        }
      },
      (err) => { },
    );
  }
  onGetBrokerDetailsDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/brokerdetails`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.brokerList = data?.Result;
          console.log('kkkkkkkkkkkkkkkk', this.brokerId, this.brokerList)
          const bussinessList: any = this.brokerList.find(ele => ele.Code == this.brokerId);
          console.log('llllllllllll', bussinessList)
          this.brokerid = bussinessList?.CodeDescription;
        }
      },
      (err) => { },
    );
  }
  onGetExcutiveDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/excutivedetails`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.excutiveList = data?.Result;
          console.log('kkkkkkkkkkkkkkkk', this.ExecutiveId, this.excutiveList)
          const bussinessList: any = this.excutiveList.find(ele => ele.Code == this.ExecutiveId);
          console.log('llllllllllll', bussinessList)
          this.Executiveid = bussinessList?.CodeDescription;
        }
      },
      (err) => { },
    );
  }

  onGetCurrencyDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/currency`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'CountryId': this.userDetails?.CountryId,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.currencyList = data?.Result;
          console.log('kkkkkkkkkkkkkkkk', this.currency, this.currencyList)
          const bussinessList: any = this.currencyList.find(ele => ele.Code == this.currency);
          console.log('llllllllllll', bussinessList)
          this.currencyid = bussinessList?.CodeDescription;

        }
      },
      (err) => { },
    );
  }

  onGetDeclarationDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/declarationtype`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'CountryId': this.userDetails?.CountryId,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.DeclarationTypeList = data?.Result;
          console.log('kkkkkkkkkkkkkkkk', this.DecType, this.DeclarationTypeList)
          const bussinessList: any = this.currencyList.find(ele => ele.Code == this.DecType);
          console.log('llllllllllll', bussinessList)
          this.Decid = bussinessList?.CodeDescription;
        }
      },
      (err) => { },
    );
  }

  onGetCountryList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/country`;
    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.countrylist = data?.Result;
        console.log('CCCCCCCCCCCCCCCCCC', this.countrylist)
        const bussinessList: any = this.countrylist.find(ele => ele.Code == this.uw);
        console.log('llllllllllll', bussinessList)
        if (bussinessList) {
          this.orginCountry.push(bussinessList?.CodeDescription);
        }

      },
      (err) => { },
    );
  }


  onGetCountry(viewproposalNo) {
    console.log('ooooooooooo')
    const urlLink = `${this.ApiUrl1}OpenCover/originationcountry/edit`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      "ProposalNo": viewproposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result) {
          this.editCountryList = data?.Result?.OriginationCountryInfo;
          console.log('jjjjjjjjjjjjj', data.Result.OriginationCountryInfo)
          console.log('EEEEEEEEEEEEE', this.editCountryList)


        }
      },
      (err) => { },
    );
  }

  onGetdestCountry(viewproposalNo) {
    console.log('ooooooooooo')
    const urlLink = `${this.ApiUrl1}OpenCover/destinationcountry/edit`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      "ProposalNo": viewproposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result) {
          this.destCountryList = data?.Result?.DestinationCountryInfo;
          console.log('jjjjjjjjjjjjj', data.Result.OriginationCountryInfo)
          console.log('EEEEEEEEEEEEE', this.editCountryList)


        }
      },
      (err) => { },
    );
  }

  goback() {
    this.router.navigate(['/Marine/portfolio'])
  }


  public applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
  originSearch = '';
  destSearch = '';

  get filteredOriginList() {
    if (!this.originSearch) return this.editCountryList;
    return this.editCountryList.filter(c =>
      c.CountryName.toLowerCase().includes(this.originSearch.toLowerCase())
    );
  }

  get filteredDestList() {
    if (!this.destSearch) return this.destCountryList;
    return this.destCountryList.filter(c =>
      c.CountryName.toLowerCase().includes(this.destSearch.toLowerCase())
    );
  }

  onGetCustomerList() {
    const urlLink2 = `${this.ApiUrl1}OpenCover/insured/edit`;
    const reqData2 = {
      'BranchCode': this.userDetails.BranchCode,
      'ProposalNo': this.ProposalNo,
    };

    this.openCoverService.onPostMethodSync(urlLink2, reqData2).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result) {
          this.tableData = data?.Result.InsuredInfo;
          this.columnHeader = [
            { key: 'AdditionalInsured', display: 'ID' },
            { key: 'AdditionalInsuredName', display: 'Customer Name' },

            // { key: 'PoBox', display: 'P.O.Box' },
            // { key: 'EmirateName', display: 'Emirate Name' },
            // { key: 'MissippiCustomerCode', display: 'Flag' },
          ];
        }
      },
      (err) => { },
    );

  }
}


