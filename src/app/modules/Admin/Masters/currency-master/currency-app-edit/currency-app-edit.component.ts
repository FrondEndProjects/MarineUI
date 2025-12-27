import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-currency-app-edit',
  templateUrl: './currency-app-edit.component.html',
  styleUrls: ['./currency-app-edit.component.scss']
})
export class CurrencyAppEditComponent implements OnInit {
  public min: Date;

  public currencyForm: FormGroup;
  public transportList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  currencyData: any={};CurrencyId:any;

  constructor(private masterSer: MastersService,
    private toastrService: NbToastrService,
    private router: Router) {

      this.min = new Date();

    this.createForm();

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    this.CurrencyId = JSON.parse(sessionStorage.getItem('currencyData'));//sessionStorage.getItem('currencyData');
    if(this.CurrencyId) {
      this.getCurrencyEdit();
    } else {
      this.CurrencyId = null;
    }
    console.log(this.CurrencyId);

  }

  ngOnInit(): void {
    this.createForm();
  }


  getCurrencyEdit() {
    let ReqObj = {
      // "BranchCode": this.userDetails?.Result.BelongingBranch,
      "BranchCode": this.branchCode,
      "CurrencyId": this.CurrencyId
    }
    console.log(ReqObj);
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/currency/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        this.currencyData = data.Result;
        this.currencyForm.controls['currencyType'].setValue(this.currencyData.CurrencyName);
        this.currencyForm.controls['RFactor'].setValue(this.currencyData.RFactor);
        this.currencyForm.controls['subCurrency'].setValue(this.currencyData.SubCurrency);
        this.currencyForm.controls['shortName'].setValue(this.currencyData.CurrencyShortName);
        this.currencyForm.controls['coreApplicationCode'].setValue(this.currencyData.CoreApplicationCode);
        this.currencyForm.controls['remarks'].setValue(this.currencyData.Remarks);
        this.currencyForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.currencyData.EffectiveDate));
        this.currencyForm.controls['status'].setValue(this.currencyData.Status);
      }, (err) => { }
    )


  }


  public createForm() {

    this.currencyForm = new FormGroup({
      currencyType : new FormControl( '', Validators.required),
      RFactor : new FormControl( '', Validators.required),
      subCurrency : new FormControl( '', Validators.required),
      shortName : new FormControl( '', Validators.required),
      coreApplicationCode  : new FormControl( '', Validators.required),
      remarks : new FormControl(''),
      effectiveDate : new FormControl( '', Validators.required),
      status: new FormControl('Y', Validators.required),
    });
  }
  onDateFormatInEdit(date) {
    console.log(date);
    if (date) {
      let format = date.split('-');
      if(format.length >1){
        var NewDate = new Date(new Date(format[0], format[1], format[2]));
        NewDate.setMonth(NewDate.getMonth() - 1);
        return NewDate;
      }
      else{
        format = date.split('/');
        if(format.length >1){
          var NewDate = new Date(new Date(format[2], format[1], format[0]));
          NewDate.setMonth(NewDate.getMonth() - 1);
          return NewDate;
        }
      }

    }
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/currency/view');
  }

  onSave() {
    var effDate;
    if (this.currencyForm.controls['effectiveDate'].value) {
      effDate = moment(new Date(this.currencyForm.controls['effectiveDate'].value)).format('DD/MM/YYYY');
    } else {
      effDate = "";
    }

    let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "CoreApplicationCode": this.currencyForm.controls['coreApplicationCode'].value,
      "CurrencyId": this.CurrencyId,
      "CurrencyName": this.currencyForm.controls['currencyType'].value,
      "CurrencyShortName": this.currencyForm.controls['shortName'].value,
      "DisplayOrder": this.currencyData.DisplayOrder,
      "EffectiveDate": moment(new Date(this.currencyForm.controls['effectiveDate'].value)).format('DD/MM/YYYY'),
      "RFactor": this.currencyForm.controls['RFactor'].value,
      "Remarks": this.currencyForm.controls['remarks'].value,
      "Status": this.currencyForm.controls['status'].value,
      "SubCurrency": this.currencyForm.controls['subCurrency'].value,
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/currency/save`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data?.Message === 'Success') {
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
            'Currency Details Inserted/Updated Successfully',
            'Currency Details',
            config);

          // Storage Remove
          sessionStorage.removeItem('currencyData');
          this.router.navigateByUrl('/Marine/masters/currency/view');

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


      }, (err) => { console.log(err);
      }
    )

  }
}
