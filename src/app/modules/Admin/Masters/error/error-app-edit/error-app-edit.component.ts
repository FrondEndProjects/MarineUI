import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SessionStorageService } from '../../../../../shared/storage/session-storage.service';

@Component({
  selector: 'app-error-app-edit',
  templateUrl: './error-app-edit.component.html',
  styleUrls: ['./error-app-edit.component.scss']
})
export class ErrorAppEditComponent implements OnInit {

  public ErrorForm: FormGroup;
  public transportList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public Userdetails: any;
  public branchCode: any;
  countryList = [];
  countryData: any = {}; countryId: any;
  countryID: any; countryName: any;
  BelongingCountryId: any;
  ErrorId: any;
  StageId: string;
  productId: string;
  ProductId: any;
  pro: any;

  constructor(private masterSer: MastersService,
    private toastrService: NbToastrService,
    private router: Router, private sessionStorageService: SessionStorageService) {

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;

      this.pro = this.Userdetails?.LoginResponse?.productId;
    }

    this.ProductId = this.sessionStorageService.sessionStorgaeModel.productId;

    this.ErrorId = sessionStorage.getItem('editErrorId');
    this.StageId=sessionStorage.getItem('editErrorIds');
    this.productId=sessionStorage.getItem('ProductId');
    // this.countryName = sessionStorage.getItem('editCountryName');
    if (this.ErrorId) {
      this.getCountryDetails();

    }
    else {
      this.ErrorId = null;
    }
  }

  ngOnInit(): void {
    //this.getCountryList()
    this.createForm();
  }

  /*getCountryList() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ProductId": "3"

    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/originationcountry`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message == 'Success') {
          this.countryList = data.Result;
        }
      }


    )
  }*/

  getCountryDetails() {
    let ReqObj = {
      "ErrorId": this.ErrorId,
      "StageId":this.StageId,
      "ProductId":this.productId
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/error/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);



        let ErrorDetails = data.Result;
        /*console.log(.CountryId);
        this.countryName = countryDetails.CountryName;
        this.BelongingCountryId = countryDetails.CountryId;*/

        this.ErrorForm.controls['StageId'].setValue(ErrorDetails.StageId);
        this.ErrorForm.controls['ErrorDescription'].setValue(ErrorDetails.ErrorDescription);
        this.ErrorForm.controls['remarks'].setValue(ErrorDetails.Remarks);
        this.ErrorForm.controls['status'].setValue(ErrorDetails.Status);

      },
      (err) => { },
    );
  }
  public createForm() {

    this.ErrorForm = new FormGroup({
      StageId: new FormControl(''),
      ErrorDescription:new FormControl('',Validators.required),
      remarks: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
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
    this.router.navigateByUrl('/Marine/masters/error/view');
  }

  onSave() {

    let ReqObj = {
      "ErrorId":this.ErrorId,
      "ProductId":this.ProductId,
	    "StageId":  this.ErrorForm.controls['StageId'].value,
     "ErrorDescription":this.ErrorForm.controls['ErrorDescription'].value,
	    "Remarks":this.ErrorForm.controls['remarks'].value,
	     "Status":this.ErrorForm.controls['status'].value

    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/error/save`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        // Toast
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
            'Error Details Inserted/Updated Successfully',
            'Error Details',
            config);

          // Storage Remove
          sessionStorage.removeItem('editErrorId');
          sessionStorage.removeItem('editErrorIds');
          this.router.navigateByUrl('/Marine/masters/error/view')
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
      },
      (err) => { },
    );

  }


}





