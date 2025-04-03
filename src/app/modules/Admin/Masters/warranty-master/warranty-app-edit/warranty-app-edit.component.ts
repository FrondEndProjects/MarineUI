import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-warranty-app-edit',
  templateUrl: './warranty-app-edit.component.html',
  styleUrls: ['./warranty-app-edit.component.scss']
})
export class WarrantyAppEditComponent implements OnInit {
  public min: Date = new Date();

  public warrantyForm: FormGroup;

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public Userdetails: any;
  public branchCode: any;
  public WarrantyId; warrantyDetails;


  constructor(private router: Router, 
    private toastrService: NbToastrService,
    private masterSer: MastersService) {

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.WarrantyId = JSON.parse(sessionStorage.getItem('warrantyData'));
    if (this.WarrantyId) {
      this.getWarrantyEdit();
    } else {
      this.WarrantyId = null;
    }

  }

  ngOnInit(): void {
    this.createForm();
  }

  getWarrantyEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "WarrantyId": this.WarrantyId
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/warranty/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        this.warrantyDetails = data.Result;
        this.warrantyForm.controls['warrantyDescription'].setValue(this.warrantyDetails.WarrantyDescription);
        this.warrantyForm.controls['coreApplicationCode'].setValue(this.warrantyDetails.CoreApplicationCode);
        this.warrantyForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.warrantyDetails.EffectiveDate));
        this.warrantyForm.controls['remarks'].setValue(this.warrantyDetails.Remarks);
        this.warrantyForm.controls['status'].setValue(this.warrantyDetails.Status);
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

    this.warrantyForm = new FormGroup({
      warrantyDescription: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      effectiveDate: new FormControl(''),
      remarks: new FormControl(''),
      status: new FormControl('Y', Validators.required),
    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/warranty/view');
  }

  onSave() {
    var effDate;
    if (this.warrantyForm.controls['effectiveDate'].value) {
      effDate = moment(new Date(this.warrantyForm.controls['effectiveDate'].value)).format('DD/MM/YYYY');
    } else {
      effDate = "";
    }

    let ReqObj = {
      "BranchCode": this.Userdetails.Result.BelongingBranch,
      "CoreApplicationCode": this.warrantyForm.controls['coreApplicationCode'].value,
      "EffectiveDate": effDate,
      "Remarks": this.warrantyForm.controls['remarks'].value,
      "Status": this.warrantyForm.controls['status'].value,
      "WarrantyDescription": this.warrantyForm.controls['warrantyDescription'].value,
      "WarrantyId": this.WarrantyId,
      "AmendId":'',
    }
    console.log(ReqObj);

    if (this.warrantyForm.controls['effectiveDate'].value) {
      console.log("Yes" + this.warrantyForm.controls['effectiveDate'].value);

    } else {
      console.log("no" + this.warrantyForm.controls['effectiveDate'].value);

    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/warranty/save`, ReqObj).subscribe(
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
            'Warranty Details Inserted/Updated Successfully',
            'Warranty Details',
            config);

          // Storage Remove
          sessionStorage.removeItem('warrantyData');
          this.router.navigateByUrl('/Marine/masters/warranty/view');

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
