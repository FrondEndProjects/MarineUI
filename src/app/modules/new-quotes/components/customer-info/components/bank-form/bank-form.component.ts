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
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;

  public bankForm!: FormGroup;
  public dropBankList: any[] = [];
  @ViewChild('formDirective') public bankFormDirective: NgForm;

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

  }

  ngOnInit(): void {
    this.onLoadDropdownList();
  }

  get quoteF() {
    return this.bankForm.controls;
  }
  onLoadDropdownList() {
   this.onGetBankList();
  }

  onGetBankList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/lcbank`;
    const reqData = {
      'ProductId': this.productId,
      'pvType': 'lcBank',
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.dropBankList = data?.Result;
          this.newQuotesService.getDropDownList(this.dropBankList, 'bank');
        }
      },
      (err) => { },
    );
  }

}