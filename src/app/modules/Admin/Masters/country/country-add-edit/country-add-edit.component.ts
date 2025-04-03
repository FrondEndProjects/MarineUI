import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-country-add-edit',
  templateUrl: './country-add-edit.component.html',
  styleUrls: ['./country-add-edit.component.scss']
})
export class CountryAddEditComponent implements OnInit {
  public min: Date = new Date;
  public countryForm: FormGroup;
  public transportList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public Userdetails: any;
  public branchCode: any;
  countryList = [];
  countryData: any = {}; countryId: any;
  countryID: any; countryName: any;
  BelongingCountryId: any;

  constructor(private masterSer: MastersService,
    private toastrService: NbToastrService,
    private router: Router) {

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.countryId = sessionStorage.getItem('editCountryId');
    // this.countryName = sessionStorage.getItem('editCountryName');
    if (this.countryId) {
      this.getCountryDetails();

    }
    else {
      this.countryId = null;
    }
  }

  ngOnInit(): void {
    this.getCountryList()
    this.createForm();
  }

  getCountryList() {
    let ReqObj = {
      "BranchCode": this.Userdetails.BelongingBranch,
      "ProductId": "3"

    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/originationcountry`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message == 'Success') {
          this.countryList = data.Result;
        }
      }


    )
  }

  getCountryDetails() {
    let ReqObj = {
      "CountryId": this.countryId,
      "BranchCode": this.branchCode
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/country/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);



        let countryDetails = data.Result;
        console.log(countryDetails.CountryId);
        this.countryName = countryDetails.CountryName;
        this.BelongingCountryId = countryDetails.CountryId;

        this.countryForm.controls['countryName'].setValue(countryDetails.CountryName);
        this.countryForm.controls['countryShortName'].setValue(countryDetails.CountryShortName);
        this.countryForm.controls['nationalityName'].setValue(countryDetails.NationalityName);
        this.countryForm.controls['coreApplicationCode'].setValue(countryDetails.CoreApplicationCode);
        this.countryForm.controls['geoRate'].setValue(countryDetails.GeoRate);
        this.countryForm.controls['remarks'].setValue(countryDetails.Remarks);
        this.countryForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(countryDetails.EffectiveDate));
        this.countryForm.controls['status'].setValue(countryDetails.Status);
      },
      (err) => { },
    );
  }
  public createForm() {

    this.countryForm = new FormGroup({
      countryName: new FormControl('', Validators.required),
      countryShortName: new FormControl(''),
      nationalityName: new FormControl('', Validators.required),
      geoRate: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      effectiveDate: new FormControl(''),
      remarks: new FormControl('', Validators.required),
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
    this.router.navigateByUrl('/Marine/masters/country/view');
  }

  onSave() {

    // Country Name Filter
    // if (this.countryForm.controls['BelongingCountryId'].value) {
    //   var countryId = this.countryList.filter((val) => {
    //     if (val.Code == this.countryForm.controls['BelongingCountryId'].value) {
    //       return val
    //     }
    //   })
    //   console.log(countryId[0].Code);
    // } else {
    //   countryId = [""];
    // }

    // Country Id
    let CountryId = this.BelongingCountryId ? this.BelongingCountryId : null;

    // Effective Date Format
    let effectiveDate = this.countryForm.controls['effectiveDate'].value ? moment(new Date(this.countryForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";

    console.log(this.BelongingCountryId);


    let ReqObj = {
      "CoreApplicationCode": this.countryForm.controls['coreApplicationCode'].value,
      "CountryId": CountryId ,
      "CountryName": this.countryForm.controls['countryName'].value,
      "CountryShortName": this.countryForm.controls['countryShortName'].value,
      "EffectiveDate": effectiveDate,
      "GeoRate": this.countryForm.controls['geoRate'].value,
      "NationalityName": this.countryForm.controls['nationalityName'].value,
      "Remarks": this.countryForm.controls['remarks'].value,
      "Status": this.countryForm.controls['status'].value,
      "BranchCode": this.Userdetails?.Result.BelongingBranch    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/country/save`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        // Toast
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
            'Country Details Inserted/Updated Successfully',
            'Country Details',
            config);

          // Storage Remove
          sessionStorage.removeItem('editCountryId');
          this.router.navigateByUrl('/Marine/masters/country/view')
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
      },
      (err) => { },
    );

  }


}




