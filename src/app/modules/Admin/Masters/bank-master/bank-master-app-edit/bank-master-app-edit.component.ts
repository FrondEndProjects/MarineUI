import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-bank-master-app-edit',
  templateUrl: './bank-master-app-edit.component.html',
  styleUrls: ['./bank-master-app-edit.component.scss']
})
export class BankMasterAppEditComponent implements OnInit {
  public min: Date = new Date();
  public bankForm: FormGroup;
  public countryList = [];

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public BankId: any; bankId: any;
  public Userdetails: any;
  public branchCode: any;
  public BelongingCountryId;
  public countryName;

  constructor(private router: Router,
    private masterSer: MastersService,
    private toastrService: NbToastrService) {


    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    //this.bankId = sessionStorage.getItem('editBankId');
    this.bankId=JSON.parse(sessionStorage.getItem('editBankId'))
    if (this.bankId) {
      this.getBankDetails();
    }
    else {
      this.bankId = null;
    }
    console.log(this.bankId);

  }

  ngOnInit(): void {
    this.createForm();
    this.getCountryList();
  }

  getCountryList() {
    // let ReqObj = {
    //   "BranchCode": this.branchCode,
    //   "ProductId": "3"
    // }
    // this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/originationcountry`, ReqObj).subscribe(
    //   (data: any) => {
    //     console.log(data);

    //     if (data.Message == 'Success') {
    //       this.countryList = data.Result;
    //     }
    //   }
    // )
      let ReqObj={
          "BranchCode": this.branchCode
      }
      this.masterSer.onPostMethodSync(`${this.ApiUrl1}admin/getUserMgtDropDown`, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
    
          if (data.Message == 'Success') {
            this.countryList = data.Result.CountryDetails;
          }
        }
      )
    
    
    //this.countryList = [{Code : "1", CodeDescription : "SAUDI ARABIA", CodeValue : "0"}]
  }


  getBankDetails() {
    console.log(this.bankId, this.branchCode);

    let ReqObj = {
      "BankId": this.bankId,
      "BranchCode": this.branchCode
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/bank/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        let bankDetails = data.Result;
        this.BelongingCountryId = data.Result.BelongingCountryId;

        this.bankForm.controls['bankName'].setValue(bankDetails.BankName);
        this.bankForm.controls['BelongingCountryId'].setValue(bankDetails.BelongingCountryId);
        this.bankForm.controls['coreApplicationCode'].setValue(bankDetails.CoreApplicationCode);
        this.bankForm.controls['remarks'].setValue(bankDetails.Remarks);
        this.bankForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(bankDetails.EffectiveDate));
        this.bankForm.controls['status'].setValue(bankDetails.Status);

      }, (err) => { }
    )
  }

  // Date Format
  onDateFormatInEdit(date) {
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


  public createForm() {

    this.bankForm = new FormGroup({
      bankName: new FormControl('', Validators.required),
      BelongingCountryId: new FormControl('1', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      effectiveDate: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
    });
  }


  public goBack() {
    this.router.navigateByUrl('/Marine/masters/bank-master/view');
  }

  onSave() {

    // Country Name Filter
    if (this.bankForm.controls['BelongingCountryId'].value) {
      var countryId = this.countryList.filter((val) => {
        if (val.CountryCode == this.bankForm.controls['BelongingCountryId'].value) {
          return val
        }
      })
      console.log(countryId[0]?.CountryCode);
    } else {
      countryId = [""];
    }

    // Effective Date Format
    let effectiveDate = this.bankForm.controls['effectiveDate'].value ? moment(new Date(this.bankForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";

    let ReqObj = {
      "CountryName": countryId[0].CountryName,
      "BankId":this.bankId,
      "BankName": this.bankForm.controls['bankName'].value,
      "BelongingCountryId": this.bankForm.controls['BelongingCountryId'].value,
      "CoreApplicationCode": this.bankForm.controls['coreApplicationCode'].value,
      "EffectiveDate": effectiveDate,
      "Remarks": this.bankForm.controls['remarks'].value,
      "Status": this.bankForm.controls['status'].value,
      "BranchCode": this.Userdetails?.Result.BelongingBranch
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/bank/save`, ReqObj).subscribe(
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
            'Bank Details Inserted/Updated Successfully',
            'Bank Details',
            config);

          sessionStorage.removeItem('editBankId');
          //this.router.navigateByUrl('/Marine/masters/conveyance/view');
          this.router.navigateByUrl('/Marine/masters/bank-master/view');
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
      }, (err) => { console.log(err) }
    )
  }


}
