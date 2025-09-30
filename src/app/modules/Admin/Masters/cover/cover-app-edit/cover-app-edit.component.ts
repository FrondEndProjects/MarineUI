import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-cover-app-edit',
  templateUrl: './cover-app-edit.component.html',
  styleUrls: ['./cover-app-edit.component.scss']
})
export class CoverAppEditComponent implements OnInit {

  public min: Date = new Date();
  public newDate: Date = new Date();
  public minDate: any;

  public coverForm: FormGroup;
  public transportList = [];
  public coverId; coverDetails; CoverId; ReferralValue;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private masterSer: MastersService) {

    //this.minDate = { year: this.newDate.getFullYear(), month: this.newDate.getMonth() + 1, day: this.newDate.getDate() };
       this.minDate= new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    this.coverId = JSON.parse(sessionStorage.getItem('CoverData'));

    if (this.coverId) {
      this.getCoverEdit();
    }
    else {
      this.coverId = null;
    }

  }

  ngOnInit(): void {
    this.getModeOFtransportList();
    this.createForm();
  }

  public createForm() {
    this.coverForm = new FormGroup({
      ModeOfTransportId: new FormControl('', Validators.required),
      coverName: new FormControl('', Validators.required),
      coverDescription: new FormControl('', Validators.required),
      coverRate: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      effectiveDate: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      refStatus: new FormControl('Y', Validators.required),
      status: new FormControl('Y', Validators.required),
    });
  }

  // get transport list
  public getModeOFtransportList() {
    const ReqObj = {
      'BranchCode': this.userDetails.Result.BelongingBranch,
      'ProductId': '3',
      OpenCoverNo: '',
    };

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.transportList = data.Result;
        }
      },
      (err) => { },
    );
  }

  getCoverEdit() {
    let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "CoverId": this.coverId
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/cover/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.Result.EffectiveDate);


        this.coverDetails = data.Result;
        this.CoverId = this.coverDetails.CoverId;
        this.ReferralValue = this.coverDetails.ReferralValue;
        this.coverForm.controls['ModeOfTransportId'].setValue(this.coverDetails.ModeOfTransportId);
        this.coverForm.controls['coverName'].setValue(this.coverDetails.CoverName);
        this.coverForm.controls['coverDescription'].setValue(this.coverDetails.CoverDesc);
        this.coverForm.controls['coverRate'].setValue(this.coverDetails.CoverRate);
        this.coverForm.controls['coreApplicationCode'].setValue(this.coverDetails.CoreApplicationCode);
        this.coverForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.coverDetails.EffectiveDate));
        //this.coverForm.controls['effectiveDate'].setValue(this.masterSer.ngbDateFormatt(this.coverDetails.EffectiveDate));
        this.coverForm.controls['remarks'].setValue(this.coverDetails.Remarks);
        this.coverForm.controls['refStatus'].setValue(this.coverDetails.ReferralStatus);
        this.coverForm.controls['status'].setValue(this.coverDetails.Status);

      }
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
    this.router.navigateByUrl('/Marine/masters/cover/view');
  }

  public onSave() {
    if (this.coverForm.controls['ModeOfTransportId'].value) {
      var countryId = this.transportList.filter((val) => {
        if (val.Code == this.coverForm.controls['ModeOfTransportId'].value) {
          return val
        }
      })
      console.log(countryId[0].Code);
    } else {
      countryId = [""];
    }

    console.log('EFFFFFFF',this.coverForm.controls['effectiveDate'])
    let effectiveDate = this.coverForm.controls['effectiveDate'].value ? moment(new Date(this.coverForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";
    let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "CoreApplicationCode": this.coverForm.controls['coreApplicationCode'].value,
      "CoverId": this.CoverId,
      "CoverName": this.coverForm.controls['coverName'].value,
      "CoverRate": this.coverForm.controls['coverRate'].value,
      "EffectiveDate":effectiveDate,
      "CoverDesc": this.coverForm.controls['coverDescription'].value,
      "ModeOfTransportId": this.coverForm.controls['ModeOfTransportId'].value,
      "ReferralStatus": this.coverForm.controls['refStatus'].value,
      "ReferralValue": this.ReferralValue,
      "Remarks": this.coverForm.controls['remarks'].value,
      "Status": this.coverForm.controls['status'].value,
      "ModeOfTransportDesc": countryId[0].CodeDescription
    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/cover/save`, ReqObj).subscribe(
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
            'Cover Details Inserted/Updated Successfully',
            'Cover Details',
            config);


          sessionStorage.removeItem('CoverData');
          this.router.navigateByUrl('/Marine/masters/cover/view');
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
