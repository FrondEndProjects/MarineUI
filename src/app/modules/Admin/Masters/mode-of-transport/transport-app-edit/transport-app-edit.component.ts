import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MastersService } from '../../masters.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transport-app-edit',
  templateUrl: './transport-app-edit.component.html',
  styleUrls: ['./transport-app-edit.component.scss']
})
export class TransportAppEditComponent implements OnInit {

  public transportForm: FormGroup;
  public countryList = [];
  
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public editBankId: any; bankId: any;
  public Userdetails: any;
  public branchCode: any; 
  public transportId; DisplayOrder; transportDetails;
  EffectiveDateStart:any;public minDate:Date;

  constructor( private router: Router,
    private masterSer: MastersService,
    private toastrService: NbToastrService,private datePipe: DatePipe) {

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.minDate = new Date();
    if(this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.transportId = JSON.parse(sessionStorage.getItem('transportData'));
    if(this.transportId) {
      this.getTransportDetails();
    } else {
      this.transportId = null;
    }
  }
  
  ngOnInit(): void {
    this.createForm();
    
  }

  getTransportDetails() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ModeOfTransportId": this.transportId
    }
    
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/modeOfTransportMaster/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        
        this.transportDetails = data.Result;
        //this.DisplayOrder = this.transportDetails.DisplayOrder;
        this.transportForm.controls['modeOfTransport'].setValue(this.transportDetails.ModeOfTransportDesc)
        this.transportForm.controls['coreApplicationCode'].setValue(this.transportDetails.CoreApplicationCode)
        this.transportForm.controls['remarks'].setValue(this.transportDetails.Remarks)
        this.transportForm.controls['status'].setValue(this.transportDetails.Status)
        this.transportForm.controls['displayorder'].setValue(this.transportDetails.DisplayOrder);
        this.transportForm.controls['EffectiveDateStart'].setValue(this.onDateFormatInEdit(this.transportDetails.EffectiveDate))
      }, (err) => { }
    )
  }


  public createForm() {

    this.transportForm = new FormGroup({
      modeOfTransport : new FormControl( '', Validators.required),
      coreApplicationCode : new FormControl( '', Validators.required),
      remarks : new FormControl(''),
      status : new FormControl('Y', Validators.required),
      displayorder:new FormControl(''),
      EffectiveDateStart:new FormControl('',Validators.required)
    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/transport/view');
  }

  onSave() {
    let ReqObj = {
      "BranchCode": this.Userdetails?.Result.BelongingBranch,
      "AmendId":'',
      "CoreApplicationCode": this.transportForm.controls['coreApplicationCode'].value,
      "DisplayOrder": this.transportForm.controls['displayorder'].value,
      "ModeOfTransportDesc": this.transportForm.controls['modeOfTransport'].value,
      "ModeOfTransportId": this.transportId,
      "Remarks": this.transportForm.controls['remarks'].value,
      "Status": this.transportForm.controls['status'].value,
      "EffectiveDate":this.transportForm.controls['EffectiveDateStart'].value
    }
    console.log(ReqObj);
    if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
      ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDate'] = "";
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/modeOfTransportMaster/save`, ReqObj).subscribe(
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
            'Mode of Transport Details Inserted/Updated Successfully',
            'Mode of Transport Details',
            config);

            sessionStorage.removeItem('transportData');
            this.router.navigateByUrl('Marine/masters/transport/view')
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
        
        if(data.Message == 'Success') {
         
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
