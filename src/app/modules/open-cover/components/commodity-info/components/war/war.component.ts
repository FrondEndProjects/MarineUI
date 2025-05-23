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
  selector: 'app-war',
  templateUrl: './war.component.html',
  styleUrls: ['./war.component.scss']
})
export class WarComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public modeTransportList: any[] = [];
  public cityList: any[] = [];
  public editData: any[] = [];

  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public isFormValid: boolean = false;
  public index = 1;
  public destroyByClick = true;
  public duration = 2000;
  public hasIcon = true;
  public preventDuplicates = false;
  public status: NbComponentStatus = 'primary';
  public title = 'HI there!';
  public content = `I'm cool toaster!`;
  public position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

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
    this.onCreateWarFormList();
  }





  onCreateWarFormList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/city/${this.userDetails.BelongingBranch}`;
    const urlLink1 = `${this.ApiUrl1}OpenCover/modeoftransport/edit/list`;
    const urlLink2 = `${this.ApiUrl1}OpenCover/warrate/list`;
    const reqData = {
      "BranchCode": this.userDetails.BranchCode,
      "ProposalNo": this.proposalNo
    };
    const cityList = this.openCoverService.onGetMethodSync(urlLink);
    const modeTransList = this.openCoverService.onPostMethodSync(urlLink1, reqData);
    const editList = this.openCoverService.onPostMethodSync(urlLink2, reqData);

    const list: any[] = [cityList, modeTransList, editList]
    forkJoin(list).subscribe((item: any) => {
      this.cityList = item[0]?.Result || [];
      this.cityList.unshift({CityCode: '9999', CityName: 'All'});
      this.modeTransportList = item[1]?.Result || [];
      this.editData = item[2]?.Result.TransportInfo || [];
      const editData: any[] = this.editData.map((item, index) => item.CityInfo.map(x => ({
        modeOfTransport: this.modeTransportList,
        warCity: this.cityList,
        modeTransVal: item.ModeOfTransport,
        warCityVal: x.CityCode,
        warRate: x.WarRate,
        id: index,
      })));

      console.log('war-edit', editData);
      this.columnHeader = [
        {
          key: 'modeOfTransport',
          display: 'Mode of Transport',
          config: {
            isdropdownLis: true,
            keyName: 'ModeOfTransportName',
            KeyCode: 'ModeOfTransportId',
            model: 'modeTransVal'
          },
        },
        {
          key: 'warCity',
          display: 'City',
          config: {
            isdropdownLis: true,
            keyName: 'CityName',
            KeyCode: 'CityCode',
            model: 'warCityVal'
          },
        },
        {
          key: 'warRate',
          display: 'PVT Rate',
          config: {
            isTextBox: true,
            isDecimal:true,
            model:'warRate'
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
      if (this.editData.length > 0) {
        for (let index = 0; index < editData.length; index++) {
          const element = editData[index];
          this.tableData.push(...element);
        }
      } else {
        this.addFormRow();
      }

    })
  }

  addFormRow() {
    var formObj = {};
    formObj['modeOfTransport'] = this.modeTransportList;
    formObj['warCity'] = this.cityList;
    formObj['modeTransVal'] = '';
    formObj['warCityVal'] = '';
    formObj['warRate'] = '';
    formObj['id'] = this.tableData.length;
    this.tableData.push(formObj);
    this.materialTableComponent.dataSource.sort = this.materialTableComponent.sort;
    this.materialTableComponent.dataSource.paginator = this.materialTableComponent.paginator;

  }


  onSubmit() {
    const urlLink = `${this.ApiUrl1}OpenCover/warrate/save`;
    const TransportInfo: any[] = this.tableData.map(x => ({
      "CityCode": x.warCityVal,
      "CityName": this.getCodeDescription(x.warCityVal, 'CityCode', 'CityName', this.cityList),
      "ModeOfTransport": x.modeTransVal,
      "ModeOfTransportName": this.getCodeDescription(x.modeTransVal, 'ModeOfTransportId', 'ModeOfTransportName', this.modeTransportList),
      "WarRate": x.warRate
    }))
    const reqData = {
      "ProposalNo": this.proposalNo,
      "TransportInfo": TransportInfo,
    };
    console.log(reqData);

    this.tableData.map((ele: any) => {
      if (ele.warCityVal != '' && ele.modeTransVal != '' && ele.warRate != '') {
        console.log(true);
        this.isFormValid = true;

      } else {
        console.log(false);
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

  getCodeDescription(id: any, keyId: any, keyName: any, arrayList: any[]) {
    let idx = arrayList.findIndex((ele: any) => ele[keyId] == id);
    if (idx != -1) {
      return arrayList[idx][keyName];

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
