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
import { borkerNavItems } from '../../../layout/components/navbar/broker_nav';
import { adminNavItems } from '../../../layout/components/navbar/admin_nav';
// import { borkerNavItems } from '../components/navbar/broker_nav';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userDetails: any;
  public userResponse: any; menu: any[] = [];
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
  ProductId: any;userType:any;

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
    this.ProductId = this.userResponse?.ProductId;
    this.regionCode = this.userResponse.InsuranceId;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.loginId = this.userDetails.Result.LoginId;
    this.userType =this.userResponse?.UserType;
    this.userPicture = 'assets/images/userIcon.png'
    // if(this.ProductId =='3') {

      if(this.userType!='admin') this.menu = borkerNavItems;
      else this.menu = adminNavItems;

    // }
    // if(this.ProductId =='3')
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
          //  location.href=`http://192.168.1.48:5200/#/auth/login`;
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
  checkChildren(rowData) {
    if (rowData.children) {
      return rowData.children.length != 0
    }
    else return false;
  }
  onRoute() {
    this.router.navigate(['product-layout/product']);

  }
  onRedirectMenu(rowData) {
    this.router.navigate([rowData.link]);
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
    location.href = `http://197.254.65.234:8080/Eway/#/auth/login/product`;
    return false;
  }

  reloadCurrentRoute() {
    // this.router.navigate([`/login`]);
    location.href = `http://197.254.65.234:8080/Eway/#/auth/login`;
  }

  homeRoute() {
    location.href = `http://197.254.65.234:8080/Eway/#/auth/login/product`;
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
        location.href = `http://197.254.65.234:8080/Eway/#/auth/login`;
      },
      (err: any) => {
        console.log(err);
        sessionStorage.clear();
        localStorage.clear();
        this.authService.logout();
        location.href = `http://197.254.65.234:8080/Eway/#/auth/login`;
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
  checkCurrentRouting(){
    let url = this.router.url;
    return url!='/product-layout/opencover';
  }
}
