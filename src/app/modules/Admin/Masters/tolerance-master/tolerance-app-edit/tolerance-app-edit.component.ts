import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
import * as moment from 'moment';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tolerance-app-edit',
  templateUrl: './tolerance-app-edit.component.html',
  styleUrls: ['./tolerance-app-edit.component.scss']
})
export class ToleranceAppEditComponent implements OnInit {
  public min: Date;

  public toleranceForm: FormGroup;

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public Userdetails: any;
  public branchCode: any;
  public toleranceId;

  constructor(private router: Router, private route: ActivatedRoute,
    private masterSer: MastersService, 
    private toastrService: NbToastrService,private datePipe: DatePipe) {

    this.min = new Date();

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.toleranceId = JSON.parse(sessionStorage.getItem('toleranceData'));
    if (this.toleranceId) {
      this.getToleranceList();
    } else {
      this.toleranceId = null;
    }

  }

  ngOnInit(): void {
    this.createForm();
  }

  getToleranceList() {
    let ReqObj = {
      "BranchCode": this.Userdetails?.Result.BelongingBranch,
      "ToleranceId": this.toleranceId
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/tolerance/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        let toleranceDetails = data.Result;
        this.toleranceForm.controls['toleranceName'].setValue(toleranceDetails.ToleranceName);
        this.toleranceForm.controls['toleranceValue'].setValue(toleranceDetails.ToleranceValue);
        this.toleranceForm.controls['coreApplicationCode'].setValue(toleranceDetails.CoreApplicationCode);
        this.toleranceForm.controls['remarks'].setValue(toleranceDetails.Remarks);
        this.toleranceForm.controls['status'].setValue(toleranceDetails.Status);
        this.toleranceForm.controls['EffectiveDateStart'].setValue(this.onDateFormatInEdit(toleranceDetails.EffectiveDate))
        // this.toleranceForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(toleranceDetails.EffectiveDate));
      }, (err) => { }
    )
  }

  // Date Format
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

  public createForm() {

    this.toleranceForm = new FormGroup({
      toleranceName: new FormControl('', Validators.required),
      toleranceValue: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      status: new FormControl('Y', Validators.required),
      EffectiveDateStart:new FormControl('',Validators.required)
    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/tolerance/view');
  }

  onSave() {

    // Effective Date Format
    // let effectiveDate = this.toleranceForm.controls['effectiveDate'].value ? moment(new Date(this.toleranceForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";

    let ReqObj = {
      "BranchCode": this.Userdetails.Result?.BelongingBranch,
      "CoreApplicationCode": this.toleranceForm.controls['coreApplicationCode'].value,
      "Remarks": this.toleranceForm.controls['remarks'].value,
      "Status": this.toleranceForm.controls['status'].value,
      "ToleranceId": this.toleranceId,
      "ToleranceName": this.toleranceForm.controls['toleranceName'].value,
      "ToleranceValue": this.toleranceForm.controls['toleranceValue'].value,
      "EffectiveDate":this.toleranceForm.controls['EffectiveDateStart'].value,
      "AmendId":'',
      // "EffectiveDate": effectiveDate,
    }
    console.log(ReqObj);
    if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
      ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDate'] = "";
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/tolerance/save`, ReqObj).subscribe(
      (data: any) => {

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
            'Tolerance Inserted/Updated Successfully',
            'Tolerance',
            config);

          sessionStorage.removeItem('toleranceData');
          this.router.navigateByUrl('/Marine/masters/tolerance/view');
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
