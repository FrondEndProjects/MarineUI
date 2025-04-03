import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MastersService } from '../../masters.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-extra-app-edit',
  templateUrl: './extra-app-edit.component.html',
  styleUrls: ['./extra-app-edit.component.scss']
})
export class ExtraAppEditComponent implements OnInit {
  public min: Date = new Date();

  public extraCoverForm: FormGroup;
  public transportList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  extraCoverData: any = {}; ExtraCoverId: any; extraId;

  constructor(private masterSer: MastersService,
    private router: Router,
    private toastrService: NbToastrService,private datePipe: DatePipe) {


    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    this.ExtraCoverId = sessionStorage.getItem('extraCoverData');
    if (this.ExtraCoverId) {

      this.getExtraCoverEdit();

    } else {
      this.ExtraCoverId = null;
    }
    console.log(this.ExtraCoverId);

  }

  ngOnInit(): void {

    this.createForm();
    this.getModeofTransportList()

  }

  getModeofTransportList() {
    let ReqObj = {
      'BranchCode': this.userDetails.Result.BelongingBranch,
      'ProductId': '3',
      OpenCoverNo: '',
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data?.Result) {
          this.transportList = data.Result;
        }
      }, (err) => { }
    )
  }

  getExtraCoverEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ExtraCoverId": this.ExtraCoverId
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/extracover/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        this.extraCoverData = data.Result;
        this.extraId = this.extraCoverData.ExtraCoverId;
        this.extraCoverForm.controls['ModeOfTransportId'].setValue(this.extraCoverData.ModeOfTransportId);
        this.extraCoverForm.controls['extraCoverName'].setValue(this.extraCoverData.ExtraCoverName);
        this.extraCoverForm.controls['remarks'].setValue(this.extraCoverData.Remarks);
        this.extraCoverForm.controls['coreApplicationCode'].setValue(this.extraCoverData.CoreApplicationCode);
        this.extraCoverForm.controls['status'].setValue(this.extraCoverData.Status);
        this.extraCoverForm.controls['EffectiveDateStart'].setValue(this.onDateFormatInEdit(this.extraCoverData.EffectiveDate))
      }, (err) => { }
    )

  }


  public createForm() {

    this.extraCoverForm = new FormGroup({
      ModeOfTransportId: new FormControl('', Validators.required),
      extraCoverName: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      coreApplicationCode: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
      EffectiveDateStart:new FormControl('',Validators.required)
    });
  }
  
  public goBack() {
    this.router.navigateByUrl('/Marine/masters/extra-cover/view');
  }

  onSave() {

    let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "CoreApplicationCode": this.extraCoverForm.controls['coreApplicationCode'].value,
      "ExtraCoverId": this.extraId,
      "ExtraCoverName": this.extraCoverForm.controls['extraCoverName'].value,
      "ModeOfTransportId": this.extraCoverForm.controls['ModeOfTransportId'].value,
      "Remarks": this.extraCoverForm.controls['remarks'].value,
      "Status": this.extraCoverForm.controls['status'].value,
      "EffectiveDate":this.extraCoverForm.controls['EffectiveDateStart'].value,
      "AmendId":'',
    }
    if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
      ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EffectiveDate'] = "";
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/extracover/save`, ReqObj).subscribe(
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
            'Extra Cover Details Inserted/Updated Successfully',
            'Extra Cover Details',
            config);

          sessionStorage.removeItem('extraCoverData');
          this.router.navigateByUrl('/Marine/masters/extra-cover/view');
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
