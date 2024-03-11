import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as Mydatas from '../../app-config.json';
import { LoginService } from '../../modules/login/login.service';
import { AuthService } from '../../Auth/auth.service';
import { SessionStorageService } from '../../shared/storage/session-storage.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-Customer-Redirect',
  templateUrl: './customerRedirect.component.html',
  styleUrls: ['./customerRedirect.component.scss']
})
export class CustomerRedirectComponent implements OnInit {
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    encryptedValue:any=null;loginId:any=null;insuranceId:any=null;
    constructor(private _formBuilder: FormBuilder,
        private loginService: LoginService,
        private authService: AuthService,
        private router: Router,private route:ActivatedRoute,
        private sessionStorageService:SessionStorageService
        ) {
          let details = JSON.parse(localStorage.getItem('Userdetails'));
          console.log("Login Details",details);
          this.route.queryParamMap.subscribe((params: any) => {
            this.encryptedValue = encodeURIComponent(params.params.e);
           });
        // var sessionLength = sessionStorage.length;
        // console.log(sessionLength);
        // sessionStorage.clear();
        // for (let index = 0; index < sessionLength; index++) {
        //   const element = sessionStorage.key(index);
        //   console.log(element)
        //   sessionStorage.removeItem(element);
        // }
      }
    ngOnInit(): void {
       // this.onLogin();
       this.route.queryParamMap.subscribe((params: any) => {
        this.encryptedValue = encodeURIComponent(params.params.e);
       let storageData = CryptoJS.AES.decrypt(decodeURIComponent(this.encryptedValue), 'secret key 123'); 
        let decryptedInfo = JSON.parse(storageData.toString(CryptoJS.enc.Utf8));
        if(decryptedInfo){
          sessionStorage.setItem('storageData',JSON.stringify(decryptedInfo));
          this.loginId = decryptedInfo?.Username;
          this.insuranceId = decryptedInfo?.insuranceId;
          this.onLogin();
        }
        console.log('Cutomer Redirect',decryptedInfo);
       })
       
    }

    onLogin() {
        const urlLink = `${this.ApiUrl1}login/Logincheck`;
        const reqData = {
          UserId: this.loginId,
          Password: "",
          LoginType: 'Admin',
          RegionCode: "",
          BranchCode: "",
          LoginFlag:'Y'
        };
    
        this.loginService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
          console.log(data);
            if (data.LoginResponse) {
            if(data.LoginResponse?.Status!="ChangePassword") { 
                console.log('NNNNNNNNNNNNN',data.LoginResponse?.Status)
              if(data.LoginResponse?.UserType == 'admin'){
                data.LoginResponse['routerBaseLink'] = 'Marine';
              }else{
                data.LoginResponse['routerBaseLink'] = 'marine-opencover';
              }
              const Token = data?.LoginResponse?.Token;
              this.authService.login(data);
              this.authService.UserToken(Token);
              this.sessionStorageService.set('Userdetails',data);
              sessionStorage.setItem('Userdetails', JSON.stringify(data));
              sessionStorage.setItem('UserToken', Token);
              this.router.navigate(['/product-layout/product']);
            }
          }
        })
      }
}
