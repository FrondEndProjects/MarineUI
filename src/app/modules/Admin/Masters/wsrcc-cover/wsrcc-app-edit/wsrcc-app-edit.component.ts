import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition } from '@nebular/theme';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import * as Mydatas from '../../../../../app-config.json';

@Component({
  selector: 'app-wsrcc-app-edit',
  templateUrl: './wsrcc-app-edit.component.html',
  styleUrls: ['./wsrcc-app-edit.component.scss']
})
export class WsrccAppEditComponent implements OnInit {

  public min: Date = new Date();
  public newDate: Date = new Date();
  public minDate: any;
  public CoverList=[];

  public wsrccForm :FormGroup;
  //public coverForm: FormGroup;
  public transportList = [];
  public coverId; coverDetails; CoverId; ReferralValue;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  clausesId: any;

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private masterSer: MastersService) {

    this.minDate = new Date()

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    let entry = JSON.parse(sessionStorage.getItem('CoverData'));

    if (entry) {
      this.clausesId = entry?.ClausesId;
      this.CoverId = entry?.CoverId
      this.getCoverEdit();
    }
    else {
      this.clausesId = null;
    }

  }

  ngOnInit(): void {
    this.getModeOFtransportList();
    this.createForm();
    this.getCoverName('direct');
  }

  public createForm() {
    this.wsrccForm = new FormGroup({
      ModeOfTransportId: new FormControl('', Validators.required),
      ClausesDescription: new FormControl('', Validators.required),
      IntegrationCode: new FormControl('', Validators.required),
      ExtraCoverId: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      effectiveDate: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      DisplayOrder:new FormControl('',Validators.required),
      CoverId:new FormControl('',Validators.required),
      //refStatus: new FormControl('Y', Validators.required),
      status: new FormControl('Y', Validators.required),
      PdfLocation:new FormControl('')
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


  public getCoverName(type) {
    if(type=='change'){
      this.wsrccForm.controls['CoverId'].setValue("");
    }
    const ReqObj = {
      'BranchCode': this.userDetails.Result.BelongingBranch,
      'ProductId' : '3',
      'ModeOfTransportCode':this.wsrccForm.controls['ModeOfTransportId'].value,
      'OpenCoverNo':"",
      'pvType': 'cover',
    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/cover`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.CoverList = data.Result;
        }
      },
      (err) => { },
    );
  }


  getCoverEdit() {
    let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "ClausesId": this.clausesId,
      "CoverId": this.CoverId
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/warsrcc/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.Result.EffectiveDate);


        this.coverDetails = data.Result;
        this.CoverId = this.coverDetails.CoverId;
        this.ReferralValue = this.coverDetails.ReferralValue;
        this.wsrccForm.controls['ModeOfTransportId'].setValue(this.coverDetails.ModeOfTransportId);
        this.getCoverName('direct');
        this.wsrccForm.controls['CoverId'].setValue(this.coverDetails.CoverId);
        this.wsrccForm.controls['IntegrationCode'].setValue(this.coverDetails.IntegrationCode);
        this.wsrccForm.controls['ClausesDescription'].setValue(this.coverDetails.ClausesDescription);
        this.wsrccForm.controls['PdfLocation'].setValue(this.coverDetails.PdfLocation);
        this.wsrccForm.controls['coreApplicationCode'].setValue(this.coverDetails.CoreApplicationCode);
        this.wsrccForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.coverDetails.EffectiveDate));
        this.wsrccForm.controls['remarks'].setValue(this.coverDetails.Remarks);
        this.wsrccForm.controls['DisplayOrder'].setValue(this.coverDetails.DisplayOrder);
        //this.wsrccForm.controls['refStatus'].setValue(this.coverDetails.ReferralStatus);
        this.wsrccForm.controls['status'].setValue(this.coverDetails.Status);
        this.wsrccForm.controls['ExtraCoverId'].setValue(this.coverDetails.ExtraCoverId);


        //this.wsrccForm.controls['ClausesId'].setValue(this.coverDetails.ClausesId);

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
    this.router.navigateByUrl('/Marine/masters/wsrcc/view');
  }

  public onSave() {
    if (this.wsrccForm.controls['ModeOfTransportId'].value) {
      var countryId = this.transportList.filter((val) => {
        if (val.Code == this.wsrccForm.controls['ModeOfTransportId'].value) {
          return val
        }
      })
      console.log(countryId[0].Code);
    } else {
      countryId = [""];
    }
    let effectiveDate = this.wsrccForm.controls['effectiveDate'].value ? moment(new Date(this.wsrccForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";
    let ReqObj = {
      "BranchCode": this.userDetails?.Result.BelongingBranch,
      "CoreApplicationCode": this.wsrccForm.controls['coreApplicationCode'].value,
      "CoverId": this.wsrccForm.controls['CoverId'].value,
      //"CoverName": this.wsrccForm.controls['coverName'].value,
      //"CoverRate": this.wsrccForm.controls['coverRate'].value,
      "EffectiveDate":effectiveDate,
      "ClausesDescription": this.wsrccForm.controls['ClausesDescription'].value,
      "ModeOfTransportId": this.wsrccForm.controls['ModeOfTransportId'].value,
      //"ReferralStatus": this.wsrccForm.controls['refStatus'].value,
      //"ReferralValue": this.ReferralValue,
      "Remarks": this.wsrccForm.controls['remarks'].value,
      "Status": this.wsrccForm.controls['status'].value,
      "IntegrationCode":this.wsrccForm.controls['IntegrationCode'].value,
      "ExtraCoverId":this.wsrccForm.controls['ExtraCoverId'].value,
      "PdfLocation":this.wsrccForm.controls['PdfLocation'].value,
      "DisplayOrder":this.wsrccForm.controls['DisplayOrder'].value,
      "ClausesId":this.clausesId,



      //"ModeOfTransportDesc": countryId[0].CodeDescription
    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/warsrcc/save`, ReqObj).subscribe(
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
          this.router.navigateByUrl('/Marine/masters/wsrcc/view');
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

