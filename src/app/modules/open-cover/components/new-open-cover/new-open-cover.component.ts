import { OpenCoverService } from './../../open-cover.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CurrencyPipe } from '../../../../shared/pipes/currency.pipe';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { table } from 'console';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-new-open-cover',
  templateUrl: './new-open-cover.component.html',
  styleUrls: ['./new-open-cover.component.scss'],
})
export class NewOpenCoverComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
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
  public columnHeader: any[] = [];
  customerId: any;
  public loginId: any = '';
  public submitted: boolean = false;
  public btnConfig ={
    btnName:'Add New',
    btnStatus:'primary',
    btnShow:true
  }
  RefNo: any;
  MissippiCode: any;
  public routerBaseLink:any='';
  public OpenCover:any;
  minDate: { year: number; month: number; day: number; };

  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,private menuService: NbMenuService,
    private _formBuilder: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private sessionStorageService: SessionStorageService,
    private dateAdapter: NgbDateAdapter<string>
  ) {
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.loginId = this.userDetails.LoginId;
    
  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onLoadDropdownList();
    
    this.menuService.onItemClick().subscribe((data) => {
      console.log("Current Route",data.item.link)
      if (data.item.link === `/${this.routerBaseLink}/new-open-cover/new-open-cover-form`) {
        sessionStorage.removeItem("OpenCoverEdit");
        this.reloadCurrentRoute();
      }
    });
    let openCoverData = JSON.parse(sessionStorage.getItem('OpenCoverEdit'))
    if(openCoverData){
      this.onEdit();
    }
    else{
      this.onGetCustomerList('direct');
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
      console.log('kkkkkkkkkk',x);
      var annualEstimate = this.newQuoteF.annualEstimate.value;
      var removecomma: any = annualEstimate.toString().replace(/,/g, '');
      var number: any = Number(removecomma);
      console.log('sssssssssssssssss',number);
      if (x > number) {
        console.log('hhhhhhhhhhhhh',number);
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
  reloadCurrentRoute() {
   
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);
  }
  onCreateFormControl() {
    this.newQuoteForm = this._formBuilder.group({
      businessType: [null, Validators.required],
      openCoverType: [null, Validators.required],
      selectBroker: [null, Validators.required],
      salesExective: [null, Validators.required],
      customer: ['', Validators.required],
      debitTo: ['Customer', Validators.required],
      openCoverStartDate: [null, Validators.required],
      openCoverEndDate: [null, Validators.required],


      annualEstimate: ['', Validators.required],
      utilizedAmount: ['0'],
      currency: [null, Validators.required],
      sharedPercentage: ['100', Validators.required],
      noOfCoInsuComp: ['0'],
      freeTextAllowed: ['N', Validators.required],
      crossVoyage: ['N'],
      crossVoyagePrecnt: ['0'],
      existingCore: [''],
      certificateStartForm: ['', Validators.required],
      commissiomPrecnt: ['', Validators.required],
      minimumPremium: ['', Validators.required],
      endorsementFee: ['', Validators.required],
      issuanceFeePrecnt: ['', Validators.required],
      minimumPremIssuanceFee: ['', Validators.required],
      noOfBackDays: ['', Validators.required],
      defaultClauses: ['N', Validators.required],
      declarationType: [null, Validators.required],
      hauilerType: ['N', Validators.required],
      war: ['N', Validators.required],
      fac: ['N', Validators.required],
      policyFee: ['', Validators.required],
      voyageRemarks: [''],
      effectiveDate: [null],
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

  onSelectCustomer(item: any) {
    this.newQuoteF.customer.setValue(item?.FirstName);
    this.customerId = item?.CustomerId;
  }

  onLoadDropdownList() {
    this.onGetBusinessTypeDropdownList();
    this.onGetOpenCoverTypeDropdownList();
    this.onGetBrokerDetailsDropdownList();
    this.onGetExcutiveDropdownList();
    this.onGetCurrencyDropdownList();
    this.onGetDeclarationDropdownList();
  }

  onGetBusinessTypeDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/businesstype`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
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
      'BranchCode': this.userDetails?.BranchCode,
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
        }
      },
      (err) => { },
    );
  }
  onGetExcutiveDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/excutivedetails`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
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
      'BranchCode': this.userDetails?.BranchCode,
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
    this.onGetCustomerList('From Broker');
  }

  onChangeStartDate(event: any) {
    console.log(event);
    let StartDate = event;
    const startDateformt:any = `${StartDate?.year}-${StartDate?.month}-${StartDate?.day}`;
    let newDate = new Date(startDateformt);
    newDate.setDate(newDate.getDate() + 364);
    const ngbDate = {
      "year": newDate.getFullYear(),
      "month": newDate.getMonth() + 1,
      "day": newDate.getDate()
    }
    const endDate:any = this.dateAdapter.toModel(ngbDate)!;
    this.newQuoteF.openCoverEndDate.setValue(endDate);
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
            this.newQuoteF.annualEstimate.setValue(value);
              }
            console.log('Esctimtaed Amount', this.newQuoteF.annualEstimate.value)
            //}    //this.getTotalSICost('building');
          } 
          //this.secondcommaseporator(this.tableData);     //return tableData.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
   
  }

  CommaFormattedUtilizedAmount(tableData) {
    let i=0;
    console.log('hhhhhhhhhhhhhhh',tableData)
          let entry = tableData;
          console.log("Entry Came")
          if(entry.length!=0){
              if(entry!=null||entry!=undefined){
              console.log("Entry Came 1",entry)
            let value = entry.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.newQuoteF.utilizedAmount.setValue(value);
              }
            console.log('Esctimtaed Amount', this.newQuoteF.utilizedAmount.value)
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
    sessionStorage.setItem('OpenCover',JSON.stringify(reqData));
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('editData', data);
        if(data?.Result?.OpenCoverNo){
          const opencover = {
            'name':'adminReferral',
            'value':data?.Result?.OpenCoverNo
          }
          this.OpenCover = opencover;
           sessionStorage.setItem('OpenCover',JSON.stringify(opencover));
           
        }
        if (data?.Result?.ProposalNo) {
          
          this.editData = data?.Result;
             this.setFormValues();
          //this.openCoverService.onGetCoverEditData(data?.Result);
          sessionStorage.setItem('MissippiCode',data?.Result?.MissippiCode);

        }
      },
      (err) => { },
    );
    

  }
  setFormValues(){
    this.proposalNo = this.editData?.ProposalNo;
    this.customerId = this.editData?.CustomerId;
    this.newQuoteF.businessType.setValue(this.editData?.BusinessType.toString());
    this.newQuoteF.openCoverType.setValue(this.editData?.Type.toString());
    this.newQuoteF.selectBroker.setValue(this.editData?.BrokerId);
    this.onChangeBroker();
    this.newQuoteF.salesExective.setValue(this.editData?.ExecutiveId.toString());
    this.newQuoteF.customer.setValue(this.editData?.InsuredName);
    this.newQuoteF.openCoverStartDate.setValue(this.openCoverService.ngbDateFormatt(this.editData?.PolicyStartDate));
    this.newQuoteF.openCoverEndDate.setValue(this.openCoverService.ngbDateFormatt(this.editData?.PolicyEndDate));
    if(this.editData?.EstimateAmount!=null){
      this.CommaFormatted(this.editData?.EstimateAmount)
    //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
    }
    //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
    console.log('MMMMMMMMMMMMMMMMMMM',this.newQuoteF.annualEstimate);
    if(this.editData?.UtilizedAmount!=null){
      this.CommaFormattedUtilizedAmount(this.editData?.UtilizedAmount)
    //this.newQuoteF.annualEstimate.setValue(this.editData?.EstimateAmount);
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
    this.newQuoteF.minimumPremium.setValue(this.editData?.MinPremium);
    this.newQuoteF.endorsementFee.setValue(this.editData?.EndorsementFee);
    this.newQuoteF.issuanceFeePrecnt.setValue(this.editData?.IssuanceFee);
    this.newQuoteF.minimumPremIssuanceFee.setValue(this.editData?.MinPremiumIssuance);
    this.newQuoteF.noOfBackDays.setValue(this.editData?.BackDays);
    this.newQuoteF.defaultClauses.setValue(this.editData?.DefaultClauses);
    this.newQuoteF.declarationType.setValue(this.editData?.DecType);

    this.newQuoteF.hauilerType.setValue(this.editData?.HaulierType == null ? 'N' : this.editData?.HaulierType);
    this.newQuoteF.war.setValue(this.editData['W&Srcc']);
    this.newQuoteF.fac.setValue(this.editData?.FacYN);
    this.newQuoteF.policyFee.setValue(this.editData?.PolicyFee);
    this.newQuoteF.effectiveDate.setValue(this.openCoverService.ngbDateFormatt(this.editData?.EffectiveDate));
    this.newQuoteF.voyageRemarks.setValue(this.editData?.CountryRemarks);
   this.RefNo =  this.editData?.RefNo;
   this.MissippiCode = this.editData?.MissippiCode;

    this.onCheckCrossVoyage();
  }
  onCheckCrossVoyage(){
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


  onSubmitData() {
    this.submitted = true;
    const urlLink = `${this.ApiUrl1}OpenCover/quote/save`;
    console.log();
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
      'LoginId': this.userDetails?.LoginId,
      'LossDetail': '',
      'MarginPercent': '',
      'MarginYN': '',
      'MinPreMul': '',
      'MinPreMulType': '',
      'MinPremium': this.newQuoteF.minimumPremium.value,
      'MinPremiumIssuance': this.newQuoteF.minimumPremIssuanceFee.value,
      'MissippiCode': this.MissippiCode,
      'MissippiOpenPolicyId': '',
      'NoOfCompany': this.newQuoteF.noOfCoInsuComp.value,
      'NoOfVehicles': '',
      'OpenCoverNo': this.OpenCover?.value,
      'PaymentRemarks': '',
      'PolicyFee': this.newQuoteF.policyFee.value,
      'PolicyNo': this.newQuoteF.existingCore.value,
      'PolicyStartDate': this.newQuoteF.openCoverStartDate.value?.replace(/-/g, '/'),
      'PolicyEndDate': this.newQuoteF.openCoverEndDate.value?.replace(/-/g, '/'),

      'ProductId':'11',
      'ProposalNo': this.proposalNo,
      'ProposalStatus': '',
      'RefNo': this.RefNo,
      'Remarks': '',
      'RsaValue': this.newQuoteF.sharedPercentage.value,
      'SumInsuredLmit': '',
      'Type':this.newQuoteF.openCoverType.value ,
      'UserId': '',
      'UserType': this.userDetails.UserType,
      'UtilizedAmount': this.newQuoteF.utilizedAmount.value,
      'VoyageValue': this.newQuoteF.crossVoyagePrecnt.value,
      'W&Srcc': this.newQuoteF.war.value,
      'Warland': '',
    };
    console.log(this.newQuoteForm.valid, this.newQuoteForm)
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if (data?.Result?.Status) {
          sessionStorage.setItem('ProposalNo', data?.Result?.ProposalNo);
          this.router.navigate([`${this.routerBaseLink}/new-open-cover/country-commodity-info`]);
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
  ngOnDestroy(){
    this.openCoverService.openCoverEdit.next(null);
  }
}
