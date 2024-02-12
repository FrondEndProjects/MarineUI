import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import { MastersService } from '../../masters.service';
import * as Mydatas from '../../../../../app-config.json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-city-app-edit',
  templateUrl: './city-app-edit.component.html',
  styleUrls: ['./city-app-edit.component.scss']
})
export class CityAppEditComponent implements OnInit {

  public cityForm: FormGroup;
  public countryList = [];
  public min: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public cityId: any; CityId: any;
  public Userdetails: any;
  public branchCode: any;
  public BelongingCountryId;
  public countryName;
  public cityDetails;

  constructor(private router: Router,
    private masterSer: MastersService,
    private toastrService: NbToastrService,private datePipe: DatePipe) {
       this.min=new Date();

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.cityId = sessionStorage.getItem('cityData');
    if (this.cityId) {
      this.getCityEdit();
    } else {
      this.cityId = null;
    }
    console.log(this.cityId);

  }

  ngOnInit(): void {
    this.createForm();
    this.getCountryList();
  }

  public createForm() {

    this.cityForm = new FormGroup({
      cityName: new FormControl('', Validators.required),
      BelongingCountryId: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      status: new FormControl('Y', Validators.required),
      EffectiveDateStart:new FormControl('',Validators.required)
    });
  }


  getCountryList() {
    let ReqObj = {
      "BranchCode": this.branchCode,
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


  getCityEdit() {
    console.log(this.cityId, this.branchCode);

    let ReqObj = {
      "CityId": this.cityId
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/city/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        this.cityDetails = data.Result;
        this.BelongingCountryId = this.cityDetails.CountryId;
        this.CityId = this.cityDetails.CityId;
        
        this.cityForm.controls['cityName'].setValue(this.cityDetails.CityName);
        this.cityForm.controls['BelongingCountryId'].setValue(this.cityDetails.CountryId);
        this.cityForm.controls['coreApplicationCode'].setValue(this.cityDetails.CoreApplicationCode);
        this.cityForm.controls['remarks'].setValue(this.cityDetails.Remarks);
        this.cityForm.controls['status'].setValue(this.cityDetails.Status);
        this.cityForm.controls['EffectiveDateStart'].setValue(this.onDateFormatInEdit(this.cityDetails.EffectiveDate))
      }, (err) => { }
    )
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
          // var NewDate = new Date(new Date(format[2], format[1], format[0]));
          // NewDate.setMonth(NewDate.getMonth() - 1);
          let NewDate = format[2]+'-'+format[1]+'-'+format[0];
          return NewDate;
        }
      }

    }
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/city/view');
  }

  onSave() {

    let ReqObj = {
      "CityId": this.CityId,
      "CityName": this.cityForm.controls['cityName'].value,
      "CoreApplicationCode": this.cityForm.controls['coreApplicationCode'].value,
      "CountryId": this.cityForm.controls['BelongingCountryId'].value,
      "Remarks": this.cityForm.controls['remarks'].value,
      "Status": this.cityForm.controls['status'].value,
      "EffectiveDate":this.cityForm.controls['EffectiveDateStart'].value,
      "AmendId":'',
    }
    console.log(ReqObj);

    if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
      ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDate'] = "";
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/city/save`, ReqObj).subscribe(
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
            'City Inserted/Updated Successfully',
            'City',
            config);

          sessionStorage.removeItem('cityData');
          this.router.navigateByUrl('/Marine/masters/city/view');
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
