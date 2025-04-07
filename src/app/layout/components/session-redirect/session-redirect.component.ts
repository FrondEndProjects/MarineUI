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
    setTimeout(() => {this.router.navigate(['/login'])},5*60*1000);
  }
  getLogin(){
    // this.router.navigate(['/login'])
    location.href=`http://192.168.1.48:4600/#/auth/login`;
  }
}
