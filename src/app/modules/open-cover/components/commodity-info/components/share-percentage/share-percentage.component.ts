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
  selector: 'app-share-percentage',
  templateUrl: './share-percentage.component.html',
  styleUrls: ['./share-percentage.component.scss']
})
export class SharePercentageComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public isFormValid: boolean = false;

  public insuranceList: any[] = [];
  public editData: any[] = [];
  @ViewChild(MaterialTableComponent) materialTableComponent: MaterialTableComponent




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
    this.onCreateSharedPrecentForm();
  }

  onCreateSharedPrecentForm() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/insurancecompany`;
    const urlLink1 = `${this.ApiUrl1}OpenCover/sharepercentage/edit`;
    const reqData = {
      "ProposalNo": this.proposalNo,
      "ProductId": "11"
    };
    const reqData2 = {
      "ProposalNo": this.proposalNo
    };
    const insuranceList = this.openCoverService.onPostMethodSync(urlLink, reqData);
    const editData = this.openCoverService.onPostMethodSync(urlLink1, reqData2);

    forkJoin([insuranceList, editData]).subscribe((item: any) => {
      console.log('shared-precentage', item);
      const AdditonalInsuranceResponse: any[] = item[0]?.Result?.AdditonalInsuranceResponse || [];
      const OrginalInsuranceResponse: any[] = item[0]?.Result?.OrginalInsuranceResponse || [];

      this.insuranceList = [...AdditonalInsuranceResponse, ...OrginalInsuranceResponse];
      this.editData = item[1]?.SharePercentageResponse?.InsuranceCompanyInfo || [];

      this.columnHeader = [
        {
          key: 'insuranceList',
          display: 'Insurance Company Name',
          config: {
            isdropdownLis: true,
            keyName: 'InsuranceCompanyName',
            KeyCode: 'InsuranceCompanyId',
            model: 'insuranceId',
            isDisabled: true
          },
        },
        {
          key: 'sharedPercent',
          display: 'Shared Percentage',
          config: {
            isTextBox: true,
            model: 'sharedPercent',
            isDisabled: true
          },
        },

      ];
      let edit: any[];
      if (this.editData.length == 0) {
        edit = OrginalInsuranceResponse.map((x, index) => ({
          'insuranceList': this.insuranceList,
          'insuranceId': x.InsuranceCompanyId,
          'sharedPercent': x.SharedPercentage,
          'LeadershipYn': x.LeadershipYn,
          'id': index,
        }))
      } else {
        edit = this.editData.map((x, index) => ({
          'insuranceList': this.insuranceList,
          'insuranceId': x.InsuranceCompanyCode,
          'sharedPercent': x.SharePercentage,
          'LeadershipYn': x.LeadershipYn,
          'id': index,
        }))
      }

      if (edit.length > 0) {
        this.tableData = [...edit];
      } else {
        // this.addFormRow();
      }

    })


  }

  // addFormRow() {
  //   var formObj = {};
  //   formObj['insuranceList'] = this.insuranceList;
  //   formObj['insuranceId'] = '';
  //   formObj['sharedPercent'] = '';
  //   formObj['id'] = this.tableData.length;
  //   this.tableData.push(formObj);
  //   this.materialTableComponent.dataSource.sort = this.materialTableComponent.sort;
  //   this.materialTableComponent.dataSource.paginator = this.materialTableComponent.paginator;
  // }


  onSubmit() {
    const urlLink = `${this.ApiUrl1}OpenCover/sharepercentage/save`;
    const InsuranceCompanyInfo: any[] = this.tableData.map(x => ({
      "InsuranceCompanyCode": x.insuranceId,
      "InsuranceCompanyName": x.insuranceList[x.id].InsuranceCompanyName,
      "LeadershipYn": x.LeadershipYn,
      "SharePercentage": x.sharedPercent
    }))
    const reqData = {
      "ProposalNo": this.proposalNo,
      "InsuranceCompanyInfo": InsuranceCompanyInfo,
    };
    console.log(reqData);
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('save', data);
      },
      (err) => { },
    );

  }

}
