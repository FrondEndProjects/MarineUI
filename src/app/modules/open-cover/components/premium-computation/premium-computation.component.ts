import { map, filter, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { OpenCoverService } from '../../open-cover.service';
import * as Mydatas from '../../../../app-config.json';
import { combineLatest, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-premium-computation',
  templateUrl: './premium-computation.component.html',
  styleUrls: ['./premium-computation.component.scss'],
})
export class PremiumComputationComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public premiumDetails: any={};
  public actual = {
    Premium: '0',
    PolicyFee: '',
    InspectionFee: '',
    Total: ''
  }

  public receivedPay = {
    Premium: '0',
    PolicyFee: '',
    InspectionFee: '',
    Total: ''
  }

  public balance = {
    Premium: '0',
    PolicyFee: '',
    InspectionFee: '',
    Total: ''
  }

  public receivRefund = {
    Premium: '0',
    PolicyFee: '',
    InspectionFee: '',
    Total: ''
  }

  public chargeOrRefund = 'C';
  public refundStatus = '';
  public premiumForm:FormGroup;
  public routerBaseLink:any='';
  total: string;

  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
    private _formBuilder: FormBuilder,

  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
  }

  ngOnInit(): void {

    this.onCallPremiumCal();
    this.onGetRefundChargeStatus();
    this.onCreateFormControl();
    combineLatest([
      this.pF.TotalPremium.valueChanges.pipe(startWith(0)),
      this.pF.PolicyFee.valueChanges.pipe(startWith(0)),
      this.pF.InspectionFee.valueChanges.pipe(startWith(0)),
      this.pF.PayableMarinePremium.valueChanges.pipe(startWith(0)),
      this.pF.PolicyFeePaid.valueChanges.pipe(startWith(0)),
      this.pF.InspectionFeePaid.valueChanges.pipe(startWith(0)),
    ]).subscribe(([
      TotalPremium,
      PolicyFee,
      InspectionFee,
      PayableMarinePremium,
      PolicyFeePaid,
      InspectionFeePaid,
    ]) => {
      /*let total
      if(TotalPremium.includes(',')){ total=TotalPremium.replace(/,/g, '') }
      console.log('<<<<<<<<<<<<<',total)
      TotalPremium=total;*/
      let row1 = Number(TotalPremium) + Number(PolicyFee) + Number(InspectionFee);
      let row4 = Number(PayableMarinePremium) + Number(PolicyFeePaid) + Number(InspectionFeePaid)
      console.log(row1,row4);
      this.pF.FinalPremium.setValue(row1);

      console.log('fffffffffffffffffffff',this.pF.FinalPremium.value)

        this.pF.BalanceAmount.setValue(Number(TotalPremium));
        this.pF.PolicyFeeBalance.setValue(Number(PolicyFee));
        this.pF.InsceptionFeeBalance.setValue(Number(InspectionFee));
        this.pF.ReceivedTotal.setValue(Number(row1));
        this.pF.Total.setValue(Number(row4));

    });

  }

  /*CommaFormatted() {
    // format number
    if (this.total) {
      console.log('TTTTTTTTTTTT',this.total)
      //let premium=this.pF.TotalPremium.value
     //let premium= String(this.pF.TotalPremium.value);
     let value= this.total.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");

     this.pF.TotalPremium.setValue(value) 
     console.log('YYYYYYYYYYYYYYYYYYY',this.pF.TotalPremium.value)
    }}*/


    /*CommaFormattedFinal(){
      if (this.pF.FinalPremium) {
        console.log('FFFFFFFFFFFFFFF',this.pF.FinalPremium)
       let premium= String(this.pF.FinalPremium);
       let value= premium.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       this.pF.FinalPremium.setValue(value) 
      }
    }*/
    /*onSIValueChange(args){
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }*/
  onCreateFormControl() {
    this.premiumForm = this._formBuilder.group({
      TotalPremium:['', Validators.required],
      PolicyFee:['', Validators.required],
      InspectionFee:['', Validators.required],
      FinalPremium:['', Validators.required],

      ReceivedTilDate:['', Validators.required],
      PolicyFeeReceived:['', Validators.required],
      InspectionFeeReceived:['', Validators.required],
      PremiumReceived:['', Validators.required],

      BalanceAmount:['',Validators.required],
      PolicyFeeBalance:['',Validators.required],
      InsceptionFeeBalance:['',Validators.required],
      ReceivedTotal:['',Validators.required],

      PayableMarinePremium:['',Validators.required],
      PolicyFeePaid:['',Validators.required],
      InspectionFeePaid:['',Validators.required],
      Total:['',Validators.required],

    });
  }
  get pF() {
    return this.premiumForm.controls;
  }

  onCallPremiumCal(){
    const urlLink = `${this.ApiUrl1}OpenCover/premiumcalc/save`;
    const reqData = {
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
       this.onGetPremium();

      });
  }



  onGetPremium() {
    const urlLink = `${this.ApiUrl1}OpenCover/openpolicy/moppremium`;
    const reqData = {
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('premium', data);
        this.premiumDetails = data?.Result[0];

        console.log('PPPPPPPPPP',this.premiumDetails)

        this.pF.TotalPremium.setValue(Number(this.premiumDetails.TotalPremium));
        //this.CommaFormatted();
       
        this.pF.PolicyFee.setValue(Number(this.premiumDetails.PolicyFee));
        this.pF.InspectionFee.setValue(Number(this.premiumDetails.InspectionFee));
        // this.pF.FinalPremium.setValue(Number(this.premiumDetails.FinalPremium));

        this.pF.ReceivedTilDate.setValue(Number(this.premiumDetails.ReceivedTilDate));
        this.pF.PolicyFeeReceived.setValue(Number(this.premiumDetails.PolicyFeeReceived));
        this.pF.InspectionFeeReceived.setValue(Number(this.premiumDetails.InspectionFeeReceived));
        this.pF.PremiumReceived.setValue(Number(this.premiumDetails.PremiumReceived));



        this.pF.PayableMarinePremium.setValue(Number(this.premiumDetails.PayableMarinePremium));
        this.pF.PolicyFeePaid.setValue(Number(this.premiumDetails.PolicyFeePaid));
        this.pF.InspectionFeePaid.setValue(Number(this.premiumDetails.InspectionFeePaid));

           
        /*if(this.pF?.TotalPremium?.value){
          this.total= String(this.pF?.TotalPremium.value);
          this.CommaFormatted();
          //this.CommaFormatted();
        }*/


      },
      (err) => { },
    );
  }

  onMoveFront() {
    this.openCoverService.onMoveNext('Front');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/policy-generate-cover`]);
   }
   onMoveBack() {
     this.openCoverService.onMoveNext('Back');
     this.router.navigate([`${this.routerBaseLink}/new-open-cover/commodity-info`]);
    }
  onCalculate() {
    const urlLink = `${this.ApiUrl1}OpenCover/premiumcalc`;
    const reqData = {
      "LoginBranchCode":this.userDetails.BranchCode,
      "EndorsementStatus":this.premiumDetails.EndtStatus,
      "BalanceAmount":this.pF.BalanceAmount.value,
      "ChargeableYN":this.chargeOrRefund,
      "ProposalNo":this.proposalNo,
      "RefundChargeYN":this.refundStatus,
      "RefundAmount":this.pF.PayableMarinePremium.value ,
      "PolicyFee":this.pF.PolicyFee.value,
      "InceptionFeePaid":this.pF.InspectionFeePaid.value,
      "TotalAmount":this.pF.Total.value,
      "InceptionFee":this.pF.InspectionFee.value,
      "PolicyFeeRcvd":this.pF.PolicyFeeReceived.value,
      "TotalPremium":this.pF.TotalPremium.value,
      "ActualPremium":this.pF.TotalPremium.value,
      "PolicyFeePaid":this.pF.PolicyFeePaid.value,
      "PremiumRcvd": this.pF.PremiumReceived.value
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('cal-premium', data);
      },
      (err) => { },
    );
  }

  onGetRefundChargeStatus() {
    const urlLink = `${this.ApiUrl1}OpenCover/refundStatus`;
    const reqData = {
      "ProposalNo":this.proposalNo,
    }
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('refundStatus', data);
        this.refundStatus = data?.Result;
      },
      (err) => { },
    );
  }

  onSubmit(){
    this.onCalculate();
    const urlLink = `${this.ApiUrl1}opencover/report/depositinfo`;
    const reqData = {
      "ProposalNo":this.proposalNo
    }
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('depositinfo', data);
        this.onMoveFront();
      },
      (err) => { },
    );
  }

}
