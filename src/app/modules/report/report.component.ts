import { SharedService } from './../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../app-config.json';
import * as moment from 'moment';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any='';

  public OpenCover:any;
  public searchForm!: FormGroup;
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public brokerList: any[] = [];
  result: any;

  constructor(
    private _formBuilder: FormBuilder,
    private sharedService:SharedService,
    private sessionStorageService: SessionStorageService

  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));

    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails.LoginId;
    }
  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onGetBrokerList();
  }

  onCreateFormControl() {
    this.searchForm = this._formBuilder.group({
      userId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

  }
  get sF() {
    return this.searchForm?.controls;
  }
  onGetBrokerList() {
    const urlLink = `${this.ApiUrl1}menu/portfolio/dropdownlist`;
    const reqData = {
      "Type": "P",
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails?.BranchCode
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.brokerList = data?.Result;
      },
      (err) => { },
    );
  }

  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}menu/policyreport`;
    const reqData = {
      "LoginId":this.sF.userId.value,
      "UserLogin":this.loginId,
      "ProductId":this.productId,
      "ApplicationId":this.applicationId,
      "OpenCoverNo":this.OpenCover?.value,
      "BranchCode":this.userDetails?.BranchCode,
      "StartDate":this.sF.startDate.value?.replace(/-/g, '/'),
      "EndDate": this.sF.endDate.value?.replace(/-/g, '/'),
    }
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.tableData = [];

        if (data?.Result) {
          this.columnHeader = [
            { key: 'PolicyIssueDate', display: 'Policy IssueDate' },
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'InceptionDate', display: 'Inception Date' },
            { key: 'DebitNoteNo', display: 'DebitNote No' },
            { key: 'CreditNoteNo', display: 'CreditNote No' },
            { key: 'InsuredName', display: 'Insured Name' },
            { key: 'CarrierName', display: 'Carrier Name' },
            { key: 'OriginCountry', display: 'Origin Country' },
            { key: 'DestCountry', display: 'Destination Country' },
            { key: 'Via', display: 'Via' },
            { key: 'FormOfTransport', display: 'Form Of Transport' },
          ];
          this.tableData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  onDocument(val:any) {
    const urlLink = `${this.ApiUrl1}pdf/policyReport`;
    const reqData = {
      "OpenCoverNo":this.OpenCover?.value,
      "Type":val,
      "LoginId":this.loginId,
      "BrokerLogin":this.sF.userId.value,
      "ProductId":this.productId,
      "StartDate":this.sF.startDate.value?.replace(/-/g, '/'),
      "EndDate": this.sF.endDate.value?.replace(/-/g, '/'),
      "BranchCode":this.userDetails.BranchCode,
    }
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.result=data.Result;
        this.onDownloadSchedule(this.result,val)

      },
      (err) => { },
    );
  }


  onDownloadSchedule(Results,val){

    console.log('jjjjjjjj',)
   /* const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo":row.QuoteNo
    }*/
      if(Results){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', Results);
        link.setAttribute('download','Reports');
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
   
  }

}
