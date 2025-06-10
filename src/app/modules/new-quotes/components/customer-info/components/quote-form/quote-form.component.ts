import { CustomerInfoComponent } from './../../customer-info.component';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import * as Mydatas from '../../../../../../app-config.json';
import { NewQuotesService } from '../../../../new-quotes.service';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'node:console';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit, OnChanges, AfterViewInit {
  // @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  initialLoadCount = 50;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any; VesselNames: any = '';
  public loginId: any;
  public applicationId: any;
  VesselName: any;
  public step = 0;
  public openCoverNo: any = '';
  public quoteForm!: FormGroup;
  public referenceNo: any; renderSection: boolean = false;
  public submitted: boolean;
  public filterValue: any; vesselValue: any = null;
  public dropTransportList: any[] = [];
  public dropCoverList: any[] = [];
  secondarylist: any[] = [];
  public dropCarriageList: any[] = [];
  public dropOriginCountryList: any[] = [];
  public dropOriginCityList: any[] = [];
  public dropDestinaCountryList: any[] = [];
  public dropDestinaCityList: any[] = [];
  public dropSettlingAgentCityList: any[] = [];
  public dropPackageDescList: any[] = [];
  public dropIncotermsList: any[] = [];
  public dropIncotermsPrecentList: any[] = [];
  public dropToleranceList: any[] = [];
  public dropCurrencyList: any[] = [];
  public dropPremiumCurrencyList: any[] = [];
  public dropGoodsOfCateList: any[] = [];
  dropTranshippingCountryList: any[] = [];
  editCover: any
  editmodeOfCarriage: any
  vesselSearchList: any[] = [];
  public warStatus: any = ''; closeResult: any = null;
  subscription: Subscription; public tableData: any[] = [];
  ManufactureYear: any; manshow: any = false;
  pageSize = 100;
  currentPage = 0;
  totalRecords = 0;
  public dropPartialShipList: any[] = [
    { Code: 'N', CodeDescription: 'None' },
    { Code: 'Y', CodeDescription: 'Partial' },
    { Code: 'M', CodeDescription: 'Multiple' },
  ];
  @ViewChild('formDirective') public quoteFormDirective: NgForm;
  pattern = {
    0: {
      pattern: new RegExp('\[a-zA-Z0-9]'),
    },
  };
  minDate: { year: number; month: number; day: number; };
  maxDate: any; OpenCover: any = null;
  values: any = 'others';
  columnHeader: any[];
  manshows: any = false;
  newshow: any = false;
  newVesselName: any = '';
  vesselid: any;
  insurenceId: any
  manyr: any;
  vesselId: any;
  viaSearch: any
  displayedColumns: any[];
  docUploadedData: any;
  TranshippingCountryEdit: any
  setDocvalue: any;
  enableGrid: boolean = false;
  TranshippingCityEdit: any;
  editOrginCity: any;
  editDesinationCity: any;
  constructor(
    private _formBuilder: FormBuilder,
    private newQuotesService: NewQuotesService,
    private customerInfoComponent: CustomerInfoComponent,
    private dateAdapter: NgbDateAdapter<string>,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
  ) {
    this.newQuotesService.getDropDownList(this.dropPartialShipList, 'partialShip');
    this.quoteForm = this.customerInfoComponent.quoteForm;
    this.userDetails = this.customerInfoComponent?.userDetails;
    this.productId = this.customerInfoComponent?.productId;
    this.insurenceId = this.userDetails?.InsuranceId
    console.log('Productidssss', this.userDetails);
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.docUploadedData = JSON.parse(sessionStorage.getItem('docUploadData'));

    if (this.OpenCover?.name) {
      if (this.OpenCover?.name == 'adminReferral') {
        this.productId = this.OpenCover?.productId;
        console.log('ADMIN REFERAL', this.productId);
      }
    }
    if (this.customerInfoComponent.OpenCover?.value) {
      this.openCoverNo = this.customerInfoComponent.OpenCover?.value;

    }
    this.loginId = this.customerInfoComponent?.loginId;
    this.applicationId = this.customerInfoComponent?.applicationId;

    this.activatedRoute.queryParams.subscribe(params => {
      this.setDocvalue = params['value'];

      if (this.setDocvalue == 'back' || this.setDocvalue == 'edit') {
        this.docUploadedData = null
      }
    });

  }

  ngAfterViewInit() {
    console.log('Paginator:', this.paginator);
    this.dataSource.paginator = this.paginator;
  }

  getTranshippingId() {
    return this.quoteF.via.value
  }
  ngOnInit(): void {
    this.displayedColumns = [
      {
        key: 'ShortCode',
        display: 'Port Code',
        config: {
          select: true,
        },
      },
      {
        key: 'CodeDescription',
        display: 'Port Description'
      },
      // {
      //   key: 'ShortCode',
      //   display: 'Port Code'
      // }
    ];
    // this.get_transhipping_list(1)
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 45);
    const ngbDate = {
      "year": newDate.getFullYear(),
      "month": newDate.getMonth() + 1,
      "day": newDate.getDate()
    }
    this.maxDate = ngbDate;
    this.subscription = this.newQuotesService.getQuoteEditData.subscribe((data: any) => {
      if (!this.renderSection) {
        if (data && data?.OpenCoverNo != null) {
          this.renderSection = true;
          this.openCoverNo = data?.OpenCoverNo;
          this.omDropDownParallelCall();
        }
        else {
          this.renderSection = true;
          this.omDropDownParallelCall();
        }
      }
    });


  }
  ClearSubscribe(): void {
    this.subscription.unsubscribe();
  }
  omDropDownParallelCall() {
    this.quoteF.originatingCountry.setValue(this.userDetails?.OriginationCountryId);
    this.quoteF.destinationCountry.setValue(this.userDetails?.DestinationCountryId);
    this.subscription = this.newQuotesService.getQuoteEditData.subscribe((data: any) => {
      if (data) {
        if (this.dropOriginCountryList.length == 0) {
          this.onEditQuote(data);
        }
      }
      else {
        if (this.dropOriginCountryList.length == 0) {
          this.onLoadDropdownList();
        }
      }
    });


    //  this.onGetOriginCityDropdownList();
    //  this.onGetDestinaCityDropdownList();

  }

  get quoteF() {
    return this.quoteForm.controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onEditQuote(data: any) {
    const customerDetails = data?.CustomerDetails;
    const lcBankDetails = data?.LcBankDetails;
    const quoteDetails = data?.QuoteDetails;
    const commodityDetails = data?.QuoteDetails?.CommodityDetails[0];
    const transportDetails = data?.QuoteDetails?.TransportDetails;
    const vesselDetails = data?.QuoteDetails?.VesselDetails;

    this.quoteF.modeOfTransport.setValue(transportDetails?.ModeOfTansportCode);
    this.onGetCoverDropdownList(1);
    this.onGetCarriageDropdownList(null, null);
    this.quoteF.cover.setValue(transportDetails?.CoverCode);
    this.quoteF.modeOfCarriage.setValue(transportDetails?.ModeOfCarriageCode);
    this.editCover = transportDetails?.CoverCode;
    this.editmodeOfCarriage = transportDetails?.ModeOfCarriageCode;
    this.quoteF.originatingCountry.setValue(transportDetails?.OriginCountryCode);
    this.onGetOriginCityDropdownList();
    // this.quoteF.originatingCity.setValue(transportDetails?.OriginCityCode);
    this.editOrginCity = transportDetails?.OriginCityCode
    if (this.userDetails?.RegionCode == '100020') {
      this.quoteF.TranshipmentYN.setValue(transportDetails?.TranshipmentYn);
      this.quoteF.StoragePeriodYn.setValue(transportDetails?.StoragePeriodYn);
    }
    else {
      this.quoteF.TranshipmentYN.setValue('N');
      this.quoteF.StoragePeriodYn.setValue('N');
    }
    this.quoteF.originatingWarehouse.setValue(transportDetails?.OriginWarehouseYn);
    this.quoteF.destinationCountry.setValue(transportDetails?.DestinationCountryCode);
    this.onGetDestinaCityDropdownList();
    this.TranshippingCountryEdit = transportDetails?.TranshipmentCountry
    // this.quoteF.destinationCity.setValue(transportDetails?.DestinationCityCode);
    this.editDesinationCity = transportDetails?.DestinationCityCode
    this.quoteF.destinationWarehouse.setValue(transportDetails?.DestinationWarehouseYn);
    this.quoteF.policyStartDate.setValue(this.newQuotesService.ngbDateFormatt(quoteDetails?.InceptionDate));
    this.quoteF.warSrcc.setValue(quoteDetails?.WarAndSrccYn);
    this.quoteF.warOnLand.setValue(quoteDetails?.WarOnLandYn);
    if (this.quoteF.TranshipmentYN.value == 'Y') {
      this.get_transhipping_list('edit')
    }
    // this.quoteF.via.setValue(transportDetails?.Via);
    this.TranshippingCityEdit = transportDetails?.Via;
    this.quoteF.settlingAgent.setValue(quoteDetails?.SettlingAgentCode);
    //  this.quoteF.others.setValue('');

    this.quoteF.goodsCategory.setValue(commodityDetails?.GoodsCategoryCode);
    this.quoteF.goodsDescript.setValue(commodityDetails?.GoodsCategoryDescription);
    this.quoteF.UCRNumber.setValue(transportDetails?.UCRNumber);
    if (commodityDetails?.InsuredValue) {
      this.CommaFormatted(commodityDetails?.InsuredValue)
    }
    // this.quoteF.insuredValue.setValue(commodityDetails?.InsuredValue);
    this.quoteF.invoiceNumber.setValue(commodityDetails?.InvoiceNo);
    this.quoteF.invoiceDate.setValue(this.newQuotesService.ngbDateFormatt(commodityDetails?.InvoiceDate));
    this.quoteF.consignedTo.setValue(commodityDetails?.ConsignedTo);
    this.quoteF.consignedForm.setValue(commodityDetails?.ConsignedFrom);
    // this.quoteF.UCRNumber.setValue(commodityDetails?.UCRNumber);
    this.quoteF.fragileYN.setValue(commodityDetails?.Fragile);
    this.quoteF.excessDescription.setValue(commodityDetails?.PolicyExcessDescription);


    this.quoteF.poPiNumber.setValue(commodityDetails?.PoDescription);
    this.quoteF.currency.setValue(quoteDetails?.CurrencyCode);
    this.quoteF.currencyValue.setValue(quoteDetails?.CurrencyValue);
    // this.quoteF.premiumCurrency.setValue(quoteDetails?.PremiumCurrencyCode);
    this.quoteF.packageDescription.setValue(quoteDetails?.PackageCode);
    this.quoteF.incoterms.setValue(quoteDetails?.IncoTerms);
    this.onGetIncotermsPrecentDropdownList(1);
    this.quoteF.incotermsPercentage.setValue(quoteDetails?.Percentage);
    this.quoteF.tolerance.setValue(quoteDetails?.Tolerance);
    this.quoteF.conveyanceVesselName.setValue(vesselDetails?.VesselName);
    this.vesselValue = vesselDetails?.VesselName;
    this.ManufactureYear = vesselDetails?.VesselYear;
    this.vesselId = vesselDetails?.VesselCode;
    this.quoteF.ManfctureYear.setValue(vesselDetails?.VesselYear);
    if (this.vesselId == '9999') {
      this.VesselNames = this.vesselValue;
    }
    else { this.VesselName = this.vesselValue }
    this.quoteF.voyageNumber.setValue(quoteDetails?.VoyageNo);
    this.quoteF.partialShipment.setValue(quoteDetails?.PartialShipmentCode == null ? 'N' : quoteDetails?.PartialShipmentCode);
    if (quoteDetails?.ExposureOfShipment != null && quoteDetails?.ExposureOfShipment != '' && quoteDetails?.ExposureOfShipment != undefined && quoteDetails?.ExposureOfShipment != '0') {
      quoteDetails.ExposureOfShipment = String(quoteDetails?.ExposureOfShipment).split('.')[0];
      this.ExposureCommaFormatted(quoteDetails?.ExposureOfShipment)
    }
    this.quoteF.currencyOfExposure.setValue(quoteDetails?.CurrencyOfExposureCode);
    this.quoteF.transhippingCountry.setValue(quoteDetails?.TranshipmentCountry);

  }



  onLoadDropdownList() {
    this.onGetTransportDropdownList();
    if (this.dropOriginCountryList.length == 0 && !this.docUploadedData) this.onGetOriginCountryDropdownList(1);
    if (this.dropDestinaCountryList.length == 0) this.onGetDestinaCountryDropdownList();
    if (this.dropIncotermsList.length == 0 && !this.docUploadedData) this.onGetIncotermsDropdownList(1);
    if (this.dropToleranceList.length == 0 && !this.docUploadedData) this.onGetToleranceDropdownList(1);
    if (this.dropCurrencyList.length == 0 && !this.docUploadedData) this.onGetCurrencyDropdownList(1);
     if (this.dropPremiumCurrencyList.length == 0 && !this.docUploadedData) this.onGetPremiumDropdownList(1);
    if (this.dropGoodsOfCateList.length == 0 && !this.docUploadedData) this.onGetGoodsOfCategoryDropdownList(1);
    if (this.dropGoodsOfCateList.length == 0 && this.openCoverNo != null && this.quoteF.warSrcc.value == 'N') this.onCheckWarYesOrNo();

  }


  setDocUploadedData() {
    let d = this.docUploadedData?.ModeOfTransport == 'Sea transport' ? this.dropTransportList[0]?.Code : this.dropTransportList[1]?.Code
    this.quoteF.modeOfTransport.setValue(d);
    // this.onGetDestinaCityDropdownList();
    this.onGetIncotermsDropdownList(2);
    this.onGetCoverDropdownList(this.quoteF.modeOfTransport?.value)
    this.quoteF.UCRNumber.setValue(this.docUploadedData?.UCRNumber);
    // let Orgcountry = this.dropOriginCountryList.filter(e => e.ShortCode === this.docUploadedData.CountryOfSupply);
    // this.quoteF.originatingCountry.setValue(Orgcountry[0]?.Code)
    // let destinationcity = this.dropDestinaCityList.filter(e => e.ShortCode == this.docUploadedData.PortOfDischarge);
    // this.quoteF.destinationCity.setValue(destinationcity[0]?.CodeValue)
    // let curr = this.dropCurrencyList.filter(e => e.ShortCode == this.docUploadedData?.Currency)
    // this.quoteF.currency.setValue(curr[0]?.Code);
    this.quoteF.insuredValue.setValue(this.docUploadedData?.FOBValue);
    // let e = this.dropIncotermsList.filter(e => e.CodeDescription == this.docUploadedData?.Incoterm)
    // this.quoteF.incoterms.setValue(e[0].Code);
    // if (this.docUploadedData?.Incoterm) {
    //   this.onGetIncotermsPrecentDropdownList(e[0].Code);
    // }
    // let cover = this.dropTransportList.filter(e => e.CodeDescription == d)
    // alert(cover[0].Code)
    // if (cover.length != 0) {
    // this.onGetCoverDropdownList(this.quoteF.modeOfTransport?.value)
    // }
    // this.quoteF.cover.setValue(transportDetails?.CoverCode);
    // this.quoteF.modeOfCarriage.setValue(transportDetails?.ModeOfCarriageCode);
    this.quoteF.goodsDescript.setValue(this.docUploadedData?.GoodsDescription);
    // let currency = this.dropCurrencyList.filter(e => e.ShortCode == this.docUploadedData?.Currency)
    this.onGetGoodsOfCategoryDropdownList(2);
    this.onGetToleranceDropdownList(2);
     this.onGetPremiumDropdownList(2);
    // this.onGetPackageDescDropdownList(2);
    this.onGetCurrencyDropdownList(2);
    this.onGetOriginCountryDropdownList(2)
    // let curDate = new Date();
    // this.quoteF.policyStartDate.setValue(this.newQuotesService.ngbDateFormatt(curDate))
  }

  CommaFormatteds() {

    // format number
    console.log('valuesss', this.quoteF.insuredValue.value)
    if (this.quoteF.insuredValue.value) {
      let value = this.quoteF.insuredValue.value.replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      this.quoteF.insuredValue.setValue(value);
    }

  }


  ExposureFormatteds() {

    // format number
    console.log('valuesss', this.quoteF.exposureOfShipment.value)
    if (this.quoteF.exposureOfShipment.value) {
      let value = this.quoteF.exposureOfShipment.value.replace(/[^0-9.]|(?<=\..*)\./g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      this.quoteF.exposureOfShipment.setValue(value);
    }

  }
  omit_special_char(e) {
    console.log('BBBBBBB', e)
    var k;
    // document.all ? k = e.key:
    k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  none(event) {
    if (event) this.values = 'None';
    else this.values = 'others'
    if (this.values == 'others') {
      this.newshow = false;
      this.VesselNames = null;
      this.ManufactureYear = null;
    }
    else if (this.values == 'None') {
      this.newshow = true;
      this.VesselName = null;
    }
    // this.values = value;
    // console.log('values',this.values);
    // if(value =='1'){
    // this.values= 'None';
    // }
    // else if(value == '2'){
    //   this.quoteF.conveyanceVesselName.setValue(this.VesselName)
    // }
  }

  CommaFormatted(tableData) {
    // console.log('HIDESSSS',tableData);
    let i = 0;
    let entry = tableData.toString();
    if (tableData.includes('.')) {
      let splitValue = entry.split('.');
      let value = splitValue[0].replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (splitValue.length > 1) {
        this.quoteF.insuredValue.setValue(value + '.' + splitValue[1]);
      }
      else {
        this.quoteF.insuredValue.setValue(value + '.')
      }
    }
    else {
      let value = entry.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.quoteF.insuredValue.setValue(value);
    }
    //this.secondcommaseporator(this.tableData);     //return tableData.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  }
  ExposureCommaFormatted(tableData) {
    let i = 0;
    let entry = tableData.toString();
    if (tableData.includes('.')) {
      let splitValue = entry.split('.');
      let value = splitValue[0].replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (splitValue.length > 1) {
        this.quoteF.exposureOfShipment.setValue(value + '.' + splitValue[1]);
      }
      else {
        this.quoteF.exposureOfShipment.setValue(value + '.')
      }
    }
    else {
      let value = entry.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.quoteF.exposureOfShipment.setValue(value);
    }
    //this.secondcommaseporator(this.tableData);     //return tableData.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onGetTransportDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/modeoftransport`;
    const reqData = {
      'BranchCode': this.userDetails.BelongingBranch,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'mode',
      'ProductId': this.productId,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropTransportList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropTransportList, 'transport');
          if (this.docUploadedData && this.setDocvalue != 'back' && this.setDocvalue != 'edit') {
            this.setDocUploadedData();
          }
        }
      },
      (err) => { },
    );
  }

  onGetCoverDropdownList(value) {
    if(this.insurenceId=='100020'){
        this.onGetOriginCityDropdownList();
        this.onGetDestinaCityDropdownList();
    }
    
    this.quoteF.cover.setValue('');
    this.quoteF.modeOfCarriage.setValue('');
    let modeOfTransport
    if (this.docUploadedData && value != 1) {
      modeOfTransport = value
    }
    else {
      modeOfTransport = this.quoteF.modeOfTransport.value
    }
    const urlLink = `${this.ApiUrl1}quote/dropdown/cover`;
    const reqData = {
      'BranchCode': this.userDetails.BelongingBranch,
      'ModeOfTransportCode': modeOfTransport,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'cover',
      'ProductId': this.productId,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropCoverList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropCoverList, 'cover');
          if (this.docUploadedData) {
            this.quoteF.cover.setValue(this.editCover)


            this.onGetCarriageDropdownList(modeOfTransport, this.editCover)
          }
        }
      },
      (err) => { },
    );
  }

  onGetCarriageDropdownList(mode, cover) {
    this.quoteF.modeOfCarriage.setValue('');
    this.onGetPackageDescDropdownList(1);
    const urlLink = `${this.ApiUrl1}quote/dropdown/modeofcarriage`;
    let modeOfTransport
    let Cover
    if (this.docUploadedData && mode != null && cover != null) {
      modeOfTransport = mode;
      Cover = cover
    }
    else {
      modeOfTransport = this.quoteF.modeOfTransport.value;
      Cover = this.quoteF.cover.value
    }
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'ModeOfTransportCode': modeOfTransport,
      'CoverId': Cover,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'conveyance',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropCarriageList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropCarriageList, 'carriage');
          if (this.docUploadedData && mode != null && cover != null) {
            this.quoteF.modeOfCarriage.setValue(this.editmodeOfCarriage)

          }
        }
      },
      (err) => { },
    );
  }
  onGetOriginCountryDropdownList(value) {
    const urlLink = `${this.ApiUrl1}quote/dropdown/originationcountry`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'OriginationCountryCode': this.userDetails?.OrginationCountryId,
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropOriginCountryList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropOriginCountryList, 'orgCountry');
          if (this.docUploadedData && value != 1) {
            let Orgcountry = this.dropOriginCountryList.filter(e => e.ShortCode === this.docUploadedData.CountryOfSupply);
            this.quoteF.originatingCountry.setValue(Orgcountry[0]?.Code)
          }

          this.onGetOriginCityDropdownList();
        }
      },
      (err) => { },
    );
  }
  onGetOriginCityDropdownList() {
   
    this.quoteF.originatingCity.setValue('');
     let d: any
      d = this.dropOriginCountryList.filter(e => e.Code == this.quoteF.originatingCountry.value)
      let Codevalue: any = null;
      if (this.quoteF.modeOfTransport?.value == '1' && this.insurenceId == '100020') {
        Codevalue = d[0]?.CodeValue
      }
      else if (this.quoteF.modeOfTransport?.value == null && this.insurenceId == '100020') {
        Codevalue = this.quoteF.originatingCountry.value

      }
      else {
        if(this.insurenceId == '100020') Codevalue = d[0]?.CodeValue2
        else Codevalue = this.quoteF.originatingCountry.value
      }
    let urlLink=null,reqData=null;
    if (this.insurenceId == '100020') {
      // this.get_transhipping_list()
      urlLink = `${this.ApiUrl1}master/countryport/list`;
      reqData = {
        'countryID': Codevalue,
        "modeOfTransport": this.quoteF.modeOfTransport.value ? this.quoteF.modeOfTransport.value : null
      };
    }
    else{
       urlLink = `${this.ApiUrl1}quote/dropdown/originationcity`;
       reqData = {
        'pvType': 'orgCity',
        'OriginationCountryCode': this.quoteF.originatingCountry.value,
        'BranchCode': this.userDetails?.BelongingBranch,
      };
    }
    console.log(reqData, "reqData");
    if (Codevalue && (this.quoteF.modeOfTransport.value || this.insurenceId!='100020')) {
      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {

          if (data?.Message === 'Success') {
            this.dropOriginCityList = data?.Result;
            this.newQuotesService.getDropDownList(this.dropOriginCityList, 'orgCity');
            const isIncluded = this.dropOriginCityList.some(item => item.Code == this.editOrginCity);
            if (isIncluded && (this.setDocvalue == 'edit' || this.setDocvalue == 'back')) {
              this.quoteF.originatingCity.setValue(this.editOrginCity);

            }
            else {
              this.quoteF.originatingCity.setValue(null);
            }
          }
        },
        (err) => { },
      );
    }

  }

  onGetDestinaCountryDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/destinationcountry`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'DestinationCountryCode': this.userDetails?.DestinationCountryId,
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropDestinaCountryList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropDestinaCountryList, 'destCounty');
          this.onGetDestinaCityDropdownList();

        }
      },
      (err) => { },
    );
  }

  // getCustomerId(){return this.quoteF.conveyanceVesselName.value}

  onGetDestinaCityDropdownList() {
    this.quoteF.destinationCity.setValue('');
    // this.onGetSettlingAgenDropdownList();
    // const urlLink = `${this.ApiUrl1}quote/dropdown/destinationcity`;
    // const reqData = {
    //   'pvType': 'destCity',
    //   'BranchCode': this.userDetails?.BelongingBranch,
    //   'DestinationCountryCode': this.quoteF.destinationCountry.value,
    // };
    let d: any
    d = this.dropDestinaCountryList.filter(e => e.Code == this.quoteF.destinationCountry.value)
    let Codevalue: any = null,urlLink=null,reqData=null;
    if (this.quoteF.modeOfTransport?.value == '1' && this.insurenceId=='100020') {

      Codevalue = d[0]?.CodeValue
    }
    else if (this.quoteF.modeOfTransport?.value == null && this.insurenceId=='100020') {
      Codevalue = this.quoteF.destinationCountry.value

    }
    else {
     if(this.insurenceId=='100020') Codevalue = d[0]?.CodeValue2
     else Codevalue =this.quoteF.destinationCountry.value
    }
    if(this.insurenceId=='100020'){
        urlLink = `${this.ApiUrl1}master/countryport/list`;
        reqData = {
          'countryID': Codevalue,
          "modeOfTransport": this.quoteF.modeOfTransport.value ? this.quoteF.modeOfTransport.value : null
        };
    }
    else{
      urlLink = `${this.ApiUrl1}quote/dropdown/destinationcity`;
      reqData = {
        'pvType': 'destCity',
        'BranchCode': this.userDetails?.BelongingBranch,
        'DestinationCountryCode': this.quoteF.destinationCountry.value,
      };
    }
    if (Codevalue && (this.quoteF.modeOfTransport.value || this.insurenceId!='100020')) {
      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {

          if (data?.Message === 'Success') {
            this.dropDestinaCityList = data?.Result;
            this.newQuotesService.getDropDownList(this.dropDestinaCityList, 'destCity');
            const isIncluded = this.dropDestinaCityList.some(item => item.Code == this.editDesinationCity);
            if (isIncluded && (this.setDocvalue == 'edit' || this.setDocvalue == 'back')) {
              this.quoteF.destinationCity.setValue(this.editDesinationCity);
            }
            else {
              this.quoteF.destinationCity.setValue(null);
            }
            if (this.docUploadedData && this.setDocvalue != 'edit' && this.setDocvalue != 'back') {
              let destinationcity = this.dropDestinaCityList.filter(e => e.ShortCode == this.docUploadedData.PortOfDischarge);
              this.quoteF.destinationCity.setValue(destinationcity[0]?.CodeValue)
            }

          }
        },
        (err) => { },
      );
    }

  }
  onGetSettlingAgenDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/settlingagent`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'DestinationCountryCode': this.quoteF.destinationCountry.value,
      'LoginId': this.loginId,
      'pvType': 'agent',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropSettlingAgentCityList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropSettlingAgentCityList, 'settlingAgent');
          if (this.dropSettlingAgentCityList.length != 0) {
            this.quoteForm.controls['settlingAgent'].setValue(this.dropSettlingAgentCityList[0]?.Code)
          }

        }
      },
      (err) => { },
    );
  }

  onGetPackageDescDropdownList(value) {
    const urlLink = `${this.ApiUrl1}quote/dropdown/package`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'ModeOfTransportCode': this.quoteF.modeOfTransport.value,
      'pvType': 'package',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropPackageDescList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropPackageDescList, 'packageDesc');
          // if(this.docUploadedData && value!= 1){
          //   this.quoteF.packageDescription.setValue(this.dropPackageDescList[0].Code)
          // }

        }
      },
      (err) => { },
    );
  }

  clearSearch() {
    this.vesselSearchList = [];
    this.VesselName = null;
    this.values = 'others';
  }
  onGetVesselDropdownList() {
    this.newshow = false;
    this.vesselSearchList = [];
    // let vseel:any[]=[];
    // vseel= this.VesselName
    // if(this.VesselName.length>=3){
    if (this.VesselName) {
      if (String(this.VesselName).length >= 3) {
        const urlLink = `${this.ApiUrl1}quote/dropdown/vesselname`;
        const reqData = {
          'BranchCode': this.userDetails?.BranchCode,
          'VesselName': this.VesselName
        };
        this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
          (data: any) => {

            if (data?.Message === 'Success') {
              this.vesselSearchList = data?.Result;
              this.columnHeader = [
                {
                  key: 'actions',
                  display: 'select',
                  config: {
                    select: true,
                  }
                },
                { key: 'VesselId', display: 'Vessel Id' },
                { key: 'VesselDescription', display: 'Vessel Name' },
                { key: 'ManfctureYear', display: 'MFYYears' },
              ]

            }
            else {
              this.vesselSearchList = [];
            }
          },
          (err) => { },
        );
      }
    }
  }

  vessel(modal) {


    if (this.VesselNames != null && this.VesselNames != '' && this.VesselNames != undefined) {
      this.values = 'None';
    }
    else {
      this.values = 'others';
      this.VesselNames = null;
      this.ManufactureYear = null;
    }
    if (this.quoteF.conveyanceVesselName.value != null && this.quoteF.conveyanceVesselName.value != undefined) {
      let value = this.quoteF.conveyanceVesselName.value;
      if (value != 'Vessel as per Institute Classification Clause') this.VesselName = this.quoteF.conveyanceVesselName.value;

      this.vesselValue = this.quoteF.conveyanceVesselName.value;
    }
    else {
      this.VesselName = '';
      this.vesselSearchList = [];
    }
    if (this.values == 'None') {
      console.log(this.newshow)
      this.newshow = true;
      this.manshows = false;
      this.vesselSearchList = [];
      this.vesselid = '';
      this.manyr = '';
    }
    else if (this.values == 'others') {
      this.newshow = false;
      this.manshow = false;
      this.VesselNames = '';
    }
    this.open(modal);
    this.onGetVesselDropdownList();
  }

  onSelectCustomer(rowData, checked, modal) {
    console.log('NNNNNNNNNN', rowData, checked);
    if (checked == undefined) {
      console.log('Vesss', rowData?.VesselDescription);
      this.newVesselName = rowData?.VesselDescription;
      this.vesselValue = this.newVesselName;
      this.vesselid = rowData?.VesselId;
      this.manyr = rowData?.ManfctureYear;
      this.ManufactureYear = this.manyr;
      // this.quoteF.VesselId.setValue(rowData?.VesselId);
      // this.quoteF.ManfctureYear.setValue(rowData?.ManfctureYear);
    }
  }

  submits(modal) {

    if (this.values == 'None') {
      if (this.ManufactureYear != null && this.VesselNames != null) {
        this.manshow = false;
        this.quoteF.ManfctureYear.setValue(this.ManufactureYear);
        this.quoteF.conveyanceVesselName.setValue(this.VesselNames);
        this.vesselValue = this.VesselNames;
        modal.dismiss('Cross click');
      }
      else {
        this.manshow = true;
      }
    }
    else if (this.values == 'others') {

      if (this.newVesselName != null && this.newVesselName != '') {
        this.quoteF.conveyanceVesselName.setValue(this.newVesselName);
        this.quoteF.VesselId.setValue(this.vesselid);
        this.quoteF.ManfctureYear.setValue(this.manyr);
        this.vesselValue = this.newVesselName;
        this.manshows = false;
        modal.dismiss('Cross click');
      }
      else {
        this.manshows = true;
      }

    }
  }

  numberOnly(event): boolean {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    // const charCode = (event.which) ? event.which : event.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   return false;
    // }
    // return true;
  }

  getCustomerAltList(modal) {

    this.tableData = [];
    let code = this.customerInfoComponent.brokercallcode;
    console.log('GCOdesssss', code);
    const urlLink = `${this.ApiUrl1}api/customer/information`;
    if (this.productId == '3') this.openCoverNo = null;
    const reqData = {
      "BrokerCode": code,
      'ApplicationId': this.applicationId,
      'LoginId': this.loginId,
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          if (this.productId == '3' || this.productId == '11') {
            // this.editSection = false;
            if (modal) this.open(modal)
          }
          this.tableData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  onGetIncotermsDropdownList(value) {
    const urlLink = `${this.ApiUrl1}quote/dropdown/incoterm`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'saleTerm',
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropIncotermsList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropIncotermsList, 'incoterms');
          if (this.docUploadedData && value != 1) {
            let e = this.dropIncotermsList.filter(e => e.CodeDescription == this.docUploadedData?.Incoterm)
            this.quoteF.incoterms.setValue(e[0].Code);
            if (this.docUploadedData?.Incoterm) {
              this.onGetIncotermsPrecentDropdownList(e[0].Code);
            }
          }

        }
      },
      (err) => { },
    );
  }

  onGetIncotermsPrecentDropdownList(value) {
    const urlLink = `${this.ApiUrl1}quote/dropdown/incotermpercentage`;
    let incoterms
    if (this.docUploadedData && value != 1) {
      incoterms = value
    }
    else {
      incoterms = this.quoteF.incoterms.value

    }
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'IncotermCode': incoterms,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'saleTermPercent',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropIncotermsPrecentList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropIncotermsPrecentList, 'incotermsPrec');
          // if(this.docUploadedData && value!=1){
          //   this.quoteF.incotermsPercentage.setValue(this.dropIncotermsPrecentList[0].Code)
          // }

        }
      },
      (err) => { },
    );
  }


  onGetToleranceDropdownList(value) {
    const urlLink = `${this.ApiUrl1}quote/dropdown/tolerance`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'tolerance',
      'IncotermPercent': this.quoteF.incotermsPercentage.value
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropToleranceList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropToleranceList, 'tolerance');
          // if(this.docUploadedData && value !=1){
          // this.quoteF.incotermsPercentage.setValue(this.dropToleranceList[0].Code) 
          // }
        }
      },
      (err) => { },
    );
  }


  onGetGoodsOfCategoryDropdownList(value) {
    const urlLink = `${this.ApiUrl1}quote/dropdown/goodscategory`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'goodsCategory',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropGoodsOfCateList = data?.Result;

          let defaultObj = [{ CodeDescription: '-Select-', Code: '9999' }];
          this.dropGoodsOfCateList = [...defaultObj, ...this.dropGoodsOfCateList];

          this.newQuotesService.getDropDownList(this.dropGoodsOfCateList, 'goodesofCat');
          if (!this.docUploadedData && this.setDocvalue != 'edit' && this.setDocvalue != 'back') {
            setTimeout(() => {
              this.quoteF.goodsCategory.setValue(this.dropGoodsOfCateList[0].Code);
              this.quoteF.goodsCategory.updateValueAndValidity();
            }, 100);
          }
        }
      },
      (err) => { },
    );
  }

  onGetCurrencyDropdownList(value) {
    console.log(value, "value");

    const urlLink = `${this.ApiUrl1}quote/dropdown/currency`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
      'ProductId': this.productId,
      'pvType': 'currency',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropCurrencyList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropCurrencyList, 'currencyList');
          if (this.docUploadedData && value != 1) {
            let curr = this.dropCurrencyList.filter(e => e.ShortCode == this.docUploadedData?.Currency)
            this.quoteF.currency.setValue(curr[0]?.Code);
            if (curr[0]?.Code) {
              this.quoteF.currencyValue.setValue(curr[0]?.CodeValue);
            }
            else {
              this.quoteF.currencyValue.setValue(null);

            }

          }

        }
      },
      (err) => { },
    );
  }
  onGetPremiumDropdownList(value) {
    const urlLink = `${this.ApiUrl1}quote/dropdown/premiumcurrency`;
    const reqData = {
      'CompanyId': this.userDetails?.RegionCode,
      'BranchCode': this.userDetails?.BelongingBranch,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropPremiumCurrencyList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropPremiumCurrencyList, 'PremiumcurrencyList');
          // if (this.docUploadedData && value != 1) {
          // this.quoteF.premiumCurrency.setValue(this.dropPremiumCurrencyList[0].Code)
          // }

        }
      },
      (err) => { },
    );
  }
  onCheckWarYesOrNo() {
    const urlLink = `${this.ApiUrl1}api/warsrc/status`;
    const reqData = {
      "OpenCoverNo": this.openCoverNo
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.warStatus = data?.Result;
      }
    )
  }


  onChangeCurrencyDrop() {
    const countryList: any = this.dropCurrencyList.find(ele => ele.Code === this.quoteF.currency.value);
    this.quoteF.currencyValue.setValue(countryList?.CodeValue);

    this.quoteF.currencyOfExposure.setValue(this.quoteF.currency.value);
  }
  onChangeCurrencyDropdown() {
    console.log('hhhhhhhhh', this.quoteF.premiumCurrency.value)
    const countryList: any = this.dropPremiumCurrencyList.find(ele => ele.Code === this.quoteF.premiumCurrency.value);
    this.quoteF.premiumCurrency.setValue(countryList?.Code);
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

  get_transhipping_list(type) {
    const urlLink = `${this.ApiUrl1}master/transhipping/list`;
    let d
    let obj
    console.log(this.quoteF.transhippingCountry.value, "this.quoteF.transhippingCountry.value");

    if (this.quoteF.transhippingCountry.value) {
      d = this.dropTranshippingCountryList.filter(e => e.Code == this.quoteF.transhippingCountry.value)
    }
    if (type == 1 || type == 'edit') {
      obj = {
        "Type": 'Country'
      }
    }
    else {
      obj = {
        "CountryName": d[0]?.Code

      }
    }

    this.newQuotesService.onPostMethodSync(urlLink, obj).subscribe(
      (data: any) => {

        if (type == 1 || type == 'edit') {
          this.dropTranshippingCountryList = data.Result;
          if (type == 'edit') {

            const countryList: any = this.dropTranshippingCountryList.find(ele => ele.Code == this.TranshippingCountryEdit);
            this.quoteF.transhippingCountry.setValue(countryList?.Code);
            this.get_transhipping_list(2);
          }
        }
        else {
          this.secondarylist = data?.Result;

          if (type == 2 && this.quoteF.transhippingCountry.value) {
            const cityList: any = this.secondarylist.find(ele => ele.ShortCode == this.TranshippingCityEdit);

            this.quoteF.via.setValue(cityList?.ShortCode);
          }
        }
        // this.enableGrid = true;
        // this.setData(modal, 'direct')
      },
      (err) => { },
    )

  }
  onGetTranshippingCityDropdownList() {
    this.get_transhipping_list(2);
  }


  onTranshipmentChange(event) {
    if (event.target.value == 'N') {
      this.quoteF.via.setValue(null);
      this.quoteF.transhippingCountry.setValue(null);
      this.quoteForm.get('via')?.clearValidators();
      this.quoteForm.get('transhippingCountry')?.clearValidators();
    }
    else {
      this.get_transhipping_list(1);
      this.quoteForm.updateValueAndValidity
      this.quoteForm.get('via')?.setValidators([Validators.required]);
      this.quoteForm.get('transhippingCountry')?.setValidators([Validators.required]);


    }
    this.quoteForm.get('via')?.updateValueAndValidity();
    this.quoteForm.get('transhippingCountry')?.updateValueAndValidity();
  }
  // get_transhipping_list(page: number = 0) {
  //   const urlLink = `${this.ApiUrl1}master/transhipping/list`;
  //   let d;
  //   if (this.quoteF.originatingCountry.value) {
  //     d = this.dropOriginCountryList.filter(e => e.Code == this.quoteF.originatingCountry.value);
  //   }

  //   const obj = {
  //     "CountryName": d[0]?.CodeDescription,
  //     "page": page,
  //     "size": this.pageSize
  //   };

  //   this.newQuotesService.onPostMethodSync(urlLink, obj).subscribe((data: any) => {
  //     this.dropTranshippingCountryList = data?.Result;
  //     this.totalRecords = data?.TotalCount || 0; // Optional if API returns total
  //     this.dataSource.data = this.dropTranshippingCountryList;
  //   });
  // }

  Transhipping(modal) {

    // if (this.dropTranshippingCountryList.length == 0) {
    // this.get_transhipping_list(modal);

    // }
    // else {

    // this.setData(modal, 'change')
    // this.open(modal);

    // }


  }
  setData(modal, type) {

    const chunkSize = 5000;
    let currentIndex = 0;
    this.dropTranshippingCountryList = [];
    // this.dropTranshippingCountryList = this.secondarylist.slice(currentIndex, currentIndex + chunkSize);
    // currentIndex += chunkSize;
    // const interval = setInterval(() => {
    //   if (currentIndex >= this.secondarylist.length) {
    //     this.enableGrid = (this.dropTranshippingCountryList.length==this.secondarylist.length);
    //     clearInterval(interval);
    //     return;
    //   }
    //   else this.enableGrid = !this.enableGrid;
    //   const nextChunk = this.secondarylist.slice(currentIndex, currentIndex + chunkSize);
    //   this.dropTranshippingCountryList.push(...nextChunk);
    //   console.log(this.dropTranshippingCountryList.length,"Length")
    //   currentIndex += chunkSize;

    // }, 2000);
    this.dropTranshippingCountryList = this.secondarylist.slice(currentIndex, currentIndex + chunkSize);
    currentIndex += chunkSize;

    const interval = setInterval(() => {
      if (currentIndex >= this.secondarylist.length) {
        clearInterval(interval);
        this.enableGrid = true;
        return;
      }
      else {
        this.enableGrid = false;
      }

      const nextChunk = this.secondarylist.slice(currentIndex, currentIndex + chunkSize);
      this.dropTranshippingCountryList.push(...nextChunk);
      currentIndex += chunkSize;
    }, 2000);

    this.open(modal);

  }
  onSelectTranshipping(event: any, modal) {
    if (event.ShortCode) {
      this.quoteF.via.setValue(event.ShortCode);
    }
    modal.close();


  }

  // handlePageChange(event: any) {

  //   this.currentPage = event.pageIndex; // Or event.page if your table emits like that
  //   this.get_transhipping_list(this.currentPage);
  // }

  invalidDefaultSelectValidator(control: AbstractControl): ValidationErrors | null {
    return control.value === '9999' ? { invalidDefault: true } : null;
  }
  DestinationcityChange(event) {
    if (this.quoteF.destinationOtherYN.value == true) {
      this.quoteF.destinationCityOther.setValidators(Validators.required);
      this.quoteF.destinationCityOther.updateValueAndValidity();
      this.quoteF.destinationCity.clearValidators();
      this.quoteF.destinationCity.updateValueAndValidity();
    }
    else {
      this.quoteF.destinationCity.setValidators(Validators.required);
      this.quoteF.destinationCity.updateValueAndValidity();
      this.quoteF.destinationCityOther.clearValidators();
      this.quoteF.destinationCityOther.updateValueAndValidity();

    }

  }
  OrgincityChange(event) {
    if (this.quoteF.orginatingCityOtherYN.value == true) {
      this.quoteF.orginatingCityOther.setValidators(Validators.required);
      this.quoteF.orginatingCityOther.updateValueAndValidity();
      this.quoteF.originatingCity.clearValidators();
      this.quoteF.originatingCity.updateValueAndValidity();
    }
    else {
      this.quoteF.originatingCity.setValidators(Validators.required);
      this.quoteF.originatingCity.updateValueAndValidity();
      this.quoteF.orginatingCityOther.clearValidators();
      this.quoteF.orginatingCityOther.updateValueAndValidity();

    }

  }
}
