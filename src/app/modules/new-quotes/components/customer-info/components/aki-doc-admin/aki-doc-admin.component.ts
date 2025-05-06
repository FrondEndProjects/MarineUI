import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aki-doc-admin',
  templateUrl: './aki-doc-admin.component.html',
  styleUrls: ['./aki-doc-admin.component.scss']
})
export class AkiDocAdminComponent {
  myForm!: FormGroup;
  field_list: any[] = [];
  constructor(private fb: FormBuilder) {
    // this.field_list = [
    //   { name: 'intermediaryIraNo', label: 'Intermediary IRA No', type: 'text' },
    //   { name: 'tradeId', label: 'Trade ID', type: 'number' },
    //   { name: 'tradeName', label: 'Trade Name', type: 'text' },
    //   { name: 'modeOfTransportId', label: 'Mode of Transport ID', type: 'number' },
    //   { name: 'modeOfTransport', label: 'Mode of Transport', type: 'text' },
    //   { name: 'kraPin', label: 'KRA PIN', type: 'text' },
    //   { name: 'policyNo', label: 'Policy No', type: 'text' },
    //   { name: 'policyHolderName', label: 'Policy Holder Name', type: 'text' },
    //   { name: 'email', label: 'Email', type: 'email' },
    //   { name: 'mobileNo', label: 'Mobile No', type: 'tel' },
    //   { name: 'address', label: 'Address', type: 'text' },
    //   { name: 'poBox', label: 'PO Box', type: 'text' },
    //   { name: 'city', label: 'City', type: 'text' },
    //   { name: 'countryId', label: 'Country ID', type: 'number' },
    //   { name: 'countryName', label: 'Country Name', type: 'text' },
    //   { name: 'vesselName', label: 'Vessel Name', type: 'text' },
    //   { name: 'flightNo', label: 'Flight No', type: 'text' },
    //   { name: 'voyageFromId', label: 'Voyage From ID', type: 'number' },
    //   { name: 'voyageFromName', label: 'Voyage From Name', type: 'text' },
    //   { name: 'voyageToId', label: 'Voyage To ID', type: 'number' },
    //   { name: 'voyageToName', label: 'Voyage To Name', type: 'text' },
    //   { name: 'portFromId', label: 'Port From ID', type: 'number' },
    //   { name: 'portFromName', label: 'Port From Name', type: 'text' },
    //   { name: 'portFromShortCode', label: 'Port From Short Code', type: 'text' },
    //   { name: 'portToId', label: 'Port To ID', type: 'number' },
    //   { name: 'portToName', label: 'Port To Name', type: 'text' },
    //   { name: 'portToShortCode', label: 'Port To Short Code', type: 'text' },
    //   { name: 'tranShippingAt', label: 'Transshipping At', type: 'text' },
    //   { name: 'tranShippingShortCode', label: 'Transshipping Short Code', type: 'text' },
    //   { name: 'fromDate', label: 'From Date', type: 'date' },
    //   { name: 'coverTypeId', label: 'Cover Type ID', type: 'number' },
    //   { name: 'coverType', label: 'Cover Type', type: 'text' },
    //   { name: 'openCoverNoteNo', label: 'Open Cover Note No', type: 'text' },
    //   { name: 'currencyId', label: 'Currency ID', type: 'number' },
    //   { name: 'currencyName', label: 'Currency Name', type: 'text' },
    //   { name: 'ucrNo', label: 'UCR No', type: 'text' },
    //   // { name: 'isPremiumModify', label: 'Is Premium Modify', type: 'checkbox' },
    //   { name: 'premiumPercentage', label: 'Premium Percentage', type: 'number' },
    //   { name: 'sumInsured', label: 'Sum Insured', type: 'number' },
    //   { name: 'descriptionOfGoods', label: 'Description of Goods', type: 'text' },
    //   // { name: 'isPremiumDisplay', label: 'Is Premium Display', type: 'checkbox' },
    //   { name: 'idfNo', label: 'IDF No', type: 'text' },
    //   { name: 'county', label: 'County', type: 'text' },
    //   { name: 'entryDate', label: 'Entry Date', type: 'date' }
    // ]

    // this.field_list = [
    //   // Basic Details
    //   { name: 'policyHolderName', label: 'Policy Holder Name', type: 'text' },
    //   { name: 'email', label: 'Email', type: 'email' },
    //   { name: 'mobileNo', label: 'Mobile No', type: 'tel' },
    //   { name: 'kraPin', label: 'KRA PIN', type: 'text' },
    //   { name: 'address', label: 'Address', type: 'text' },
    //   { name: 'poBox', label: 'PO Box', type: 'text' },
    //   { name: 'city', label: 'City', type: 'text' },
    //   { name: 'county', label: 'County', type: 'text' },
    //   { name: 'countryId', label: 'Country ID', type: 'number' },
    //   { name: 'countryName', label: 'Country Name', type: 'text' },
    
    //   // Transport & Trade Info
    //   { name: 'modeOfTransportId', label: 'Mode of Transport ID', type: 'number' },
    //   { name: 'modeOfTransport', label: 'Mode of Transport', type: 'text' },
    //   { name: 'vesselName', label: 'Vessel Name', type: 'text' },
    //   { name: 'flightNo', label: 'Flight No', type: 'text' },
    //   { name: 'voyageFromId', label: 'Voyage From ID', type: 'number' },
    //   { name: 'voyageFromName', label: 'Voyage From Name', type: 'text' },
    //   { name: 'voyageToId', label: 'Voyage To ID', type: 'number' },
    //   { name: 'voyageToName', label: 'Voyage To Name', type: 'text' },
    //   { name: 'portFromId', label: 'Port From ID', type: 'number' },
    //   { name: 'portFromName', label: 'Port From Name', type: 'text' },
    //   { name: 'portFromShortCode', label: 'Port From Short Code', type: 'text' },
    //   { name: 'portToId', label: 'Port To ID', type: 'number' },
    //   { name: 'portToName', label: 'Port To Name', type: 'text' },
    //   { name: 'portToShortCode', label: 'Port To Short Code', type: 'text' },
    //   { name: 'tranShippingAt', label: 'Transshipping At', type: 'text' },
    //   { name: 'tranShippingShortCode', label: 'Transshipping Short Code', type: 'text' },
    //   { name: 'tradeId', label: 'Trade ID', type: 'number' },
    //   { name: 'tradeName', label: 'Trade Name', type: 'text' },
    
    //   // Policy/Insurance Details
    //   { name: 'intermediaryIraNo', label: 'Intermediary IRA No', type: 'text' },
    //   { name: 'policyNo', label: 'Policy No', type: 'text' },
    //   { name: 'coverTypeId', label: 'Cover Type ID', type: 'number' },
    //   { name: 'coverType', label: 'Cover Type', type: 'text' },
    //   { name: 'openCoverNoteNo', label: 'Open Cover Note No', type: 'text' },
    //   { name: 'currencyId', label: 'Currency ID', type: 'number' },
    //   { name: 'currencyName', label: 'Currency Name', type: 'text' },
    //   { name: 'ucrNo', label: 'UCR No', type: 'text' },
    //   { name: 'premiumPercentage', label: 'Premium Percentage', type: 'number' },
    //   { name: 'sumInsured', label: 'Sum Insured', type: 'number' },
    //   { name: 'descriptionOfGoods', label: 'Description of Goods', type: 'text' },
    //   { name: 'idfNo', label: 'IDF No', type: 'text' },
    //   { name: 'fromDate', label: 'From Date', type: 'date' },
    //   { name: 'entryDate', label: 'Entry Date', type: 'date' }
    // ];
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
  }
  onSubmit() {

  }
}
