import { NewQuotesComponent } from './../../new-quotes.component';
import { BrokerFormComponent } from './components/broker-form/broker-form.component';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { startWith } from 'rxjs/operators';
import * as Mydatas from '../../../../app-config.json';
import { Observable, merge, combineLatest } from 'rxjs';
import * as moment from 'moment';
import { NewQuotesService } from '../../new-quotes.service';
import { CurrencyPipe } from '../../../../shared/pipes/currency.pipe';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { BankFormComponent } from './components/bank-form/bank-form.component';
import * as EnabledList from '../../../../enabledFields.json';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss'],

})
export class CustomerInfoComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public customerForm: FormGroup;
  public quoteForm: FormGroup;
  public bankForm: FormGroup;
  public brokerForm: FormGroup;

  public userDetails: any;
  public productId: any;
  public loginId: any;
  public brokerCode: any;
  public applicationId: any;

  public dropCityList: any[] = [];
  public dropBankList: any[] = [];
  public dropGoodsOfCateList: any[] = [];
  public dropCurrencyList: any;
  public dropPremiumCurrencyList :any;
  public dropPackageDescList: any[] = [];
  public dropPartialShipList: any[] = [];
  public dropSettlingAgentList: any[] = [];
  public dropCoverList: any[] = [];
  public dropDestinaCityList: any[] = [];
  public dropDestinaCountryList: any[] = [];
  public dropCarriageList: any[] = [];
  public dropTransportList: any[] = [];
  public dropOriginCountryList: any[] = [];
  public dropOriginCityList: any[] = [];

  public editQuoteData: any;
  public referenceNo: any = '';
  public headerDetails:any;
  public endorsementSelected:any;
  public premiumDetails: any;
  public submitted: boolean = false;
  public isFormGroub: boolean = false;
  public isIssuer: boolean = false;


  public EnabledListJson: any = (EnabledList as any).default;
  objectKeys = Object.keys;
  @ViewChild(CustomerFormComponent) customerFormComponent!: CustomerFormComponent;
  @ViewChild(QuoteFormComponent) quoteFormComponent!: QuoteFormComponent;
  @ViewChild(BankFormComponent) bankFormComponent!: BankFormComponent;
  @ViewChild(BrokerFormComponent) brokerFormComponent!: BrokerFormComponent;


  public OpenCover:any='';
  public endorsement: any;
  public quotesType:any='';
  public WithCertifi:any='';
  public routerBaseLink:any;
  QuoteStatus: string ="QE";
  broCode: any;quoteNo:any=null;
  brokercallcode: any;

  constructor(
    private _formBuilder: FormBuilder,
    private newQuotesService: NewQuotesService,
    private currencyPipe: CurrencyPipe,
    private activatedRoute: ActivatedRoute,
    private menuService: NbMenuService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private newQuotesComponent:NewQuotesComponent,
    private dateAdapter: NgbDateAdapter<string>,
    private sessionStorageService: SessionStorageService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      
    
    this.userDetails = this.userDetails?.LoginResponse;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.endorsement = JSON.parse(sessionStorage.getItem('endorsement'));
    this.quotesType = sessionStorage.getItem('quotesType');
    this.referenceNo = sessionStorage.getItem('ReferenceNo');
    if(this.referenceNo==null){
      sessionStorage.removeItem('QuoteStatus')
    }
    this.WithCertifi = sessionStorage.getItem('WithCertifi');
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    if(this.OpenCover){
      if(this.OpenCover?.name == 'adminReferral'){
            this.productId = this.OpenCover?.productId;
      } 
    }
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    if(sessionStorage.getItem('QuoteStatus')) this.QuoteStatus = sessionStorage.getItem('QuoteStatus');
    this.customerForm = this.newQuotesService.customerForm;
    this.quoteForm = this.newQuotesService.quoteForm;
    this.bankForm = this.newQuotesService.bankForm;
    this.brokerForm = this.newQuotesService.brokerForm;
    this.customerForm = this.newQuotesService.customerForm;

    // Broker
    if (this.userDetails?.UserType != "RSAIssuer") {
      this.loginId = this.userDetails?.LoginId;
      this.applicationId = '1';
      this.isIssuer = false;

    }
    // Issuer

    if (this.userDetails?.UserType == "RSAIssuer"){
      this.loginId = this.endorsement?.LoginId || '';
      this.applicationId = this.userDetails.LoginId;
      this.isIssuer = true;
    }

    if (this.referenceNo) {
      console.log('referenceNo',this.referenceNo)
      this.onEditQuoteDetails();
    }
    else{
      this.brokerForm.reset();
      this.quoteForm.reset();
      this.customerForm.reset();
      this.bankForm.reset();
      this.quoteF.originatingWarehouse.setValue('NO');
      this.quoteF.destinationWarehouse.setValue('NO');
      this.quoteF.warSrcc.setValue('NO');
      this.quoteF.warOnLand.setValue('NO');
      this.quoteF.insuredValue.setValue('0');
      this.quoteF.tolerance.setValue('4');
      this.quoteF.partialShipment.setValue('N');
      this.quoteF.fragileYN.setValue('off');
      for (var control in this.customerForm.controls) {
        this.customerForm.controls[control].enable();

      }
      for (var control in this.quoteForm.controls) {
        this.quoteForm.controls[control].enable();
      }
      for (var control in this.bankForm.controls) {
        this.bankForm.controls[control].enable();
      }
    }
  }

  ngOnInit(): void {

    combineLatest(
      [
        this.newQuotesService.getBankDropdown.pipe(startWith([])),
        this.newQuotesService.getTitleDropdown.pipe(startWith([])),
        this.newQuotesService.getCityDropdown.pipe(startWith([])),
        this.newQuotesService.getTransporDropdown.pipe(startWith([])),
        this.newQuotesService.getCoverDropdown.pipe(startWith([])),
        this.newQuotesService.getCarriageDropdown.pipe(startWith([])),
        this.newQuotesService.getOrginCountryDropdown.pipe(startWith([])),
        this.newQuotesService.getOrginCityDropdown.pipe(startWith([])),
        this.newQuotesService.getDestCountryDropdown.pipe(startWith([])),
        this.newQuotesService.getDestCityDropdown.pipe(startWith([])),
        this.newQuotesService.getSettlingAgentDropdown.pipe(startWith([])),
        this.newQuotesService.getPackageDescDropdown.pipe(startWith([])),
        this.newQuotesService.getIncotermsDropdown.pipe(startWith([])),
        this.newQuotesService.getIncotermsPrecDropdown.pipe(startWith([])),
        this.newQuotesService.getToleranceDropdown.pipe(startWith([])),
        this.newQuotesService.getCatgOfGoodDropdown.pipe(startWith([])),
        this.newQuotesService.getCurrencyDropdown.pipe(startWith([])),
        this.newQuotesService.getPartialShipDropdown.pipe(startWith([])),
        this.newQuotesService.getPremiumDropdown.pipe(startWith([]))
      ],
    ).subscribe(([
      dropBankList,
      dropTitleList,
      dropCityList,
      dropTransportList,
      dropCoverList,
      dropCarriageList,
      dropOriginCountryList,
      dropOriginCityList,
      dropDestinaCountryList,
      dropDestinaCityList,
      dropSettlingAgentList,
      dropPackageDescList,
      dropIncotermsList,
      dropIncotermsPrecentList,
      dropToleranceList,
      dropGoodsOfCateList,
      dropCurrencyList,
      dropPartialShipList,
      dropPremiumCurrencyList
    ]) => {
      this.dropCityList = dropCityList;
      this.dropBankList = dropBankList;
      this.dropGoodsOfCateList = dropGoodsOfCateList;
      this.dropCurrencyList = dropCurrencyList;
      this.dropPremiumCurrencyList = dropPremiumCurrencyList;
      this.dropPackageDescList = dropPackageDescList;
      this.dropPartialShipList = dropPartialShipList;
      this.dropSettlingAgentList = dropSettlingAgentList;
      this.dropCoverList = dropCoverList;
      this.dropDestinaCityList = dropDestinaCityList;
      this.dropDestinaCountryList = dropDestinaCountryList;
      this.dropCarriageList = dropCarriageList;
      this.dropTransportList = dropTransportList;
      this.dropOriginCountryList = dropOriginCountryList;
      this.dropOriginCityList = dropOriginCityList;
    });
    this.onHeaderDetails();
    this.onendorsementSelected();
    if(this.userDetails.UserType =='Broker'){
      this.brokerFormComponent.onChangeBroker;
      this.customerFormComponent.onGetCustomerList(this.userDetails.LoginResponse.AgencyCode);
      }
  }



  get customerF() {
    return this.customerForm.controls;
  }
  get quoteF() {
    return this.quoteForm.controls;
  }
  get bankF() {
    return this.bankForm.controls;
  }
  get brokerF() {
    return this.brokerForm.controls;
  }


  checkCustomerList(brokerCode){
    this.loginId = brokerCode;
    this.brokercallcode =brokerCode;
    this.customerFormComponent.onGetCustomerList(brokerCode);
  }
  onEditQuoteDetails() {
    const urlLink = `${this.ApiUrl1}quote/edit`;
    const reqData = {
      ReferenceNo: this.referenceNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('editData', data);
        if (data?.Message === 'Success') {
          this.editQuoteData = data?.Result;
          if(this.editQuoteData?.OpenCoverNo){
            const opencover = {
              'name':'adminReferral',
              'value':this.editQuoteData?.OpenCoverNo,
            }
            this.OpenCover = opencover;
             sessionStorage.setItem('OpenCover',JSON.stringify(opencover));
          }
          this.sessionStorageService.set('coverId',this.editQuoteData?.QuoteDetails?.TransportDetails?.CoverCode);

          this.newQuotesService.onEditQuoteDetails(this.editQuoteData);
          const customerDetails = this.editQuoteData?.CustomerDetails;
          const lcBankDetails = this.editQuoteData?.LcBankDetails;
          const commodityDetails = this.editQuoteData?.QuoteDetails?.CommodityDetails[0];
          this.brokerF.channel.setValue(this.editQuoteData?.ChannelType);
          this.quoteNo = this.editQuoteData?.QuoteDetails?.QuoteNo;
          this.brokerFormComponent?.onChangeChannel('direct');
          //this.broCode=this.editQuoteData?.BrokerCode;
          //console.log('kkkkkkkkkkkkkk',this.broCode)
          this.brokerF.borker.setValue(this.editQuoteData?.BrokerCode);
          if(this.userDetails.UserType !='Broker'){
            this.brokerFormComponent?.onChangeBroker();
          }
          this.customerFormComponent.brokerCode = this.editQuoteData?.BrokerCode;
          //this.customerFormComponent.onGetCustomerList(this.broCode);
          this.customerF.title.setValue(customerDetails?.Title);
          this.customerF.name.setValue(customerDetails?.Name);
          this.customerF.coreAppcode.setValue(customerDetails?.CoreAppCode);
          this.customerF.city.setValue(customerDetails?.CityCode);
          this.customerF.poBox.setValue(customerDetails?.PoBox);
          this.customerF.mobileNo.setValue(customerDetails?.MobileNo);
          this.customerF.email.setValue(customerDetails?.EmailId);
          this.customerF.customerVat.setValue(customerDetails?.VatRegNo);
          this.customerF.Address1.setValue(customerDetails?.Address1);
          this.customerF.Address2.setValue(customerDetails?.Address2);
          this.customerF.Code.setValue(customerDetails?.Code);
          this.bankF.invoiceNumber.setValue(commodityDetails?.InvoiceNo);
          this.bankF.invoiceDate.setValue(this.newQuotesService.ngbDateFormatt(commodityDetails?.InvoiceDate));
          this.bankF.consignedTo.setValue(commodityDetails?.ConsignedTo);
          this.bankF.consignedForm.setValue(commodityDetails?.ConsignedFrom);
          this.bankF.poPiNumber.setValue(commodityDetails?.PoDescription);
          this.bankF.lCBank.setValue(lcBankDetails?.BankCode);
          this.bankF.lcNumber.setValue(lcBankDetails?.LcNo);
          this.bankF.lcBankDesc.setValue(lcBankDetails?.BankDescription);
          this.bankF.blAwbLrRrNumber.setValue(lcBankDetails?.AwbNo);
          this.bankF.lcDate.setValue(this.newQuotesService.ngbDateFormatt(lcBankDetails?.LcDate));
          console.log(this.newQuotesService.ngbDateFormatt(lcBankDetails?.AwbDate))
          this.bankF.blAwbLrRrDate.setValue(this.newQuotesService.ngbDateFormatt(lcBankDetails?.AwbDate));
          this.bankF.sailingDate.setValue(this.newQuotesService.ngbDateFormatt(lcBankDetails?.SailingDate));

          console.log('EndTypeId to Know',this.editQuoteData.EndtTypeId )

          if(this.editQuoteData.EndtTypeId || this.editQuoteData?.FinalizeYn == 'Y' || this.sessionStorageService.sessionStorgaeModel.referral =='Approved'){

            for (var control in this.customerForm.controls) {
              this.customerForm.controls[control].disable();

            }
            for (var control in this.quoteForm.controls) {
              this.quoteForm.controls[control].disable();
            }
            if( this.sessionStorageService.sessionStorgaeModel.referral !='Approved'){
              for (var control in this.bankForm.controls) {
                this.bankForm.controls[control].disable();
              }
            }

            if(this.editQuoteData.EndtTypeId){
              this.onCheckDisabledFileds(this.editQuoteData.EndtTypeId);
            }
          }else{
            for (var control in this.customerForm.controls) {
              this.customerForm.controls[control].enable();

            }
            for (var control in this.quoteForm.controls) {
              this.quoteForm.controls[control].enable();
            }
            for (var control in this.bankForm.controls) {
              this.bankForm.controls[control].enable();
            }
          }

        }
      },
      (err) => { },
    );
  }
  onHeaderDetails(){
    var urlLink:any = `${this.ApiUrl1}api/endorsement/headerdetails`;
    const reqData = {
      "Result":false,
      "QuoteNo":this.endorsement?.QuoteNo
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('header',data);
        this.headerDetails = data?.Result;
      },
      (err) => { },
    );
  }
  onendorsementSelected(){
    var urlLink:any = `${this.ApiUrl1}api/endorsement/selected`;
    const reqData = {
      "ReferenceNo":this.referenceNo,
      "Result":false
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('header',data);
        this.endorsementSelected = data?.Result;
      },
      (err) => { },
    );
  }


  onCheckDisabledFileds(event: any) {
    const splitIds: any[] = event.split(',') || '';
    const enabledIds: any[] = this.EnabledListJson.EnabledList;
    const filterFileds: any[] = enabledIds.filter(o1 => splitIds.some(o2 => o1.EndtTypeId === o2)).map(x => ([
      ...x.EnabledIds
    ]));
    for (let index = 0; index < filterFileds.length; index++) {
      const element = filterFileds[index];
      this.disabledFields(element);
    }
  }

  disabledFields(fieldListName: any[]) {
    for (let index = 0; index < fieldListName.length; index++) {
      const element = fieldListName[index];
      if (this.customerF[element]) {
        this.customerF[element].enable();
      }
      if (this.quoteF[element]) {
        this.quoteF[element].enable();
      }
      if (this.bankF[element]) {
        this.bankF[element].enable();
      }


    }
  }
  onSaveQuote() {
    this.submitted = true;
    let issuerId:any = '';

    // Broker
    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.brokerCode = this.userDetails.AgencyCode;
      issuerId = '';
    }
    // Issuer
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.brokerCode = this.brokerF.borker.value;
      issuerId = this.userDetails.LoginId;

    }
    let exposureValue = null;
    if(this.quoteF.exposureOfShipment.value!=null && this.quoteF.exposureOfShipment.value!=''){
      exposureValue = this.quoteF.exposureOfShipment.value.replace(',','');
    }
    const urlLink = `${this.ApiUrl1}quote/save`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'BrokerCode': this.brokerCode,
      'ChannelType': this.brokerF.channel.value,
      'CustomerDetails': {
        'Address1': this.customerF.Address1.value,
        'Address2': this.customerF.Address2.value,
        'CityCode': this.customerF.city.value,
        'CityName': this.getCodeDescription(this.dropCityList, this.customerF.city.value),
        'CoreAppCode': this.customerF.coreAppcode.value,
        'EmailId': this.customerF.email.value,
        'MobileNo': this.customerF.mobileNo.value,
        'Name': this.customerF.name.value,
        'PoBox': this.customerF.poBox.value,
        'Title': this.customerF.title.value,
        'VatApplicable': null,
        'Code':this.customerF.Code.value,
        'VatRegNo': this.customerF.customerVat.value,
      },
      'Executive': '5',
      'Issuer': issuerId,
      'LcBankDetails': {
        'AwbDate': this.bankF.blAwbLrRrDate.value?.replace(/-/g, "/"),
        'AwbNo': this.bankF.blAwbLrRrNumber.value,
        'BankCode': this.bankF.lCBank.value,
        'BankDescription': this.getCodeDescription(this.dropBankList, this.bankF.lCBank.value),
        'BankName': this.getCodeDescription(this.dropBankList, this.bankF.lCBank.value),
        'BankOthers': this.bankF.lcBankDesc.value,
        'LcDate': this.bankF.lcDate.value?.replace(/-/g, "/"),
        'LcNo': this.bankF.lcNumber.value,
        'SailingDate': this.bankF.sailingDate.value?.replace(/-/g, "/") ,
      },
      'LoginId': this.loginId,
      'LoginUserType': this.userDetails.UserType,
      'OpenCoverNo': this.OpenCover?.value,
      'ProductId': this.productId,
      'QuoteDetails': {
        'CommodityDetails': [
          {
            'ConsignedFrom': this.bankF.consignedForm.value,
            'ConsignedTo': this.bankF.consignedTo.value,
            'Fragile': this.quoteF.fragileYN.value ,
            'GoodsCategoryCode': this.quoteF.goodsCategory.value,
            'GoodsCategoryDescription': this.quoteF.goodsDescript.value,
            'GoodsCategoryName': this.getCodeDescription(this.dropGoodsOfCateList, this.quoteF.goodsCategory.value),
            'InsuredValue': this.quoteF.insuredValue.value?.replace(/,/g, ''),
            'InvoiceDate': this.bankF.invoiceDate.value?.replace(/-/g, '/'),
            'InvoiceNo': this.bankF.invoiceNumber.value,
            'PoDescription': this.bankF.poPiNumber.value,
            'PolicyExcessDescription': this.quoteF.excessDescription.value,
          },
        ],
        'CurrencyCode': this.quoteF.currency.value,
        'CurrencyName': this.getCodeDescription(this.dropCurrencyList, this.quoteF.currency.value),
        'PremiumCurrencyCode': this.quoteF.premiumCurrency.value,
        'PremiumCurrencyName':this.getCodeDescription(this.dropPremiumCurrencyList, this.quoteF.premiumCurrency.value),
        'CurrencyValue': this.quoteF.currencyValue.value,
        'CurrencyOfExposureCode': this.quoteF.partialShipment.value === 'N' ? '' : this.quoteF.currencyOfExposure.value,
        'CurrencyOfExposureName': this.quoteF.partialShipment.value === 'N' ? '' : this.getCodeDescription(this.dropCurrencyList, this.quoteF.currencyOfExposure.value),
        'CurrencyOfExposureValue': this.quoteF.partialShipment.value === 'N' ? '' : this.currencyPipe.transform(this.quoteF.currency.value, this.dropCurrencyList),
        'ExpiryDate': '',
        'ExposureOfShipment': exposureValue,
        'FinalizeYn': this.editQuoteData?.FinalizeYn,
        'InceptionDate':this.quoteF.policyStartDate.value?.replace(/-/g, "/"),
        'IncoTerms': this.quoteF.incoterms.value,
        'PackageCode': this.quoteF.packageDescription.value,
        'PackageName': this.getCodeDescription(this.dropPackageDescList, this.quoteF.packageDescription.value),
        'PartialShipmentCode': this.quoteF.partialShipment.value,
        'PartialShipmentName': this.getCodeDescription(this.dropPartialShipList, this.quoteF.partialShipment.value),
        'Percentage': this.quoteF.incotermsPercentage.value,
        'QuoteStatus': this.QuoteStatus,
        'SettlingAgentCode': this.quoteF.settlingAgent.value,
        'SettlingAgentName': this.getCodeDescription(this.dropSettlingAgentList, this.quoteF.settlingAgent.value),
        'Tolerance': this.quoteF.tolerance.value,
        'TransportDetails': {
          'CoverCode': this.quoteF.cover.value,
          'CoverName': this.getCodeDescription(this.dropCoverList, this.quoteF.cover.value),
          'DestinationCityCode': this.quoteF.destinationOtherYN.value ? '9999' : this.quoteF.destinationCity.value,
          // tslint:disable-next-line: max-line-length
          'DestinationCityName': this.quoteF.destinationOtherYN.value ? this.quoteF.destinationCityOther.value : this.getCodeDescription(this.dropDestinaCityList, this.quoteF.destinationCity.value),
          'DestinationCountryCode': this.quoteF.destinationCountry.value,
          // tslint:disable-next-line: max-line-length
          'DestinationCountryName': this.getCodeDescription(this.dropDestinaCountryList, this.quoteF.destinationCountry.value),
          'DestinationWarehouseYn': this.quoteF.destinationWarehouse.value,
          'ModeOfCarriageCode': this.quoteF.modeOfCarriage.value,
          'ModeOfCarriageName': this.getCodeDescription(this.dropCarriageList, this.quoteF.modeOfCarriage.value),
          'ModeOfTansportCode': this.quoteF.modeOfTransport.value,
          'ModeOfTransportName': this.getCodeDescription(this.dropTransportList, this.quoteF.modeOfTransport.value),
          'OriginCityCode': this.quoteF.orginatingCityOtherYN.value ? '9999' : this.quoteF.originatingCity.value,
          // tslint:disable-next-line: max-line-length
          'OriginCityName': this.quoteF.orginatingCityOtherYN.value ? this.quoteF.orginatingCityOther.value : this.getCodeDescription(this.dropOriginCityList, this.quoteF.originatingCity.value),
          'OriginCountryCode': this.quoteF.originatingCountry.value,
          // tslint:disable-next-line: max-line-length
          'OriginCountryName': this.getCodeDescription(this.dropOriginCountryList, this.quoteF.originatingCountry.value),
          'OriginWarehouseYn': this.quoteF.originatingWarehouse.value,
          'Via': this.quoteF.via.value,
        },
        'VesselDetails': {
          'IHSLRORIMO': '',
          'ImoNumber': '',
          'NameString': '',
          'ShipsCategory': '',
          'VesselCode': '',
          'VesselDeclareYN': 'N',
          'VesselName': '',
          'VesselSearchBy': '',
          'exNameString': '',
          'exshipsCategory': '',
          'ihslrorimo': '',
        },
        'VoyageNo':this.quoteF.voyageNumber.value,
        //'VoyageNo':"",
        'WarAndSrccYn': this.quoteF.warSrcc.value,
        'WarOnLandYn': this.quoteF.warOnLand.value,
      },
      'ReferenceNo': this.referenceNo,
    };
    console.log("Opencover Value",this.OpenCover?.value)
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.premiumDetails = data?.Result;
          sessionStorage.setItem('ReferenceNo', data?.Result?.ReferenceNo);
          //sessionStorage.removeItem('Item');
          this.router.navigate([`${this.routerBaseLink}/new-quotes/premium-info`]);

        }
      },
      (err) => { },
    );
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
  ngOnDestroy() {
    this.newQuotesService.quoteEditData.next(null)
  }


}
