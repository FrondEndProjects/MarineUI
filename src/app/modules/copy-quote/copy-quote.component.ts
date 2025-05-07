import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { SharedService } from '../../shared/shared.service';
import * as Mydatas from '../../app-config.json';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-copy-quote',
  templateUrl: './copy-quote.component.html',
  styleUrls: ['./copy-quote.component.scss']
})
export class CopyQuoteComponent implements OnInit {

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
  currencycode: any;

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService:SharedService,
    private sessionStorageService: SessionStorageService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    console.log('NNNNNNNNNNNN',this.userDetails)
    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails.LoginId;
    }
    this.currencycode= this.userDetails?.CurrencyId
  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.searchByList=[
      {'code':'policyNo','codeDescription':'Policy No'},
      {'code':'quoteNo','codeDescription':'Quote No'},
      {'code':'custName','codeDescription':'Customer Name'}
    ];
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
      "Issuer":this.userDetails?.UserType == 'Issuer'? this.userDetails?.LoginId : '',
      "SearchValue":this.sF.enterData?.value,
      "ProductId":this.productId,
      "SearchBy":this.sF.searchBy?.value,
      "BranchCode":this.userDetails?.BranchCode
    }
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.tableData = [];

        if (data?.Result) {
          this.columnHeader = [
            {
              key: 'choose',
              display: 'Choose',
              config: {
                isRadio: true,
              },
             },
            { key: 'QuoteNo', display: 'Quote Number' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'Premium', display: `Premium(${this.currencycode})` },

          ];
          this.tableData = data?.Result || [];
        }
      },
      (err) => { },
    );
  }

  choosedRowData(event:any){
    console.log(event)
   this.choosedRow = event;
  }

  onCopyQuote(){
       console.log(this.choosedRow);
       const urlLink = `${this.ApiUrl1}menu/copyquote`;
       const reqData = {
         "CopyQuoteValue":this.choosedRow?.QuoteNo,
         "LoginId":this.userDetails?.LoginId,
         "PvType":"Normal",
         "ApplicationId":this.applicationId
       }
       this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
         (data: any) => {
           console.log(data);

           if(data?.Message === 'Success'){
            Swal.fire(
              'Copy Quote',
              `${data?.Result}`,
              'info'
            )
           }
         },
         (err) => { },
       );
  }


}
