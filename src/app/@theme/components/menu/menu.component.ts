import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbMediaBreakpoint, } from '@nebular/theme';
import * as Mydatas from '../../../app-config.json';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, shareReplay, takeUntil, takeWhile, withLatestFrom } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../../Auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-header',
  styleUrls: ['./menu.component.scss'],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit, OnDestroy {

  public userDetails: any;
  public userResponse: any;
  public AppConfig: any = (Mydatas as any).default;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  private alive = true;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  routerBaseLink: any; regionCode: any = null;
  loginId: any;
  userPicture: string;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    protected bpService: NbMediaBreakpointsService, private http: HttpClient
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userResponse = this.userDetails?.LoginResponse;
    this.regionCode = this.userResponse.RegionCode;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.loginId = this.userDetails.Result.LoginId;

    this.userPicture = 'assets/images/userIcon.png'

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    
  }
  
}
