import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../app-config.json';
import { SharedService } from '../../shared/shared.service';
import { Observable, merge, combineLatest, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

@Component({
  selector: 'app-open-cover-grid',
  templateUrl: './open-cover-grid.component.html',
  styleUrls: ['./open-cover-grid.component.scss'],
})
export class OpenCoverGridComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public filterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];

  public openCoverMocData: any[] = [];
  public openCoverMocHeader: any[] = [];
  public openCoverMopData: any[] = [];
  public openCoverMopHeader: any[] = [];
  public marineLandCoverData: any[] = [];
  public marineLandCoverHeader: any[] = [];

  public mocFilterValue: any = '';
  public brokerList: any[] = [];
  public selectedBroker:any = null;
  public searchBy:any = null;

  public isIssuer:boolean = false;
  public routerBaseLink:any='';
  public OpenCover:any



  constructor(
    private sharedService: SharedService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    if (this.userDetails.UserType === 'Broker' || this.userDetails.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails.UserType !== 'Broker' && this.userDetails.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails.LoginId;
    }

    if(this.userDetails.UserType =='RSAIssuer'){
      this.isIssuer = true;
      this.onGetBrokerListDrop();
    }
  }

  ngOnInit(): void {
    this.openCoverMocHeader = [
      // { key: 'OpenCoverNo', display: 'Policy No' },
      { key: 'OpenCoverNo', display: 'OpenCover No' },
      { key: 'CustomerName', display: 'Customer Name' },
      { key: 'InceptionDate', display: 'OpenCover Date' },
      { key: 'Voyage', display: 'Balance Sum Insured' },
      { key: 'ExpiryDate', display: 'Validity Period' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isOpenGridAction: true,
        },
      },
      // { key: 'Premium', display: 'Lc Details' },
      // { key: 'Premium', display: 'Certificate' },
      // { key: 'Premium', display: 'Schedule' },
      // { key: 'Premium', display: 'Policy Wording' },

    ];

    this.onLoadData();
  }
  onGetBrokerListDrop(){
    const urlLink = `${this.ApiUrl1}api/login/brokerlist`;
    const reqData = {
      "LoginId":this.userDetails?.LoginId,
      'ProductId': this.productId,
      "BranchCode":this.userDetails?.BranchCode
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data)
        this.brokerList = data?.Result;
      });

  }
  onChangeBroker() {
    this.loginId = this.selectedBroker;
    this.onLoadData();
  }

  onLoadData() {
    const urlLink = `${this.ApiUrl1}api/opencover/searchlist/moc`;
    const urlLink1 = `${this.ApiUrl1}api/opencover/searchlist/mop`;
    const urlLink2 = `${this.ApiUrl1}api/opencover/searchlist/land`;

    const reqData = {
      AgencyCode: '',
      LoginIds: '',
      SearchOption: 'all',
      LoginId: this.loginId,
      UserType: this.userDetails.UserType,
      BranchCode: this.userDetails?.BranchCode,
    };

    const moc = this.sharedService.onPostMethodSync(urlLink, reqData);
    const mop = this.sharedService.onPostMethodSync(urlLink1, reqData);
    const land = this.sharedService.onPostMethodSync(urlLink2, reqData);
    const apiList = [moc, mop, land];
    forkJoin(apiList).subscribe((dataLisst: any[]) => {
      console.log(
        dataLisst,
      );
      this.openCoverMocData = dataLisst[0]?.Result;
      this.openCoverMopData = dataLisst[1]?.Result;
      this.marineLandCoverData = dataLisst[2]?.Result;
    });
  }

  onGetExistQuoteList() {
    const urlLink = `${this.ApiUrl1}menu/existing/quote`;
    const reqData = {
      'ApplicationId': this.applicationId,
      'Key': '',
      'LoginId': this.loginId,
      'ProductId': this.productId,
      'UserType': this.userDetails.UserType,
      'OpenCoverNo': this.OpenCover?.value,
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.columnHeader = [
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'CustomerName', display: 'Name' },
            { key: 'Email', display: 'Email' },
            { key: 'CustomerId', display: 'Customer Id' },
            { key: 'Premium', display: 'Premium' },
            {
              key: 'actions',
              display: 'Action',
              config: {
                isEdit: true,
              },
            },
          ];
          this.tableData = data?.Result;

        }
      },
      (err) => { },
    );
  }

  onOpenCoverActions(event: any) {
    if (event.name === 'Certificate') {
        const data = {
          'name':event.name,
          'value':event?.data?.MissippiOpenCoverNo
        }
         sessionStorage.setItem('OpenCover',JSON.stringify(data));
         sessionStorage.setItem('loginId', this.loginId);
         sessionStorage.setItem('quotesType', 'Without-Endo');
         sessionStorage.setItem('WithCertifi', 'true');
         this.router.navigate([`${this.routerBaseLink}/new-quotes`]);
    }
  }

  onEdit(item: any) {
    this.router.navigate([`/${this.routerBaseLink}/new-quotes`], { queryParams: { referenceNo: item.ApplicationNo } });
  }


}
