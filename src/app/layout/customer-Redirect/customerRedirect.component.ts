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
  branchcode: any;
  productId: any;
  public routerBaseLink:any='';
  userType: any;
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
        console.log("Encrypted Info",decryptedInfo)
        if(decryptedInfo){
          let Userdetails = decryptedInfo;
          this.loginId = Userdetails.Result.LoginId;
          this.insuranceId = Userdetails.Result.InsuranceId;
          
          //Userdetails.Result['BranchCode'] = Userdetails.Result.BelongingBranch;
          this.branchcode = Userdetails.Result.BranchCode;
          this.productId = Userdetails.Result['ProductId']
          Userdetails['LoginResponse'] = Userdetails.Result;
          Userdetails.LoginResponse['RegionCode'] = this.insuranceId;
          Userdetails.LoginResponse.UserType = Userdetails.LoginResponse?.UserTypeAlt;
          if(Userdetails.LoginResponse?.UserType == 'admin'){
            Userdetails.LoginResponse['routerBaseLink'] = 'Marine';
            this.routerBaseLink = 'Marine';
          }else{
            Userdetails.LoginResponse['routerBaseLink'] = 'marine-opencover';
            this.routerBaseLink = 'marine-opencover';
          }
          sessionStorage.setItem('Userdetails',JSON.stringify(Userdetails))
          sessionStorage.setItem('UserToken', Userdetails.Result.Token);
          this.authService.login(Userdetails);
          this.authService.UserToken(Userdetails.Result.Token);
          this.userType = Userdetails.Result.UserType;
          this.sessionStorageService.set('Userdetails',Userdetails);
          this.onSelectProduct();
          // sessionStorage.setItem('storageData',JSON.stringify(decryptedInfo));
          // this.loginId = decryptedInfo?.Username;
          // this.insuranceId = decryptedInfo?.insuranceId;
          // this.branchcode = decryptedInfo?.BranchCode;
          // this.productId= decryptedInfo?.ProductId;
          // this.onLogin();
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
          BranchCode: this.branchcode,
          LoginFlag:'Y'
        };
    
        this.loginService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
          console.log(data);
            if (data.LoginResponse) {
            if(data.LoginResponse?.Status!="ChangePassword") { 
                console.log('NNNNNNNNNNNNN',data.LoginResponse?.Status)
              if(data.LoginResponse?.UserType == 'admin'){
                data.LoginResponse['routerBaseLink'] = 'Marine';
                this.routerBaseLink = 'Marine';
              }else{
                data.LoginResponse['routerBaseLink'] = 'marine-opencover';
                this.routerBaseLink = 'marine-opencover';
              }
              const Token = data?.LoginResponse?.Token;
              this.authService.login(data);
              this.authService.UserToken(Token);
              this.sessionStorageService.set('Userdetails',data);
              sessionStorage.setItem('Userdetails', JSON.stringify(data));
              sessionStorage.setItem('UserToken', Token);
            
               this.onSelectProduct();
              //this.router.navigate(['/product-layout/product']);
            }
          }
        })
      }

      onSelectProduct() {
        sessionStorage.removeItem('OpenCover');
        sessionStorage.removeItem("endorsement");
        sessionStorage.removeItem('quotesType');
        sessionStorage.removeItem('ReferenceNo');
        sessionStorage.removeItem('MissippiCode');
        sessionStorage.removeItem('ProposalNo');
        sessionStorage.removeItem('loginId');
        sessionStorage.removeItem('WithCertifi');  
        sessionStorage.removeItem('customerLoginId');
        sessionStorage.removeItem('OpenCoverNo');
        sessionStorage.setItem('quotesType', 'Without-Endo');
        if (this.productId=== '3') {
          sessionStorage.removeItem('ReferenceNo');
          this.sessionStorageService.remove('referral');
          sessionStorage.setItem('quotesType', 'Without-Endo');
          //sessionStorage.removeItem('quotesType')
          sessionStorage.removeItem("endorsement");
          sessionStorage.removeItem("ReferenceNo");
          sessionStorage.setItem('productId','3');
          this.sessionStorageService.set('productId','3');
          this.reloadCurrentRoute();
        }
        
        else if (this.productId === '11') {
          sessionStorage.setItem('productId','11');
          this.sessionStorageService.set('productId','11');
          if(this.userType == 'admin'){
            this.router.navigate([`${this.routerBaseLink}/dashboard`]);
            //this.router.navigate([`${this.routerBaseLink}/new-open-cover/exist-opencover`]);
           }else{
            this.router.navigate(['product-layout/opencover']);
    
           }
        }
      }

      reloadCurrentRoute() {
        this.router.navigate([`/marine-opencover/new-quotes/customer-info`]);
        //window.location.href = `${this.routerBaseLink}/new-quotes/customer-info`;
      }
}
