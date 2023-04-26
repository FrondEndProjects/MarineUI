import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../app-config.json';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import { ReferralService } from './referral.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public OpenCover:any;
  isIssuer: boolean;
  constructor(
    private sessionStorageService: SessionStorageService,
    private referralService: ReferralService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));

    if (this.userDetails?.UserType === 'Broker' || this.userDetails?.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      this.applicationId = '1';
    }
    if (this.userDetails?.UserType !== 'Broker' && this.userDetails?.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails?.LoginId;
    }

    if (this.userDetails?.UserType != "RSAIssuer") {
      //this.loginId = this.userDetails?.LoginId;
      //this.applicationId = '1';
      this.isIssuer = false;

    }
    // Issuer

    if (this.userDetails?.UserType == "RSAIssuer"){
      //this.loginId = this.endorsement?.LoginId || '';
      //.applicationId = this.userDetails.LoginId;
      this.isIssuer = true;
    }

  }

  ngOnInit(): void {
    console.log('data');

  }



}
