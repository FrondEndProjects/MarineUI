import { Component } from '@angular/core';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';
import { LoginService } from '../../modules/login/login.service';
// import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

// import * as Mydatas from '../../../../app-config.json';
// import Swal from 'sweetalert2';
// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['./login-creation.component.scss']
})
export class LoginCreationComponent {
  user: any;
  userType: any;
  branches: any;
  products: any;
  subUserType: string;
  loginId: any;
  insuranceId: any;
  referralAccess: any;
  loginAccess: any;
  CommonApiUrl: any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private SharedService: SharedService,
    private authService: AuthService
  ) {
    this.user = this.authService?.getLoginDetails();
    this.branches = this.user?.Result?.LoginBranchDetails;
    this.userType = this.user?.Result?.UserType;
    this.products = this.user?.Result?.BrokerCompanyProducts;
    this.subUserType = sessionStorage.getItem('typeValue');
    this.loginId = this.user?.Result?.LoginId;
    this.insuranceId = this.user?.Result?.InsuranceId;
    this.referralAccess = this.user?.Result?.ReferralManageAccess;
    this.loginAccess = this.user?.Result?.LoginCreationAccess;
  }
  tabIndex: any = 0;
  onTabClicked(event) {
    let index = event.index;
    this.tabIndex = index;

  }
  homeRoute() {

  }
  getUserInitials(): string {
    const name = this.user?.Result?.UserName || '';
    return name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) || 'U';
  }
  onLogout() {
    this.setLogout();
  }
  setLogout() {
    const Req = {
      LoginId: this.loginId,
      Token: this.loginService.getToken(),
    };
    const urlLink = `${this.CommonApiUrl}authentication/logout`;
    this.SharedService.onPostMethodSync(urlLink, Req).subscribe(
      (data: any) => {
        console.log(data);
        // this.cookieService.delete(
        //   'XSRF-TOKEN',
        //   '/',
        //   'domain name',
        //   true,
        //   'None',
        // );
        sessionStorage.clear();
        this.authService.logout();
        this.router.navigate(['/home']);
      },
      (err: any) => {
        console.log(err);
        sessionStorage.clear();
        // this.cookieService.delete(
        //   'XSRF-TOKEN',
        //   '/',
        //   'domain name',
        //   true,
        //   'None',
        // );
        this.authService.logout();
        this.router.navigate(['/home']);
      },
    );
  }
  back() {
        this.router.navigate(['/product']);

  }
}
