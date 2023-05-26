import { SessionStorageModel } from './shared/storage/session-storage-model';
import { SessionStorageService } from './shared/storage/session-storage.service';
import { CustomLoadingService } from './shared/custom-loading.service';
import { AuthService } from './Auth/auth.service';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { AfterContentChecked, ChangeDetectorRef, Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { Observable } from 'rxjs';
import { SharedService } from './shared/shared.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  <ng-container *ngIf="loading$ | async">
  <div class="overlay"></div>
  <div class='visionloading'>
    <div class="loader-box">
       <div class="spinner-loader-gif">
        <img  src='./assets/images/loader-1.gif'>
       </div>
       <div class="spinner-loader-img">
         <div class='img-tag'></div>
       </div>
    </div>
  </div>
</ng-container>
  `,
})
export class AppComponent implements OnInit, AfterContentChecked, AfterViewInit {
  public userdetails: any;
  public loading$!: Observable<any>;
  myValue = "Hello world!"
  timeoutId: any;
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,private router:Router,
    private authService: AuthService,
    public customLoder: CustomLoadingService,
    private cdr: ChangeDetectorRef,private sharedService: SharedService,
    private sessionStorageService: SessionStorageService
  ) {

    const data = JSON.parse(sessionStorage.getItem('sessionStorgaeModel') || 'null');
    if (data) {
      this.sessionStorageService.sessionStorgaeModel = data;
    } else {
      this.sessionStorageService.sessionStorgaeModel = new SessionStorageModel();
    }
    this.userdetails = this.sessionStorageService.sessionStorgaeModel?.Userdetails;
    this.authService.login(this.userdetails);
    console.log(this.sessionStorageService.sessionStorgaeModel);

  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();


  }

  ngAfterContentChecked() {
    this.loading$ = this.customLoder.loader;
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {

  }

  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  checkUserActivity() {
    let url = this.router.url;
    if(this.router.url!= '/' && this.router.url!='' && this.router.url!='/login-layout/login/broker' && this.router.url != '/sessionRedirect'){
      clearTimeout(this.timeoutId);
      console.log("Url Received",url);
      this.sharedService.clearTimeOut();
    }
  }
  @HostListener("window:beforeunload", ["$event"])
  unloadHandler(event: Event) {
    this.processData();
  }

  processData() {
    sessionStorage.setItem('sessionStorgaeModel', JSON.stringify(this.sessionStorageService.sessionStorgaeModel));
  }

  @HostListener('window:load', ['$event'])
  onPageLoad(event: Event) {
    sessionStorage.removeItem('sessionStorgaeModel');

  }




}
