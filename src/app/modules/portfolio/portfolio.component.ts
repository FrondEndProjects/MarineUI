import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../app-config.json';
import { SharedService } from '../../shared/shared.service';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

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
    private sessionStorageService: SessionStorageService
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
