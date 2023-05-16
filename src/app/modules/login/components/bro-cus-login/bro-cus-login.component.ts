import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import * as Mydatas from '../../../../app-config.json';
import { AuthService } from '../../../../Auth/auth.service';
import Swal from 'sweetalert2';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';

@Component({
  selector: 'app-bro-cus-login',
  templateUrl: './bro-cus-login.component.html',
  styleUrls: ['./bro-cus-login.component.scss'],
})
export class BroCusLoginComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public loginForm!: FormGroup;
  public submitted = false;
  public regionList: any[] = [];
  public branchList: any[] = [];
  changeForm: FormGroup; ForgetForm : FormGroup;
  PasswordCheckForm : FormGroup;
  pa: any;
  forget: boolean=false;
  first:boolean=true;
  pass: any;
  value_cancel: string = "Cancel";
  value: string = "Change Password"
  type: string;
  ch: string;
  second: boolean=false;
  forgetpassword:boolean=false;
  constructor(
    private _formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private sessionStorageService:SessionStorageService
  ) {
 
  
  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onGetRegionList();
    this.type=sessionStorage.getItem("Rowdata")
    this.ch=sessionStorage.getItem('row')
    if(this.type){
      this.Forget(this.type,this.ch)
    }
  }




  onCreateFormControl() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      region: [null, Validators.required],
      branch: [null, Validators.required],  
    });
    this.changeForm = this._formBuilder.group({
      LoginId: ['', Validators.required],
      NewPassword: ['', Validators.required],
      OldPassword: ['', Validators.required]
    });
    this.ForgetForm = this._formBuilder.group({
      LoginId: ['', Validators.required],
     Email: ['', Validators.required],
    });
    this.PasswordCheckForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      region: [null, Validators.required],
      branch: [null, Validators.required],  
    });

  }
  get f() {
    return this.loginForm.controls;
  }
  get g() {
    return this.PasswordCheckForm.controls;
  }


  onGetRegionList() {
    const urlLink = `${this.ApiUrl1}admin/region/list`;
    this.loginService.onGetMethodSync(urlLink).subscribe((data: any) => {
      console.log(data);
      this.regionList = data?.Result || [];
    });
  }
  onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.f.region.value,
    };
    this.loginService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
      this.branchList = data || []
    });
  }

  onGetBranchListChange() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': this.g.region.value,
    };
    this.loginService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
      this.branchList = data || []
    });
  }
  resetForm() {
    this.changeForm.controls['LoginId'].setValue('');
    this.changeForm.controls['NewPassword'].setValue('');
    this.changeForm.controls['OldPassword'].setValue('');
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
    this.ForgetForm.controls['LoginId'].setValue('');
    this.ForgetForm.controls['Email'].setValue('');
    this.PasswordCheckForm.controls['username'].setValue('');
    this.PasswordCheckForm.controls['password'].setValue('');
    this.PasswordCheckForm.controls['region'].setValue('');
    this.PasswordCheckForm.controls['branch'].setValue('');
  }

  Forget(type,change){

    console.log(change)
    this.pa=change
      if(type=='change') {this.forget = false;
        this.forgetpassword=false;
      this.first=false;
      this.second=false;
    }
      else 
      {this.forget = true;
            this.forgetpassword=true;
      this.first=false;
      this.second=false;
    }

      if(change=='ChangePassword'){
        this.pass=true;
      }
      else if(change=='ForgotPassword'){
        this.pass=false;
      }
  }

  forgetSubmit(){
    const urlLink = `${this.ApiUrl1}login/getForgotPassword`;
    const formData = this.ForgetForm.value;

    const reqData = {
      UserId: formData.LoginId,
      MailId: formData.Email,

    };

    this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
      (data: any) => {
        let res: any = data;
        console.log(data);
        if (data.Result) {
          Swal.fire({
            title: '<strong>Forget Password </strong>',
            icon: 'info',
            html:
              `Temporary Password Notification Sent to Email`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
          this.ForgetForm.reset();
          //this.loginForm.reset();
          //this.loginSection = false;
          this.first=true;
          
        }


      },
      (err: any) => {
        alert("Error")
        // console.log(err);
      },
    );

  }

  changepass(type){

    console.log(type)
    this.pa=type;
    if(type=='ChangePassword'){
      this.pass=true;
    }
    else{
    this.pass=false;
    }

  }
  change(value) {
    this.value = value;
    if (value === "Change Password") {
      this.resetForm();
      this.first = true;
    }
  }
  cancel(value_cancel) {
    this.value_cancel = value_cancel;
    if (value_cancel === 'Cancel') {
      this.resetForm();
      this.first = true;
      this.second=false;
    }
  }
  onLogin() {
    this.submitted = true;
    const urlLink = `${this.ApiUrl1}login/Logincheck`;
    const formData = this.loginForm.value;

    const reqData = {
      UserId: formData.username,
      Password: formData.password,
      LoginType: 'Admin',
      RegionCode: formData.region,
      BranchCode: formData.branch,
    };

    this.loginService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
        if (data.LoginResponse) {

          console.log('jjjjjjjjjjjj')
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
    })
  }

  onchangepasswordcheck(){
    const urlLink = `${this.ApiUrl1}login/CheckChangePassword`;
    const formData = this.PasswordCheckForm.value;

    const reqData = {
      UserId: formData.username,
      Password: formData.password,
      LoginType: 'Admin',
      RegionCode: formData.region,
      BranchCode: formData.branch,
    };
    this.loginService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
        if (data.Message=="This Login id and Password Record is there !!!") {
          console.log('jjjjjjjjjjjj')
          Swal.fire({
            title: '<strong>Change Password </strong>',
            icon: 'info',
            html:
              data.Message,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
          this.PasswordCheckForm.reset();
          this.second=true;
           this.forget=true;
           this.changeForm.controls['LoginId'].setValue(data.LoginId);

        }
    })

  }
  submit() {

    let p=this.pa
    const formData = this.changeForm.value;
      const urlLink = `${this.ApiUrl1}login/LoginChangePassword`;
      const reqData = {
        "LoginId": formData.LoginId,
        "Password": formData.OldPassword,
        "RePassword": formData.NewPassword,
      };
      this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
        (data: any) => {
          let res: any = data;
          console.log(data);
          if (data.Message=="Success") {
            Swal.fire({
              title: '<strong>Change Password </strong>',
              icon: 'info',
              html:
                `Password Updated Successfully`,
              //showCloseButton: true,
              //focusConfirm: false,
              showCancelButton: false,

              //confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: 'Cancel',
            })
            this.changeForm.reset();
            this.loginForm.reset();
            this.first = true;
            this.second=true;
          }
        });


  }
}
