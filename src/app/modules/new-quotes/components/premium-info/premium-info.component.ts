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
  Ref: string;
  premiumLevy: any=null;
  levyPercent: any=null;
  stampDuty: any=null;regionCode:any=null;
  stampDutyYN: any='N';
  quoteNo: any;
  policyHolderPercent: any;
  policyHolderPremium: any;
  rateDetails: any=null;
  rateShowSection: boolean=false;
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
    if(this.userDetails?.RegionCode) this.regionCode = this.userDetails?.RegionCode;

  }

  ngOnInit(): void {
    this.onGetViewClausesInformation();
    this.onGetPremiumInformation();
    this.onChangeBetterQuote();
    this.viewRateDetails();
    if( this.sessionStorageService.sessionStorgaeModel.referral =='Approved' || this.userDetails?.UserType == 'Broker'){
      for (var control in this.premiumForm.controls) {
        this.premiumForm.controls[control].disable();
      }
      if(this.userDetails?.UserType == 'Broker' && this.sessionStorageService.sessionStorgaeModel.referral !='Approved'){
        console.log('USSSSSSSSSSSSSSSSSSSSSSSSSSSS',this.premiumForm.controls[control]);
        this.premiumF.additionalSelect.enable();
        this.premiumF.additionalPremium.enable();
        this.premiumF.marineRate.enable();
        this.premiumF.warRate.enable();
        this.premiumF.warLandRate.enable();
        // this.premiumF.marinePremium.enable();
        // this.premiumF.warPremium.enable();
        // this.premiumF.warLandPremium.enable();
        //this.premiumForm.controls[control].enable();
      }
      this.premiumF.ReferralUpdateYn.enable();
      this.premiumF.ReferralUpdateYn.setValue('N');
      if(this.premiumF.ReferralUpdateYn.value == "Y") this.premiumF.comments.enable();
      this.premiumF.comments.setValue(null);
    }
    else{
      let endtStatus = sessionStorage.getItem('EndtReffStatus');
      console.log('RRRRRRRRRRRRRRRRRRRRRRRR');
      if(this.QuoteStatus=='E' && endtStatus == 'ReferalApproved' ){
        for (var control in this.premiumForm.controls) {
          this.premiumForm.controls[control].disable();
        }
        this.premiumF.ReferralUpdateYn.enable();
        this.premiumF.ReferralUpdateYn.setValue('N');
        if(this.premiumF.ReferralUpdateYn.value == "Y") this.premiumF.comments.enable();
        this.premiumF.comments.setValue(null);

      }
      else{
        this.premiumF.additionalSelect.enable();
        this.premiumF.additionalPremium.enable();
        this.premiumF.ReferralUpdateYn.enable();
        this.premiumF.ReferralUpdateYn.setValue('N');
        if(this.premiumF.ReferralUpdateYn.value == "Y") this.premiumF.comments.enable();
        this.premiumF.comments.setValue(null);
        //thiii
        this.premiumF.marinePremium.disable();
        this.premiumF.warPremium.disable();
        this.premiumF.warLandPremium.disable();
      }
    }
    
  }
  viewRateDetails(){
    const urlLink = `${this.ApiUrl1}master/commodity/rate/edit`;
    const reqData = {
      "ApplicationNo": this.ReferenceNo
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if(data.Result){
          if(data.Result.length!=0){
            this.rateShowSection = true;
            this.rateDetails = data.Result[0];
          }
          else this.rateShowSection = false;
        }
      });
  }
  CommaFormatted(tableData,type) {
    let i=0;
            if(tableData!=null && type == 'marinepremium'){
              if(tableData!=0){
              let entry=tableData.toString();
              let splitValue= entry.split('.');
              console.log("Entry Came 1",tableData);

              if(entry.charAt(0) === '-' || entry.charAt(0)=== '+' ){
                let value = splitValue[0]
                if(splitValue.length>1){
                  console.log('Areasss1',splitValue[1],value);
                  this.premiumF.marinePremium.setValue(value+'.'+splitValue[1]);
                }
                else this.premiumF.marinePremium.setValue(value)
              }
              else {
                let value = splitValue[0].replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    if(splitValue.length>1){
                      console.log('Areasss2S',splitValue[1],value);
                      this.premiumF.marinePremium.setValue(value+'.'+splitValue[1]);
                    }
                    else this.premiumF.marinePremium.setValue(value)
              }
                }
                else{
                  this.premiumF.marinePremium.setValue('');
                }
             //this.newQuoteF.annualEstimate.setValue(value);
              }

              if(tableData!=null && type == 'NetPremium'){
                if(tableData!=0){
                let entry=tableData.toString();
                console.log('ENTRYYYYYY1',entry)
                let splitValue= entry.split('.');
                console.log("Entry Came 1",tableData)
                let value = splitValue[0].replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    if(splitValue.length>1){
                      this.premiumF.totalPremium.setValue(value+'.'+splitValue[1]);
                    }
                    else this.premiumF.totalPremium.setValue(value)
                  }
                  else{
                    this.premiumF.totalPremium.setValue('');
                  }
                }
              else if(tableData!=null && type == 'warPremium'){
                if(tableData!=0){
                  let entry=tableData.toString();
                  let splitValue= entry.split('.');
                  console.log("Entry Came 1",tableData);
    
                  if(entry.charAt(0) === '-' || entry.charAt(0)=== '+' ){
                    let value = splitValue[0]
                    if(splitValue.length>1){
                      console.log('Areasss1',splitValue[1],value);
                      this.premiumF.warPremium.setValue(value+'.'+splitValue[1]);
                    }
                    else this.premiumF.warPremium.setValue(value)
                  }
                  else {
                    let value = splitValue[0].replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        if(splitValue.length>1){
                          console.log('Areasss2S',splitValue[1],value);
                          this.premiumF.warPremium.setValue(value+'.'+splitValue[1]);
                        }
                        else this.premiumF.warPremium.setValue(value)
                  }
                  // let entry=tableData.toString();
                  // let splitValue= entry.split('.');
                  // console.log("Entry Came 1",tableData)
                  // let value = splitValue[0].replace(/\D/g, "")
                  // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  //   if(splitValue.length>1){
                  //     this.premiumF.warPremium.setValue(value+'.'+splitValue[1]);
                  //   }
                  //   else this.premiumF.warPremium.setValue(value)
                  // }
                  // else {
                  //   this.premiumF.warPremium.setValue('');
                  }
                  else{
                    this.premiumF.warPremium.setValue('');
                  }
              }
              else if(tableData!=null && type == 'additionalPremium'){
                if(tableData!=0){
                  let entry=tableData.toString();
                  let splitValue = entry.split('.');
                  if(splitValue.length>1){
                    let value = splitValue[0].replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      if(splitValue.length>1){
                        this.premiumF.additionalPremium.setValue(value+'.'+splitValue[1]);
                      }
                      else{
                        this.premiumF.additionalPremium.setValue(value+'.')
                      }
                    }
                    else {
                      let value = entry.replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        this.premiumF.additionalPremium.setValue(value);
                    }
                }
                
                
              }
                  //this.premiumF?.warLandPremium.setValue(premiumDetail?.WarlandPremium);
              else if (tableData!=null && type == 'warLandPremium'){
                if(tableData!=0){
                  let entry=tableData.toString();
                  console.log("Entry Came 1",tableData)
                let value = entry.replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  this.premiumF.warLandPremium.setValue(value);
                }
                else {
                  this.premiumF.warLandPremium.setValue('');
                }
              }
                  //this.premiumF?.policyInsuAedPremium.setValue(premiumDetail?.PolicyIssunceFee);
              else if (tableData!=null && type == 'policyInsuAedPremium'){
                if(tableData!=0){
                  let entry=tableData.toString();
                  let splitValue= entry.split('.');
                  console.log("Entry Came 1",tableData);
    
                  if(entry.charAt(0) === '-' || entry.charAt(0)=== '+' ){
                    let value = splitValue[0]
                    if(splitValue.length>1){
                      console.log('Areasss1',splitValue[1],value);
                      this.premiumF.policyInsuAedPremium.setValue(value+'.'+splitValue[1]);
                    }
                    else this.premiumF.policyInsuAedPremium.setValue(value)
                  }
                  else {
                    let value = splitValue[0].replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        if(splitValue.length>1){
                          console.log('Areasss2S',splitValue[1],value);
                          this.premiumF.policyInsuAedPremium.setValue(value+'.'+splitValue[1]);
                        }
                        else this.premiumF.policyInsuAedPremium.setValue(value)
                  }
                  }
                  else{
                    this.premiumF.policyInsuAedPremium.setValue('');
                  }
                // if(tableData!=0){
                //   let entry=tableData.toString();
                //   console.log("Entry Came 1",tableData)
                // let value = entry.replace(/\D/g, "")
                // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //   this.premiumF.policyInsuAedPremium.setValue(value);
                // }
                // else {
                //   this.premiumF.policyInsuAedPremium.setValue('');
                // }
              }
  }


  get premiumF() {
    return this.premiumForm?.controls;
  }
  get quoteF() {
    return this.quoteForm.controls;
  }

  onGetPremiumInformation() {
    /*let Ref
    let Refer=sessionStorage.getItem('Item')
    let ent=sessionStorage.getItem('EntNo')
    if(ent== 'ReferalApproved'){
    console.log('RRRRRRRR',this.Ref);
     Ref=Refer
    }
    else{
      Ref=this.ReferenceNo
    }*/
  
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
        this.quoteNo = this.premiumDetails?.QuoteDetails?.QuoteNo;

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
  onclickgetquote(Clauses){
    if(Clauses=='Clauses'){
      this.onGetViewClausesInformation();
      if(this.viewClausesInfo?.Clauses.length!=0){
        this.viewClausesByClick = this.viewClausesInfo?.Clauses;
      }
    }
    if(Clauses=='Exclusion'){
          this.onGetViewClausesInformation();
      this.viewClausesByClick = this.viewClausesInfo?.Exclusions;
    }
    if(Clauses=='Warranties'){
      this.onGetViewClausesInformation();
      this.viewClausesByClick = this.viewClausesInfo?.Warranties;
    }
    if(Clauses=='War'){
      this.onGetViewClausesInformation();
      this.viewClausesByClick = this.viewClausesInfo?.Wars;
    }
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
    let warpremium:any;let additionalPremium;let policyInsuAedPremium
    if(this.premiumF?.warPremium.value!=null && this.premiumF?.warPremium.value!=0){
      if(this.premiumF?.warPremium.value.includes(',')){ warpremium = this.premiumF?.warPremium.value.replace(/,/g, '') }
      else {
        warpremium = this.premiumF?.warPremium.value;
      }
    }
    else {
      warpremium = this.premiumF?.warPremium.value;
    }
    if(this.premiumF?.additionalPremium.value!=null && this.premiumF?.additionalPremium.value!=0){
      if(this.premiumF.additionalPremium.value.includes(',')){ additionalPremium = this.premiumF.additionalPremium.value.replace(/,/g, '') }
      else {
        additionalPremium =this.premiumF?.additionalPremium.value;
      }
    }
    else {
      additionalPremium =this.premiumF?.additionalPremium.value;
    }
    console.log('this.premiumF?.policyInsuAedPremium',this.premiumF?.policyInsuAedPremium)
    if(this.premiumF?.policyInsuAedPremium.value!=null && this.premiumF?.policyInsuAedPremium.value!=0){
      if(this.premiumF.policyInsuAedPremium.value.includes(',')){ policyInsuAedPremium = this.premiumF.policyInsuAedPremium.value.replace(/,/g, '') }
      else {
        policyInsuAedPremium =this.premiumF?.policyInsuAedPremium.value;
      }
    }
    else {
      policyInsuAedPremium =this.premiumF?.policyInsuAedPremium.value;
    }
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
      "PolicyFee": policyInsuAedPremium,
      //this.premiumF.policyInsuAedPremium.value,
      "PolicyFeeYn": this.premiumF.policyInsuAedEdit.value,
      "PremiumDetails": {

        "InspectionFee": 0.0,
        "AdditionalPremium": additionalPremium,
        //this.premiumF.additionalPremium.value,
        "ExcessSign": this.premiumF.additionalSelect.value,
        "TotalPremium": this.premiumF?.totalPremium.value,
        "TotalWarPremium": warpremium,
        //this.premiumF?.warPremium.value,
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
        this.quoteNo = this.premiumDetails?.QuoteDetails?.QuoteNo;
        this.onSetValue();

      },
      (err) => { },
    );
  }

  onUpdatePremiumInformation() {
    let endtStatus = sessionStorage.getItem('EndtReffStatus');
      if(this.QuoteStatus=='E' && endtStatus == 'ReferalApproved'){
        if(this.userDetails?.UserType == 'admin' ){
          this.router.navigate([`${this.routerBaseLink}/admin-referral/approved-quote`]);
         }else{
          if(this.premiumF.ReferralUpdateYn.value =='Y' || this.premiumDetails?.Referral?.length > 0){
            this.router.navigate([`${this.routerBaseLink}/referral/referral-unapproved`]);
          }else{
           this.onNext();
          }
        }
      }
      else{
        const CommodityDetails = this.premiumDetails?.QuoteDetails?.CommodityDetails[0];
        const CustomerDetails = this.premiumDetails?.CustomerDetails;
           
        console.log('kkkkkkkkkkk',this.premiumDetails?.Referral);
        if(this.premiumDetails?.Referral){
          this.premiumF?.totalPremium.setValue(0);
        }
        if(this.premiumDetails?.Referral){
          if(this.premiumDetails?.Referral.length!=0 && this.QuoteStatus=='QE'){
              this.QuoteStatus = 'RU';
          }
        }
        let warpremium:any;let additionalPremium;let policyInsuAedPremium
        if(this.premiumF?.warPremium.value!=null && this.premiumF?.warPremium.value!=0){
          if(this.premiumF?.warPremium.value.includes(',')){ warpremium = this.premiumF?.warPremium.value.replace(/,/g, '') }
          else { warpremium = this.premiumF?.warPremium.value;}
        }
        else {
          warpremium = this.premiumF?.warPremium.value;
        }
        if(this.premiumF?.additionalPremium.value!=null && this.premiumF?.additionalPremium.value!=0){
          if(this.premiumF.additionalPremium.value.includes(',')){ additionalPremium = this.premiumF.additionalPremium.value.replace(/,/g, '') }
          else {additionalPremium =this.premiumF?.additionalPremium.value;}
        }
        else {
          additionalPremium =this.premiumF?.additionalPremium.value;
        }
       
        if(this.premiumF?.policyInsuAedPremium.value!=null && this.premiumF?.policyInsuAedPremium.value!=0){
          if(this.premiumF.policyInsuAedPremium.value.includes(',')){ policyInsuAedPremium = this.premiumF.policyInsuAedPremium.value.replace(/,/g, '')}
          else {policyInsuAedPremium =this.premiumF?.policyInsuAedPremium.value};
        
          console.log('this.premiumF?.policyInsuAedPremium.value', policyInsuAedPremium) }
        
        else {
          policyInsuAedPremium =this.premiumF?.policyInsuAedPremium.value;
          console.log('this.premiumF',this.premiumF?.policyInsuAedPremium.value)
        }

     
        // console.log('TTTTTTTT',this.premiumF?.totalPremium.value)
        // console.log('ppppppppp',this.premiumF?.warRate.value)
    
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
        "PolicyFee": policyInsuAedPremium,
        //this.premiumF.policyInsuAedPremium.value
        "PolicyFeeYn": this.premiumF.policyInsuAedEdit.value,
        "PremiumDetails": {
    
          "InspectionFee": 0.0,
          "AdditionalPremium":additionalPremium, 
          //this.premiumF.additionalPremium.value,
          "ExcessSign": this.premiumF.additionalSelect.value,
          "TotalPremium": this.premiumF?.totalPremium.value,
          "TotalWarPremium": warpremium,
          //this.premiumF?.warPremium.value,
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
            console.log('kkkkkkkkkkkkkk');
            if(this.premiumF.referralStatus.value=='A'){
              console.log("AAAAAAAAAAAAAA");
              sessionStorage.setItem('AAA','1');
              this.router.navigate([`${this.routerBaseLink}/admin-referral/approved-quote`]);
            }
            else if(this.premiumF.referralStatus.value =='R'){
              sessionStorage.setItem('AAA','3');
              this.router.navigate([`${this.routerBaseLink}/admin-referral/rejected-quote`]);
            }
            else if(this.premiumF.referralStatus.value =='N'){
              sessionStorage.setItem('AAA','2');
              this.router.navigate([`${this.routerBaseLink}/admin-referral/pending-quote`]);
            }
            //this.router.navigate([`${this.routerBaseLink}/admin-referral/approved-quote`]);
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
            this.onGetViewClausesInformation()
          });
        }

      }),
      (err) => { }
  }

  onSetValue(){
    console.log('edit')
  
    const commodityDetails = this.premiumDetails?.QuoteDetails?.CommodityDetails[0];
    const premiumDetail = this.premiumDetails?.PremiumDetails;
    this.premiumLevy = this.premiumDetails?.PremiumDetails?.PremiumLevy;
    this.levyPercent = this.premiumDetails?.PremiumDetails?.LevyPercent;
    this.policyHolderPercent =this.premiumDetails?.PremiumDetails?. PolicyholderFeePercent
    this.policyHolderPremium =this.premiumDetails?.PremiumDetails?. PolicyholderFee
    if(this.premiumDetails?.PremiumDetails?.StampDuty!=0 || this.premiumDetails?.PremiumDetails?.StampDuty!='0.0'){
      this.stampDuty = this.premiumDetails?.PremiumDetails?.StampDuty;
    }
    else{
      this.stampDuty=0;
    }
    this.stampDutyYN = this.premiumDetails?.PremiumDetails?.StampDutyYN;
    if(this.premiumDetails?.Referral){
      this.premiumF?.totalPremium.setValue('0');
    }
    if(this.premiumDetails?.PremiumDetails?.VatTaxAmount!=0 || this.premiumDetails?.PremiumDetails?.VatTaxAmount!='0.0'){
      this.premiumF.vatTaxAmount.setValue(this.premiumDetails?.PremiumDetails?.VatTaxAmount);
    }
    else{
      this.premiumF?.vatTaxAmount.setValue('0');
      console.log('Vat Taxesssss',this.premiumF?.vatTaxAmount.value);
    }
    console.log('premium',premiumDetail);
    console.log('Commodity',commodityDetails);
    this.premiumF?.marineRate.setValue(commodityDetails?.MarineRate);
  
    if(this.userDetails?.UserType=='Broker' || this.userDetails?.UserType=='User'){
      this.premiumF.warRate.disable();
    this.premiumF.warLandRate.disable();
    this.premiumF.marineRate.disable();
    this.premiumF.marinePremium.disable();
    this.premiumF.warPremium.disable();
    this.premiumF.warLandPremium.disable();
    }
    else {
      this.premiumF.marinePremium.disable();
      this.premiumF.warPremium.disable();
      this.premiumF.warLandPremium.disable();
      this.premiumF.warRate.enable();
      this.premiumF.warLandRate.enable();
      this.premiumF.marineRate.enable();
    }
    if(premiumDetail?.MarinePremium!=0){
      this.CommaFormatted(premiumDetail?.MarinePremium,'marinepremium');
    }
    else {
      this.premiumF?.marinePremium.setValue(premiumDetail?.MarinePremium);
    }
    this.premiumF?.warRate.setValue(commodityDetails?.WarRate);
    if(premiumDetail?.WarPremium!=0){
      this.CommaFormatted(premiumDetail?.WarPremium,'warPremium');
    }
    else {
      this.premiumF?.warPremium.setValue(premiumDetail?.WarPremium);
    }
    //this.premiumF?.warPremium.setValue(premiumDetail?.WarPremium);
    this.premiumF?.warLandRate.setValue(commodityDetails?.WarlandRate);
    if(premiumDetail?.WarlandPremium!=0){
      this.CommaFormatted(premiumDetail?.WarlandPremium,'warLandPremium');
    }
    else {
      this.premiumF?.warLandPremium.setValue(premiumDetail?.WarlandPremium);
    }
    //this.premiumF?.warLandPremium.setValue(premiumDetail?.WarlandPremium);
    //thi
   
    this.premiumF?.additionalSelect.setValue(premiumDetail?.ExcessSign);
    if(premiumDetail?.AdditionalPremium!=0){
      this.CommaFormatted(premiumDetail?.AdditionalPremium,'additionalPremium');
    }
    else {
      this.premiumF?.additionalPremium.setValue(premiumDetail?.AdditionalPremium);
    }
    if(premiumDetail?.PolicyIssunceFee!=0){
      this.CommaFormatted(premiumDetail?.PolicyIssunceFee,'policyInsuAedPremium');
    }
    else {
      this.premiumF?.policyInsuAedPremium.setValue(premiumDetail?.PolicyIssunceFee);
    }
    //this.premiumF?.additionalPremium.setValue(premiumDetail?.AdditionalPremium);
    //this.premiumF?.policyInsuAedPremium.setValue(premiumDetail?.PolicyIssunceFee);
    this.premiumF?.premiumWithOutVat.setValue(premiumDetail?.PremiumWithoutTax);
    this.premiumF?.vatTaxPrecentage.setValue(premiumDetail?.VatTaxPercentage);
    this.premiumF?.vatTaxAmount.setValue(premiumDetail?.VatTaxAmount);
    // if(premiumDetail?.NetPremium!=0){
    //   this.CommaFormatted(premiumDetail?.NetPremium,'NetPremium');
    // }
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
  back(value: string): void {
    this.router.navigate([`${this.routerBaseLink}/new-quotes/customer-info`], { queryParams: { value } });
  }
  onNext() {
    this.router.navigate([`${this.routerBaseLink}/new-quotes/policy-generate`]);
  }

}
