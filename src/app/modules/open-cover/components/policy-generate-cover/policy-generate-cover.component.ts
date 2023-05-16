import { OpenCoverService } from './../../open-cover.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-policy-generate-cover',
  templateUrl: './policy-generate-cover.component.html',
  styleUrls: ['./policy-generate-cover.component.scss']
})
export class PolicyGenerateCoverComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any = '11';
  public policyGenerateForm!: FormGroup;
  public editData: any;
  public proposalNo: any = '';
  public installmentList: any[] = [];
  public policyInfo:any;
  public premiumInfo:any;
  public coverTypeId: any;
  public policyStatus:any='';
  public conveyance:any[]=[];
  public submitted:boolean = false;
  public routerBaseLink:any='';
  depositInfo: any;

  constructor(
    private _formBuilder: FormBuilder,
    private openCoverService: OpenCoverService,
    private router: Router,

  ) {

    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
  }

  ngOnInit(): void {
    this.onGetCoverTypeId();
    this.onCreateFormControl();
    this.onGetInstallment();
    this.onGetPremium();
    this.onGetPolicyInfo();
    this.onGetEnd();
    this.onGetConvency();
    this.onGetDepositInfo();

  }

  onCreateFormControl() {
    this.policyGenerateForm = this._formBuilder.group({
      generateCover: ['N', Validators.required],
      policyEffectiveDate: [null, Validators.required],
      installment: [null, Validators.required],
      premium: [{value:'',disabled: true}, Validators.required],
      policyFee: [{value:0,disabled: true}, Validators.required],
      vatTax: [{value:'',disabled: true}, Validators.required],
      totalPremium: [{value:'',disabled: true}, Validators.required],
      remarks: ['', Validators.required],


      cancelClauses: ['', Validators.required],
      schedule: ['N', Validators.required],
      exclusionClauses: ['N', Validators.required],
      pwwDays: ['', Validators.required],
      // SchedulepolicyFee: ['', Validators.required],



    });
  }

  get pG() {
    return this.policyGenerateForm.controls;
  }
  onMoveFront() {
    this.openCoverService.onMoveNext('Front');
    // exist-opencover
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/confirmation`]);
  }
  onMoveBack() {
    this.openCoverService.onMoveNext('Back');
    if (this.coverTypeId == '13' || this.coverTypeId == '12') {
      sessionStorage.removeItem('Move');
      this.router.navigate([`${this.routerBaseLink}/new-open-cover/premium-computation`]);
    } else {
      this.openCoverService.onMoveNext('Front');
      sessionStorage.removeItem('Move');
      this.router.navigate([`${this.routerBaseLink}/new-open-cover/commodity-info`]);

    }

  }


  onGetCoverTypeId() {
    const urlLink = `${this.ApiUrl1}OpenCover/type`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('cover-id', data);
        this.coverTypeId = data?.OpenCoverType;
      },
      (err) => { },
    );
  }

  onGetInstallment() {
    const urlLink = `${this.ApiUrl1}OpenCover/installment`;
    this.openCoverService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log('installment', data);
        this.installmentList = data?.Result;

      },
      (err) => { },
    );
  }

  vattax(event){
    console.log('EEEEEEEEEEEEEEEEEE',event)
    let value= event.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log('VVVVVVVVVVV',value)
    let total:number = (Number(this.pG.premium.value) + Number(this.pG.policyFee.value) + Number(event));
    this.pG.totalPremium.setValue(total);
  }
  onGetPremium() {
    const urlLink = `${this.ApiUrl1}OpenCover/openpolicy/moppremium`;
    const reqData = {
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('premium', data);
        this.premiumInfo = data?.Result[0];
        this.pG.premium.setValue(this.premiumInfo?.PayableMarinePremium == "" || this.premiumInfo?.PayableMarinePremium == null ? 0 :this.premiumInfo?.PayableMarinePremium);
        this.pG.policyFee.setValue(this.premiumInfo?.PolicyInsceptionFeePaid == "" || this.premiumInfo?.PolicyInsceptionFeePaid == null ? 0 :this.premiumInfo?.PolicyInsceptionFeePaid);
        this.pG.vatTax.setValue(this.premiumInfo?.VatTaxAmount == " " || this.premiumInfo?.VatTaxAmount == null ? 0 :this.premiumInfo?.VatTaxAmount);
        let total:number = (Number(this.pG.premium.value) + Number(this.pG.policyFee.value) + Number(this.pG.vatTax.value));
        this.pG.totalPremium.setValue(total);

      },
      (err) => { },
    );
  }

  onGetPolicyInfo() {
    const urlLink = `${this.ApiUrl1}opencover/report/policygeninfo`;
    const reqData = {
      "ProposalNo": this.proposalNo,
      "ProductId": this.productId,
      "BranchCode": this.userDetails.BranchCode
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('policygeninfo', data);
        this.policyInfo = data?.Result;
        this.pG.policyEffectiveDate.setValue(this.openCoverService.ngbDateFormatt(this.policyInfo?.PolicyEffectiveDate));
        this.pG.schedule.setValue(this.policyInfo?.RatePrintStatus);
        this.pG.exclusionClauses.setValue(this.policyInfo?.AmendedClausePrintStatus);
        this.pG.pwwDays.setValue(this.policyInfo?.Ppwdays);
        this.pG.cancelClauses.setValue(this.policyInfo?.CancellationClauses);
        // this.pG.policyFee.setValue(this.policyInfo?.PolicyFee);
      },
      (err) => { },
    );
  }

  onGetDepositInfo(){
    const urlLink = `${this.ApiUrl1}opencover/report/depositinfo`;
    const reqData = {
      "ProposalNo":this.proposalNo
    }
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('depositinfo', data);
        this.depositInfo = data?.Result[0];
        console.log('PPPPPPPIIIIIIIIIIIIII',this.depositInfo?.InstallmentType)
        this.pG.installment.setValue(this.depositInfo?.InstallmentType);
        this.pG.remarks.setValue(this.depositInfo?.Remarks);



      },
      (err) => { },
    );
  }


  onGetEnd() {
    const urlLink = `${this.ApiUrl1}OpenCover/endorsement/edit`;
    const reqData = {
      "ProposalNo": this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('end', data);
        this.policyStatus = data?.PolicyNo;

      },
      (err) => { },
    );
  }

  onGetConvency() {
    const urlLink = `${this.ApiUrl1}opencover/report/conveyance`;
    const reqData = {
      "ProposalNo": this.proposalNo,
      "BranchCode":this.userDetails.BranchCode
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('con', data);
        this.conveyance = data?.Result;

      },
      (err) => { },
    );
  }

  onSubmit() {
    this.submitted = true;
    const conveyance:any[] = this.conveyance.map((x:any)=>({
      "ConveyanceDesc": x.Conveyance,
      "TransportId": x.ModeTransportId
    }));
    const urlLink = `${this.ApiUrl1}OpenCover/policy/generated`;
    const MissippiCode= sessionStorage.getItem('MissippiCode');
    console.log('MMMMMMMMMMMMMMMMMMMMMMMMM',MissippiCode);
    const reqData = {
      "OpenCoverNo": MissippiCode,
      "ProposalNo": this.proposalNo,
      "WarPremium": this.premiumInfo?.PolicyInsceptionFeePaid,
      "AmendedClausesYN": this.pG.exclusionClauses.value,
      "ProductId": this.productId,
      "InceptionFeePaid": '0',
      "OpenCoverYN": this.pG.generateCover.value,
      "EndtYN":  this.policyStatus == ''?'N':'Y',
      "Remarks": this.pG.remarks.value,
      "RatesYN": this.pG.schedule.value,
      "Deposit": this.premiumInfo?.DepositPremiumYn == ''?'Y':this.premiumInfo?.DepositPremiumYn,
      "DepositDate": '',
      "DepositType": this.premiumInfo?.DepositType,
      "CreditNoteNo": '',
      "PolicyFee": this.pG.policyFee.value == 0 ? this.policyInfo?.PolicyFee : this.pG.policyFee.value,
      "RefundAmount": '0',
      "ConveyanceInfo": conveyance,
      "RenewalYN": '',
      "DebitNoteName": '',
      "DebitNoteNo": '',
      "PPWDays": this.pG.pwwDays.value,
      "VatTax": this.pG.vatTax.value,
      "CancelClauses": this.pG.cancelClauses.value,
      "InstallType": this.pG.installment.value,
      "PolicyFeePaid": '0',
      "UserType": this.userDetails.UserType,
      "MarinePremium": this.pG.premium.value,
      "BranchCode": this.userDetails.BranchCode,
      "EffectiveDate": this.pG.policyEffectiveDate.value?.replace(/-/g,'/'),
    };
    console.log(reqData);
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('save', data);
        if(data?.Result?.Status){
          sessionStorage.setItem("policyGenerated",JSON.stringify(data?.Result));
          this.onMoveFront();
        }

      },
      (err) => { },
    );
  }
  onDateFormat(val: any) {
    const splitDate = val.split('/');
    const reverseDate = splitDate.reverse();
    const joinDate = reverseDate.join('-');
    return new Date(joinDate);
  }



}
