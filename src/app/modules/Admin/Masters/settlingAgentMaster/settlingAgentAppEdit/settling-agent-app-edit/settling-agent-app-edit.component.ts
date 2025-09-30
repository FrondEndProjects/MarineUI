//import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../../app-config.json';
import { MastersService } from '../../../masters.service';
import * as moment from 'moment';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-settling-agent-app-edit',
  templateUrl: './settling-agent-app-edit.component.html',
  styleUrls: ['./settling-agent-app-edit.component.scss']
})
export class SettlingAgentAppEditComponent implements OnInit {





    public min: Date = new Date();
    public newDate: Date = new Date();
    public minDate:any;

    public settlingForm: FormGroup;
    public transportList = [];
    public conveyanceId; conveyanceTransport;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public userDetails: any;
    public branchCode: any;
    public countryList=[];
    public CityList=[];
  SettlingAgentId: any;
  public cityId;
  c: any;
  CountryId: any;
  SettlingAgentName: any;

    constructor(
      private router: Router,
      private toastrService: NbToastrService,
      private masterSer: MastersService,private datePipe: DatePipe) {

        //this.minDate = {year: this.newDate.getFullYear(), month: this.newDate.getMonth() + 1, day: this.newDate.getDate()};
          this.minDate = new Date();
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

      //this.conveyanceId = JSON.parse(sessionStorage.getItem('conveyanceId'));
      //this.conveyanceTransport = JSON.parse(sessionStorage.getItem('conveyanceTransport'));
        this.SettlingAgentId=JSON.parse(sessionStorage.getItem('settlingAgentData'));
        this.SettlingAgentName=JSON.parse(sessionStorage.getItem('settlingAgentName'));
      if (this.SettlingAgentId) {
        //alert(this.SettlingAgentId)
        this.getConveyanceEdit();
      }
      else {
        this.SettlingAgentId = null;
        //alert(this.SettlingAgentId)
        //this.conveyanceTransport = null;
      }

    }

    ngOnInit(): void {
      this.getModeOFtransportList();
      //his.city();
      this.createForm();
    }

    public createForm() {
      this.settlingForm = new FormGroup({
        CountryId: new FormControl('', Validators.required),
        CityName: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        coreApplicationCode : new FormControl('', Validators.required),
        TelephoneNo: new FormControl('', Validators.required),
        remarks : new FormControl(''),
        status : new FormControl('Y', Validators.required),
        Address1 : new FormControl('', Validators.required),
        Address2 : new FormControl('', Validators.required),
        Address3 : new FormControl('', Validators.required),
        MobileNo : new FormControl('', Validators.required),
        ShortName : new FormControl('', Validators.required),
        FaxNo : new FormControl('', Validators.required),
        ZipCode : new FormControl('', Validators.required),
        SettlingName : new FormControl('', Validators.required),
        EffectiveDateStart:new FormControl('',Validators.required)

      });
    }

     // get transport list
     public getModeOFtransportList() {
      /*const ReqObj = {
        'BranchCode': this.branchCode,
        'ProductId' : '3',
        OpenCoverNo : '',
      };

      this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/modeoftransport`, ReqObj).subscribe(
        (data: any) => {
          if (data?.Message === 'Success') {
            this.transportList = data.Result;
          }
        },
        (err) => { },
      );*/
      let ReqObj = {
        "BranchCode": this.userDetails.Result.BelongingBranch,
        "ProductId": "3"

      }
      this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/originationcountry`, ReqObj).subscribe(
        (data: any) => {
          console.log(data);

          if (data.Message == 'Success') {
            this.countryList = data.Result;
            this.city();
          }
        }


      )
    }
  public city(){

    console.log('gggggggggg',this.settlingForm.controls['CountryId'])
    this.c=this.settlingForm.controls['CountryId'].value
    let reqObj=
       {
        "OriginationCountryCode":this.c,
        'BranchCode':this.userDetails?.BelongingBranch,
      }
      this.masterSer.onPostMethodSync(`${this.ApiUrl1}quote/dropdown/originationcity`, reqObj).subscribe(
        (data: any) => {
          console.log(data);

          if (data.Message == 'Success') {
            this.CityList = data.Result;
          }
        }


      )
  }
    getConveyanceEdit() {
      let ReqObj = {
        "BranchCode": this.userDetails?.Result.BelongingBranch,
        "SettlingAgentId":this.SettlingAgentId

      }
      console.log(ReqObj);

      this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/settlingagent/edit`, ReqObj).subscribe(
        (data: any) => {
          console.log(data);

          let conveyanceDetails = data.Result;
          //this.CountryId=conveyanceDetails.
          this.CountryId = conveyanceDetails.CountryId;
          //this.settlingForm.controls['ModeOfTransportId'].setValue(conveyanceDetails.ModeOfTransportId);
          this.settlingForm.controls['CountryId'].setValue(conveyanceDetails.CountryId);
          this.settlingForm.controls['CityName'].setValue(conveyanceDetails.CityName);
          this.settlingForm.controls['Email'].setValue(conveyanceDetails.Email);
          this.settlingForm.controls['coreApplicationCode'].setValue(conveyanceDetails.CoreApplicationCode);
          this.settlingForm.controls['TelephoneNo'].setValue(conveyanceDetails.TelephoneNo);
          this.settlingForm.controls['remarks'].setValue(conveyanceDetails.Remarks);
          this.settlingForm.controls['status'].setValue(conveyanceDetails.Status);
          this.settlingForm.controls['MobileNo'].setValue(conveyanceDetails.MobileNo);
          this.settlingForm.controls['Address1'].setValue(conveyanceDetails.Address1 );
          this.settlingForm.controls['Address2'].setValue(conveyanceDetails.Address2);
          this.settlingForm.controls['Address3'].setValue(conveyanceDetails.Address3);
          this.settlingForm.controls['FaxNo'].setValue(conveyanceDetails.FaxNo);
          this.settlingForm.controls['ZipCode'].setValue(conveyanceDetails.ZipCode);
          this.settlingForm.controls['ShortName'].setValue(conveyanceDetails.ShortName);
          this.settlingForm.controls['SettlingName'].setValue(conveyanceDetails.SettlingAgentName);
          this.settlingForm.controls['EffectiveDateStart'].setValue(this.onDateFormatInEdit(conveyanceDetails.EffectiveDate));
        }
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



    public goBack() {
      this.router.navigateByUrl('/Marine/masters/settling-agent/view');
    }

    public onSave() {
      /*if (this.settlingForm.controls['CityName'].value) {
        var cityName = this.CityList.filter((val) => {
          if (val.Code == this.settlingForm.controls['CityName'].value) {
            return val
          }
        })
        console.log(cityName[0].Code);
      } else {
        cityName = [""];
      }*/
       // Effective Date Format
       console.log('EFFFFFFF',this.settlingForm.controls['effectiveDate'])
       //let effectiveDate = this.settlingForm.controls['effectiveDate'].value ? moment(new Date(this.conveyanceForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";
        //console.log('EEEEEEEEEE',effectiveDate);
       let ReqObj = {
        "AmendId":'',
        "BranchCode": this.userDetails?.Result.BelongingBranch,
        //"ConveyanId": this.conveyanceId,
        "CoreApplicationCode": this.settlingForm.controls['coreApplicationCode'].value,
        //"EffectiveDate": effectiveDate,
        //"ModeOfTransportId": this.settlingForm.controls['ModeOfTransportId'].value,
        "Remarks": this.settlingForm.controls['remarks'].value,
        "Status": this.settlingForm.controls['status'].value,
        "Address1": this.settlingForm.controls['Address1'].value,
           "Address2": this.settlingForm.controls['Address2'].value,
            "Address3": this.settlingForm.controls['Address3'].value,
            "CityId":"0",
              "CityName":this.settlingForm.controls['CityName'].value,
            "CountryId": this.settlingForm.controls['CountryId'].value,
             "Email": this.settlingForm.controls['Email'].value,
           "FaxNo": this.settlingForm.controls['FaxNo'].value,
         "MobileNo": this.settlingForm.controls['MobileNo'].value,
         "SettlingAgentId":this.SettlingAgentId,
      "SettlingAgentName":this.settlingForm.controls['SettlingName'].value,
   "ShortName":this.settlingForm.controls['ShortName'].value,
   "TelephoneNo": this.settlingForm.controls['TelephoneNo'].value,
   "ZipCode": this.settlingForm.controls['ZipCode'].value,
   "EffectiveDate":this.settlingForm.controls['EffectiveDateStart'].value
      }
      if (ReqObj.EffectiveDate != '' && ReqObj.EffectiveDate != null && ReqObj.EffectiveDate != undefined) {
        ReqObj['EffectiveDate'] =  this.datePipe.transform(ReqObj.EffectiveDate, "dd/MM/yyyy")
      }
      else{
        ReqObj['EffectiveDate'] = "";
      }
      this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/settlingagent/save`, ReqObj).subscribe(
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
              'Settling Agent Details Inserted/Updated Successfully',
              'Settling Agent Details',
              config);


            sessionStorage.removeItem('settlingAgentData');
            sessionStorage.removeItem('settlingAgentName');
            this.router.navigateByUrl('/Marine/masters/settling-agent/view');
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

