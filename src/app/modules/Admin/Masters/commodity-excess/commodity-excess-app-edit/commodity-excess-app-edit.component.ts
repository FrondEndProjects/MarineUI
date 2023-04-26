import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import * as Mydatas from '../../../../../app-config.json';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-commodity-excess-app-edit',
  templateUrl: './commodity-excess-app-edit.component.html',
  styleUrls: ['./commodity-excess-app-edit.component.scss']
})
export class CommodityExcessAppEditComponent implements OnInit {
  public min: Date;

  public exchangeForm: FormGroup;
  public coverList = [];
  public CoverList =[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  public commodityData: any; commoditySno: any;

  constructor(private masterSer: MastersService,
    private toastrService: NbToastrService,
    private router: Router) {

    this.min = new Date();

    this.createForm();

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    this.commoditySno = sessionStorage.getItem('commodityData');

    if (this.commoditySno) {
      this.getCommodityExcessEdit();
    } else {
      this.commoditySno = null;
    }

  }

  ngOnInit(): void {
this.getCoverName();
  }

 /* getCover() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ModeOfTransportCode": "string",
      "OpenCoverNo": "string",
      "ProductId": "string"
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/cover`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

      }
    )
  }*/


  public getCoverName() {
    const ReqObj = {
      'BranchCode': this.branchCode,
      'ProductId' : '3',
    };

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/covername`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.CoverList = data.Result;
        }
      },
      (err) => { },
    );
  }

  getCommodityExcessEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "Sno": this.commoditySno
    }
    console.log(ReqObj);
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodityexcess/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        this.commodityData = data.Result
        this.exchangeForm.controls['cover'].setValue(this.commodityData.CurrencyName);
        this.exchangeForm.controls['startingAmount'].setValue(this.commodityData.StartSuminsured);
        this.exchangeForm.controls['endingAmount'].setValue(this.commodityData.EndSuminsured);
        this.exchangeForm.controls['deductible'].setValue(this.commodityData.Deductible);
        this.exchangeForm.controls['commodityExcessRate'].setValue(this.commodityData.Rate);
        this.exchangeForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.commodityData.EffectiveDate));
        this.exchangeForm.controls['status'].setValue(this.commodityData.Status);
        this.exchangeForm.controls['CoreApplicationCode'].setValue(this.commodityData.CoreApplicationCode);

      }, (err) => { }
    )

  }


  public createForm() {

    this.exchangeForm = new FormGroup({
      cover: new FormControl([], Validators.required),
      startingAmount: new FormControl('', Validators.required),
      endingAmount: new FormControl('', Validators.required),
      deductible: new FormControl('', Validators.required),
      commodityExcessRate: new FormControl('', Validators.required),
      effectiveDate: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
      CoreApplicationCode:new FormControl('',Validators.required)
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
    this.router.navigateByUrl('/Marine/masters/commodity-excess/view');
  }

  onSave() {

    // Effective Date Format
    let effectiveDate = this.exchangeForm.controls['effectiveDate'].value ? moment(new Date(this.exchangeForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";

    let ReqObj = {
      "BranchCode": this.branchCode,
      "Deductible": this.exchangeForm.controls['deductible'].value,
      "EffectiveDate": effectiveDate,
      "EndSuminsured": this.exchangeForm.controls['endingAmount'].value,
      "Rate": this.exchangeForm.controls['commodityExcessRate'].value,
      "Sno": this.commoditySno,
      "StartSuminsured": this.exchangeForm.controls['startingAmount'].value,
      "Status": this.exchangeForm.controls['status'].value,
      "CoreApplicationCode": this.exchangeForm.controls['CoreApplicationCode'].value,
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodityexcess/save`, ReqObj).subscribe(
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
            'Commodity Excess Inserted/Updated Successfully',
            'Commodity Excess',
            config);

          sessionStorage.removeItem('commodityData');
          this.router.navigateByUrl('/Marine/masters/commodity-excess/view')
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


      }, (err) => { }
    )

  }

}
