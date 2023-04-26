import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {


  public menuActive: any = '/login-layout/login/broker';

  brokerLogin = true;
  issuerLogin = false;
  brokerName = null;
  brokerPassword = null;
  issuerName = null;
  issuerPassword = null;
  invalidBroker = false;
  invalidIssuer = false;
  issuerLogins = false;
  brokerLogins = false;
  public issuerBranch; public issuerRegion;
  public branches;
  public errorsList = new Array();
  regionList: any;
  constructor(private router: Router) {

    this.onLoginTap();
    var sessionLength = sessionStorage.length;
    console.log(sessionLength);
    sessionStorage.clear();
    for (let index = 0; index < sessionLength; index++) {
      const element = sessionStorage.key(index);
      console.log(element)
      sessionStorage.removeItem(element);
    }

    // while(n--) {
    //   var key = sessionStorage.key(n);
    //   if(/foo/.test(key)) {
    //     console.log(key);
    //     sessionStorage.removeItem(key);
    //   }
    // }

  }


  onLoginTap() {
    this.router.navigate([this.menuActive]);
  }










}
