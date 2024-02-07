import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';
import * as moment from 'moment';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { SessionStorageService } from '../../../../../shared/storage/session-storage.service';

@Component({
  selector: 'app-clause-app-edit',
  templateUrl: './clause-app-edit.component.html',
  styleUrls: ['./clause-app-edit.component.scss']
})
export class ClauseAppEditComponent implements OnInit {



  public min: Date = new Date();
  public newDate: Date = new Date();
  public minDate:any;

  //public conveyanceForm: FormGroup;
  public ClausesIdForm: FormGroup;
  public transportList = [];
  public CoverList=[];
  public conveyanceId; conveyanceTransport;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  ClausesId: any;CoverId:any=null;
  productId: any;

  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private masterSer: MastersService,private sessionStorageService: SessionStorageService ) {

      //this.minDate = {year: this.newDate.getFullYear(), month: this.newDate.getMonth() + 1, day: this.newDate.getDate()};
        this.minDate = new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log('llllllllllll',this.userDetails)
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;
    //this.productId = this.userDetails?.LoginResponse?.productId;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;

    console.log('jjjjjjjj',this.productId)
    this.CoverId = JSON.parse(sessionStorage.getItem('editClausesCoverId'));
    this.ClausesId = JSON.parse(sessionStorage.getItem('editClausesId'));
    this.conveyanceTransport = JSON.parse(sessionStorage.getItem('conveyanceTransport'));

    if (this.ClausesId) {
      this.getConveyanceEdit();
    }
    else {
      this.ClausesId = null;
      this.conveyanceTransport = null;
    }

  }

  ngOnInit(): void {
    this.getModeOFtransportList();
    //this.getCoverName();
    this.createForm();
  }

  public createForm() {
    this.ClausesIdForm = new FormGroup({
      ModeOfTransportId: new FormControl('', Validators.required),
      //conveyanceName : new FormControl('', Validators.required),
      //conveyanceRate : new FormControl('', Validators.required),
       CoverId:new FormControl('',Validators.required),
ClausesDescription:new FormControl('',Validators.required),
DisplayOrder:new FormControl('',Validators.required),
ExtraCoverId:new FormControl(''),
PdfLocation:new FormControl(''),
IntegrationCode:new FormControl(''),
  coreApplicationCode : new FormControl('', Validators.required),
      effectiveDate : new FormControl('', Validators.required),
      remarks : new FormControl(''),
      status : new FormControl('Active', Validators.required),
    });
  }

   // get transport list
   public getModeOFtransportList() {
    const ReqObj = {
      'BranchCode': this.branchCode,
      'ProductId' : '3',
      OpenCoverNo : '',
    };

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
      (data: any) => {
        if (data?.Message === 'Success') {
          this.transportList = data.Result;
          //this.getCoverName();
          
        }
      },
      (err) => { },
    );
  }


  public getCoverName(type) {
    if(type=='change'){
      this.ClausesIdForm.controls['CoverId'].setValue("");
    }
    const ReqObj = {
      'BranchCode': this.branchCode,
      'ProductId' : '3',
      'ModeOfTransportCode':this.ClausesIdForm.controls['ModeOfTransportId'].value,
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

  getConveyanceEdit() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "ClausesId":this.ClausesId,
      "CoverId": this.CoverId

    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/clauses/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          let conveyanceDetails = data.Result;
          this.ClausesIdForm.controls['ModeOfTransportId'].setValue(conveyanceDetails.ModeOfTransportId);
          this.getCoverName('direct');
          this.ClausesIdForm.controls['ClausesDescription'].setValue(conveyanceDetails.ClausesDescription);
          this.ClausesIdForm.controls['DisplayOrder'].setValue(conveyanceDetails.DisplayOrder);
          this.ClausesIdForm.controls['PdfLocation'].setValue(conveyanceDetails.PdfLocation);
          this.ClausesIdForm.controls['IntegrationCode'].setValue(conveyanceDetails.IntegrationCode);
          this.ClausesIdForm.controls['ExtraCoverId'].setValue(conveyanceDetails.ExtraCoverId);
          this.ClausesIdForm.controls['coreApplicationCode'].setValue(conveyanceDetails.CoreApplicationCode);
          this.ClausesIdForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(conveyanceDetails.EffectiveDate));
          this.ClausesIdForm.controls['remarks'].setValue(conveyanceDetails.Remarks);
          this.ClausesIdForm.controls['CoverId'].setValue(conveyanceDetails.CoverId);
          this.ClausesIdForm.controls['status'].setValue(conveyanceDetails.Status);
        }
        else alert('Null Response')

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
    this.router.navigateByUrl('/Marine/masters/clause/view');
  }

  public onSave() {

     // Effective Date Format
     console.log('EFFFFFFF',this.ClausesIdForm.controls['effectiveDate'])
     let effectiveDate = this.ClausesIdForm.controls['effectiveDate'].value ? moment(new Date(this.ClausesIdForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";
      console.log('EEEEEEEEEE',effectiveDate);
     let ReqObj = {
      "BranchCode": this.branchCode,
    "CoreApplicationCode": this.ClausesIdForm.controls['coreApplicationCode'].value,
      "EffectiveDate": effectiveDate,
      "ModeOfTransportId": this.ClausesIdForm.controls['ModeOfTransportId'].value,
      "Remarks": this.ClausesIdForm.controls['remarks'].value,
      "Status": this.ClausesIdForm.controls['status'].value,
      "ClausesId":this.ClausesId,
        "CoverId":this.ClausesIdForm.controls['CoverId'].value,
      "ClausesDescription":this.ClausesIdForm.controls['ClausesDescription'].value,
       "DisplayOrder":this.ClausesIdForm.controls['DisplayOrder'].value,
       "ExtraCoverId":this.ClausesIdForm.controls['ExtraCoverId'].value,
     "PdfLocation":this.ClausesIdForm.controls['PdfLocation'].value,
       "IntegrationCode":this.ClausesIdForm.controls['IntegrationCode'].value,

    }

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/clauses/save`, ReqObj).subscribe(
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
            'Clauses Id Details Inserted/Updated Successfully',
            'Clauses Id Details',
            config);


          sessionStorage.removeItem('editClausesId');
          //sessionStorage.removeItem('conveyanceTransport');
          this.router.navigateByUrl('/Marine/masters/clause/view');
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



