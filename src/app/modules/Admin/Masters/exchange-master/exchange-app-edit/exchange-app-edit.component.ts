import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-exchange-app-edit',
  templateUrl: './exchange-app-edit.component.html',
  styleUrls: ['./exchange-app-edit.component.scss']
})
export class ExchangeAppEditComponent implements OnInit {
  public min: Date = new Date();

  public exchangeForm: FormGroup;
  public currencyList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  public exchangeData: any = {}; ExchangeId: any;
  productId: any;

  constructor(private masterSer: MastersService,
    private router: Router,  private toastrService: NbToastrService,) {


    this.createForm();

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;
    this.productId = this.userDetails?.LoginResponse?.productId;

    this.ExchangeId = sessionStorage.getItem('exchangeData');

    if (this.ExchangeId) {
      this.getExchangeEdit()
    }

     this.getCurrencyList();

  }

  ngOnInit(): void {
    
  }

  getCurrencyList()  {
    let ReqObj = {
      "BranchCode": this.branchCode
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/currency`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        this.currencyList = data.Result;
      }
    )
  }

  getExchangeEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ExchangeId": this.ExchangeId
    }
    console.log(ReqObj);
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/exchange/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
    
        this.exchangeData = data.Result;
        this. getCurrencyList();
        this.exchangeForm.controls['currencyId'].setValue(this.exchangeData.CurrencyId);
        this.exchangeForm.controls['exchangeRate'].setValue(this.exchangeData.ExchangeRate);
        this.exchangeForm.controls['coreApplicationCode'].setValue(this.exchangeData.CoreApplicationCode);
        this.exchangeForm.controls['remarks'].setValue(this.exchangeData.Remarks);
        this.exchangeForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.exchangeData.EffectiveDate));
        this.exchangeForm.controls['status'].setValue(this.exchangeData.Status);

      }, (err) => { }
    )

  }


  public createForm() {

    this.exchangeForm = new FormGroup({
      currencyId: new FormControl('', Validators.required),
      exchangeRate: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      effectiveDate: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
    });
  }

  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if (format.length > 1) {
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else {
        format = date.split('/');
        if (format.length > 1) {
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }


  public goBack() {
    this.router.navigateByUrl('/Marine/masters/exchange-master/view');
  }

  onSave() {

    // Effective Date Format
    let effectiveDate = this.exchangeForm.controls['effectiveDate'].value ? moment(new Date(this.exchangeForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";

    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoreApplicationCode": this.exchangeForm.controls['coreApplicationCode'].value,
      "CurrencyId": this.exchangeForm.controls['currencyId'].value,
      "EffectiveDate": effectiveDate,
      "ExchangeId": this.ExchangeId,
      "ExchangeRate": this.exchangeForm.controls['exchangeRate'].value,
      "Remarks": this.exchangeForm.controls['remarks'].value,
      "Status": this.exchangeForm.controls['status'].value
    }
    console.log(ReqObj);
    
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/exchange/save`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
            
        if (data.Message == 'Success') {

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
            'Exchange Details Inserted/Updated Successfully',
            'Exchage Details',
            config);


          //sessionStorage.removeItem('CountryCoverId');
          //sessionStorage.removeItem('CountryCoverSno');
          sessionStorage.removeItem('exchangeData');
          this.router.navigateByUrl('/Marine/masters/exchange-master/view')
          //this.router.navigateByUrl('/Marine/masters/country-cover/view')
        }
        else if (data.Errors) {
          for (let entry of data.Errors) {
            let type: NbComponentStatus = 'danger';
            const config = {
              status: type,
              destroyByClick: true,
              duration: 4000,
              hasIcon: true,
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
              preventDuplicates: false,
            };
            this.toastrService.show(
              entry.Field,
              entry.Message,
              config);
          }
          //this.loginService.errorService(data.ErrorMessage);
        }
        sessionStorage.removeItem('exchangeData');
        //this.router.navigateByUrl('/Marine/masters/exchange-master/view')
      }, (err) => { }
    )

  }
}
