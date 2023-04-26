import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-war-rate-app-edit',
  templateUrl: './war-rate-app-edit.component.html',
  styleUrls: ['./war-rate-app-edit.component.scss']
})
export class WarRateAppEditComponent implements OnInit {
  public min: Date = new Date();

  public warRateForm: FormGroup;
  public transportList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  warRateData: any={};warId:any;

  constructor(private masterSer: MastersService, 
    private router: Router,
    private toastrService: NbToastrService) {


    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;
    
    this.warId = sessionStorage.getItem('WarId');
    if(this.warId) {

      this.getWarRateEdit();

    } else {
      this.warId = null;
    }
    console.log(this.warId);
    
  }
  
  ngOnInit(): void {
    
    this.createForm();
    this.getModeofTransportList()
    
  }

  getModeofTransportList() {
    let ReqObj = {
      'BranchCode': this.branchCode,
      'ProductId' : '3',
      OpenCoverNo : '',
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        
        if (data?.Result) {
          this.transportList = data.Result;

        }
      }, (err) => { }
    )
  }

  getWarRateEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "WarId": this.warId
    }
    console.log(ReqObj);
    
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/warrate/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        
        this.warRateData = data.Result;
        this.warRateForm.controls['ModeOfTransportId'].setValue(this.warRateData.ModeOfTransportId);
        this.warRateForm.controls['warDescription'].setValue(this.warRateData.WarDescription);
        this.warRateForm.controls['warRate'].setValue(this.warRateData.WarRate);
        this.warRateForm.controls['coreApplicationCode'].setValue(this.warRateData.CoreApplicationCode);
        this.warRateForm.controls['remarks'].setValue(this.warRateData.Remarks);
        this.warRateForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.warRateData.EffectiveDate));
        this.warRateForm.controls['status'].setValue(this.warRateData.Status);
      }, (err) => { }
    )

    
  }

 
  public createForm() {

    this.warRateForm = new FormGroup({
      ModeOfTransportId : new FormControl( '', Validators.required),
      warDescription : new FormControl( '', Validators.required),
      warRate : new FormControl( '', Validators.required),
      coreApplicationCode  : new FormControl( '', Validators.required),
      remarks : new FormControl(''),
      effectiveDate : new FormControl( '', Validators.required),
      status : new FormControl('Y', Validators.required),
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
    this.router.navigateByUrl('/Marine/masters/war-rate/view');
  }

  onSave() {

    // Effective Date Format
    let effectiveDate = this.warRateForm.controls['effectiveDate'].value ? moment(new Date(this.warRateForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";


    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoreApplicationCode": this.warRateForm.controls['coreApplicationCode'].value,
      "EffectiveDate": effectiveDate,
      "ModeOfTransportId": this.warRateForm.controls['ModeOfTransportId'].value,
      "Remarks": this.warRateForm.controls['remarks'].value,
      "Status": this.warRateForm.controls['status'].value,
      "WarDescription": this.warRateForm.controls['warDescription'].value,
      "WarId": this.warId,
      "WarRate": this.warRateForm.controls['warRate'].value
    }
    
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/warrate/save`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        
        if(data.Message == 'Success') {

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
            'War-Rate Details Inserted/Updated Successfully',
            'War-Rate Details',
            config);

          sessionStorage.removeItem('WarId');
          this.router.navigateByUrl('/Marine/masters/war-rate/view');
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
      }
    )

  }

}
