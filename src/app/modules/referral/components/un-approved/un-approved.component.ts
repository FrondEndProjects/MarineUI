import { Component, OnInit } from '@angular/core';
import { ReferralService } from '../../referral.service';
import { Router } from '@angular/router';
import { ReferralComponent } from '../../referral.component';
import { ConfirmPromptComponent } from '../confirm-prompt/confirm-prompt.component';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
@Component({
  selector: 'app-un-approved',
  templateUrl: './un-approved.component.html',
  styleUrls: ['./un-approved.component.scss']
})
export class UnApprovedComponent implements OnInit {

  public ApiUrl1: any;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];


  public brokerList: any[] = [];
  public selectedBroker: any = '';
  public OpenCover: any = '';
  public routerBaseLink: any = '';
  isIssuer: boolean;

  constructor(
    private referralService: ReferralService,
    private router: Router,
    private referralComponent: ReferralComponent,
    public dialog: MatDialog,
    public sessionStorageService: SessionStorageService

  ) {
    this.ApiUrl1 = this.referralComponent.ApiUrl1;
    this.userDetails = this.referralComponent.userDetails;
    this.loginId = this.referralComponent.loginId;
    this.productId = this.referralComponent.productId;
    this.applicationId = this.referralComponent.applicationId;
    //this.OpenCover = this.referralComponent.OpenCover;
    this.routerBaseLink = this.userDetails?.routerBaseLink;


    if (this.userDetails?.UserType != "Issuer") {
      //this.loginId = this.userDetails?.LoginId;
      //this.applicationId = '1';
      this.isIssuer = false;

    }
    // Issuer

    if (this.userDetails?.UserType == "Issuer") {
      //this.loginId = this.endorsement?.LoginId || '';
      //.applicationId = this.userDetails.LoginId;
      this.isIssuer = true;
    }
  }
  ngOnInit(): void {
    this.onGetBrokerList();
    this.selectedBroker = sessionStorage.getItem('loginId');
  }

  onGetBrokerList() {
    const urlLink = `${this.ApiUrl1}menu/referral/dropdownlist`;
    const reqData = {
      "ReferralType": "RU",
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails?.BranchCode
    };
    this.referralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.brokerList = data?.Result;
        this.selectedBroker = this.selectedBroker ? this.selectedBroker : this.brokerList[0].LoginId;
        this.onChangeBroker();
      },
      (err) => { },
    );
  }


  onChangeBroker() {
    if (this.selectedBroker) {
      this.loginId = this.selectedBroker;
    }
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.onLoadGrid();
    // this.onLoadGrid();
  }

  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}menu/referral/unapprovedquote`;
    const reqData = {
      "LoginId": this.loginId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails.BranchCode,
      "OpenCoverNo": this.OpenCover?.value,
      "ProductId": this.productId,
    }
    this.referralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);

        if (data?.Result) {
          this.columnHeader = [
            { key: 'QuoteNo', display: 'Quote No' },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'QuotationDate', display: 'Quotation Date' },
            {
              key: "edit",
              display: "Edit",
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Edit",
                isNgxIcon: "fas fa-pen-alt",
                bg: "primary",
              },
            },
            {
              key: "reject",
              display: "Reject",
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: "Reject",
                isNgxIcon: "fas fa-window-close",
                bg: "danger",
              },
            },
          ];
          this.tableData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  isActionBtn(event: any) {
    console.log(event);
    if (event.btName === 'Edit') {
      this.onEdit(event);
    }
    if (event.btName === 'Reject') {
      this.onReject(event);
    }
  }

  onEdit(item: any) {
    this.sessionStorageService.remove('referral');
    sessionStorage.setItem('quotesType', 'Without-Endo');
    sessionStorage.setItem('ReferenceNo', item?.ApplicationNo);
    sessionStorage.setItem('QuoteStatus', item?.QuoteStatus);
    let value = 'referral'
    this.router.navigate([`/${this.routerBaseLink}/new-quotes`], { queryParams: { value } });
    // this.router.navigate([`/${this.routerBaseLink}/new-quotes`] );
  }

  onReject(item: any) {
    const reasonList: any[] = this.referralService.getReasonList();
    const dialogRef = this.dialog.open(ConfirmPromptComponent, {
      width: '400px',
      data: { items: reasonList, row: item },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onLoadGrid();
      }
    });

  }

}


