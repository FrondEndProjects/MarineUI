import { CustomerInfoComponent } from './../../customer-info.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Mydatas from '../../../../../../app-config.json';
import { NewQuotesService } from '../../../../new-quotes.service';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public openCoverNo: any = '';
  public filterValue: any;
  public loginId: any;
  public applicationId: any;brokerCode:any=null;

  // public customerGrid: boolean = true;
  public isCustomerTable: boolean = true;
  public submitted: boolean;
  public customerForm: FormGroup;
  @ViewChild('formDirective') public customerFormDirective: NgForm;
  public dropTitleList: any[] = [];
  public dropCityList: any[] = [];

  public tableData: any[] = [];
  public columnHeader: any[] = [];


  constructor(
    private _formBuilder: FormBuilder,
    private newQuotesService: NewQuotesService,
    private customerInfoComponent: CustomerInfoComponent,
  ) {
    this.userDetails = this.customerInfoComponent?.userDetails;
    this.productId = this.customerInfoComponent?.productId;
    this.openCoverNo = this.customerInfoComponent.OpenCover?.value;
    this.customerForm = this.customerInfoComponent.customerForm;
    this.loginId = this.customerInfoComponent?.loginId;
    this.applicationId = this.customerInfoComponent?.applicationId;
    if(sessionStorage.getItem('loginId')){
      this.loginId = sessionStorage.getItem('loginId');
    }

  }

  ngOnInit(): void {
    this.onLoadDropdownList();

  }

  get customerF() {
    return this.customerForm.controls;
  }
  onLoadDropdownList() {
    this.columnHeader = [
      {
        key: 'CustomerId',
        display: 'Premia Code',
        config: {
          select: true,
        },
      },
      { key: 'CustomerName', display: 'Customer Namet' },
      { key: 'Email', display: 'Email' },
      { key: 'PoBox', display: 'P.O.Box' },
      { key: 'CityName', display: 'City' },
      { key: 'MissippiCustomerCode', display: 'Flag' },
    ];
    this.onGetTitleDropdownList();
    this.onGetCityDropdownList();
    this.onGetCustomerList(this.brokerCode);
  }

  onGetTitleDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/title`;

    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'pvType': 'title',
      'ProductId': this.productId,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropTitleList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropTitleList, 'title');

        }
      },
      (err) => { },
    );
  }
  onGetCityDropdownList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/city`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
      'ProductId': this.productId,
      'pvType': 'city',
      'OpenCoverNo': this.openCoverNo,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropCityList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropCityList, 'city');

        }
      },
      (err) => { },
    );
  }

  onGetCustomerList(code) {
    this.tableData = [];
    const urlLink = `${this.ApiUrl1}api/customer/information`;
    if(this.productId=='3') this.openCoverNo = null;
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
          // if (this.customerF.name.status == "DISABLED" || data?.Result == null) {
            if( this.productId == '3' ||  this.productId == '11'){
              
              this.isCustomerTable = true;
          } 
          // else {
          //   this.isCustomerTable = true;
          // }
          this.tableData = data?.Result;

        }
      },
      (err) => { },
    );
  }

  onSelectCustomer(event: any) {
    this.customerF.title.setValue(event?.Title);
    this.customerF.name.setValue(event?.CustomerName);
    this.customerF.coreAppcode.setValue(event?.MissippiCustomerCode);
    this.customerF.city.setValue(event?.CityCode);
    this.customerF.poBox.setValue(event?.PoBox);
    this.customerF.mobileNo.setValue(event?.Mobile);
    this.customerF.email.setValue(event?.Email);
    this.customerF.customerVat.setValue(event?.VatRegNo);
    this.customerF.Address1.setValue(event?.Address1);
    this.customerF.Address2.setValue(event?.Address2);
  }
}
