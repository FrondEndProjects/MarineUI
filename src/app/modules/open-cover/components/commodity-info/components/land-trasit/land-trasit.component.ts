import { MaterialTableComponent } from './../../../../../../shared/Tables/material-table/material-table.component';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { OpenCoverService } from '../../../../open-cover.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-land-trasit',
  templateUrl: './land-trasit.component.html',
  styleUrls: ['./land-trasit.component.scss']
})
export class LandTrasitComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public haulierCateList: any[] = [];
  public editData: any[] = [];

  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public isFormValid: boolean = false;
  @ViewChild(MaterialTableComponent) materialTableComponent: MaterialTableComponent

  public index = 1;
  public destroyByClick = true;
  public duration = 2000;
  public hasIcon = true;
  public preventDuplicates = false;
  public status: NbComponentStatus = 'primary';
  public title = 'HI there!';
  public content = `I'm cool toaster!`;
  public position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private toastrService: NbToastrService,
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnInit(): void {
    this.onCreateLandTrasitForm();

  }


  onCreateLandTrasitForm() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/haulierCategory`;
    const urlLink1 = `${this.ApiUrl1}OpenCover/vehicle/list`;
    const reqData = {
      "BranchCode": this.userDetails.BranchCode
    };
    const reqData2 = {
      "ProposalNo": this.proposalNo
    };
    const haulierList = this.openCoverService.onPostMethodSync(urlLink,reqData);
    const editData = this.openCoverService.onPostMethodSync(urlLink1,reqData2);

    forkJoin([haulierList,editData]).subscribe((item:any)=>{
      console.log('land',item);
      this.haulierCateList = item[0]?.Result || [];
      this.editData = item[1]?.Result || [];
      this.columnHeader = [
        {
          key: 'haulierCate',
          display: 'Haulier Category',
          config: {
            isdropdownLis: true,
            keyName: 'CodeDescription',
            KeyCode: 'Code',
            model: 'haulierCateVal'
          },
        },
        {
          key: 'description',
          display: 'Category Description',
          config: {
            isTextBoxLetter: true,
            model: 'description'
          },
        },
        {
          key: 'startLimit',
          display: 'Start Limit',
          config: {
            isTextBox: true,
            isDecimal:true,
            model: 'startLimit'
          },
        },
        {
          key: 'endLimit',
          display: 'End Limit',
          config: {
            isTextBox: true,
            isDecimal:true,
            model: 'endLimit'
          },
        },

        {
          key: 'premium',
          display: 'Premium (per vehicle)',
          config: {
            isTextBox: true,
            isDecimal:true,
            model: 'premium'
          },
        },
        {
          key: 'action',
          display: 'Actions',
          config: {
            isActions: true,
          },
        },
      ];

      const edit:any[] = this.editData.map((x,index)=>({
        'haulierCate':this.haulierCateList,
        'haulierCateVal':x.HaulierCategoryId,
        'description':x.HaulierCategory,
        'startLimit':x.StartLimt,
        'endLimit':x.EndLimit,
        'premium':x.PremiumVec,
        'id':index,
      }))

      if(this.editData.length > 0){
        this.tableData = [...edit];
      }else{
        this.addFormRow();
      }

    })


  }

  addFormRow() {
    var formObj = {};
    formObj['haulierCate'] = this.haulierCateList;
    formObj['haulierCateVal'] = '';
    formObj['description'] = '';
    formObj['startLimit'] = '';
    formObj['endLimit'] = '';
    formObj['premium'] = '';
    formObj['id'] = this.tableData.length;
    this.tableData.push(formObj);
    this.materialTableComponent.dataSource.sort = this.materialTableComponent.sort;
    this.materialTableComponent.dataSource.paginator = this.materialTableComponent.paginator;
  }


  onSubmit() {
    const urlLink = `${this.ApiUrl1}OpenCover/save/vehicle`;
    const VehicleRange: any[] = this.tableData.map(x => ({
      "EndLimit": x.endLimit,
      "HaulierCategory": x.haulierCate[x.id].CodeDescription,
      "HaulierCategoryId": x.haulierCateVal,
      "PremiumVec": x.premium,
      "StartLimt": x.startLimit
    }))
    const reqData = {
      "ProposalNo": this.proposalNo,
      "VehicleRange": VehicleRange
    };
    console.log(reqData);

    this.tableData.map((ele: any) => {
      if (ele.haulierCateVal != '' && ele.description != '' && ele.startLimit != '' && ele.endLimit != '' && ele.premium != '') {
        this.isFormValid = true;
      } else {
        this.isFormValid = false;
        this.showToast('warning', 'Error', 'Please Fill All The Fields');
      }
    })

    if (this.isFormValid) {
      this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log('res', data);
        },
        (err) => { },
      );
    }

  }


  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.index += 1;
    this.toastrService.show(
      body,
      titleContent,
      config);
  }
}
