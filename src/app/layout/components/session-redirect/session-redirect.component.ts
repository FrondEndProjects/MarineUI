import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-redirect',
  templateUrl: './session-redirect.component.html',
  styleUrls: ['./session-redirect.component.css']
})
export class SessionRedirectComponent implements OnInit {

  constructor(private router:Router) {
    sessionStorage.clear();
   }

  ngOnInit(): void {
    setTimeout(() => {
      // this.router.navigate(['/login'])
      location.href=`http://197.254.65.234:8080/Eway/#/auth/login`;

    },5*60*1000);
  }
  getLogin(){
    // this.router.navigate(['/login'])
    location.href=`http://197.254.65.234:8080/Eway/#/auth/login`;
  }
}
