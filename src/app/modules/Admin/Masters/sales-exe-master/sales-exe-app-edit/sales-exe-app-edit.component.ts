import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-sales-exe-app-edit',
  templateUrl: './sales-exe-app-edit.component.html',
  styleUrls: ['./sales-exe-app-edit.component.scss']
})
export class SalesExeAppEditComponent implements OnInit {
  public min: Date = new Date();
  public executiveForm: FormGroup;
  public countryList = [];

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public executiveId: any;
  public Userdetails: any;
  public branchCode: any;
  public BelongingCountryId;
  public executiveDetails;

  constructor(private router: Router,
    private masterSer: MastersService,
    private toastrService: NbToastrService) {


    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.executiveId = sessionStorage.getItem('salesExeData');
    if (this.executiveId) {
      this.getExecutiveList();
    } else {
      this.executiveId = null;
    }
    console.log(this.executiveId);

  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm() {

    this.executiveForm = new FormGroup({
      executiveName: new FormControl('', Validators.required),
      otherPartyCode: new FormControl('1', Validators.required),
      oneOffCommission: new FormControl('', Validators.required),
      openCoverCommission: new FormControl('', Validators.required),
      effectiveDate: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
      remarks: new FormControl('')
    });
  }


  getExecutiveList() {
    console.log(this.executiveId, this.branchCode);

    let ReqObj = {
      "AcExecutiveId": this.executiveId,
      "BranchCode": this.Userdetails?.Result.BelongingBranch
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/executive/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        this.executiveDetails = data.Result;

        this.executiveForm.controls['executiveName'].setValue(this.executiveDetails.AcExecutiveName);
        this.executiveForm.controls['otherPartyCode'].setValue(this.executiveDetails.OaCode);
        this.executiveForm.controls['oneOffCommission'].setValue(this.executiveDetails.Commission);
        this.executiveForm.controls['openCoverCommission'].setValue(this.executiveDetails.OpenCoverCommission);
        this.executiveForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.executiveDetails.EffectiveDate));
        this.executiveForm.controls['status'].setValue(this.executiveDetails.Status);
        this.executiveForm.controls['remarks'].setValue(this.executiveDetails.Remarks);

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

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/sales-exe/view');
  }

  onSave() {

    // Effective Date Format
    let effectiveDate = this.executiveForm.controls['effectiveDate'].value ? moment(new Date(this.executiveForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";

    let ReqObj = {
      "AcExecutiveId":this.executiveId,
      "BranchCode":this.Userdetails.Result.BelongingBranch,
      "AcExecutiveName": this.executiveForm.controls['executiveName'].value,
      "Commission": this.executiveForm.controls['oneOffCommission'].value,
      "EffectiveDate": effectiveDate,
      "OaCode": this.executiveForm.controls['otherPartyCode'].value,
      "OpenCoverCommission": this.executiveForm.controls['openCoverCommission'].value,
      //"ProductId":  "03",
      "Remarks": this.executiveForm.controls['remarks'].value,
      "Status": this.executiveForm.controls['status'].value,
    }

    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/executive/save`, ReqObj).subscribe(
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
          'Sales Executive Inserted/Updated Successfully',
          'Sales Executive',
          config);

        sessionStorage.removeItem('salesExeData');
        this.router.navigateByUrl('/Marine/masters/sales-exe/view');
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
