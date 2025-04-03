import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
import * as moment from 'moment';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-conveyance-add-adit',
  templateUrl: './conveyance-add-adit.component.html',
  styleUrls: ['./conveyance-add-adit.component.scss'],
})
export class ConveyanceAddAditComponent implements OnInit {

  public min: Date = new Date();
  public newDate: Date = new Date();
  public minDate:any;

  public conveyanceForm: FormGroup;
  public transportList = [];
  public conveyanceId; conveyanceTransport;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private masterSer: MastersService ) {

      //this.minDate = {year: this.newDate.getFullYear(), month: this.newDate.getMonth() + 1, day: this.newDate.getDate()};
        this.minDate = new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    this.conveyanceId = JSON.parse(sessionStorage.getItem('conveyanceId'));
    this.conveyanceTransport = JSON.parse(sessionStorage.getItem('conveyanceTransport'));

    if (this.conveyanceId) {
      this.getConveyanceEdit();
    }
    else {
      this.conveyanceId = null;
      this.conveyanceTransport = null;
    }

  }

  ngOnInit(): void {
    this.getModeOFtransportList();
    this.createForm();
  }

  public createForm() {
    this.conveyanceForm = new FormGroup({
      ModeOfTransportId: new FormControl('', Validators.required),
      conveyanceName : new FormControl('', Validators.required),
      conveyanceRate : new FormControl('', Validators.required),
      coreApplicationCode : new FormControl('', Validators.required),
      effectiveDate : new FormControl('', Validators.required),
      remarks : new FormControl(''),
      status : new FormControl('Y', Validators.required),
      ContainersedYn: new FormControl('Y', Validators.required),
    });
  }

   // get transport list
   public getModeOFtransportList() {
    const ReqObj = {
      'BranchCode': this.userDetails.Result.BelongingBranch,
      'ProductId' : '3',
      'OpenCoverNo' : '',
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

  getConveyanceEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ConveyanId": this.conveyanceId,
      "ModeOfTransportId": this.conveyanceTransport
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/conveyance/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        let conveyanceDetails = data.Result;
        this.conveyanceForm.controls['ModeOfTransportId'].setValue(conveyanceDetails.ModeOfTransportId);
        this.conveyanceForm.controls['conveyanceName'].setValue(conveyanceDetails.ConveyanName);
        this.conveyanceForm.controls['conveyanceRate'].setValue(conveyanceDetails.ConveyanRate);
        this.conveyanceForm.controls['coreApplicationCode'].setValue(conveyanceDetails.CoreApplicationCode);
        this.conveyanceForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(conveyanceDetails.EffectiveDate));
        this.conveyanceForm.controls['remarks'].setValue(conveyanceDetails.Remarks);
        this.conveyanceForm.controls['status'].setValue(conveyanceDetails.Status);
        this.conveyanceForm.controls['ContainersedYn'].setValue(conveyanceDetails.ContainersedYn);

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
    this.router.navigateByUrl('/Marine/masters/conveyance/view');
  }

  public onSave() {

     // Effective Date Format
     console.log('EFFFFFFF',this.conveyanceForm.controls['effectiveDate'])
     let effectiveDate = this.conveyanceForm.controls['effectiveDate'].value ? moment(new Date(this.conveyanceForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";
      console.log('EEEEEEEEEE',effectiveDate);
     let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "ConveyanId": this.conveyanceId,
      "ConveyanName": this.conveyanceForm.controls['conveyanceName'].value,
      "ConveyanRate": this.conveyanceForm.controls['conveyanceRate'].value,
      "CoreApplicationCode": this.conveyanceForm.controls['coreApplicationCode'].value,
      "EffectiveDate": effectiveDate,
      "ModeOfTransportId": this.conveyanceForm.controls['ModeOfTransportId'].value,
      "Remarks": this.conveyanceForm.controls['remarks'].value,
      "Status": this.conveyanceForm.controls['status'].value,
      "ContainersedYn": this.conveyanceForm.controls['ContainersedYn'].value,
    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/conveyance/save`, ReqObj).subscribe(
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
            'Conveyance Details Inserted/Updated Successfully',
            'Conveyance Details',
            config);


          sessionStorage.removeItem('conveyanceId');
          sessionStorage.removeItem('conveyanceTransport');
          this.router.navigateByUrl('/Marine/masters/conveyance/view');
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


