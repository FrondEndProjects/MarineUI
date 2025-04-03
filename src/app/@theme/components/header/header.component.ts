import { SessionStorageService } from './../../../shared/storage/session-storage.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbMediaBreakpoint, } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil,takeWhile,withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  public userDetails: any;
  public userResponse: any;


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
  routerBaseLink: any;regionCode:any=null;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private authService: AuthService,
    private router: Router,
    private sessionStorageService:SessionStorageService,
    protected bpService: NbMediaBreakpointsService,
    ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userResponse = this.userDetails?.LoginResponse;
    this.regionCode=this.userResponse.RegionCode;
    this.routerBaseLink = this.userDetails?.routerBaseLink;


  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
   

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

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
          this.authService.logout();
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
     console.log('Navssss',1);
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  reloadCurrentRoute() {
    this.router.navigate([`/login`]);
  }
}
