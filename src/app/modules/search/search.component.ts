import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../shared/shared.service';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import * as Mydatas from '../../app-config.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any='';

  public OpenCover:any;
  public searchForm!: FormGroup;
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public searchByList: any[] = [];
  public brokerList: any[] = [];

  public choosedRow:any;
  public routerBaseLink:any='';

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService:SharedService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.routerBaseLink = this.userDetails?.routerBaseLink;

    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails.LoginId;
    }
  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.searchByList=[
      {'code':'policyNo','codeDescription':'Policy No'},
      {'code':'quoteNo','codeDescription':'Quote No'},
      {'code':'custName','codeDescription':'Customer Name'}
    ];

    this.sF.enterData.valueChanges.subscribe((ele:any)=>{
      this.onLoadGrid();
    })
    this.onGetBroker();
  }

  onCreateFormControl() {
    this.searchForm = this._formBuilder.group({
      searchBy: [null, Validators.required],
      enterData: ['', Validators.required],
      broker: [null, Validators.required],

    });

  }
  get sF() {
    return this.searchForm?.controls;
  }



 onChangeBroker(){
    this.loginId = this.sF.broker.value;
  }
 onGetBroker() {
    const urlLink = `${this.ApiUrl1}menu/quoteregister/dropdownlist`;
    const reqData = {
      "Type":"",
      "ProductId":this.productId,
      "ApplicationId":this.applicationId,
      "BranchCode":this.userDetails?.BranchCode
    }
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.brokerList = data?.Result || [];
      },
      (err) => { },
    );
  }

  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}menu/search/results`;
    const reqData = {

      "OpenCoverNo":this.OpenCover?.value,
      "LoginId":this.loginId,
      "Issuer":this.userDetails?.UserType == 'RSAIssuer'? this.userDetails?.LoginId : '',
      "SearchValue":this.sF.enterData?.value,
      "ProductId":this.productId,
      "SearchBy":this.sF.searchBy?.value,
      "BranchCode":this.userDetails?.BranchCode,
      "UserType":this.userDetails?.UserType,
    }
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        /*this.columnHeader = [
          { key: 'QuoteNo', display: 'Quote No' },
          { key: 'CustomerName', display: 'Name' },
          { key: 'QuotationDate', display: 'Quote Date' },
          { key: 'PolicyStartDate', display: 'Policy Start Date' },
          { key: 'PolicyNo', display: 'Policy No' },
          { key: 'StatusTypeName', display: 'Status' },
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
          },
        ];*/
        this.tableData = data?.Result || [];
        if(data?.Result[0].StatusType=='P'){
        this.columnHeader = [
          { key: 'QuoteNo', display: 'Quote No' },
          { key: 'CustomerName', display: 'Name' },
          { key: 'QuotationDate', display: 'Quote Date' },
          { key: 'PolicyStartDate', display: 'Policy Start Date' },
          { key: 'PolicyNo', display: 'Policy No' },
          { key: 'StatusTypeName', display: 'Status' },
          /*{
            key: "edit",
            display: "Edit",
            // sticky: true,
            config: {
              isActionBtn: true,
              isActionBtnName: "Edit",
              isNgxIcon: "fas fa-pen-alt",
              bg: "primary",
            },
          },*/
        ];
      }
      else{
        this.columnHeader = [
          { key: 'QuoteNo', display: 'Quote No' },
          { key: 'CustomerName', display: 'Name' },
          { key: 'QuotationDate', display: 'Quote Date' },
          { key: 'PolicyStartDate', display: 'Policy Start Date' },
          { key: 'PolicyNo', display: 'Policy No' },
          { key: 'StatusTypeName', display: 'Status' },
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
          },
        ];
      }
      },
      (err) => { },
    );
  }



  isActionBtn(event:any){
    console.log(event);
    if(event?.btName ==='Edit'){
      this.onEdit(event);
    }
  }

  onEdit(item: any) {
    this.sessionStorageService.remove('referral');
    sessionStorage.setItem('quotesType', 'Without-Endo');
    sessionStorage.setItem('ReferenceNo', item.ApplicationNo);
    this.router.navigate([`/${this.routerBaseLink}/new-quotes`]);
  }



}
