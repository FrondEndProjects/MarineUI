import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Mydatas from '../../../../../../app-config.json';
import { QuotesService } from '../../../../../quotes/quotes.service'
@Component({
  selector: 'app-aki-doc-admin',
  templateUrl: './aki-doc-admin.component.html',
  styleUrls: ['./aki-doc-admin.component.scss']
})
export class AkiDocAdminComponent {
  myForm!: FormGroup;
  field_list: any[] = [];
  isEdit: boolean = false
  tableDataFailedList: any[] = [];
  tableDataSuccessList: any[] = [];
  filterValue: any
  from_date: any;
  viewData: any
  to_date: any;
  isView: boolean = false;
  columnHeader: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private fb: FormBuilder,
    private quoteService: QuotesService,

  ) {

    this.columnHeader = [
      { key: 'QuoteNo', display: 'Quote No' },
      { key: 'PolicyNo', display: 'Policy No' },
      { key: 'PolicyHolderName', display: 'Name' },
      { key: 'FromDate', display: 'From Date' },
      { key: 'KraPin', display: 'KRA PIN' },
      {
        key: "edit",
        display: "Action",
        // sticky: true,
        config: {
          isActionBtn: true,
          isActionBtnName: "",
          isNgxIcon: "fas fa-eye",
          bg: "primary",
        },
      }
    ];
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      quoteNo: [''],
      intermediaryIraNo: [''],
      tradeId: [''],
      tradeName: [''],
      modeOfTransportId: [''],
      modeOfTransport: [''],
      kraPin: [''],
      policyNo: [''],
      policyHolderName: [''],
      email: [''],
      mobileNo: [''],
      address: [''],
      poBox: [''],
      city: [''],
      countryId: [''],
      countryName: [''],
      vesselName: [''],
      flightNo: [''],
      voyageFromId: [''],
      voyageFromName: [''],
      voyageToId: [''],
      voyageToName: [''],
      portFromId: [''],
      portFromName: [''],
      portFromShortCode: [''],
      portToId: [''],
      portToName: [''],
      portToShortCode: [''],
      tranShippingAt: [''],
      tranShippingShortCode: [''],
      fromDate: [''],
      coverTypeId: [''],
      coverType: [''],
      openCoverNoteNo: [''],
      currencyId: [''],
      currencyName: [''],
      ucrNo: [''],
      isPremiumModify: [''],
      premiumPercentage: [''],
      sumInsured: [''],
      descriptionOfGoods: [''],
      isPremiumDisplay: [''],
      idfNo: [''],
      county: [''],
      entryDate: ['']
    });
    // this.getList();
    const now = new Date();
    now.setMonth(now.getMonth() - 1);
    this.from_date = now.toISOString().substring(0, 10);
    const to_now = new Date();
    this.to_date = to_now.toISOString().substring(0, 10);

  }

  getList() {
    let formDate
    let toDate
    if (this.from_date && this.to_date) {

      formDate = this.formatDate(this.from_date);
      toDate = this.formatDate(this.to_date);
    }
    const urlLink = `${this.ApiUrl1}Integration/getMarineList`;
    const reqData = {
      "FromDate": formDate,
      "EndDate": toDate
    };
    this.quoteService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.tableDataFailedList = data?.Result;
        this.tableDataFailedList = data?.Result.filter(ele => ele.Status == 'P');
        this.tableDataSuccessList = data?.Result.filter(ele => ele.Status != 'P');

      },
      (err) => { },
    );

  }
  onSubmit() {
    let formValues = this.myForm.value
    let obj = {
      "QuoteNo": this.viewData.QuoteNo,
      "IntermediaryIraNo": formValues.intermediaryIraNo,
      "TradeId": formValues.tradeId,
      "TradeName": formValues.tradeName,
      "ModeOfTransportId": formValues.modeOfTransportId,
      "ModeOfTransport": formValues.modeOfTransport,
      "KraPin": formValues.kraPin,
      "PolicyNo": formValues.policyNo,
      "PolicyHolderName": formValues.policyHolderName,
      "Email": formValues.email,
      "MobileNo": formValues.mobileNo,
      "Address": formValues.address,
      "PoBox": formValues.poBox,
      "City": formValues.city,
      "CountryId": formValues.countryId,
      "CountryName": formValues.countryName,
      "VesselName": formValues.vesselName,
      "FlightNo": formValues.flightNo,
      "VoyageFromId": formValues.voyageFromId,
      "VoyageFromName": formValues.voyageFromName,
      "VoyageToId": formValues.voyageToId,
      "VoyageToName": formValues.voyageToName,
      "PortFromId": formValues.portFromId,
      "PortFromName": formValues.portFromName,
      "PortFromShortCode": formValues.portFromShortCode,
      "PortToId": formValues.portToId,
      "PortToName": formValues.portToName,
      "PortToShortCode": formValues.portToShortCode,
      "TranShippingAt": formValues.tranShippingAt,
      "TranShippingShortCode": formValues.tranShippingShortCode,
      "FromDate": this.formatDate(formValues.fromDate),
      "CoverTypeId": formValues.coverTypeId,
      "CoverType": formValues.coverType,
      "OpenCoverNoteNo": formValues.openCoverNoteNo,
      "CurrencyId": formValues.currencyId,
      "CurrencyName": formValues.currencyName,
      "UcrNo": formValues.ucrNo,
      "IsPremiumModify": formValues.isPremiumModify,
      "PremiumPercentage": formValues.premiumPercentage,
      "SumInsured": formValues.sumInsured,
      "DescriptionOfGoods": formValues.descriptionOfGoods,
      "IsPremiumDisplay": formValues.isPremiumDisplay,
      "IdfNo": formValues.idfNo,
      "County": formValues.county,
      "EntryDate": this.formatDate(formValues.entryDate),
      "Status": this.viewData.Status
    }

    const urlLink = `${this.ApiUrl1}Integration/akisave`;

    this.quoteService.onPostMethodSync(urlLink, obj).subscribe(
      (data: any) => {
        if (data.Result.Status == true) {
          this.isEdit = false;
          this.isView = false;
        }
        // this.tableDataFailedList = data?.Result;
        // this.tableDataFailedList = data?.Result.filter(ele => ele.Status == 'P');
        // this.tableDataSuccessList = data?.Result.filter(ele => ele.Status != 'P');
        console.log(data, "updateeeeeeeeeeeeeeeeeeeeeee");

      },
      (err) => { },
    );


  }
  isActionBtn(event) {

    if (event.QuoteNo) {
      const urlLink = `${this.ApiUrl1}Integration/getMarine/${event.QuoteNo}`;

      this.quoteService.onGetMethodSync(urlLink).subscribe(
        (data: any) => {

          this.viewData = data.Response;
          console.log(this.viewData, "this.viewDatathis.viewData");


        },
        (err) => { },
      );
    }
    this.isView = true;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  back() {
    this.isEdit = false;
    this.isView = false;
  }

  modify() {
    if (this.viewData) {
      this.isEdit = true;
      this.isView = false;
      const rawDate = this.viewData.EntryDate;
      const parts = rawDate.split('/');
      const formattedEntryDate = `${parts[2]}-${parts[1]?.padStart(2, '0')}-${parts[0]?.padStart(2, '0')}`;

      const FromDate = this.viewData.FromDate;
      const FromDatepart = FromDate.split('/');
      const formattedFromDate = `${FromDatepart[2]}-${FromDatepart[1]?.padStart(2, '0')}-${FromDatepart[0]?.padStart(2, '0')}`;
      this.myForm.setValue({
        quoteNo: this.viewData.QuoteNo,
        intermediaryIraNo: this.viewData.IntermediaryIraNo,
        tradeId: this.viewData.TradeId,
        tradeName: this.viewData.TradeName,
        modeOfTransportId: this.viewData.ModeOfTransportId,
        modeOfTransport: this.viewData.ModeOfTransport,
        kraPin: this.viewData.KraPin,
        policyNo: this.viewData.PolicyNo,
        policyHolderName: this.viewData.PolicyHolderName,
        email: this.viewData.Email,
        mobileNo: this.viewData.MobileNo,
        address: this.viewData.Address,
        poBox: this.viewData.PoBox,
        city: this.viewData.City,
        countryId: this.viewData.CountryId,
        countryName: this.viewData.CountryName,
        vesselName: this.viewData.VesselName,
        flightNo: this.viewData.FlightNo,
        voyageFromId: this.viewData.VoyageFromId,
        voyageFromName: this.viewData.VoyageFromName,
        voyageToId: this.viewData.VoyageToId,
        voyageToName: this.viewData.VoyageToName,
        portFromId: this.viewData.PortFromId,
        portFromName: this.viewData.PortFromName,
        portFromShortCode: this.viewData.PortFromShortCode,
        portToId: this.viewData.PortToId,
        portToName: this.viewData.PortToName,
        portToShortCode: this.viewData.PortToShortCode,
        tranShippingAt: this.viewData.TranShippingAt,
        tranShippingShortCode: this.viewData.TranShippingShortCode,
        fromDate: formattedFromDate,
        coverTypeId: this.viewData.CoverTypeId,
        coverType: this.viewData.CoverType,
        openCoverNoteNo: this.viewData.OpenCoverNoteNo,
        currencyId: this.viewData.CurrencyId,
        currencyName: this.viewData.CurrencyName,
        ucrNo: this.viewData.UcrNo,
        isPremiumModify: this.viewData.IsPremiumModify,
        premiumPercentage: this.viewData.PremiumPercentage,
        sumInsured: this.viewData.SumInsured,
        descriptionOfGoods: this.viewData.DescriptionOfGoods,
        isPremiumDisplay: this.viewData.IsPremiumDisplay,
        idfNo: this.viewData.IdfNo,
        county: this.viewData.County,
        entryDate: formattedEntryDate
      });
    }

  }
  formatLabel(key: string): string {
    if (!key) return '';
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
}
