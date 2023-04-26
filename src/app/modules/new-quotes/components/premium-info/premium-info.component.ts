import { ClausesComponent } from './../clauses/clauses.component';
import { Router } from '@angular/router';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewQuotesService } from '../../new-quotes.service';
import { NewQuotesComponent } from '../../new-quotes.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
@Component({
  selector: 'app-premium-info',
  templateUrl: './premium-info.component.html',
  styleUrls: ['./premium-info.component.scss'],
})
export class PremiumInfoComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public premiumDetails: any;
  public viewClausesInfo: any;
  public viewClausesByClick: any;
  public ReferenceNo: any;
  public premiumForm!: FormGroup;
  public quoteForm: FormGroup;

  public OpenCover: any = '';
  public isEndoserment: boolean = false;

  public beforeEndorsement: any;
  public afterEndorsement: any;
  public difference: any;
  quotesType: string;
  public routerBaseLink: any = '';
  public isIssuer: boolean = false;
  QuoteStatus: string;
  coverId: any;
  currencyName: any;
  constructor(
    private newQuotesService: NewQuotesService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private newQuotesComponent: NewQuotesComponent,
    public dialog: MatDialog,
    private sessionStorageService:SessionStorageService
  ) {
    this.premiumForm = this.newQuotesService.premiumForm;
    this.userDetails = this.newQuotesComponent?.userDetails;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    console.log("UserDetails",this.userDetails)
    this.currencyName = this.userDetails?.CurrencyAbbreviation;
    this.productId = this.newQuotesComponent?.productId;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.ReferenceNo = sessionStorage.getItem('ReferenceNo');
    this.loginId = this.newQuotesComponent?.loginId;
    this.applicationId = this.newQuotesComponent?.applicationId;
    this.quotesType = sessionStorage.getItem('quotesType');
    this.isIssuer = this.newQuotesComponent.isIssuer;
    this.QuoteStatus = sessionStorage.getItem('QuoteStatus');
    this.coverId = this.sessionStorageService.sessionStorgaeModel.coverId;
    this.quoteForm = this.newQuotesService.quoteForm;


  }

  ngOnInit(): void {
    this.onGetViewClausesInformation();
    this.onGetPremiumInformation();
    this.onChangeBetterQuote();
  }



  get premiumF() {
    return this.premiumForm?.controls;
  }
  get quoteF() {
    return this.quoteForm.controls;
  }

  onGetPremiumInformation() {

    const urlLink = `${this.ApiUrl1}quote/premium/response`;
    const reqData = {
      "ReferenceNo": this.ReferenceNo,
      "BranchCode": this.userDetails?.BranchCode,
      "TotalInsuredValue": 0.0,
      "EquivalentInsuredValue": 0.0,
      "LoginUserType": this.userDetails?.UserType
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.premiumDetails = data?.Result;


        console.log('PREMIUM DETIAL',this.premiumDetails)
        this.onSetValue();
      },
      (err) => { },
    );


  }

  onChangeBetterQuote(){

    if(this.premiumF.ReferralUpdateYn.value == 'Y'){
      this.premiumF.comments.enable();
    }else{
      this.premiumF.comments.disable();

    }
  }
  onCheckEndoStatus() {
    const urlLink = `${this.ApiUrl1}api/endorsement/check`;
    const reqData = {
      "ReferenceNo": this.ReferenceNo,
      "Result": false
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.isEndoserment = data?.Result;
      },
      (err) => { },
    );
  }
  onEndosermentPremium() {
    const urlLink = `${this.ApiUrl1}quote/premium/difference`;
    const reqData = {
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('endo-prem', data);
        this.beforeEndorsement = data?.Result?.BeforeEndorsement;
        this.afterEndorsement = data?.Result?.AfterEndorsement;
        this.difference = data?.Result?.Difference;
      },
      (err) => { },
    );
  }
  onGetViewClausesInformation() {
    const urlLink = `${this.ApiUrl1}quote/conditions/view`;
    const reqData = {
      'ApplicationNo': this.ReferenceNo,
      'BranchCode': this.userDetails?.BranchCode,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.viewClausesInfo = data?.Result;
          this.viewClausesByClick = this.viewClausesInfo?.Clauses;
        }
      },
      (err) => { },
    );
  }

  Minus(){
    //return this.premiumF.additionalSelect;
    console.log('hhhhhhhh',this.premiumF.additionalSelect.value);

  }
  onPremiumCalculate() {
    const CommodityDetails = this.premiumDetails?.QuoteDetails?.CommodityDetails[0];
    const CustomerDetails = this.premiumDetails?.CustomerDetails;
    console.log('ttttttt',this.premiumF.additionalSelect.value);
    const urlLink = `${this.ApiUrl1}quote/premium/calculate`;
    const reqData = {
      "AdminRemarks": this.premiumF.adminRemarks.value,
      "ApplicationNo": this.ReferenceNo,
      "BranchCode": this.userDetails?.BranchCode,
      "Commission": this.premiumF.commission.value,
      "CommissionYn": this.premiumF.commissionCheck.value,
      "CommodityDetails": [
        {
          "InsuredValue": CommodityDetails?.InsuredValue,
          "MarginRate": CommodityDetails?.MarginRate,
          "MarineWarRate": CommodityDetails?.MarineWarRate,
          "PolicyExcess": CommodityDetails?.PolicyExcess,
          "PolicyExcessDescription": CommodityDetails?.PolicyExcessDescription,
          "PolicyExcessPercentage": CommodityDetails?.PolicyExcessPercentage,
          "MarineRate": this.premiumF.marineRate.value,
          "WarRate": this.premiumF?.warRate.value,
          "WarLandRate": this.premiumF?.warLandRate.value
        }
      ],
      "CustomerCode": CustomerDetails?.Code,
      "EditClausesYN": this.premiumF.isEditClauses.value,
      "FinalizeYN": this.premiumF.isFinalizeQuote.value,
      "GeneratePolicyYn": '',
      "Issuer": this.premiumDetails?.IssuerId,
      "LoginId":this.premiumDetails?.LoginId,
      "LoginUserType": this.userDetails?.UserType,
      "OpenCoverNo": this.OpenCover?.value,
      "PolicyFee": this.premiumF.policyInsuAedPremium.value,
      "PolicyFeeYn": this.premiumF.policyInsuAedEdit.value,
      "PremiumDetails": {

        "InspectionFee": 0.0,
        "AdditionalPremium": this.premiumF.additionalPremium.value,
        "ExcessSign": this.premiumF.additionalSelect.value,
        "TotalPremium": this.premiumF?.totalPremium.value,
        "TotalWarPremium": this.premiumF?.warPremium.value,
        "VatTax": this.premiumF.vatTaxAmount.value


      },
      "PremiumYN": '',
      "ProductId": this.productId,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
      "QuoteStatus": this.QuoteStatus,
      "ReferenceNo": this.ReferenceNo,
      "ReferralRemarks": this.premiumF.comments.value,
      "ReferralStatus": this.premiumF.referralStatus.value,
      "ReferralUpdateYn": this.premiumF.ReferralUpdateYn.value,
      "Status": this.premiumDetails?.Status,

    }
    console.log(reqData)
   
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);

        console.log('pppprrrrrrrr',data.Result.ExcessSign)
        this.premiumDetails = data?.Result;
        this.onSetValue();

      },
      (err) => { },
    );
  }

  onUpdatePremiumInformation() {
    const CommodityDetails = this.premiumDetails?.QuoteDetails?.CommodityDetails[0];
    const CustomerDetails = this.premiumDetails?.CustomerDetails;

    console.log('TTTTTTTT',this.premiumF?.totalPremium.value)
    console.log('ppppppppp',this.premiumF?.warRate.value)

   const urlLink = `${this.ApiUrl1}quote/premium/update`;
   const reqData = {
    "AdminRemarks": this.premiumF.adminRemarks.value,
    "ApplicationNo": this.ReferenceNo,
    "BranchCode": this.userDetails?.BranchCode,
    "Commission": this.premiumF.commission.value,
    "CommissionYn": this.premiumF.commissionCheck.value,
    "CommodityDetails": [
      {
        "InsuredValue": CommodityDetails?.InsuredValue,
        "MarginRate": CommodityDetails?.MarginRate,
        "MarineWarRate": CommodityDetails?.MarineWarRate,
        "PolicyExcess": CommodityDetails?.PolicyExcess,
        "PolicyExcessDescription": CommodityDetails?.PolicyExcessDescription,
        "PolicyExcessPercentage": CommodityDetails?.PolicyExcessPercentage,
        "MarineRate": this.premiumF.marineRate.value,
        "WarRate": this.premiumF?.warRate.value,
        "WarLandRate": this.premiumF?.warLandRate.value
      }
    ],
    "CustomerCode": CustomerDetails?.Code,
    "EditClausesYN": this.premiumF.isEditClauses.value,
    "FinalizeYN": this.premiumF.isFinalizeQuote.value,
    "GeneratePolicyYn": '',
    "Issuer": this.premiumDetails?.IssuerId,
    "LoginId":this.premiumDetails?.LoginId,
    "LoginUserType": this.userDetails?.UserType,
    "OpenCoverNo": this.OpenCover?.value,
    "PolicyFee": this.premiumF.policyInsuAedPremium.value,
    "PolicyFeeYn": this.premiumF.policyInsuAedEdit.value,
    "PremiumDetails": {

      "InspectionFee": 0.0,
      "AdditionalPremium": this.premiumF.additionalPremium.value,
      "ExcessSign": this.premiumF.additionalSelect.value,
      "TotalPremium": this.premiumF?.totalPremium.value,
      "TotalWarPremium": this.premiumF?.warPremium.value,
      "VatTax": this.premiumF.vatTaxAmount.value


    },
    "PremiumYN": '',
    "ProductId": this.productId,
    "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
    "QuoteStatus": this.QuoteStatus,
    "ReferenceNo": this.ReferenceNo,
    "ReferralRemarks": this.premiumF.comments.value,
    "ReferralStatus": this.premiumF.referralStatus.value,
    "ReferralUpdateYn": this.premiumF.ReferralUpdateYn.value,
    "Status": this.premiumDetails?.Status,

  }
  console.log(reqData);
   this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
     (data: any) => {
       console.log(data);
       if(this.userDetails?.UserType == 'admin' ){
        this.router.navigate([`${this.routerBaseLink}/admin-referral/approved-quote`]);
       }else{
        if(this.premiumF.ReferralUpdateYn.value =='Y' || this.premiumDetails?.Referral?.length > 0){
          this.router.navigate([`${this.routerBaseLink}/referral/referral-unapproved`]);
        }else{
         this.onNext();
        }
       }

     },
     (err) => { },
   );
 }

  onViewClausee(name: any, type: any) {
    let urlLink: any = '';
    let reqData: any = {};
    let conditionType: any = '';
    if (name === 'Edit') {
      urlLink = `${this.ApiUrl1}quote/conditions/view`;
      reqData = {
        'ApplicationNo': this.ReferenceNo,
        'BranchCode': this.userDetails?.BranchCode,
      };
    } else {
      if (name == 'Clauses') {
        urlLink = `${this.ApiUrl1}quote/conditions/new/clauses`;
      }
      if (name == 'War') {
        urlLink = `${this.ApiUrl1}quote/conditions/new/war`;
      }
      if (name == 'Exclusions') {
        urlLink = `${this.ApiUrl1}quote/conditions/new/exclusion`;
      }
      if (name == 'Warranties') {
        urlLink = `${this.ApiUrl1}quote/conditions/new/warranty`;
      }
      reqData = {
        'ApplicationNo': this.ReferenceNo,
        'BranchCode': this.userDetails?.BranchCode,
        "CoverId": this.coverId,
        "ConditionsType": type
      };
      conditionType = type;
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message == "Success") {
          const dialogRef = this.dialog.open(ClausesComponent, {
            data: { list: data?.Result, name: name, conditionType: conditionType, premiumDetails: this.premiumDetails },
            width: '80%'
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log(result);
          });
        }

      }),
      (err) => { }
  }

  onSetValue(){
    console.log('edit')
    const commodityDetails = this.premiumDetails?.QuoteDetails?.CommodityDetails[0];
    const premiumDetail = this.premiumDetails?.PremiumDetails;
    console.log('premium',premiumDetail);
    console.log('Commodity',commodityDetails);
    this.premiumF?.marineRate.setValue(commodityDetails?.MarineRate);
    this.premiumF?.marinePremium.setValue(premiumDetail?.MarinePremium);
    this.premiumF?.warRate.setValue(commodityDetails?.WarRate);
    this.premiumF?.warPremium.setValue(premiumDetail?.WarPremium);
    this.premiumF?.warLandRate.setValue(commodityDetails?.WarlandRate);
    this.premiumF?.warLandPremium.setValue(premiumDetail?.WarlandPremium);
    this.premiumF?.additionalSelect.setValue(premiumDetail?.ExcessSign);
    this.premiumF?.additionalPremium.setValue(premiumDetail?.AdditionalPremium);
    this.premiumF?.policyInsuAedPremium.setValue(premiumDetail?.PolicyIssunceFee);
    this.premiumF?.premiumWithOutVat.setValue(premiumDetail?.PremiumWithoutTax);
    this.premiumF?.vatTaxPrecentage.setValue(premiumDetail?.VatTaxPercentage);
    this.premiumF?.vatTaxAmount.setValue(premiumDetail?.VatTaxAmount);
    this.premiumF?.totalPremium.setValue(premiumDetail?.NetPremium);
    this.premiumF.isFinalizeQuote.setValue(this.premiumDetails?.FinalizeYn ==''?'N':this.premiumDetails?.FinalizeYn);
    // if (this.userDetails?.UserType === 'Broker') {
    //   for (const control in this.premiumForm?.controls) {
    //     if (control != 'additionalSelect' && control != 'comments' && control != 'ReferralUpdateYn') {
    //       this.premiumForm.controls[control].disable();

    //     }
    //   }
    // }

    /*console.log('ssssssss',this.sessionStorageService.sessionStorgaeModel.referral)
    if(this.sessionStorageService.sessionStorgaeModel.referral =='Approved'){
      for (var control in this.premiumForm.controls) {
        this.premiumForm.controls[control].disable();
      }
    }*/
    this.onEndosermentPremium();
    this.onCheckEndoStatus();
  
    /*else{
      for (var control in this.premiumForm.controls) {
        this.premiumForm.controls[control].enable();
      }
    }*/
    
  }

  onNext() {
    this.router.navigate([`${this.routerBaseLink}/new-quotes/policy-generate`]);
  }

}
