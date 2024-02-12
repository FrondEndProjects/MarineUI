import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbDateService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-exclusion-app-edit',
  templateUrl: './exclusion-app-edit.component.html',
  styleUrls: ['./exclusion-app-edit.component.scss']
})
export class ExclusionAppEditComponent implements OnInit {
  public min: Date = new Date();

  public exclusionForm: FormGroup;
  
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public Userdetails: any;
  public branchCode: any; 
  public ExclusionId=null; exclusionDetails;

  constructor( 
    private router: Router, 
    private route: ActivatedRoute,
    private toastrService:NbToastrService,
    private masterSer: MastersService,
    protected dateService: NbDateService<Date>
    ) {

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
    if(this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.ExclusionId = JSON.parse(sessionStorage.getItem('exclusionData'));
    if(this.ExclusionId) {
      this.getExclusionList();
    } 

  }
  
  ngOnInit(): void {
    this.createForm();
  }

  getExclusionList() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ExclusionId": this.ExclusionId
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/exclusion/edit`, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      
    this.exclusionDetails = data.Result;
    this.exclusionForm.controls['exclusionName'].setValue(this.exclusionDetails.ExclusionDescription);
    this.exclusionForm.controls['coreApplicationCode'].setValue(this.exclusionDetails.CoreApplicationCode);
    this.exclusionForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.exclusionDetails.EffectiveDate));
    this.exclusionForm.controls['remarks'].setValue(this.exclusionDetails.Remarks);
    this.exclusionForm.controls['status'].setValue(this.exclusionDetails.Status);
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
  public createForm() {

    this.exclusionForm = new FormGroup({
      exclusionName : new FormControl( '', Validators.required),
      coreApplicationCode : new FormControl( '', Validators.required),
      remarks : new FormControl(''),
      effectiveDate: new FormControl( ''),
      status : new FormControl('Y', Validators.required),
    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/exclusion/view');
  }

  onSave() {
    var effDate;
    if(this.exclusionForm.controls['effectiveDate'].value) {
      effDate = moment(new Date(this.exclusionForm.controls['effectiveDate'].value)).format('DD/MM/YYYY');
    } else {
      effDate = "";
    }
    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoreApplicationCode": this.exclusionForm.controls['coreApplicationCode'].value,
      "EffectiveDate": effDate,
      "ExclusionDescription": this.exclusionForm.controls['exclusionName'].value,
      "ExclusionId": this.ExclusionId,
      "Remarks": this.exclusionForm.controls['remarks'].value,
      "Status": this.exclusionForm.controls['status'].value,
    }
    console.log(ReqObj);
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/exclusion/save`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
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
            'Exclusion Details Inserted/Updated Successfully',
            'Exclusion Details',
            config);
          sessionStorage.removeItem('exclusionData');
          this.router.navigateByUrl('/Marine/masters/exclusion/view');
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

}
