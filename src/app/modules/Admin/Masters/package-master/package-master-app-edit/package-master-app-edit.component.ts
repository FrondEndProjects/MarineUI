import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import * as Mydatas from '../../../../../app-config.json';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-package-master-app-edit',
  templateUrl: './package-master-app-edit.component.html',
  styleUrls: ['./package-master-app-edit.component.scss']
})
export class PackageMasterAppEditComponent implements OnInit {
  public min: Date = new Date();

  public packageForm: FormGroup;
  public countryList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  public packageData: any = {}; packageId: any; packageTransportId: any;

  constructor(private masterSer: MastersService,
    private router: Router,
    private toastrService:NbToastrService,private datePipe: DatePipe) {

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    this.packageTransportId = sessionStorage.getItem('packageTransportId');
    this.packageId = sessionStorage.getItem('packageId');

    if (this.packageTransportId && this.packageId) {
      
      this.getpackageEdit();
    } else {
      this.packageTransportId = null;
      this.packageId = null;
    }

  }

  ngOnInit(): void {
    this.getModeofTransportList()
    
    this.createForm();
  }

  getModeofTransportList() {
    let ReqObj = {
      "BranchCode": this.userDetails.Result.BelongingBranch,
      // "IncotermPercent": "string",
      // "OpenCoverNo": "string",
      "ProductId": "3"
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
      (data: any) => {
        console.log(data)

        if (data?.Message == 'Success') {
          this.countryList = data.Result;
        }

      }, (err) => { }
    )}
  
  getpackageEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ModeOfTransportId": this.packageTransportId,
      "PackageId": this.packageId
    }
    console.log(ReqObj);
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/package/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        
        this.packageData = data.Result
        this.packageForm.controls['ModeOfTransportId'].setValue(this.packageData.ModeOfTransportId);
        this.packageForm.controls['packageDesc'].setValue(this.packageData.PackageDescription);
        this.packageForm.controls['percentRate'].setValue(this.packageData.PercentRate);
        this.packageForm.controls['remarks'].setValue(this.packageData.Remarks);
        this.packageForm.controls['coreApplicationCode'].setValue(this.packageData.CoreApplicationCode);
        this.packageForm.controls['status'].setValue(this.packageData.Status);
        this.packageForm.controls['EffectiveDateStart'].setValue(this.onDateFormatInEdit(this.packageData.EffectiveDate))
        // this.packageForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.packageData.EffectiveDate));

      }, (err) => { }
    )

  }


  public createForm() {

    this.packageForm = new FormGroup({
      ModeOfTransportId : new FormControl( '', Validators.required),
      packageDesc: new FormControl('', Validators.required),
      percentRate: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      coreApplicationCode: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
      EffectiveDateStart:new FormControl('',Validators.required)
      // effectiveDate: new FormControl('', Validators.required),
    });
  }

  doRate() {

  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/package/view');
  }

  onSave() {

    // Effective Date Format
    // let effDate = this.packageForm.controls['effectiveDate'].value ? moment(new Date(this.packageForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";

    let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "ModeOfTransportId": this.packageForm.controls['ModeOfTransportId'].value,
      "PackageDescription": this.packageForm.controls['packageDesc'].value,
      "PackageId": this.packageId,
      "PercentRate": this.packageForm.controls['percentRate'].value,
      "Remarks": this.packageForm.controls['remarks'].value,
      "CoreApplicationCode": this.packageForm.controls['coreApplicationCode'].value,
      "Status": this.packageForm.controls['status'].value,
      "AmendId":'',
      "EffectiveDate":this.packageForm.controls['EffectiveDateStart'].value
    }
    console.log(ReqObj);
    if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
      ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDate'] = "";
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/package/save`, ReqObj).subscribe(
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
            'Package Details Inserted/Updated Successfully',
            'Package Details',
            config);

            sessionStorage.removeItem('packageData');
            this.router.navigateByUrl('/Marine/masters/package/view')
        }
        else if(data.Errors){
          for(let entry of data.Errors){
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
}
