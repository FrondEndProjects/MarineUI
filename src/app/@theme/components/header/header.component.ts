import { SessionStorageService } from './../../../shared/storage/session-storage.service';
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
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

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

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;


    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) =>
        this.user = users.nick
      );
    console.log(this.user?.picture);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe((title: any) => {
        if (title === 'Log out') {

          this.sessionStorageService.clear();
          // this.authService.logout();
          // let encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(userDetails), 'secret key 123').toString());
          //  location.href=`http://192.168.1.48:4600/#/auth/login`;
          this.setLogout();
          this.reloadCurrentRoute();
        }
      });
    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });

    const ismd = this.bpService.getByName('md');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= ismd.width) {
          this.sidebarService.collapse('menu-sidebar');
        }
      });
    const documentHeight = () => {
      const doc = document.documentElement
      doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
      console.log('RESIZESSSSSSSSSSSSSSSSSSSSS')
    }
    window.addEventListener('resize', documentHeight)
    documentHeight()


    //   const isBpp = this.bpService.getByName('md');
    //   this.menuService.onItemSelect()
    //     .pipe(
    //       takeWhile(() => this.alive),
    //       withLatestFrom(this.themeService.onMediaQueryChange()),
    //     )
    //     .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

    //       if (bpTo.width <= isBpp.width) {
    //         this.sidebarService.collapse('menu-sidebar');
    //       }
    //     });


  }
  onRoute() {
    this.router.navigate(['product-layout/product']);

  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    this.layoutService.changeLayoutSize();
    console.log('Navssss', 1);
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    location.href = `http://192.168.1.42:4600/#/auth/login/product`;
    return false;
  }

  reloadCurrentRoute() {
    // this.router.navigate([`/login`]);
    location.href = `http://192.168.1.42:4600/#/auth/login`;
  }

  homeRoute() {
    location.href = `http://192.168.1.42:4600/#/auth/login/product`;
  }

  setLogout() {
    const Req = {
      LoginId: this.loginId,
      Token: sessionStorage.getItem("UserToken"),
    };
    const urlLink = `${this.CommonApiUrl}authentication/logout`;
    this.onPostMethodSync(urlLink, Req).subscribe(
      (data: any) => {
        console.log(data);
        sessionStorage.clear();
        localStorage.clear();
        this.authService.logout();
        location.href = `http://192.168.1.42:4600/#/auth/login`;
      },
      (err: any) => {
        console.log(err);
        sessionStorage.clear();
        localStorage.clear();
        this.authService.logout();
        location.href = `http://192.168.1.42:4600/#/auth/login`;
      },
    );
  }
  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + sessionStorage.getItem("UserToken"));
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(shareReplay());
  }
}
