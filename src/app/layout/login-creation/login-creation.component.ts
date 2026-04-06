import { AfterViewInit, Component } from '@angular/core';
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
export class LoginCreationComponent implements AfterViewInit {
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
  userDetails: any;
  userResponse: any;
  branchList: any;
  ProductId: any;
  regionCode: any;
  routerBaseLink: any;
  userPicture: string;
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
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    console.log(this.userDetails, "userDetails");

    this.userResponse = this.userDetails?.LoginResponse;
    this.branchList = this.userDetails?.Result?.LoginBranchDetails;
    this.ProductId = this.userResponse?.ProductId;
    this.regionCode = this.userResponse?.InsuranceId;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.loginId = this.userDetails.Result?.LoginId;
    this.userType = this.userResponse?.UserType;
    this.userPicture = 'assets/images/userIcon.png'
  }
  tabIndex: any = 0;
  onTabClicked(event) {
    let index = event.index;
    this.tabIndex = index;

  }
  ngAfterViewInit() {
    const isReloaded = sessionStorage.getItem('pageReloaded');

    if (!isReloaded) {
      sessionStorage.setItem('pageReloaded', 'true');
      window.location.reload();
    }
  }
  homeRoute() {
    if (this.userDetails?.Result?.InsuranceId == '100053' || '100044') {

      if (this.userDetails.Result?.UserTypeAlt == 'admin') {
        const userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
        userDetails.Result['UserType'] = 'Issuer';
        userDetails.Result['ProductId'] = null;
        userDetails.Result['ProductName'] = null;
        userDetails.Result['UserTypeAlt'] = "Issuer";
        userDetails.LoginResponse['UserType'] = 'Issuer';
        userDetails.LoginResponse['ProductId'] = null;
        userDetails.LoginResponse['ProductName'] = null;
        userDetails.LoginResponse['UserTypeAlt'] = "Issuer";
        sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      }
      this.router.navigate([`/product`]);
    }
    else {
      if (this.userDetails?.Result?.SubUserType != 'b2c') {
        // sessionStorage.clear();
        // localStorage.clear();
        if (this.userDetails?.Result?.UserType == 'admin') {
          this.userDetails.Result['UserTypeAlt'] = 'Issuer'
          this.userDetails.Result['UserType'] = 'Issuer'
          localStorage.setItem('Userdetails', JSON.stringify(this.userDetails));
        }
        // location.href = `http://172.17.0.28:8080/EwayV2/#/auth/login`;
        // location.href = `http://197.254.65.234:8080/Eway/#/auth/login/product`;
        location.href = `http://193.203.162.152:8085/Eway/#/auth/login/product`;
        // location.href = `https://wecoreuat.wecorephoenixgroup.com/Eway/#/auth/login/product`;
        // location.href = `https://wecoreuat.wecorephoenixgroup.com/Eway/#/auth/login/product`;
        // location.href = `http://102.69.166.162:8086/EwayV1/#/auth/login/product`;
        // location.href = `https://selfservice.firstassurance.co.ke/Eway/#/auth/login`;
        // location.href = `http://192.168.24.73:8080/EwayV2/#/auth/login`;
        // location.href = `http://192.168.24.74:8080/EwayV2/#/auth/login`;
        //  window.location.href = `http://192.168.1.48:4600/#/auth/login/product`;

      }
      else {
        // sessionStorage.clear();
        // localStorage.clear();
        // location.href = `http://172.17.0.28:8080/EwayB2CV1/#/`;
        // location.href = `http://197.254.65.234:8080/EwayB2C/#/`;
        location.href = `http://193.203.162.152:8085/EwayB2C/#/`;
        // location.href = `https://wecoreuat.wecorephoenixgroup.com/EwayB2C/#/`;
        // location.href = `http://102.69.166.162:8086/EwayB2C/#/`;
        // location.href = `https://selfservice.firstassurance.co.ke/EwayB2C/#/`;
        // location.href = `http://192.168.24.73:8080/EwayB2CV2/#/`;
        // location.href = `http://192.168.24.74:8080/EwayB2CV2/#/`;

      }
    }
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
  DashbordRoute() {
    this.router.navigate([`/Marine/dashboard`]);
  }
}
