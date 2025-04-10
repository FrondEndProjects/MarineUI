import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as Mydatas from '../../../../../../app-config.json';
import { NewQuotesService } from '../../../../new-quotes.service';
import { CustomerInfoComponent } from '../../customer-info.component';
@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.scss'],
})
export class BankFormComponent implements OnInit {
  showDialog = false;
  showDialog1 = false;


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;OpenCover:any=null;
  public applicationId: any;

  public bankForm!: FormGroup;
  public dropBankList: any[] = [];
  @ViewChild('formDirective') public bankFormDirective: NgForm;
  pattern = {
    0: {
      pattern: new RegExp('\[a-zA-Z0-9]'),
    },
  };
  docUploadedData: any;
  constructor(
    private _formBuilder: FormBuilder,
    private newQuotesService: NewQuotesService,
    private customerInfoComponent: CustomerInfoComponent,

  ) {
    this.bankForm = this.customerInfoComponent.bankForm;
    this.userDetails = this.customerInfoComponent?.userDetails;
    this.productId = this.customerInfoComponent?.productId;
    this.loginId = this.customerInfoComponent?.loginId;
    this.applicationId = this.customerInfoComponent?.applicationId;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.docUploadedData = JSON.parse(sessionStorage.getItem('docUploadData'));
    if(this.OpenCover?.name){
      if(this.OpenCover?.name == 'adminReferral'){
            this.productId = this.OpenCover?.productId;
      } 
    }
  }

  ngOnInit(): void {
    this.onLoadDropdownList();
    console.log("Bank Form",this.quoteF)
  }

  get quoteF() {
    return this.bankForm.controls;
  }
  onLoadDropdownList() {
   this.onGetBankList();
  }

  setDocUploadData(){
    this.bankForm.controls['invoiceNumber']?.setValue(this.docUploadedData?.InvoiceNumber);
    this.bankForm.controls['invoiceDate'].setValue(this.newQuotesService.ngbDateFormatt(this.docUploadedData?.InvoiceDate));
  }
  onGetBankList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/lcbank`;
    const reqData = {
      'ProductId': this.productId,
      'pvType': 'lcBank',
      'BranchCode':this.userDetails?.BelongingBranch,
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropBankList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropBankList, 'bank');
          this.setDocUploadData();
        }
      },
      (err) => { },
    );
  }
  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.bankForm.controls['blAwbLrRrNumber']?.setValue(null)
    this.bankForm.controls['blAwbLrRrDater']?.setValue(null)
    this.bankForm.controls['sailingDate']?.setValue(null)
    this.bankForm.controls['invoiceNumber']?.setValue(null)
    this.bankForm.controls['poPiNumber']?.setValue(null)
    this.bankForm.controls['consignedTo']?.setValue(null)
    this.bankForm.controls['consignedForm']?.setValue(null)
  
  }
  openDialog1(){
    this.showDialog1 = true;

  }
  closeDialog1() {
    this.showDialog1 = false;
    this.bankForm.controls['lCBank'].setValue(null)
    this.bankForm.controls['lcNumber'].setValue(null)
    this.bankForm.controls['lcDate'].setValue(null)
  }
  saveDialog1(){
    this.showDialog1 = false;
  }
  saveDialog(){
    this.showDialog = false;

  }
}
