import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sale-term-app-edit',
  templateUrl: './sale-term-app-edit.component.html',
  styleUrls: ['./sale-term-app-edit.component.scss']
})
export class SaleTermAppEditComponent implements OnInit {
  public min: Date = new Date();
  public saleTermForm: FormGroup;
  
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public editBankId: any; bankId: any;
  public Userdetails: any;
  public branchCode: any; 
  public saleTermId;

  constructor( 
    private router: Router,
    private masterSer: MastersService,
    private toastrService:NbToastrService,private datePipe: DatePipe) {

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    
    if(this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.saleTermId = JSON.parse(sessionStorage.getItem('saleTermData'));
    if(this.saleTermId) {
      this.getSaleTermDetails();
    } else {
      this.saleTermId = null;
    }

  }
  
  ngOnInit(): void {
    this.createForm();
  }

  getSaleTermDetails() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "SaleTermId": this.saleTermId
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/saleTermMaster/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        let saleTermDetails = data.Result;
        
        this.saleTermForm.controls['saleTermName'].setValue(saleTermDetails.SaleTermName);
        this.saleTermForm.controls['saleTermValue'].setValue(saleTermDetails.SaleTermValue);
        this.saleTermForm.controls['coreApplicationCode'].setValue(saleTermDetails.CoreApplicationCode);
        this.saleTermForm.controls['remarks'].setValue(saleTermDetails.Remarks);
        this.saleTermForm.controls['status'].setValue(saleTermDetails.Status);
        this.saleTermForm.controls['EffectiveDateStart'].setValue(this.onDateFormatInEdit(saleTermDetails.EffectiveDate))
        // this.saleTermForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(saleTermDetails.EffectiveDate));    
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

    this.saleTermForm = new FormGroup({
      saleTermName: new FormControl( '', Validators.required),
      saleTermValue: new FormControl( '', Validators.required),
      coreApplicationCode : new FormControl( '', Validators.required),
      remarks : new FormControl(''),
      effectiveDate : new FormControl( '', Validators.required),
      status : new FormControl('Y', Validators.required),
      EffectiveDateStart:new FormControl('',Validators.required)
    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/sale-term/view');
  }

  onSave() {

    // Effective Date Format
    let effDate;
    if (this.saleTermForm.controls['effectiveDate'].value) {
      effDate = moment(new Date(this.saleTermForm.controls['effectiveDate'].value)).format('DD/MM/YYYY');
    } else {
      effDate = "";
    }

    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoreApplicationCode": this.saleTermForm.controls['coreApplicationCode'].value,
      "Remarks": this.saleTermForm.controls['remarks'].value,
      "SaleTermId": this.saleTermId,
      "SaleTermName": this.saleTermForm.controls['saleTermName'].value,
      "SaleTermValue": this.saleTermForm.controls['saleTermValue'].value,
      "Status": this.saleTermForm.controls['status'].value,
      "EffectiveDate":this.saleTermForm.controls['EffectiveDateStart'].value,
      "AmendId":'',
      // "EffectiveDate": effDate
    }
    if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
      ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDate'] = "";
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/saleTermMaster/save`, ReqObj).subscribe(
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
            'Sale-Term Details Inserted/Updated Successfully',
            'Sale-Term Details',
            config);

          sessionStorage.removeItem('saleTermData');
          this.router.navigateByUrl('Marine/masters/sale-term/view')
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
