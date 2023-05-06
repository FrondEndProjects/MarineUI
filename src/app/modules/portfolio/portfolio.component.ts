import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../app-config.json';
import { SharedService } from '../../shared/shared.service';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import { AdminReferralService } from '../admin-referral/admin-referral.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],

})
export class PortfolioComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];

  public brokerList: any[] = [];
  public selectedBroker: any = null;
  public OpenCover:any;
  public routerBaseLink:any='';



  constructor(
    private sharedService: SharedService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private adminReferralService: AdminReferralService,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
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
    this.onGetBrokerList();
  }

  onGetBrokerList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/portfolio/brokerList`;
    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.brokerList = data?.Result;
      },
      (err) => { },
    );
  }
  onChangeBroker() {
    this.loginId = this.selectedBroker;
    this.onLoadGrid();
  }

  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}opencover/report/policyregister`;
    const reqData = {
      "LoginId": this.loginId,
      "BranchCode": this.userDetails.BranchCode
    }
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.tableData = [];

        if (data?.Result) {
          this.columnHeader = [

            { key: 'MissippiOpenCoverNo', display: 'Core Policy No', sticky: false, },
            { key: 'CompanyName', display: 'Company Name' },
            { key: 'ProposalNo', display: 'Proposal No' },
            { key: 'CrossVoyageTurnover', display: 'Balance Suminsured' },
            { key: 'OpenCoverStartDate', display: 'Policy StartDate' },
            { key: 'OpenCoverEndDate', display: 'Policy EndDate' },
            {
              key: 'Endorse',
              display: 'Endorse',
              config: {
                isEdit: true,
              }
            },

            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'View' },
                  { name: 'Schedule' },
                  { name: 'Policy Wordings' },
                  { name: 'Documents' },
                  { name: 'EndtSchedule' },
                  { name: 'DeActivate' },
                ]
              },
            },
          ];
          this.tableData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  scheduled(row,rowData){
    console.log('rrrrrrr',row.data.OriginalPolicyNo)
    const urlLink = `${this.ApiUrl1}pdf/opencover`;
    const reqData = {
      "BranchCode":this.userDetails.BranchCode,
      //"PolicyNo":row.data.OriginalPolicyNo,
  "EndtStatus":row.data.EndtStatus,
  "ImageStatus": "Y",
  "OpenCoverNo": row.data.OpenCoverNo,
  "ProposalNo": row.data.ProposalNo,
  "Status":row.data.Status

    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        //sessionStorage.setItem('ProposalNo',data.ProposalNo);
        //this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);

      },
      (err) => { },
    );
  }

  policyword(row,rowData){
    console.log('rrrrrrr',row.data.OriginalPolicyNo)
    const urlLink = `${this.ApiUrl1}pdf/opencover/policywording`;
    const reqData = {
      "BranchCode":this.userDetails.BranchCode,
      //"PolicyNo":row.data.OriginalPolicyNo,
      "EndtStatus":row.data.EndtStatus,
      "ImageStatus": "Y",
      "OpenCoverNo": row.data.OpenCoverNo,
      "ProposalNo": row.data.ProposalNo,
      "Status":row.data.Status

    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        //sessionStorage.setItem('ProposalNo',data.ProposalNo);
        //this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);

      },
      (err) => { },
    );
  }


  viewDocument(){

  }

  EndtSchedule(row,rowData){
    const urlLink = `${this.ApiUrl1}pdf/endtcertificate`;
    const reqData = { 
    "BranchCode": this.userDetails.BranchCode,
    "ApplicationNo":"",
    "BelongingBranchCode":"",
    "PolicyNo": row.data.OriginalPolicyNo
   
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result) {
          
        }
        //this.branchList = data || [];
        //this.getExistingAdmin();
      },
      (err) => { },
    );
  }

  deactive(row,rowData){
    const urlLink = `${this.ApiUrl1}OpenCover/deactivate`;
    const reqData = { 
    "BranchCode": this.userDetails.BranchCode,
    "ProposalNo": row.data.ProposalNo
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Result) {
          this.onChangeBroker(); 
          //this.onLoadGrid();
        }
        //this.branchList = data || [];
        //this.getExistingAdmin();
      },
      (err) => { },
    );
  }
  onmenu(row,rowData){
    console.log('jjjjjjjjjjj',row)
    console.log('kkkkkkkk',rowData)

    if(rowData=='Schedule'){
      this.scheduled(row,rowData);
    }
    else if(rowData=='Policy Wordings'){
      this.policyword(row,rowData)
    }
    else if(rowData=='Documents'){
      this.viewDocument()
    }
    else if(rowData=='EndtSchedule'){
     this.EndtSchedule(row,rowData)
    }
    else if(rowData=='DeActivate'){
       this.deactive(row,rowData)
    }
    else if(rowData == 'View'){
        this.router.navigate(['/Marine/viewportfolio'])
    }
  }

  onschedule(){

  }

  onEdit(event: any) {
  console.log(event);
    this.onEndorse(event)
  }

  onEndorse(event:any) {
    const urlLink = `${this.ApiUrl1}OpenCover/endorsement`;
    const reqData = {
      'ProposalNo': event.ProposalNo,
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.setItem('ProposalNo',data.ProposalNo);
        this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);

      },
      (err) => { },
    );
  }
}
