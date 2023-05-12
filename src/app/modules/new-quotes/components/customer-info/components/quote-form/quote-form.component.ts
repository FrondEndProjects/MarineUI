import { CustomerInfoComponent } from './../../customer-info.component';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Mydatas from '../../../../../../app-config.json';
import { NewQuotesService } from '../../../../new-quotes.service';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss'],
})
export class QuoteFormComponent implements OnInit, OnChanges {
  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public step = 0;
  public openCoverNo: any = '';
  public quoteForm!: FormGroup;
  public referenceNo: any;renderSection:boolean = false;
  public submitted: boolean;

  public dropTransportList: any[] = [];
  public dropCoverList: any[] = [];
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
  public dropGoodsOfCateList: any[] = [];
  public warStatus:any=''
  subscription: Subscription;

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
  maxDate:any;
  constructor(
    private _formBuilder: FormBuilder,
    private newQuotesService: NewQuotesService,
    private customerInfoComponent: CustomerInfoComponent,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.newQuotesService.getDropDownList(this.dropPartialShipList, 'partialShip');
    console.log("Customer Information",this.customerInfoComponent);
    this.quoteForm = this.customerInfoComponent.quoteForm;
    this.userDetails = this.customerInfoComponent?.userDetails;
    this.productId = this.customerInfoComponent?.productId;
    if(this.customerInfoComponent.OpenCover?.value){
      this.openCoverNo = this.customerInfoComponent.OpenCover?.value;

    }
    this.loginId = this.customerInfoComponent?.loginId;
    this.applicationId = this.customerInfoComponent?.applicationId;
   
  }

  ngOnInit(): void {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() + 45);
    const ngbDate = {
      "year": newDate.getFullYear(),
      "month": newDate.getMonth() + 1,
      "day": newDate.getDate()
    }
    this.maxDate = ngbDate;
    this.subscription =this.newQuotesService.getQuoteEditData.subscribe((data: any) => {
      if(!this.renderSection){
        if (data && data?.OpenCoverNo!=null){
          this.renderSection = true;
          this.openCoverNo = data?.OpenCoverNo;
          this.omDropDownParallelCall();
        }
        else{
          this.renderSection = true;
          this.omDropDownParallelCall();
        }
      }
    });


  }
  ClearSubscribe(): void {
    this.subscription.unsubscribe();
  }
  omDropDownParallelCall (){
    this.quoteF.originatingCountry.setValue('1');
    this.quoteF.destinationCountry.setValue('1');
    this.subscription=this.newQuotesService.getQuoteEditData.subscribe((data: any) => {
      if (data) {
        if(this.dropOriginCountryList.length==0){
          this.onEditQuote(data);
        }
      }
      else{
        if(this.dropOriginCountryList.length==0){
          this.onLoadDropdownList();
        }
      }
    });
    
    
    this.onGetOriginCityDropdownList();
    this.onGetDestinaCityDropdownList();
    
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

      console.log(new Date(quoteDetails?.InceptionDate));
    this.quoteF.modeOfTransport.setValue(transportDetails?.ModeOfTansportCode);
    this.onGetCoverDropdownList();
    this.onGetCarriageDropdownList();
    this.quoteF.cover.setValue(transportDetails?.CoverCode);
    this.quoteF.modeOfCarriage.setValue(transportDetails?.ModeOfCarriageCode);
    this.quoteF.originatingCountry.setValue(transportDetails?.OriginCountryCode);
    this.onGetOriginCityDropdownList();
    this.quoteF.originatingCity.setValue(transportDetails?.OriginCityCode);
    this.quoteF.originatingWarehouse.setValue(transportDetails?.OriginWarehouseYn);
    this.quoteF.destinationCountry.setValue(transportDetails?.DestinationCountryCode);
    this.onGetDestinaCityDropdownList();
    this.quoteF.destinationCity.setValue(transportDetails?.DestinationCityCode);
    this.quoteF.destinationWarehouse.setValue(transportDetails?.DestinationWarehouseYn);
    this.quoteF.policyStartDate.setValue(this.newQuotesService.ngbDateFormatt(quoteDetails?.InceptionDate));
    this.quoteF.warSrcc.setValue(quoteDetails?.WarAndSrccYn);
    this.quoteF.warOnLand.setValue(quoteDetails?.WarOnLandYn);
    this.quoteF.via.setValue(transportDetails?.Via);
    this.quoteF.settlingAgent.setValue(quoteDetails?.SettlingAgentCode);
    //  this.quoteF.others.setValue('');

    this.quoteF.goodsCategory.setValue(commodityDetails?.GoodsCategoryCode);
    this.quoteF.goodsDescript.setValue(commodityDetails?.GoodsCategoryDescription);
    if(commodityDetails?.InsuredValue){
      console.log('CCCCCCCCCCCCC',commodityDetails?.InsuredValue)
      this.CommaFormatted(commodityDetails?.InsuredValue)
    }
   // this.quoteF.insuredValue.setValue(commodityDetails?.InsuredValue);
    this.quoteF.invoiceNumber.setValue(commodityDetails?.InvoiceNo);
    this.quoteF.invoiceDate.setValue(this.newQuotesService.ngbDateFormatt(commodityDetails?.InvoiceDate));
    this.quoteF.consignedTo.setValue(commodityDetails?.ConsignedTo);
    this.quoteF.consignedForm.setValue(commodityDetails?.ConsignedFrom);
    this.quoteF.fragileYN.setValue(commodityDetails?.Fragile);
    this.quoteF.excessDescription.setValue(commodityDetails?.PolicyExcessDescription);



    this.quoteF.currency.setValue(quoteDetails?.CurrencyCode);
    this.quoteF.currencyValue.setValue(quoteDetails?.CurrencyValue);
    this.quoteF.packageDescription.setValue(quoteDetails?.PackageCode);
    this.quoteF.incoterms.setValue(quoteDetails?.IncoTerms);
    this.onGetIncotermsPrecentDropdownList();
    this.quoteF.incotermsPercentage.setValue(quoteDetails?.Percentage);
    this.quoteF.tolerance.setValue(quoteDetails?.Tolerance);
    this.quoteF.conveyanceVesselName.setValue(vesselDetails?.VesselName);
    this.quoteF.voyageNumber.setValue(quoteDetails?.VoyageNo);
    this.quoteF.partialShipment.setValue(quoteDetails?.PartialShipmentCode == null?'N':quoteDetails?.PartialShipmentCode);
    this.quoteF.exposureOfShipment.setValue(quoteDetails?.ExposureOfShipment);
    this.quoteF.currencyOfExposure.setValue(quoteDetails?.CurrencyOfExposureCode);
  }



  onLoadDropdownList() {
    this.onGetTransportDropdownList();
    if(this.dropOriginCountryList.length==0) this.onGetOriginCountryDropdownList();
    if(this.dropDestinaCountryList.length==0) this.onGetDestinaCountryDropdownList();
    if(this.dropIncotermsList.length==0) this.onGetIncotermsDropdownList();
    if(this.dropToleranceList.length==0) this.onGetToleranceDropdownList();
    if(this.dropCurrencyList.length==0) this.onGetCurrencyDropdownList();
    if(this.dropGoodsOfCateList.length==0) this.onGetGoodsOfCategoryDropdownList();
    if(this.dropGoodsOfCateList.length==0) this.onCheckWarYesOrNo();

  }

  CommaFormatted(tableData) {
    let i=0;
    console.log('hhhhhhhhhhhhhhh',tableData)
          let entry = tableData;
          console.log("Entry Came")
          if(entry.length!=0){
            //for(let build of this.tableData){
              if(entry!=null||entry!=undefined){
              console.log("Entry Came 1",entry)
            let value = entry.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.quoteF.insuredValue.setValue(value);
            //this.newQuoteF.annualEstimate.setValue(value);
              }
            console.log('Esctimtaed Amount',  this.quoteF.insuredValue.value )
            //}    //this.getTotalSICost('building');
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
      'BranchCode':this.userDetails?.BranchCode,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'mode',
      'ProductId': this.productId,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropTransportList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropTransportList, 'transport');
        }
      },
      (err) => { },
    );
  }

  onGetCoverDropdownList() {
    this.quoteF.cover.setValue('');
    this.quoteF.modeOfCarriage.setValue('');

    const urlLink = `${this.ApiUrl1}quote/dropdown/cover`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ModeOfTransportCode': this.quoteF.modeOfTransport.value,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'cover',
      'ProductId': this.productId,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropCoverList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropCoverList, 'cover');
        }
      },
      (err) => { },
    );
  }

  onGetCarriageDropdownList() {
    this.quoteF.modeOfCarriage.setValue('');
    this.onGetPackageDescDropdownList();
    const urlLink = `${this.ApiUrl1}quote/dropdown/modeofcarriage`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'ModeOfTransportCode': this.quoteF.modeOfTransport.value,
      'CoverId': this.quoteF.cover.value,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'conveyance',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropCarriageList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropCarriageList, 'carriage');

        }
      },
      (err) => { },
    );
  }
  onGetOriginCountryDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/originationcountry`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'OriginationCountryCode': this.userDetails?.OrginationCountryId,
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropOriginCountryList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropOriginCountryList, 'orgCountry');

        }
      },
      (err) => { },
    );
  }
  onGetOriginCityDropdownList() {
    this.quoteF.originatingCity.setValue('');
    const urlLink = `${this.ApiUrl1}quote/dropdown/originationcity`;
    const reqData = {
      'pvType': 'orgCity',
      'OriginationCountryCode': this.quoteF.originatingCountry.value,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropOriginCityList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropOriginCityList, 'orgCity');

        }
      },
      (err) => { },
    );
  }

  onGetDestinaCountryDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/destinationcountry`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'DestinationCountryCode': this.userDetails?.DestinationCountryId,
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropDestinaCountryList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropDestinaCountryList, 'destCounty');

        }
      },
      (err) => { },
    );
  }

  onGetDestinaCityDropdownList() {
    this.quoteF.destinationCity.setValue('');
    this.onGetSettlingAgenDropdownList();
    const urlLink = `${this.ApiUrl1}quote/dropdown/destinationcity`;
    const reqData = {
      'pvType': 'destCity',
      'DestinationCountryCode': this.quoteF.destinationCountry.value,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropDestinaCityList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropDestinaCityList, 'destCity');

        }
      },
      (err) => { },
    );
  }
  onGetSettlingAgenDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/settlingagent`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
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

        }
      },
      (err) => { },
    );
  }

  onGetPackageDescDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/package`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'ModeOfTransportCode': this.quoteF.modeOfTransport.value,
      'pvType': 'package',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropPackageDescList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropPackageDescList, 'packageDesc');

        }
      },
      (err) => { },
    );
  }

  onGetIncotermsDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/incoterm`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'saleTerm',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropIncotermsList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropIncotermsList, 'incoterms');

        }
      },
      (err) => { },
    );
  }

  onGetIncotermsPrecentDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/incotermpercentage`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'IncotermCode': this.quoteF.incoterms.value,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'saleTermPercent',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropIncotermsPrecentList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropIncotermsPrecentList, 'incotermsPrec');

        }
      },
      (err) => { },
    );
  }


  onGetToleranceDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/tolerance`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'tolerance',
      'IncotermPercent':this.quoteF.incoterms.value
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropToleranceList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropToleranceList, 'tolerance');

        }
      },
      (err) => { },
    );
  }


  onGetGoodsOfCategoryDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/goodscategory`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'OpenCoverNo': this.openCoverNo,
      'pvType': 'goodsCategory',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropGoodsOfCateList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropGoodsOfCateList, 'goodesofCat');

        }
      },
      (err) => { },
    );
  }

  onGetCurrencyDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/currency`;
    const reqData = {
      'BranchCode':this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'pvType': 'currency',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {

        if (data?.Message === 'Success') {
          this.dropCurrencyList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropCurrencyList, 'currencyList');

        }
      },
      (err) => { },
    );
  }

  onCheckWarYesOrNo(){
    const urlLink = `${this.ApiUrl1}api/warsrc/status`;
    const reqData = {
      "OpenCoverNo": this.openCoverNo
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('warstatus',data);
        this.warStatus = data?.Result;
      }
    )
  }


  onChangeCurrencyDrop() {
    const countryList: any = this.dropCurrencyList.find(ele => ele.Code === this.quoteF.currency.value);
    this.quoteF.currencyValue.setValue(countryList?.CodeValue);

    this.quoteF.currencyOfExposure.setValue(this.quoteF.currency.value);
  }


}
