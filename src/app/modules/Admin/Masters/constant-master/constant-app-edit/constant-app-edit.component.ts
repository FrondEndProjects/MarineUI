import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import * as moment from 'moment';
import * as Mydatas from '../../../../../app-config.json';
import { MastersService } from '../../masters.service';

@Component({
  selector: 'app-constant-app-edit',
  templateUrl: './constant-app-edit.component.html',
  styleUrls: ['./constant-app-edit.component.scss']
})
export class ConstantAppEditComponent implements OnInit {
  public min: Date;

  public constantForm: FormGroup;

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public Userdetails: any;
  public branchCode: any;
  public ConstantId; constantDetails;

  constructor(private router: Router, private route: ActivatedRoute,private toastrService:NbToastrService,
    private masterSer: MastersService) {

    this.min = new Date();

    this.Userdetails = JSON.parse(sessionStorage.getItem('Userdetails'));

    if (this.Userdetails) {
      this.branchCode = this.Userdetails?.LoginResponse?.BranchCode;
    }

    this.ConstantId = JSON.parse(sessionStorage.getItem('constantData'));
    if (this.ConstantId) {
      this.getConstantList();
    } else {
      this.ConstantId = null;
    }

  }

  ngOnInit(): void {
    this.createForm();
  }

  getConstantList() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "CategoryId": this.ConstantId
    }
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/constant/edit`, ReqObj).subscribe(
      (data: any) => {
        console.log(data);

        this.constantDetails = data.Result;
        this.constantForm.controls['categoryName'].setValue(this.constantDetails.CategoryName);
        this.constantForm.controls['coreApplicationCode'].setValue(this.constantDetails.CoreApplicationCode);
        this.constantForm.controls['status'].setValue(this.constantDetails.Status);
      }, (err) => { }
    )
  }



  public createForm() {

    this.constantForm = new FormGroup({
      categoryName: new FormControl('', Validators.required),
      coreApplicationCode: new FormControl('', Validators.required),
      status: new FormControl('Y', Validators.required),
    });
  }

  public goBack() {
    this.router.navigateByUrl('/Marine/masters/constant/view');
  }

  onSave() {
    let ReqObj = {
      "BranchCode": this.branchCode,
      "CategoryId": this.ConstantId,
      "CategoryName": this.constantForm.controls['categoryName'].value,
      "CoreApplicationCode": this.constantForm.controls['coreApplicationCode'].value,
      "Status": this.constantForm.controls['status'].value,
    }
    console.log(ReqObj);
    this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/constant/save`, ReqObj).subscribe(
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
            'Constant Details Inserted/Updated Successfully',
            'Constant Details',
            config);
        sessionStorage.removeItem('constantData');
        this.router.navigateByUrl('/Marine/masters/constant/view');
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
