import { map, filter, startWith } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { OpenCoverService } from '../../open-cover.service';
import * as Mydatas from '../../../../app-config.json';
import { combineLatest, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { start } from 'repl';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

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

  public chargeOrRefund ='C';
  public refundStatus = '';
  public premiumForm:FormGroup;
  public routerBaseLink:any='';
  total: string;
  totalReceived: any;
  totalActual: any;
  total1: any;
  total2: any;
  values:any[]=[];
  check: any;

  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private toastrService: NbToastrService,
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
  
  }

  ngOnInit(): void {

    
   
    //this.onCallPremiumCal();
    let s=sessionStorage.getItem('Move');
    if(s=='1'){
      console.log('lllllllllll',s)
      this.onCallPremiumCal();
    }
    else{
      this.onGetPremium();
    }
    //this.onGetPremium();
    this.onGetRefundChargeStatus();
    this.onCreateFormControl();
    combineLatest([
      this.pF.TotalPremium.valueChanges.pipe(startWith(0)),
      this.pF.PolicyFee.valueChanges.pipe(startWith(0)),
      this.pF.InspectionFee.valueChanges.pipe(startWith(0)),
      this.pF.PayableMarinePremium.valueChanges.pipe(startWith(0)),
      this.pF.PolicyFeePaid.valueChanges.pipe(startWith(0)),
      this.pF.InspectionFeePaid.valueChanges.pipe(startWith(0)),
      this.pF.ReceivedTilDate.valueChanges.pipe(startWith(0)),
      this.pF.PolicyFeeReceived.valueChanges.pipe(startWith(0)),
      this.pF.InspectionFeeReceived.valueChanges.pipe(startWith(0)),
      this.pF.BalanceAmount.valueChanges.pipe(startWith(0)),
      this.pF.PolicyFeeBalance.valueChanges.pipe(startWith(0)),
      this.pF.InsceptionFeeBalance.valueChanges.pipe(startWith(0)),

    ]).subscribe(([
      TotalPremium,
      PolicyFee,
      InspectionFee,
      PayableMarinePremium,
      PolicyFeePaid,
      InspectionFeePaid,
      ReceivedTilDate,
      PolicyFeeReceived,
      InspectionFeeReceived,
      BalanceAmount,
      PolicyFeeBalance,
      InsceptionFeeBalance,

    ]) => {
      /*let total
      if(TotalPremium.includes(',')){ total=TotalPremium.replace(/,/g, '') }
      console.log('<<<<<<<<<<<<<',total)
      TotalPremium=total;*/
      /*let f1=TotalPremium;let f2
      if (f1 !== undefined && f1 !== null) {
        // here we just remove the commas from value
        f2=f1.toString().replace(/,/g, "");
      } */
      let fee;let total;let totalInsception;let InspectionFe;let BalanceAmoun:any=0,PolicyFeeBalanc:any=0,InsceptionFeeBalanc:any=0;

      if(PolicyFee!=null && PolicyFee!=0){
        if(String(PolicyFee.includes(','))){ 
        fee=PolicyFee.replace(/,/g, '');
        console.log('PolicyFee',fee); 
      }
        else {fee= PolicyFee;
         };
      }
      else {
        fee= PolicyFee;
      }

      if(InspectionFee!=null && InspectionFee!=0){
        if(String(InspectionFee.includes(','))){ 
          InspectionFe=InspectionFee.replace(/,/g, '');
        console.log('InspectionFee',InspectionFe); 
      }
        else {
          InspectionFe= InspectionFee;
         }
      }
      else {
        InspectionFe= InspectionFee;
      }

        if(BalanceAmount!=0 && BalanceAmount!=null){
        if(String(BalanceAmount.includes(','))){ 
          BalanceAmoun=BalanceAmount.replace(/,/g, '');
        console.log('InspectionFee',BalanceAmount); 
      }
      else {
        BalanceAmoun= BalanceAmount;
       }
        }
        else {
          BalanceAmoun= 0;
         }
         if(PolicyFeeBalance!=0 && PolicyFeeBalance!=null){
          if(String(PolicyFeeBalance).includes(',')){ 
            PolicyFeeBalanc=PolicyFeeBalance.replace(/,/g, '');
          console.log('PolicyFeeBalance',PolicyFeeBalanc); 
        }
          else {
            PolicyFeeBalanc= PolicyFeeBalance;
           }
         }
         else {
          console.log('PolicyFeeBalance',PolicyFeeBalance)
          PolicyFeeBalanc= 0;
         }
         if(InsceptionFeeBalance!=0 && InsceptionFeeBalance!=null){
          if(String(InsceptionFeeBalance).includes(',')){ 
            InsceptionFeeBalanc=InsceptionFeeBalance.replace(/,/g, '');
          console.log('InspectionFee',InsceptionFeeBalanc); 
        }
          else {
            InsceptionFeeBalanc= InsceptionFeeBalance;
           }
         }
         else {
          InsceptionFeeBalanc= 0;
         }
         console.log('Valuesssss',typeof(BalanceAmoun),typeof(PolicyFeeBalanc),typeof(InsceptionFeeBalanc))
      let row1 = Number(TotalPremium) + Number(fee) + Number(InspectionFe);
      let row2 = Number(ReceivedTilDate) + Number(PolicyFee) + Number(InspectionFee);
      let row3 = Number(BalanceAmoun) + Number( PolicyFeeBalanc) + Number(InsceptionFeeBalanc);

      let s:any;
      this.secondrow(ReceivedTilDate,PolicyFeeReceived,InspectionFeeReceived);
       
      let r=PayableMarinePremium
      if (r !== undefined && r !== null) {
        // here we just remove the commas from value
        s=r.toString().replace(/,/g, "");
      } 
       console.log('GGGGGGGGGGG',s);

       if(PolicyFeePaid!=null && PolicyFeePaid!=0){
        if(PolicyFeePaid.includes(',')){ 
        total=PolicyFeePaid.replace(/,/g, '');
        console.log('PolicyFee',total); 
      }
        else {total= PolicyFeePaid;
         };
      }
      else {
        total= PolicyFeePaid;
      }

      if(InspectionFeePaid!=0){
        if(InspectionFeePaid.includes(',')){ 
        totalInsception=InspectionFeePaid.replace(/,/g, '');
        console.log('PolicyFee',total); 
      }
        else {
          totalInsception= InspectionFeePaid;
         }
      }
      else {
        totalInsception= InspectionFeePaid;
      }
      let row4 = Number(s) + Number(total) + Number(totalInsception)
      //let row4 = Number(s) + Number(PolicyFeePaid) + Number(InspectionFeePaid)
      console.log('ROWSSS',row1,row4);
       this.pF.FinalPremium.setValue(row1);
      // if(row1!=0 && row1!=undefined && row1!=null){
      //   if(row1!=null){
      //     let entry=row1.toString();
      //   let value = entry.replace(/\D/g, "")
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //   this.pF.FinalPremium.setValue(value);
      //   console.log('row11111',this.pF.FinalPremium.value,this.pF.FinalPremium)
      //     }
      //   //this.pF.FinalPremium.setValue(row1);
      // }
      // else if(isNaN(row1)){
      //  return this.pF.FinalPremium.setValue('0');
      // }
      //thii
      //this.pF.ReceivedTotal.setValue(row3);
      // this.CommaFormatted(row1,'ReceivedTotal');
      if(row3!=0 && row3!=undefined && row3!=null){
        this.CommaFormatted(row1,'ReceivedTotal');
      }
      // else if(isNaN(row3)){
      //   return this.pF.ReceivedTotal.setValue('0');
      //  }
      let v= Number(row1)-Number(row4);
        //this.pF.BalanceAmount.setValue(Number(TotalPremium));
        //this.pF.PolicyFeeBalance.setValue(Number(PolicyFee));
        //this.pF.InsceptionFeeBalance.setValue(Number(InspectionFee));
        console.log('jjjjjjjjjjj',v);
        this.six(this.pF.PremiumReceived)
        //this.pF.ReceivedTotal.setValue(Number(v));
        
        this.pF.Total.setValue(Number(row4));

    });

  }

  secondrow(ReceivedTilDate,PolicyFeeReceived,InspectionFeeReceived){
    let row2 = Number(ReceivedTilDate) + Number(PolicyFeeReceived) + Number(InspectionFeeReceived);
    this.pF.PremiumReceived.setValue(row2);
  }
  minus(event){
    console.log('hhhhhhhh',event.value)
    this.totalActual=Number(event.value);
    this.pF.TotalPremium.setValue(this.totalActual);
  }
  minu(event){
    console.log('LLLLLLLLL',event.value)
    if(event.value!='' || event.value!=null){
      this.totalReceived=Number(event.value);
    }
    else this.totalReceived= 0;
    this.finalMinus();
  }

  finalMinus(){
    let t=(this.totalActual-this.totalReceived);
    console.log('YYYYYYYYYY',t)
    this.pF.BalanceAmount.setValue(Number(t));
  }


  second(event){
    this.total1=event.value
  }
  /*third(event){
    console.log('LLLLLLLLL',event.value)
    if(event.value!='' || event.value!=null){
      this.total2=Number(event.value);
    }
    else this.total2= 0;
    let t = this.pF.PolicyFee.value - this.total2;
    this.pF.PolicyFeeBalance.setValue(t)
  }*/


  four(event){
    this.total1=event.value
  }
  five(event){
    console.log('LLLLLLLLL',event.value)
    let value = 0;
    if(event.value!='' || event.value!=null){
      value=Number(event.value);
    }
    let t = this.pF.InspectionFee.value - value;
    this.pF.InsceptionFeeBalance.setValue(Number(t));
  }

  six(event){
    console.log('SIIIIIIXXXX',event.value)
    let value = 0;
    if(event.value!='' || event.value!=null){
      value=Number(event.value);
    }
    let t = this.pF.FinalPremium.value - value;
    this.pF.ReceivedTotal.setValue(Number(t));
  }

  policyfee(event){
    console.log('ONNNNNNN',event.value)
    let value = 0;let fee:any;
    if(event.value!='' || event.value!=null){
          if(event.value.includes(','))
          { 
        fee=event.value.replace(/,/g, '')
      }     
        else {
          fee= event.value;
         }
      //value=Number(event.value);
    }
    else {
      fee= event.value;
    }
    this.pF.PolicyFeeBalance.setValue(Number(fee));
    //   if(fee!=0){
    //   let entry=fee;
    //   console.log("Entry Came 1",fee)
    // let value = entry.replace(/\D/g, "")
    // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // this.pF.PolicyFeeBalance.setValue(value);
    //   }
    //   else{
    //      this.pF.PolicyFeeBalance.setValue(Number(fee));
    //   }
  }

  Inspectionfee(event){
    console.log('TWOOOOO',event.value)
    let value = 0;
    // if(event.value!='' || event.value!=null){
    //   value=Number(event.value);
    // }
    let fee:any;
    if(event.value!='' || event.value!=null){
          if(event.value.includes(','))
          { 
        fee=event.value.replace(/,/g, '')
      }     
        else {
          fee= event.value;
         }
    }
    else {
      fee= event.value;
    }
    this.pF.InsceptionFeeBalance.setValue(Number(fee));
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
      TotalPremium:[{value:'',disabled: true}, Validators.required],
      PolicyFee:['', Validators.required],
      InspectionFee:['', Validators.required],
      FinalPremium:[{value:'',disabled: true}, Validators.required],

      ReceivedTilDate:[{value:'',disabled: true}, Validators.required],
      PolicyFeeReceived:[{value:'',disabled: true}, Validators.required],
      InspectionFeeReceived:[{value:'',disabled: true}, Validators.required],
      PremiumReceived:[{value:'',disabled: true}, Validators.required],

      BalanceAmount:[{value:'',disabled: true},Validators.required],
      PolicyFeeBalance:[{value:'',disabled: true},Validators.required],
      InsceptionFeeBalance:[{value:'',disabled: true},Validators.required],
      ReceivedTotal:[{value:'',disabled: true}, Validators.required],

      PayableMarinePremium:['',Validators.required],
      PolicyFeePaid:['',Validators.required],
      InspectionFeePaid:['',Validators.required],
      Total:[{value:'',disabled: true},Validators.required],
      //chargeOrRefund:['C'],



    });
  }



  /*checked(row,check){
    console.log('kkkkkkkkk',row)
return this.chargeOrRefund == check;
  }*/
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
        console.log('kkkkkkkkkkkkkk',this.premiumDetails)

        this.pF.TotalPremium.setValue(Number(this.premiumDetails?.TotalPremium));
        this.totalActual = Number(this.premiumDetails?.TotalPremium)
        if(this.premiumDetails?.PolicyFee!=0){
          let value=parseInt(this.premiumDetails?.PolicyFee)
          this.CommaFormatted(value,'PolicyFee');
        }
        else{
          this.pF.PolicyFee.setValue('0');
        }
      
        //thii
        //this.pF.InspectionFee.setValue(Number(this.premiumDetails?.InspectionFee));
        if(this.premiumDetails?.InspectionFee!=0){
          let value=parseInt(this.premiumDetails?.InspectionFee)
          this.CommaFormatted(value,'InsFee');
        }
        else{
          this.pF.InspectionFee.setValue('0');
        }
        //thi
        //this.pF.BalanceAmount.setValue(Number(this.premiumDetails?.BalanceAmountView));
        if(this.premiumDetails?.BalanceAmountView!=0){
          let value=parseInt(this.premiumDetails?.BalanceAmountView)
          this.CommaFormatted(value,'BalanceAmount');
        }
        else{
          this.pF.BalanceAmount.setValue('0');
        }
        if(this.premiumDetails?.PolicyFeeBalanceView!=0){
          let value=parseInt(this.premiumDetails?.PolicyFeeBalanceView)
          this.CommaFormatted(value,'PolicyFeeBal');
        }
        else{
          this.pF.PolicyFeeBalance.setValue('0');
        }
         //thi
        //this.pF.PolicyFeeBalance.setValue(Number(this.premiumDetails?.PolicyFeeBalanceView));
        //this.pF.InsceptionFeeBalance.setValue(Number(this.premiumDetails?.InsceptionFeeBalanceView));
        if(this.premiumDetails?.InsceptionFeeBalanceView!=0){
          let value=parseInt(this.premiumDetails?.InsceptionFeeBalanceView)
          this.CommaFormatted(value,'InsView');
        }
        else{
          this.pF.InsceptionFeeBalance.setValue('0');
        }
        this.pF.ReceivedTilDate.setValue(Number(this.premiumDetails?.ReceivedTilDate));
        console.log('ReceivedTilDate',this.premiumDetails?.ReceivedTilDate);
        this.pF.PolicyFeeReceived.setValue(Number(this.premiumDetails?.PolicyFeeReceived));
        console.log('PolicyFeeReceived',this.premiumDetails?.PolicyFeeReceived);
        this.pF.InspectionFeeReceived.setValue(Number(this.premiumDetails?.InspectionFeeReceived));
        console.log('InspectionFeeReceived',this.premiumDetails?.InspectionFeeReceived);
        this.pF.PremiumReceived.setValue(Number(this.premiumDetails?.PremiumReceived));
        console.log('PremiumReceived',this.premiumDetails?.PremiumReceived);

        this.pF.PayableMarinePremium.setValue(Number(this.premiumDetails.PayableMarinePremium));
        if(this.premiumDetails.PolicyFeePaid!=0 ){
          let value=parseInt(this.premiumDetails.PolicyFeePaid)
          this.CommaFormatted(value,'PolicyFeepaid');
        }
        else{
          this.pF.PolicyFeePaid.setValue('0');
        }
       
        if(this.premiumDetails.InspectionFeePaid!=0 ){
          let value=parseInt(this.premiumDetails.InspectionFeePaid)
          this.CommaFormatted(value,'InspectionFeePaid');
        }
        else{
          this.pF.InspectionFeePaid.setValue('0');
        }
        
        //thii
        //this.pF.PolicyFeePaid.setValue(Number(this.premiumDetails.PolicyFeePaid));
        //this.pF.InspectionFeePaid.setValue(Number(this.premiumDetails.InspectionFeePaid));
        //thii
        this.pF.ReceivedTotal.setValue(Number(this.premiumDetails.ReceivedTotal));
        // if(this.premiumDetails.ReceivedTotal!=0 ){
        //   let value=parseInt(this.premiumDetails.ReceivedTotal)
        //   this.CommaFormatted(value,'ReceivedTotal');
        // }
        console.log('MMMMMMMMM',this.chargeOrRefund);
        if(this.premiumDetails.PayableYn!=""){
        this.chargeOrRefund=this.premiumDetails.PayableYn;
        console.log('RRRRRRRRR',this.chargeOrRefund);
        }
      
           
       
        //this.chargeOrRefund=this.premiumDetails.PayableYn;
        //this.check=this.premiumDetails.PayableYn;
        //console.log('RRRRRRRRR',this.chargeOrRefund);
           
        /*if(this.pF?.TotalPremium?.value){
          this.total= String(this.pF?.TotalPremium.value);
          this.CommaFormatted();
          //this.CommaFormatted();
        }*/


      },
      (err) => { },
    );
  }


  CommaFormatted(tableData,type) {
    let i=0;
    console.log('tableData',tableData)
            if(tableData!=null && type=='PolicyFee'){
              if(tableData!=0){
              let entry=tableData.toString();
              console.log("Entry Came 1",tableData)
            let value = entry.replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            this.pF.PolicyFee.setValue(value);
              console.log('Esctimtaed Amount',  this.pF.PolicyFee)
              }
              else{
                this.pF.PolicyFee.setValue('');
              }
              }
              else if(tableData!=null && type=='PolicyFeepaid'){
                if(tableData!=0){
                let entry=tableData.toString();
                console.log("Entry Came 1",tableData)
              let value = entry.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.pF.PolicyFeePaid.setValue(value);
                console.log('Esctimtaed Amount',  this.pF.PolicyFeePaid)
                }
                else{
                  this.pF.PolicyFeePaid.setValue('');
                }
                }
                else if(tableData!=null && type=='InspectionFeePaid'){
                  if(tableData!=0){
                  let entry=tableData.toString();
                  console.log("Entry Came 1",tableData)
                let value = entry.replace(/\D/g, "")
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.pF.InspectionFeePaid.setValue(value);
                  console.log('Inspection fee paid',  this.pF.InspectionFeePaid)
                  }
                  else{
                    this.pF.InspectionFeePaid.setValue('');
                  }
                  }
                  else if(tableData!=null && type=='InsFee'){
                    if(tableData!=0){
                    let entry=tableData.toString();
                    console.log("Entry Came 1",tableData)
                  let value = entry.replace(/\D/g, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  this.pF.InspectionFee.setValue(value);
                    console.log('Inspection fee paid',  this.pF.InspectionFeePaid)
                    }
                    else{
                      this.pF.InspectionFee.setValue('');
                    }
                    }
                    else if(tableData!=null && type=='BalanceAmount'){
                      if(tableData!=0){
                      let entry=tableData.toString();
                      console.log("Entry Came 1",tableData)
                    let value = entry.replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    this.pF.BalanceAmount.setValue(value);

                      }
                      else{
                        this.pF.BalanceAmount.setValue('');
                      }
                      }
                      else if(tableData!=null && type=='InsView'){
                        if(tableData!=0){
                        let entry=tableData.toString();
                        console.log("Entry Came 1",tableData)
                      let value = entry.replace(/\D/g, "")
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      this.pF.InsceptionFeeBalance.setValue(value);
  
                        }
                        else{
                          this.pF.InsceptionFeeBalance.setValue('');
                        }
                        }
                        else if(tableData!=null && type=='PolicyFeeBal'){
                          if(tableData!=0){
                          let entry=tableData.toString();
                          console.log("Entry Came 1",tableData)
                        let value = entry.replace(/\D/g, "")
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        this.pF.PolicyFeeBalance.setValue(value);
    
                          }
                          else{
                            this.pF.PolicyFeeBalance.setValue('');
                          }
                          }
                          else if(tableData!=null && type=='ReceivedTotal'){
                            this.pF.ReceivedTotal.setValue(Number(tableData));
                            console.log('Value Rec', this.pF.ReceivedTotal.value)
                          //   if(tableData!=0){
                          //   let entry=tableData.toString();
                          //   console.log("Entry Came 1",tableData)
                          // let value = entry.replace(/\D/g, "")
                          // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          // this.pF.ReceivedTotal.setValue(Number(value));
                          // console.log('Value Rec',typeof(this.pF.ReceivedTotal.value),this.pF.ReceivedTotal.value,this.pF.ReceivedTotal)
                          //   }
                          //   else{
                          //     this.pF.ReceivedTotal.setValue('');
                          //   }
                            }
                          //this.pF.ReceivedTotal.setValue(
                
  }

  onMoveFront() {
    this.openCoverService.onMoveNext('Front');
    //this.onCallPremiumCal();
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/policy-generate-cover`]);
   }
   onMoveBack() {
    //this.onGetPremium();
     this.openCoverService.onMoveNext('Back');
     this.router.navigate([`${this.routerBaseLink}/new-open-cover/commodity-info`]);
    }

    Changevalue(value){
      console.log('TTTTTTTTTTTT')
      this.chargeOrRefund=value
    }


    onfinalsumbit(){
       if(this.chargeOrRefund == 'C' ||this.chargeOrRefund == 'C' ){
        this.onCalculate('submit'); 
       }
       else if(this.chargeOrRefund == 'N'){
        this.onSubmit();
       }
    }
  onCalculate(value) {

    /*if(value=='submit'){
      this.onSubmit();
    }*/
    
    let charge,refund=""
   
    //console.log('RRRRRRRRRRRRRR',this.pF.chargeOrRefund.value)
    if(this.chargeOrRefund=='C'){
      charge="C";
      refund="";
    }
  if(this.chargeOrRefund=='R'){
      charge="R";
      refund="R"
    }
    let s=this.pF.Total.value;let m:any;
    if (s !== undefined && s !== null) {
      // here we just remove the commas from value
      m=s.toString().replace(/,/g, "");
    } 
    let d=Number(s);

    let r=this.pF.PayableMarinePremium.value;let m1:any;
    if (r !== undefined && r !== null) {
      // here we just remove the commas from value
      m1=r.toString().replace(/,/g, "");
    } 
    let u;let h;
    if(this.pF.PremiumReceived.value == 0){
    u=null;
    }
    else{
      u=this.pF.PremiumReceived.value;
    }
    if(this.pF.PolicyFeeReceived.value == 0){
      h=null;
    }
    else{
      h=this.pF.PolicyFeeReceived.value;
    }
    let policyfee:any; let policyfeepaid; let InspectionFeePaid,InspectionFe:any;
    if(this.pF.PolicyFee.value!=null && this.pF.PolicyFee.value!=0){
      if(this.pF.PolicyFee.value.includes(',')){ policyfee = this.pF.PolicyFee.value.replace(/,/g, '')}
      else { policyfee =this.pF.PolicyFee.value};
    
      console.log('this.premiumF?.policyInsuAedPremium.value',policyfee) }
    
    else {
      policyfee = this.pF.PolicyFee.value;
      console.log('this.premiumF',policyfee)
    }


    if(this.pF.PolicyFeePaid.value!=null && this.pF.PolicyFeePaid.value!=0){
      if(this.pF.PolicyFeePaid.value.includes(',')){ policyfeepaid = this.pF.PolicyFeePaid.value.replace(/,/g, '')}
      else { policyfeepaid = this.pF.PolicyFeePaid.value};
    }
    
    else {
      policyfeepaid = this.pF.PolicyFeePaid.value;
      console.log('this.premiumF',policyfeepaid)
    }


    if(this.pF.InspectionFeePaid.value!=null && this.pF.InspectionFeePaid.value!=0){
      if(this.pF.InspectionFeePaid.value.includes(',')){ InspectionFeePaid= this.pF.InspectionFeePaid.value.replace(/,/g, '')}
      else { InspectionFeePaid = this.pF.InspectionFeePaid.value};
    }
    
    else {
      InspectionFeePaid = this.pF.InspectionFeePaid.value;
      console.log('this.premiumF',policyfeepaid)
    }

    if(this.pF.InspectionFee.value!=null && this.pF.InspectionFee.value!=0){
      if(this.pF.InspectionFee.value.includes(',')){ InspectionFe= this.pF.InspectionFee.value.replace(/,/g, '')}
      else { InspectionFe = this.pF.InspectionFee.value};
    }
    
    else {
      InspectionFe = this.pF.InspectionFee.value;
    }


    let r1=Number(m1);
    console.log('DDDDDDDDD',m);
    const urlLink = `${this.ApiUrl1}OpenCover/premiumcalc`;
    const reqData = {
      "LoginBranchCode":this.userDetails.BranchCode,
      "EndorsementStatus":this.premiumDetails.EndtStatus,
      "BalanceAmount":this.premiumDetails?.BalanceAmount,
      "ChargeableYN":this.chargeOrRefund,
      "ProposalNo":this.proposalNo,
      "RefundChargeYN":this.refundStatus,
      "RefundAmount":r1,
      "PolicyFee":Number(policyfee),
      //Number(this.pF.PolicyFee.value),
      "InceptionFeePaid":Number(InspectionFeePaid),
      //this.pF.InspectionFeePaid.value,
      "TotalAmount":d,
      //"TotalAmount":this.pF.ReceivedTotal.value,
      "InceptionFee":Number(InspectionFe),
      //th
      //this.pF.InspectionFee.value,
      "PolicyFeeRcvd":h,
      "TotalPremium":this.pF.TotalPremium.value,
      //"TotalPremium":this.pF.FinalPremium.value,
      "ActualPremium":this.pF.TotalPremium.value,
      "PolicyFeePaid":Number(policyfeepaid),
      //this.pF.PolicyFeePaid.value,
      "PremiumRcvd":u
      //"PremiumRcvd":this.pF.ReceivedTilDate.value
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if(data.Result.Status == true){
          
          console.log('cal-premium', data.Result.Status); 
          if(value=='submit'){
            this.onSubmit();
          }
          else{
            this.onGetPremium();
            let type: NbComponentStatus = 'success';
                const config = {
                  status: type,
                  destroyByClick: true,
                  duration: 4000,
                  hasIcon: true,
                  position: NbGlobalPhysicalPosition.TOP_RIGHT,
                  preventDuplicates: false,
                };
                this.toastrService.show(
                  'Calculated Successfully',
                  'Premium Details',
                  config);
          }
          
                  //this.onGetPremium();
                  
                 
        }
        else if(data.ErrorMessage){
          //console.log('ERRRRRRRRRR', data.); 
        }
       
      },
      (err) => { 
        console.log('gggggggggggg')
      },
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
    //this.onCalculate('submit');
    const urlLink = `${this.ApiUrl1}opencover/report/depositinfo`;
    const reqData = {
      "ProposalNo":this.proposalNo
    }
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if(data.Message == 'Success'){
        console.log('depositinfo', data);
        this.onMoveFront();
        }
      },
      (err) => { },
    );
  }

}
