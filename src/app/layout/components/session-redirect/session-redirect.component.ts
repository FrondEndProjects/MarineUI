import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-redirect',
  templateUrl: './session-redirect.component.html',
  styleUrls: ['./session-redirect.component.css']
})
export class SessionRedirectComponent implements OnInit {
  userDetails: any
  constructor(private router: Router) {
    sessionStorage.clear();

  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    setTimeout(() => {
      // this.router.navigate(['/login'])
      if (this.userDetails?.Result?.SubUserType != 'b2c') {
        // location.href = `http://172.17.0.28:8080/EwayV2/#/auth/login`;
        location.href = `http://197.254.65.234:8080/Eway/#/auth/login`;
        // location.href = `http://102.69.166.162:8086/EwayV1/#/auth/login`;
        // location.href = `https://selfservice.firstassurance.co.ke/Eway/#/auth/login`;
        // location.href = `http://192.168.24.73:8080/EwayV2/#/auth/login`;
        // location.href = `http://192.168.24.74:8080/EwayV2/#/auth/login`;

      }
      else {
        // location.href = `http://172.17.0.28:8080/EwayB2CV1/#/`;
        location.href = `http://197.254.65.234:8080/EwayB2C/#/`;
        // location.href = `http://102.69.166.162:8086/EwayB2C/#/`;
        // location.href = `https://selfservice.firstassurance.co.ke/EwayB2C/#/`;
        // location.href = `http://192.168.24.73:8080/EwayB2CV2/#/`;
        // location.href = `http://192.168.24.74:8080/EwayB2CV2/#/`;
      }

    }, 5 * 60 * 1000);
  }
  getLogin() {
    // this.router.navigate(['/login'])
    if (this.userDetails?.Result?.SubUserType != 'b2c') {
      // location.href = `http://172.17.0.28:8080/EwayV2/#/auth/login`;
      location.href = `http://197.254.65.234:8080/Eway/#/auth/login`;
      // location.href = `http://102.69.166.162:8086/EwayV1/#/auth/login`;
      // location.href = `https://selfservice.firstassurance.co.ke/Eway/#/auth/login`;
      // location.href = `http://192.168.24.73:8080/EwayV2/#/auth/login`;
      // location.href = `http://192.168.24.74:8080/EwayV2/#/auth/login`;

    }
    else {
      // location.href = `http://172.17.0.28:8080/EwayB2CV1/#/`;
      location.href = `http://197.254.65.234:8080/EwayB2C/#/`;
      // location.href = `http://102.69.166.162:8086/EwayB2C/#/`;
      // location.href = `https://selfservice.firstassurance.co.ke/EwayB2C/#/`;
      // location.href = `http://192.168.24.73:8080/EwayB2CV2/#/`;
      // location.href = `http://192.168.24.74:8080/EwayB2CV2/#/`;
    }

  }
}
