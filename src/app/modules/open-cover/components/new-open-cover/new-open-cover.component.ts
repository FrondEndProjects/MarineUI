import { OpenCoverService } from './../../open-cover.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CurrencyPipe } from '../../../../shared/pipes/currency.pipe';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import { ModalDismissReasons, NgbDateAdapter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { table } from 'console';
import { NbMenuService } from '@nebular/theme';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../../../../Auth/auth.service';

@Component({
  selector: 'app-new-open-cover',
  templateUrl: './new-open-cover.component.html',
  styleUrls: ['./new-open-cover.component.scss'],
})
export class NewOpenCoverComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  @ViewChild('myModal4') myModal4: any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['select', 'BROKER_CODE', 'BROKER_NAME'];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public AdminUrl: any = this.AppConfig.AdminUrl;
  public userDetails: any;
  public productId: any;
  public newQuoteForm!: FormGroup;
  public editData: any;
  public proposalNo: any = '';

  public bussinesTypeList: any[] = [];
  public openCoverTypeList: any[] = [];
  public brokerList: any[] = [];
  public excutiveList: any[] = [];
  public currencyList: any[] = [];
  public DeclarationTypeList: any[] = [];

  public filterValue: any;
  public tableData: any[] = [];
  public searchList: any[] = [];
  public columnHeader: any[] = [];
  public columnHeader1: any[] = [];
  customerId: any;
  public loginId: any = '';
  public submitted: boolean = false;
  public btnConfig = {
    btnName: 'Add New',
    btnStatus: 'primary',
    btnShow: true
  }
  RefNo: any =null;
  MissippiCode: any;
  ProposalNo: any
  public routerBaseLink: any = '';
  public OpenCover: any;
  minDate: { year: number; month: number; day: number; };
  editSection: boolean = false;
  closeResult: string; endorsement: any = null;
  applicationId: any = null; brokerCode: any = null;
  titleError: boolean;
  customerNameError: boolean;
  coreAppcodeError: boolean;
  cityNameError: boolean;
  poBoxError: boolean;
  emailIdError: boolean;
  mobileNoError: boolean;
  customerType: any = 'Individual';
  title: any = null; customerName: any = null;
  dropPremiumCurrencyList: any;
  coreAppcode: any = null; cityValue: any = null;
  poBox: any = null; mobileNo: any = null; emailId: any = null;
  dropCityList: any[] = [];
  Address1: any = null;
  Address2: any = null;
  customerVat: any = null;
  dropTitleList: any[] = [];
  branchList: any[] = [];
  constructor(
    private modalService: NgbModal,
    private openCoverService: OpenCoverService,
    private router: Router, private menuService: NbMenuService,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
        private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.branchList = this.userDetails?.LoginBranchDetails;

    this.loginId = this.userDetails.LoginId;
    this.endorsement = JSON.parse(sessionStorage.getItem('endorsement'));


  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.ProposalNo = params['ProposalNo'];
      if (!this.ProposalNo) {
        this.onCreateFormControl();
        sessionStorage.removeItem('ProposalNo');
        this.RefNo = null;
        this.proposalNo =null;
        this.MissippiCode =null;
      }
    });

    this.authService.branchCode$.subscribe((branchCode) => {
      if (branchCode) {
        this.onGetBrokerDetailsDropdownList(branchCode); 
      }
    });

    this.menuService.onItemClick().subscribe((data) => {
      console.log("Current Route", data.item.link)
      if (data.item.link === `/${this.routerBaseLink}/new-open-cover/new-open-cover-form` || data.item.link === `/Marine/new-open-cover/new-open-cover-form`) {
        sessionStorage.removeItem("OpenCoverEdit");
        this.reloadCurrentRoute();

      }
    });
    let openCoverData = JSON.parse(sessionStorage.getItem('OpenCoverEdit'))
    if (openCoverData) {
      this.onCreateFormControl();
      this.onLoadDropdownList();
      this.activatedRoute.queryParams.subscribe(params => {
        let d = params['ProposalNo'];
        if (d) {
          this.onEdit();
        }
      });
      this.onGetPremiumDropdownList();
    }
    else {
      this.onCreateFormControl();
      this.onLoadDropdownList();
      this.newQuoteF.customer.disable();
      this.onGetPremiumDropdownList();
      //this.onGetCustomerList('direct');
    }
    // this.openCoverService.onGetOpenCoverEdit.subscribe((data: any) => {
    //   console.log(data);
    //   this.editData = data;
    //   if (data) {
    //     this.onEdit();
    //   }
    //   else{
    //     this.onGetCustomerList('direct');
    //   }
    // });


    this.newQuoteF.utilizedAmount.valueChanges.subscribe(x => {
      console.log('kkkkkkkkkk', x);
      var annualEstimate = this.newQuoteF.annualEstimate.value;
      var removecomma: any = annualEstimate.toString().replace(/,/g, '');
      var number: any = Number(removecomma);
      console.log('sssssssssssssssss', number);
      if (x > number) {
        console.log('hhhhhhhhhhhhh', number);
        // setTimeout(() => {
        this.newQuoteF.utilizedAmount.setErrors({ message: 'amount should be lessthan annual mount' })
        // });
      }

    });

    let newDate = new Date();
    const ngbDate = {
      "year": newDate.getFullYear(),
      "month": newDate.getMonth() + 1,
      "day": newDate.getDate()
    }
    this.minDate = ngbDate;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.newQuoteF.selectBranch.setValue(this.userDetails?.BranchCode);
    }, 2000);
  }

  // onChangeBranch() {
  //   this.onGetBrokerDetailsDropdownList();
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  reloadCurrentRoute() {

    window.location.reload();
  }
  checkSearchDisable() {
    return (this.newQuoteF.selectBroker.value == '' || this.newQuoteF.selectBroker.value == null || this.newQuoteF.selectBroker.value == undefined);
  }
  getCustomerId() { return this.customerId }
  onCreateFormControl() {
    this.newQuoteForm = this._formBuilder.group({
      businessType: [null, Validators.required],
      openCoverType: [null, Validators.required],
      selectBroker: [null, Validators.required],
      selectBranch: [null, Validators.required],
      salesExective: [null, Validators.required],
      customer: ['', Validators.required],
      debitTo: ['Customer', Validators.required],
      openCoverStartDate: [null, Validators.required],
      openCoverEndDate: [null, Validators.required],
      annualEstimate: ['', Validators.required],
      utilizedAmount: ['0'],
      currency: [null, Validators.required],
      // sharedPercentage: ['100', Validators.required],
      // noOfCoInsuComp: ['0'],
      sharedPercentage: ['100',  [
        Validators.required,
        Validators.maxLength(3),
        Validators.max(100),
        Validators.pattern(/^\d{1,3}$/)
      ] ],
      noOfCoInsuComp: ['0',[
        Validators.maxLength(3),
        Validators.max(100),
        Validators.pattern(/^\d{1,3}$/)
      ]],
      freeTextAllowed: ['N', Validators.required],
      crossVoyage: ['N'],
      crossVoyagePrecnt: ['0'],
      existingCore: [''],
      certificateStartForm: ['', Validators.required],
      commissiomPrecnt: ['', Validators.required],
      minimumPremium: ['', Validators.required],
      endorsementFee: ['0', Validators.required],
      issuanceFeePrecnt: ['0', Validators.required],
      minimumPremIssuanceFee: ['0', Validators.required],
      noOfBackDays: ['', Validators.required],
      defaultClauses: ['N', Validators.required],
      declarationType: [null, Validators.required],
      hauilerType: ['N', Validators.required],
      war: ['N', Validators.required],
      fac: ['N', Validators.required],
      policyFee: ['0', Validators.required],
      voyageRemarks: [''],
      effectiveDate: [null],
      premiumCurrency: [null, Validators.required],
    });



  }
  get newQuoteF() {
    return this.newQuoteForm.controls;
  }



  onGetCustomerList(type) {
    this.columnHeader = [
      {
        key: 'CustomerId',
        display: 'Customer Id',
        config: {
          select: true,
        },
      },
      { key: 'FirstName', display: 'Customer Name' },
      { key: 'Email', display: 'Email' },
      { key: 'PoBox', display: 'P.O.Box' },
      { key: 'EmirateName', display: 'Emirate Name' },
      { key: 'MissippiCustomerCode', display: 'Flag' },
    ];
    // this.columnHeader1 = [
    //   {
    //     key: 'CustomerId',
    //     display: 'Customer Id',
    //     config: {
    //       select: true,
    //     },
    //   },
    //   { key: 'BROKER_CODE', display: 'Customer Name' },
    //   { key: 'BROKER_NAME', display: 'Customer Name' },
    // ];
    const urlLink = `${this.ApiUrl1}opencover/dropdown/customerlist`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'LoginId': this.loginId,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.tableData = data?.Result?.CustomerResponse;

        }
      },
      (err) => { },
    );
  }

  onSelectCustomer(item: any, modal) {
    this.newQuoteF.customer.enable();
    this.newQuoteF.customer.setValue(item?.FirstName);
    this.newQuoteF.customer.disable();
    this.customerId = item?.CustomerId;
    modal.close();
  }

  onLoadDropdownList() {
    this.onGetBusinessTypeDropdownList();
    this.onGetOpenCoverTypeDropdownList();
    this.onGetBrokerDetailsDropdownList(this.userDetails?.BranchCode);
    this.onGetExcutiveDropdownList();
    this.onGetCurrencyDropdownList();
    this.onGetDeclarationDropdownList();
    this.onGetCityDropdownList();
    this.onGetTitleDropdownList();
  }

  onGetBusinessTypeDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/businesstype`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.bussinesTypeList = data?.Result;
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
        }
      },
      (err) => { },
    );
  }
  onGetBrokerDetailsDropdownList(code) {
 
    const urlLink = `${this.ApiUrl1}opencover/dropdown/brokerdetails`;
    const reqData = {
      'BranchCode': code,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.brokerList = data?.Result;
          this.newQuoteF.selectBroker.setValue(this.editData?.BrokerId);
          this.onChangeBroker();
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
        }
      },
      (err) => { },
    );
  }

  onGetCurrencyDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/currency`;
    const reqData = {
      // 'BranchCode': this.userDetails?.BranchCode,
      'BranchCode': this.userDetails?.BranchCode,
      'CountryId': this.userDetails?.CountryId,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.currencyList = data?.Result;
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
        }
      },
      (err) => { },
    );
  }

  onChangeBroker() {
    this.loginId = this.newQuoteF.selectBroker.value;
    console.log(this.loginId);
    sessionStorage.setItem('customerLoginId', this.loginId);
    //this.onGetCustomerList('From Broker');
  }

  onChangeStartDate(event: any) {
    console.log(event);
    let StartDate = event;
    const startDateformt: any = `${StartDate?.year}-${StartDate?.month}-${StartDate?.day}`;
    let newDate = new Date(startDateformt);
    newDate.setDate(newDate.getDate() + 364);
    const ngbDate = {
      "year": newDate.getFullYear(),
      "month": newDate.getMonth() + 1,
      "day": newDate.getDate()
    }
    const endDate: any = this.dateAdapter.toModel(ngbDate)!;
    this.newQuoteF.openCoverEndDate.setValue(endDate);
  }

  CommaFormatted(tableData) {
    let i = 0;
    console.log('hhhhhhhhhhhhhhh', tableData)
    let entry = tableData;
    console.log("Entry Came")
    if (entry.length != 0) {
      //for(let build of this.tableData){
      if (entry != null || entry != undefined) {
        console.log("Entry Came 1", entry)
        let value = entry.replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.newQuoteF.annualEstimate.setValue(value);
      }
      console.log('Esctimtaed Amount', this.newQuoteF.annualEstimate.value)
      //}    //this.getTotalSICost('building');
    }
    //this.secondcommaseporator(this.tableData);     //return tableData.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  }
  CommaFormattedUtilizedAmount(tableData, type) {
    let i = 0;
    console.log('hhhhhhhhhhhhhhh', tableData)
    if (tableData != null && type == "UtilizedAmt") {
      let entry = String(tableData);
      console.log("Entry Came")
      if (entry.length != 0) {
        if (entry != null || entry != undefined) {
          console.log("Entry Came 1", entry)
          let value = entry.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.newQuoteF.utilizedAmount.setValue(value);
        }
        console.log('Esctimtaed Amount', this.newQuoteF.utilizedAmount.value)
      }
    }
    else if (tableData != null && type == "policyfee") {
      let entry = String(tableData);
      console.log("Entry Came")
      if (entry.length != 0) {
        if (entry != null || entry != undefined) {
          console.log("Entry Came 1", entry)
          let value = entry.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.newQuoteF.policyFee.setValue(value);
        }
        console.log('Esctimtaed Amount', this.newQuoteF.policyFee.value)
      }
    }
    else if (tableData != null && type == "MinPremium") {
      let entry = String(tableData);
      console.log("Entry Came")
      if (entry.length != 0) {
        if (entry != null || entry != undefined) {
          console.log("Entry Came 1", entry)
          let value = entry.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.newQuoteF.minimumPremium.setValue(value);
        }
        console.log('Esctimtaed Amount', this.newQuoteF.minimumPremium.value)
      }
    }
  }

  onEdit() {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    const urlLink = `${this.ApiUrl1}OpenCover/quote/edit`;
    const user = this.userDetails;
    const reqData = {
      'BranchCode': user?.BranchCode,
      'ProposalNo': this.proposalNo,
    };
    sessionStorage.setItem('OpenCover', JSON.stringify(reqData));
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('editData', data);
        if (data?.Result?.OpenCoverNo) {
          const opencover = {
            'name': 'adminReferral',
            'value': data?.Result?.OpenCoverNo
          }
          this.OpenCover = opencover;
          sessionStorage.setItem('OpenCover', JSON.stringify(opencover));

        }
        if (data?.Result?.ProposalNo) {

          this.editData = data?.Result;
          this.setFormValues();
          //this.openCoverService.onGetCoverEditData(data?.Result);
          sessionStorage.setItem('MissippiCode', data?.Result?.MissippiCode);

        }
      },
      (err) => { },
    );


  }
  onGetTitleDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/title`;

    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'pvType': 'title',
      'ProductId': this.productId,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropTitleList = data?.Result;

        }
      },
      (err) => { },
    );
  }
  onGetCityDropdownList() {

    console.log(this.userDetails, " this.userDetails");
    if (this.userDetails.InsuranceId == '100020') {
      let countryId = this.userDetails?.LoginBranchDetails[0]?.OriginationCountryId
      const urlLink = `${this.ApiUrl1}master/countrycity/list`;
      const reqData = {
        'countryID': countryId
      };

      this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          if (data?.Message === 'Success') {
            this.dropCityList = data?.Result;
            console.log(this.dropCityList);


          }
        },
        (err) => { },
      );
    }
    else {
      const urlLink = `${this.ApiUrl1}quote/dropdown/city`;
      const reqData = {
        'BranchCode': this.userDetails?.BranchCode,
        'ProductId': this.productId,
        'pvType': 'city',
        'OpenCoverNo': this.OpenCover?.value,
      };
      this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          if (data?.Message === 'Success') {
            this.dropCityList = data?.Result;

          }
        },
        (err) => { },
      );
    }
  }
  onsubmit() {
    let valid = this.checkMandatories();
    if (valid) {
      if (this.userDetails?.UserType != "Issuer") {
        this.loginId = this.userDetails?.LoginId;
        this.applicationId = '1';

      }
      // Issuer

      if (this.userDetails?.UserType == "Issuer") {
        this.loginId = this.endorsement?.LoginId || '';
        this.applicationId = this.userDetails.LoginId;
      }
      let cityName = null;
      if (this.cityValue != null && this.cityValue != '' && this.cityValue != undefined) {
        let entry = this.dropCityList.find(ele => ele.Code == this.cityValue);
        console.log('Entry', entry)
        if (entry) cityName = entry.CodeDescription;
      }
      let ReqObj = {
        "Address1": this.Address1,
        "Address2": this.Address2,
        "ApplicationId": this.applicationId,
        "CityCode": this.cityValue,
        "CityName": cityName,
        "ClientCustomerId": null,
        "CompanyName": null,
        "Country": null,
        "CustFirstName": this.customerName,
        "CustLastName": null,
        "CustVatRegNo": this.customerVat,
        "CustomerArNo": null,
        "CustomerArabicName": null,
        "CustomerCode": this.coreAppcode ? this.coreAppcode : null,
        "CustomerId": this.customerId ? this.customerId : null,
        "CustomerName": this.customerName,
        "DateOfBirth": null,
        "Email": this.emailId,
        "Fax": null,
        "Gender": null,
        "LoginBranchCode": this.userDetails?.BranchCode,
        "LoginId": this.newQuoteF.selectBroker.value,
        "MobileNo": this.mobileNo,
        "Nationality": null,
        "Occupation": null,
        "PoBox": this.poBox,
        "TelephoneNo": null,
        "Title": this.title,
        "CustomerType": this.customerType
      }
      console.log("Final obj", ReqObj)
      let urlLink = `${this.ApiUrl1}OpenCover/customer/save`;
      this.openCoverService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if (data?.Status) {
            this.customerId = null;
            this.customerName = null; this.mobileNo = null; this.emailId = null; this.title = null;
            this.coreAppcode = null; this.cityValue = null; this.customerVat = null; this.Address1 = null;
            this.Address2 = null; this.editSection = false; this.getCustomerAltList(null);
          }
        },
        (err) => { },
      );
    }
  }
  checkMandatories() {
    let i = 0; this.titleError = false; this.customerNameError = false; this.coreAppcodeError = false; this.cityNameError = false; this.poBoxError = false;
    this.mobileNoError = false; this.emailIdError = false;
    if (this.title == null || this.title == '' || this.title == undefined) { i += 1; this.titleError = true; }
    if (this.customerName == null || this.customerName == '' || this.customerName == undefined) { i += 1; this.customerNameError = true; }
    if (this.coreAppcode == null || this.coreAppcode == '' || this.coreAppcode == undefined) { i += 1; this.coreAppcodeError = true; }
    if (this.cityValue == null || this.cityValue == '' || this.cityValue == undefined) { i += 1; this.cityNameError = true; }
    if (this.poBox == null || this.poBox == '' || this.poBox == undefined) { i += 1; this.poBoxError = true; }
    if (this.mobileNo == null || this.mobileNo == '' || this.mobileNo == undefined) { i += 1; this.mobileNoError = true; }
    if (this.emailId == null || this.emailId == '' || this.emailId == undefined) { i += 1; this.emailIdError = true; }
    return i == 0;
  }
  setFormValues() {
    this.proposalNo = this.editData?.ProposalNo;
    if(this.proposalNo){
      this.RefNo = this.editData?.RefNo
    }
    else{ 
      this.RefNo =''
    }
    this.customerId = this.editData?.CustomerId;
    this.newQuoteF.businessType.setValue(this.editData?.BusinessType.toString());
    this.newQuoteF.openCoverType.setValue(this.editData?.Type.toString());
    this.newQuoteF.selectBranch.setValue(this.editData?.LoginBranchCode);
    this.onGetBrokerDetailsDropdownList(this.userDetails?.BranchCode);
    // this.newQuoteF.selectBroker.setValue(this.editData?.BrokerId);
    // this.onChangeBroker();
    this.newQuoteF.salesExective.setValue(this.editData?.ExecutiveId.toString());
    this.newQuoteF.customer.setValue(this.editData?.InsuredName);
    this.newQuoteF.premiumCurrency.setValue(this.editData?.PremiumCurrencyCode);
    this.newQuoteF.customer.disable();
    this.newQuoteF.openCoverStartDate.setValue(this.openCoverService.ngbDateFormatt(this.editData?.PolicyStartDate));
    this.newQuoteF.openCoverEndDate.setValue(this.openCoverService.ngbDateFormatt(this.editData?.PolicyEndDate));
    if (this.editData?.EstimateAmount != null && this.editData?.EstimateAmount != undefined && this.editData?.EstimateAmount != '' && this.editData?.EstimateAmount != '0') {
      let amount = this.editData?.EstimateAmount.split('.')[0];
      this.CommaFormatted(amount)
      //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
    }
    else {
      this.newQuoteF.annualEstimate.setValue('0')
    }
    //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
    console.log('MMMMMMMMMMMMMMMMMMM', this.newQuoteF.annualEstimate);
    if (this.editData?.UtilizedAmount != null && this.editData?.UtilizedAmount != undefined && this.editData?.UtilizedAmount != '' && this.editData?.UtilizedAmount != '0') {
      let amount = this.editData?.UtilizedAmount.split('.')[0];
      this.CommaFormattedUtilizedAmount(amount, 'UtilizedAmt')
      //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
    }
    else {
      this.newQuoteF.utilizedAmount.setValue('0')
    }
    //this.newQuoteF.utilizedAmount.setValue(this.editData?.UtilizedAmount);
    this.newQuoteF.currency.setValue(this.editData?.Currency);
    this.newQuoteF.sharedPercentage.setValue(this.editData?.RsaValue);
    this.newQuoteF.crossVoyagePrecnt.setValue(this.editData?.VoyageValue);
    this.newQuoteF.certificateStartForm.setValue(this.editData?.CertNo);
    this.newQuoteF.debitTo.setValue(this.editData?.DebitType);

    this.newQuoteF.freeTextAllowed.setValue(this.editData?.FreeText);
    this.newQuoteF.crossVoyage.setValue(this.editData?.CrossVoyage);
    this.newQuoteF.noOfCoInsuComp.setValue(this.editData?.NoOfCompany);
    this.newQuoteF.existingCore.setValue(this.editData?.PolicyNo);
    this.newQuoteF.commissiomPrecnt.setValue(this.editData?.Commission);
    if (this.editData?.MinPremium != null && this.editData?.MinPremium != undefined && this.editData?.MinPremium != '' && this.editData?.MinPremium != '0') {
      let amount = parseInt(this.editData?.MinPremium);
      this.CommaFormattedUtilizedAmount(amount, 'MinPremium');
      //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
    }
    else {
      this.newQuoteF.minimumPremium.setValue('');
    }
    //this.newQuoteF.minimumPremium.setValue(this.editData?.MinPremium);
    this.newQuoteF.endorsementFee.setValue(this.editData?.EndorsementFee);
    this.newQuoteF.issuanceFeePrecnt.setValue(this.editData?.IssuanceFee);
    this.newQuoteF.minimumPremIssuanceFee.setValue(this.editData?.MinPremiumIssuance);
    this.newQuoteF.noOfBackDays.setValue(this.editData?.BackDays);
    this.newQuoteF.defaultClauses.setValue(this.editData?.DefaultClauses);
    this.newQuoteF.declarationType.setValue(this.editData?.DecType);

    this.newQuoteF.hauilerType.setValue(this.editData?.HaulierType == null ? 'N' : this.editData?.HaulierType);
    this.newQuoteF.war.setValue(this.editData['W&Srcc']);
    this.newQuoteF.fac.setValue(this.editData?.FacYN);
    if (this.editData?.PolicyFee != null && this.editData?.PolicyFee != undefined && this.editData?.PolicyFee != '' && this.editData?.PolicyFee != '0') {
      let amount = parseInt(this.editData?.PolicyFee);
      this.CommaFormattedUtilizedAmount(amount, 'policyfee')
      //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
    }
    else {
      this.newQuoteF.policyFee.setValue('0')
    }
    //this.newQuoteF.policyFee.setValue(this.editData?.PolicyFee);
    this.newQuoteF.effectiveDate.setValue(this.openCoverService.ngbDateFormatt(this.editData?.EffectiveDate));
    this.newQuoteF.voyageRemarks.setValue(this.editData?.CountryRemarks);
    this.RefNo = this.editData?.RefNo;
    this.MissippiCode = this.editData?.MissippiCode;

    this.onCheckCrossVoyage();
  }
  onCheckCrossVoyage() {
    console.log(this.newQuoteF.crossVoyage.value);

    const crossVoyage = this.newQuoteF.crossVoyage;
    if (this.newQuoteF.crossVoyage.value == 'N') {
      crossVoyage.clearValidators();
      console.log('remove')
      crossVoyage.updateValueAndValidity();

    }


    else {
      crossVoyage.setValidators([Validators.required]);
      console.log('add')
      crossVoyage.updateValueAndValidity();

    }
  }
  getCustomerAltList(modal) {

    this.tableData = [];
    const urlLink = `${this.ApiUrl1}opencover/dropdown/customerlist`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'LoginId': this.newQuoteF.selectBroker.value,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.columnHeader = [{
            key: 'CustomerId',
            display: 'Customer Id',
            config: {
              select: true,
            },
          },
          { key: 'FirstName', display: 'Customer Name' },
          { key: 'Email', display: 'Email' },
          { key: 'PoBox', display: 'P.O.Box' },
          { key: 'EmirateName', display: 'Emirate Name' },
          {
            key: "edit",
            display: "Edit",
            // sticky: true,
            config: {
              isActionBtn: true,
              isActionBtnName: "Edit",
              isNgxIcon: "fas fa-pen-alt",
              bg: "primary",
            },
          }

          ];
          this.tableData = data?.Result?.CustomerResponse;
          // if (this.customerF.name.status == "DISABLED" || data?.Result == null) {
          if (this.productId == '3' || this.productId == '11') {
            this.titleError = false; this.customerNameError = false; this.coreAppcodeError = false; this.cityNameError = false; this.poBoxError = false;
            this.mobileNoError = false; this.emailIdError = false;
            this.customerName = null; this.mobileNo = null; this.emailId = null; this.title = null;
            this.coreAppcode = null; this.cityValue = null; this.customerVat = null; this.Address1 = null;
            this.Address2 = null; this.editSection = false;
            if (modal) this.open(modal)
          }
          // else {
          //   this.isCustomerTable = true;
          // }

        }
      },
      (err) => { },
    );
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getCodeDescription(list: any[], code: any) {
    let description: any = '';
    if (code && code !== '') {
      const find = list.find((ele: any) => ele.Code === code);
      if (find) {
        description = find.CodeDescription;
      } else {
        description = '';
      }
    }
    return description;
  }
  onSubmitData() {
    this.submitted = true;
    let utilizedAmount: any, policyFee: any;
    if (this.newQuoteF.utilizedAmount.value != null && this.newQuoteF.utilizedAmount.value != 0) {
      if (this.newQuoteF.utilizedAmount.value.includes(',')) { utilizedAmount = this.newQuoteF.utilizedAmount.value.replace(/,/g, '') }
      else { utilizedAmount = this.newQuoteF.utilizedAmount.value };
    }

    else {
      utilizedAmount = this.newQuoteF.utilizedAmount.value;
    }
    if (this.newQuoteF.policyFee.value != null && this.newQuoteF.policyFee.value != 0) {
      if (this.newQuoteF.policyFee.value.includes(',')) { policyFee = this.newQuoteF.policyFee.value.replace(/,/g, '') }
      else { policyFee = this.newQuoteF.policyFee.value };
    }

    else {
      policyFee = this.newQuoteF.policyFee.value;
    }
    const urlLink = `${this.ApiUrl1}OpenCover/quote/save`;
    console.log();
    this.newQuoteF.customer.enable();
    const reqData = {
      'AdditionalInfo': '',
      'BackDays': this.newQuoteF.noOfBackDays.value,
      'BrokerId': this.newQuoteF.selectBroker.value,
      'BusinessType': this.newQuoteF.businessType.value,
      'CertNo': this.newQuoteF.certificateStartForm.value,
      'CertPremiumYN': '',
      'ClaimRatio': '',
      'Commission': this.newQuoteF.commissiomPrecnt.value,
      'ConfirmStatus': '',
      'CountryRemarks': this.newQuoteF.voyageRemarks.value,
      'CreditToId': '',
      'CrossVoyage': this.newQuoteF.crossVoyage.value,
      'Currency': this.newQuoteF.currency.value,
      'CustomerId': this.customerId,
      'DebitToId': '',
      'DebitType': this.newQuoteF.debitTo.value,
      'DecType': this.newQuoteF.declarationType.value,
      'DefaultClauses': this.newQuoteF.defaultClauses.value,
      'Deposit': '',
      'EffectiveDate': this.newQuoteF.effectiveDate.value?.replace(/-/g, '/'),
      'EndorsementFee': this.newQuoteF.endorsementFee.value,
      'EstimateAmount': this.newQuoteF.annualEstimate.value.toString().replace(/,/g, ''),
      'ExchangeRate': this.currencyPipe.transform(this.newQuoteF.currency.value, this.currencyList),
      'ExecutiveId': this.newQuoteF.salesExective.value,
      'FacYN': this.newQuoteF.fac.value,
      'ForeignTurnOver': this.newQuoteF.annualEstimate.value.toString().replace(/,/g, ''),
      'FreeText': this.newQuoteF.freeTextAllowed.value,
      'HaulierPremium': '',
      'HaulierType': this.newQuoteF.hauilerType.value,
      'Insured': '',
      'InsuredName': this.newQuoteF.customer.value,
      'IssuanceFee': this.newQuoteF.issuanceFeePrecnt.value,
      'LoginBranchCode': this.userDetails?.BranchCode,
      // 'LoginBranchCode': this.newQuoteF.selectBranch.value,
      'LoginId': this.userDetails?.LoginId,
      'LossDetail': '',
      'MarginPercent': '',
      'MarginYN': '',
      'MinPreMul': '',
      'MinPreMulType': '',
      'MinPremium': Number(this.newQuoteF.minimumPremium.value.toString().replace(/,/g, '')),
      //this.newQuoteF.minimumPremium.value,
      'MinPremiumIssuance': this.newQuoteF.minimumPremIssuanceFee.value,
      'MissippiCode': this.MissippiCode,
      'MissippiOpenPolicyId': '',
      'NoOfCompany': this.newQuoteF.noOfCoInsuComp.value,
      'NoOfVehicles': '',
      'OpenCoverNo': this.OpenCover?.value,
      'PaymentRemarks': '',
      'PolicyFee': Number(policyFee),
      //this.newQuoteF.policyFee.value,
      'PolicyNo': this.newQuoteF.existingCore.value,
      'PolicyStartDate': this.newQuoteF.openCoverStartDate.value?.replace(/-/g, '/'),
      'PolicyEndDate': this.newQuoteF.openCoverEndDate.value?.replace(/-/g, '/'),

      'ProductId': '11',
      'ProposalNo': this.proposalNo,
      'ProposalStatus': '',
      'RefNo': this.RefNo,
      'Remarks': '',
      'RsaValue': this.newQuoteF.sharedPercentage.value,
      'SumInsuredLmit': '',
      'Type': this.newQuoteF.openCoverType.value,
      'UserId': '',
      'UserType': this.userDetails.UserType,
      'UtilizedAmount': Number(utilizedAmount),
      //this.newQuoteF.utilizedAmount.value,
      'VoyageValue': this.newQuoteF.crossVoyagePrecnt.value,
      'W&Srcc': this.newQuoteF.war.value,
      'Warland': '',
      'PremiumCurrencyCode': this.newQuoteF.premiumCurrency.value,
      'PremiumCurrencyName': this.getCodeDescription(this.dropPremiumCurrencyList, this.newQuoteF.premiumCurrency.value),
    };
    console.log(this.newQuoteForm.valid, this.newQuoteForm)
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if (data?.Result?.Status) {
          sessionStorage.setItem('ProposalNo', data?.Result?.ProposalNo);
          sessionStorage.setItem('ReportNo', this.newQuoteF.openCoverType.value);
          this.router.navigate([`${this.routerBaseLink}/new-open-cover/country-commodity-info`]);
        }
        else { this.newQuoteF.customer.disable(); }
      },
      (err) => { },
    );
  }

  onChangeCurrencyDropdown() {
    console.log('hhhhhhhhh', this.newQuoteF.premiumCurrency.value)
    const countryList: any = this.dropPremiumCurrencyList.find(ele => ele.Code === this.newQuoteF.premiumCurrency.value);
    this.newQuoteF.premiumCurrency.setValue(countryList?.Code);
  }
  onGetPremiumDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/premiumcurrency`;
    const reqData = {
      'CompanyId': this.userDetails?.RegionCode,
      'BranchCode': this.userDetails?.BelongingBranch,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropPremiumCurrencyList = data?.Result;

        }
      },
      (err) => { },
    );
  }



  onMoveFront() {
    this.openCoverService.onMoveNext('Front');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/country-commodity-info`]);
  }
  onMoveBack() {
    this.openCoverService.onMoveNext('Back');
  }

  onDateFormat(val: any) {
    const splitDate = val.split('/');
    const reverseDate = splitDate.reverse();
    const joinDate = reverseDate.join('-');
    return new Date(joinDate);
  }
  ngOnDestroy() {
    this.openCoverService.openCoverEdit.next(null);
  }

  isActionBtn(event: any) {
    console.log(event);
    if (event?.btName === 'Edit') {
      this.onEditCustomer(event);
    }
  }
  onEditCustomer(event) {
    this.editSection = true;
    // this.customerType
    // this.title
    // this.customerName
    // this.coreAppcode
    // this.cityValue
    // this.poBox
    // this.mobileNo
    // this.emailId
    // this.customerVat
    // this.Address1
    // this.Address2
    let ReqObj = {
      "CustomerId": event.CustomerId
    }
    let urlLink = `${this.ApiUrl1}OpenCover/customer/edit`;
    this.openCoverService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data.Result) {
          this.customerId = data.Result.CustomerId
          this.customerType = data.Result.CustomerType
          this.title = data.Result.Title
          this.customerName = data.Result.CustomerName
          this.coreAppcode = data.Result.CustomerCode
          this.cityValue = data.Result.CityCode
          this.poBox = data.Result.PoBox
          this.mobileNo = data.Result.MobileNo
          this.emailId = data.Result.Email
          this.customerVat = data.Result.CustVatRegNo
          this.Address1 = data.Result.Address1
          this.Address2 = data.Result.Address2
        }
      },
      (err) => { },
    );
  }

  onSearchCustomer(value) {
    this.columnHeader1 = [
      {
        key: 'CustomerId',
        display: 'Customer Id',
        config: {
          select: true,
        },
      },
      { key: 'BROKER_CODE', display: 'Customer Name' },
      { key: 'BROKER_NAME', display: 'Customer Name' },
    ];

    this.modalService.open(this.myModal4, { size: 'lg', scrollable: true });

    let ReqObj = {
      "BranchCode": null,
      "InsuranceId": this.userDetails.InsuranceId,
      "SearchValue": value ? value : null,
      "SourceType": this.userDetails.SubUserType
    }
    let urlLink = `${this.AdminUrl}api/search/premiabrokercustomercode`;
    this.openCoverService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log("Searched Data", data);

        if (data.Result.length != 0) {
          if (data.Result.length == 1) {
            if (data.Result[0].BROKER_CODE != null) {
              this.searchList = data.Result;
              // this.dataSource.data = this.searchList;
              // this.dataSource = new MatTableDataSource(this.searchList);
              // this.dataSource.paginator = this.paginator;
            }
          }
          else {
            this.searchList = data.Result;
            // this.dataSource.data = this.searchList;
            // this.dataSource = new MatTableDataSource(this.searchList);
            // this.dataSource.paginator = this.paginator; // <-- Important!
          }
        }
      },
      (err) => { },
    );

  }
  selectProduct(customer: any, modal) {
    this.coreAppcode = customer.BROKER_CODE
    this.customerName = customer.BROKER_NAME
    modal.close();
  }

}
