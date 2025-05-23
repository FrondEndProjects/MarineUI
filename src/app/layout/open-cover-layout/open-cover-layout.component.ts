import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { NewQuotesService } from '../../modules/new-quotes/new-quotes.service';
import { adminNavItems } from '../components/navbar/admin_nav';
import { borkerNavItems } from '../components/navbar/broker_nav';
import * as Mydatas from '../../app-config.json';
import { borkerOpencoverNavItems } from '../components/navbar/broker_opencover_nav';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import { log } from 'node:console';

@Component({
  selector: 'app-open-cover-layout',
  templateUrl: './open-cover-layout.component.html',
  styleUrls: ['./open-cover-layout.component.scss']
})
export class OpenCoverLayoutComponent implements OnInit {
  isMenuCollapsed: boolean = true;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public userDetails: any;
  public productId: any;
  public menu: any;
  OpenCoverHeasdingInfo:boolean = false;
  public endorsement: any;
  public headerDetails: any;
  public OpenCover: any;
  constructor(
    private menuService: NbMenuService,
    private newQuotesService: NewQuotesService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
    this.menu = borkerNavItems;
    console.log(this.menu, "this.menu");

    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.OpenCover = JSON.parse(sessionStorage.getItem('OpenCover'));
  }

  ngOnInit(): void {
    this.setMenuSection();
    this.onHeaderDetails();
    const currentUrl = this.router.url;
    if(currentUrl =='/marine-opencover/quotes/aki-doc-admin'){
      this.OpenCoverHeasdingInfo = true;
    }else{
      this.OpenCoverHeasdingInfo = false;
    }
    console.log(currentUrl, "currentUrl");

  }
  onMenuItemClick(e): void {
    // console.log("Event",e,e.target.outerText,this.menu)
    for (let entry of this.menu) {
      if (entry.title == e.target.outerText) {

      }
      else if (entry.children) {
        if (entry.children.some(ele => ele.title == e.target.outerText)) {
          entry['expanded'] = false;
        }
        else entry['expanded'] = false;
      }
    }
    // let entry = this.menu.find(ele=>ele.title==e.target.outerText);
    // if(entry){
    //   if(entry.expanded){
    //   }
    // }
    // else{
    //   for(let obj of this.menu){
    //     if(obj.children){
    //         obj['expanded'] = false;
    //     }
    //   }
    // }
    console.log("Event Last", e, this.menu)

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

  onHeaderDetails() {
    // var urlLink:any = `${this.ApiUrl1}api/endorsement/headerdetails`;
    // const reqData = {
    //   "Result":false,
    //   "QuoteNo":this.endorsement?.QuoteNo
    // }
    var urlLink: any = `${this.ApiUrl1}api/opencover/headerdetails`;
    const reqData = {
      "Result": false,
      "OpenCoverNo": this.OpenCover?.value
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.headerDetails = data?.Result;
      },
      (err) => { },
    );
  }

}
