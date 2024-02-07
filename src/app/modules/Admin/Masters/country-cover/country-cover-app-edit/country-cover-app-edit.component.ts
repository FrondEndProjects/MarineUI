import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import * as moment from 'moment';
import { MastersService } from '../../masters.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;

@Component({
  selector: 'app-country-cover-app-edit',
  templateUrl: './country-cover-app-edit.component.html',
  styleUrls: ['./country-cover-app-edit.component.scss']
})
export class CountryCoverAppEditComponent implements OnInit {

  public minDate: any;

  public countryCoverForm: FormGroup;
  public warehouseList = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public branchCode: any;
  public countryCoverData: any = {}; CountryCoverSno: any; CountryCoverId: any;
  public warrantyList = [];
  public exportWarrantyList: any[] = [];
  public importWarrantyList: any[] = [];
  public warrantyData = [];
  public clickedModal: any = '';
  public newDate: Date = new Date();



  constructor(private masterSer: MastersService,
    private toastrService: NbToastrService,
    private router: Router,
    private dialog: MatDialog) {

    this.minDate = new Date();

    this.createForm();

    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;

    this.CountryCoverId = sessionStorage.getItem('CountryCoverId');
    this.CountryCoverSno = sessionStorage.getItem('CountryCoverSno');

    if (this.CountryCoverId && this.CountryCoverSno) {

      this.getCountryCoverList()

    } else {
      this.CountryCoverId = null;
      this.CountryCoverSno = null;
    }

  }


  ngOnInit(): void {
    this.getWarehouseList();
    this.getWarrantyList();
  }

  public warrantyCon;

  // Modal
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  openDialogWithoutRef(war: string) {


    if (war === 'export') {
      this.clickedModal = war;
      this.warrantyData = this.exportWarrantyList;
    }
    if (war === 'import') {
      this.clickedModal = war;
      this.warrantyData = this.importWarrantyList;

    }


    this.dialog.open(this.secondDialog);

  }

  onSubmit() {
    const selectedList: any[] = this.warrantyData.filter((ele: any) => ele.isChecked === true);
    let selectedListId: any = '';
    for (let index = 0; index < selectedList.length; index++) {
      const element = selectedList[index];
      selectedListId += element.WarrantyId + ',';
      this.dialog.closeAll();
    }
    if (this.clickedModal === 'import') {
      this.countryCoverForm.controls['importWarrantyCondition'].setValue(selectedListId);

    }
    if (this.clickedModal === 'export') {
      this.countryCoverForm.controls['exportWarrantyCondition'].setValue(selectedListId);

    }

  }

  getWarrantyList() {
    let ReqObj = {
      "BranchCode": this.branchCode
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/commodity/warranty`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        if (data.Message === "Success") {
          this.warrantyList = data.Result;

          this.exportWarrantyList = this.warrantyList.map(x => ({
            isChecked: false,
            ...x
          }));
          this.importWarrantyList = this.warrantyList.map(x => ({
            isChecked: false,
            ...x
          }));
        }
        console.log(this.warrantyList);

      }, (err) => { }
    )
  }



  getWarehouseList() {
    this.masterSer.onGetMethodSync(`${this.ApiUrl1}quote/dropdown/warehouse`).subscribe(
      (data: any) => {
        console.log(data);

        this.warehouseList = data.Result;

      }
    )
  }

  getCountryCoverList() {
    let ReqObj = {
      "CountryId": this.CountryCoverId,
      "Sno": this.CountryCoverSno,
      "BranchCode": this.branchCode
    }
    console.log(ReqObj);
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/countrycover/edit`, ReqObj).subscribe(
      (data: any) => {

        this.countryCoverData = data.Result;
        console.log(this.countryCoverData);


        this.countryCoverForm.controls['countryName'].setValue(this.countryCoverData.CountryName);
        this.countryCoverForm.controls['countryShortName'].setValue(this.countryCoverData.CountryShortName);
        this.countryCoverForm.controls['warRate'].setValue(this.countryCoverData.WarRate);
        this.countryCoverForm.controls['warOnLandRate'].setValue(this.countryCoverData.WarLandRate);
        this.countryCoverForm.controls['export'].setValue(this.countryCoverData.EndingPlace);
        this.countryCoverForm.controls['exportWarrantyCondition'].setValue(this.countryCoverData.SPWarrantyCondition);
        this.countryCoverForm.controls['import'].setValue(this.countryCoverData.StartingPlace);
        this.countryCoverForm.controls['importWarrantyCondition'].setValue(this.countryCoverData.EPWarrantyCondition);
        this.countryCoverForm.controls['coreApplicationCode'].setValue(this.countryCoverData.CoreApplicationCode);
        this.countryCoverForm.controls['remarks'].setValue(this.countryCoverData.Remarks);
        this.countryCoverForm.controls['effectiveDate'].setValue(this.onDateFormatInEdit(this.countryCoverData.EffectiveDate));
        this.countryCoverForm.controls['status'].setValue(this.countryCoverData.Status);

      }, (err) => { }
    )
  }


  public createForm() {

    this.countryCoverForm = new FormGroup({
      countryName: new FormControl('', Validators.required),
      countryShortName: new FormControl('', Validators.required),
      warRate: new FormControl('', Validators.required),
      warOnLandRate: new FormControl('', Validators.required),
      export: new FormControl('', Validators.required),
      exportWarrantyCondition: new FormControl('', Validators.required),
      import: new FormControl('', Validators.required),
      importWarrantyCondition: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      remarks: new FormControl(''),
      effectiveDate: new FormControl('', Validators.required),
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
    this.router.navigateByUrl('/Marine/masters/country-cover/view');
  }

  onSave() {


    if (this.countryCoverForm.controls['export'].value) {
      var countryId = this.warehouseList.filter((val) => {
        if (val.Code == this.countryCoverForm.controls['export'].value) {
          return val
        }
      })
      console.log(countryId[0].Code);
    } else {
      countryId = [""];
    }



    if (this.countryCoverForm.controls['import'].value) {
      var country= this.warehouseList.filter((val) => {
        if (val.Code == this.countryCoverForm.controls['import'].value) {
          return val
        }
      })
      console.log(country[0].Code);
    } else {
      country = [""];
    }


    console.log('EFFFFFFF',this.countryCoverForm.controls['effectiveDate'])
    let effectiveDate = this.countryCoverForm.controls['effectiveDate'].value ? moment(new Date(this.countryCoverForm.controls['effectiveDate'].value)).format('DD/MM/YYYY') : "";
     console.log('EEEEEEEEEE',effectiveDate);
    let ReqObj = {
      "BranchCode": this.branchCode,
      "CoreApplicationCode": this.countryCoverForm.controls['coreApplicationCode'].value,
      "CountryId": this.CountryCoverId,
      "CountryName": this.countryCoverForm.controls['countryName'].value,
      "CountryShortName": this.countryCoverForm.controls['countryShortName'].value,
      "EPWarrantyCondition": this.countryCoverForm.controls['importWarrantyCondition'].value,
      "EffectiveDate": effectiveDate,
      "EndingPlace": countryId[0].CodeDescription, //this.countryCoverForm.controls['export'].value,
      "NationalityName": this.countryCoverData.NationalityName,
      "Remarks": this.countryCoverForm.controls['remarks'].value,
      "SPWarrantyCondition": this.countryCoverForm.controls['exportWarrantyCondition'].value,
      "Sno": this.CountryCoverSno,
      "StartingPlace": country[0].CodeDescription,//this.countryCoverForm.controls['import'].value,
      "Status": this.countryCoverForm.controls['status'].value,
      "WarLandRate": this.countryCoverForm.controls['warOnLandRate'].value,
      "WarRate": this.countryCoverForm.controls['warRate'].value,
    }
    console.log(ReqObj);

    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/countrycover/save`, ReqObj).subscribe(
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
            'Country Cover Details Inserted/Updated Successfully',
            'Country Cover Details',
            config);


          sessionStorage.removeItem('CountryCoverId');
          sessionStorage.removeItem('CountryCoverSno');
          this.router.navigateByUrl('/Marine/masters/country-cover/view')
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
