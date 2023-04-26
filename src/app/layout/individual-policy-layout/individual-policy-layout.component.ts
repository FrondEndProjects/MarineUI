import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { NewQuotesService } from '../../modules/new-quotes/new-quotes.service';
import { adminNavItems } from '../components/navbar/admin_nav';
import { borkerNavItems } from '../components/navbar/broker_nav';
import { borkerOpencoverNavItems } from '../components/navbar/broker_opencover_nav';
import * as Mydatas from '../../app-config.json';
import { SessionStorageService } from '../../shared/storage/session-storage.service';

@Component({
  selector: 'app-individual-policy-layout',
  templateUrl: './individual-policy-layout.component.html',
  styleUrls: ['./individual-policy-layout.component.scss']
})
export class IndividualPolicyLayoutComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public userDetails: any;
  public productId: any;
  public menu: any;
  public endorsement:any;
  public headerDetails:any;
  public OpenCover:any;
  constructor(
    private newQuotesService: NewQuotesService,
    private sessionStorageService:SessionStorageService
  ) {
    this.menu = borkerNavItems;
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
  }

  ngOnInit(): void {
    this.setMenuSection();
  }
  setMenuSection() {
    if (this.userDetails.UserType == 'admin') {
      this.menu = adminNavItems
    }
    if (this.OpenCover?.name == 'Certificate') {
      this.menu = borkerOpencoverNavItems
    }
    else {
      this.menu = borkerNavItems;
    }
  }



}
