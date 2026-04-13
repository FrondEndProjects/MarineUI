import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { AuthService } from '../../Auth/auth.service';
import * as Mydatas from '../../app-config.json';
import Swal from 'sweetalert2';
import { LoginService } from '../../modules/login/login.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginLayoutComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  private readonly AdminUrl: string = this.AppConfig.AdminUrl;
  private readonly CommonApiUrl: string = this.AppConfig.CommonApiUrl;

  // ── Sign In fields ────────────────────────────────────────────────────────
  loginId: string = '';
  password: string = '';
  rememberMe: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  messages: Message[] = [];

  // ── Change Password fields ────────────────────────────────────────────────
  username1: string = '';   // username in change-password form
  password2: string = '';   // old / temporary password
  password1: string = '';   // new password

  // ── Forgot Password fields ────────────────────────────────────────────────
  username2: string = '';
  Email: string = '';

  // ── Section flags ─────────────────────────────────────────────────────────
  changePasswordSection: boolean = false;
  forget: boolean = false;
  errorSection: boolean = false;
  passExpiredError: boolean = false;
  loginfirst: boolean = false;
  temps: boolean = false;

  // ── Auth / routing helpers ────────────────────────────────────────────────
  messageText: any;
  messageTextLocal: any;
  insuranceId: any;
  branchList: any;
  userType: any;
  pa: any;
  pass: boolean = false;

  validInsuranceIds = ['100046', '100047', '100048', '100049', '100050'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    // Inject Font Awesome if not already present
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
      document.head.appendChild(link);
    }

    // Inject Inter font if not already present
    if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
      const font = document.createElement('link');
      font.rel = 'stylesheet';
      font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
      document.head.appendChild(font);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SIGN IN
  // ─────────────────────────────────────────────────────────────────────────

  homeRoute(): void { }

  onLogin(): void {
    this.submitted = true;
    if (!this.loginId || !this.password) { return; }
    this.loading = true;
    this.submit('N');
  }

  submit(val: string = ''): void {
    if (this.password && this.loginId) {
      this.loading = true;
      const urlLink = `${this.CommonApiUrl}authentication/login`;
      const ReqObj = {
        LoginId: this.loginId,
        Password: this.password,
        ReLoginKey: val,
      };

      this.loginService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          this.messages = [];
          this.loading = false;
          const res: any = data;

          if (data.Result) {
            const productList = data.Result.BrokerCompanyProducts;
            if (
              productList.length === 1 &&
              productList[0].ProductName.trim().toLowerCase() === 'motor'
            ) {
              sessionStorage.setItem('onlyMotor', 'true');
            } else {
              sessionStorage.setItem('onlyMotor', 'false');
            }

            const Token = data?.Result?.Token;
            this.authService.login(data);
            this.authService.UserToken(Token);
            sessionStorage.setItem('Userdetails', JSON.stringify(data));
            sessionStorage.setItem('UserToken', Token);
            sessionStorage.setItem('menuSection', 'navMenu');
            this.userType = data.Result.UserType;

            if (
              (data.Result.UserType === 'Issuer' ||
                data.Result.UserType === 'Broker' ||
                data.Result.UserType === 'User') &&
              data.Result.SubUserType !== 'SuperAdmin'
            ) {
              const currencyId = data?.Result?.CurrencyId;
              sessionStorage.setItem('CurrencyidLogin', currencyId);
              this.RedirectHome(data);
              const branchList: any[] = data?.Result?.LoginBranchDetails;
              if (branchList.length !== 0 && branchList.length > 1) {
                console.log('Entered Branch', branchList);
              } else {
                this.branchList = branchList;
              }
            } else {
              this.RedirectHome(data);
            }
          } else if (
            (res?.ErrorMessage && res?.ErrorMessage.length > 0) ||
            (res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0)
          ) {
            const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;

            const sessionEntry = errorList.find((ele) => ele.Field === 'SessionError');

            if (sessionEntry && res.ChangePasswordYn !== 'Y') {
              this.errorSection = true;
              this.messageText = sessionEntry.Message;
              this.messageTextLocal = sessionEntry.MessageLocal;
            } else if (res.ChangePasswordYn === 'Y') {
              this.passExpiredError = true;
              this.username1 = this.loginId;
              this.Forget('change', 'ChangePassword');
              this.changepass('ChangePassword');
            } else {
              this.errorSection = false;
              for (const element of errorList) {
                this.messages.push({
                  severity: 'error',
                  summary: 'Error',
                  detail: element?.Message,
                });
              }
            }
          }
        },
        (err: any) => {
          this.loading = false;
          if (!this.errorSection) {
            Swal.fire({
              title: '<strong>Session Error</strong>',
              icon: 'info',
              html: `<ul class="list-group errorlist">
                      <li class="list-group-item">
                          <div style="color: red;">Message<span class="mx-2">:</span>Connection Not Available</div>
                      </li>
                  </ul>`,
              showCancelButton: false,
            }).then((result) => {
              if (result.isConfirmed) { sessionStorage.clear(); }
            });
          }
        }
      );
    } else {
      this.messages = [
        { severity: 'error', summary: 'We couldn\'t sign you in.', detail: 'Please check your login ID and try again.' }
      ];
    }
  }

  onCancelLogin(): void {
    this.loginId = '';
    this.password = '';
    this.errorSection = false;
    this.messages = [];
  }

  RedirectHome(data: any): void {
    const InsuranceId = data.Result.LoginBranchDetails;
    if (
      InsuranceId.some((branch: any) =>
        this.validInsuranceIds.includes(branch.InsuranceId)
      ) && this.userType === 'Issuer'
    ) {
      const userDetails = JSON.parse(sessionStorage.getItem('Userdetails') as any);
      userDetails.Result['ProductId'] = '0';
      userDetails.Result['ProductName'] = 'All Product';
      userDetails.Result['BrokerBranchCode'] =
        data.Result?.LoginBranchDetails[0]?.BrokerBranchCode;
      userDetails.Result['BranchCode'] =
        data?.Result?.LoginBranchDetails[0]?.BranchCode;
      userDetails.Result['CurrencyId'] =
        data?.Result?.LoginBranchDetails[0]?.CurrencyId;
      userDetails.Result['InsuranceId'] =
        data?.Result?.LoginBranchDetails[0]?.InsuranceId;
      sessionStorage.setItem('Userdetails', JSON.stringify(userDetails));
      this.loginService.setProductId('0');
      localStorage.setItem('ProductId', '0');

      if (
        this.insuranceId !== '100002' &&
        this.insuranceId !== '100044' &&
        this.insuranceId !== '100019' &&
        this.insuranceId !== '100020' &&
        this.insuranceId !== '100028' &&
        this.insuranceId !== '100004'
      ) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/product']);
      }
    } else {
      this.router.navigate(['/product']);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SECTION NAVIGATION HELPERS
  // ─────────────────────────────────────────────────────────────────────────

  Forget(type: string, change: string): void {
    this.pa = change;
    if (type === 'change') {
      this.changePasswordSection = true;
      this.forget = false;
      this.loginfirst = true;
      this.errorSection = false;
    } else {
      this.changePasswordSection = false;
      this.forget = true;
      this.loginfirst = false;
      this.errorSection = false;
    }
    this.pass = change === 'ChangePassword';
  }

  changepass(type: string): void {
    this.pa = type;
    this.pass = type === 'ChangePassword';
  }

  cancel(): void {
    this.loginId = '';
    this.password = '';
    this.password1 = '';
    this.password2 = '';
    this.username1 = '';
    this.username2 = '';
    this.Email = '';
    this.errorSection = false;
    this.changePasswordSection = false;
    this.forget = false;
    this.passExpiredError = false;
    this.submitted = false;
    this.messages = [];
  }

  resetForm(): void {
    this.username1 = '';
    this.password2 = '';
    this.password1 = '';
  }

  // ─────────────────────────────────────────────────────────────────────────
  // FORGOT PASSWORD — submit
  // ─────────────────────────────────────────────────────────────────────────

  forgetSubmit(): void {
    const urlLink = `${this.CommonApiUrl}api/forgotpassword`;
    const reqData = {
      EmailId: this.Email,
      LoginId: this.username2,
    };

    this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
      (data: any) => {
        const res: any = data;
        if (data.Result) {
          Swal.fire({
            title: '<strong>Forgot Password</strong>',
            icon: 'info',
            html: `Temporary Password Notification Sent to <span class='text-success'>${this.Email}</span>`,
            showCancelButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Okay',
          });
          this.username2 = '';
          this.Email = '';
          this.changePasswordSection = true;
          this.forget = false;
          this.loginfirst = true;
          this.temps = true;
        }

        if (
          (res?.ErrorMessage && res?.ErrorMessage.length > 0) ||
          (res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0)
        ) {
          const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
          let ulList = '';
          let fieldLocalName: any = null;
          const entry = errorList.filter((ele) => ele.Field === 'SessionError');

          for (const element of errorList) {
            if (
              element.Field === 'SessionError' &&
              element.FieldLocal != null &&
              element.FieldLocal !== ''
            ) {
              fieldLocalName = element.FieldLocal;
            }
            ulList += `<li class="list-group-login-field">
              <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
              <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
            </li>`;
          }

          if (entry.length === 0) {
            Swal.fire({
              title: '<strong>Form Validation</strong>',
              icon: 'info',
              html: `<ul class="list-group errorlist">${ulList}</ul>`,
              showCloseButton: true,
              focusConfirm: false,
              confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
              confirmButtonAriaLabel: 'Thumbs down, Errors!',
            });
          } else {
            Swal.fire({
              title: `<strong>Session Error</strong>`,
              icon: 'info',
              html: `<ul class="list-group errorlist">${ulList}</ul>`,
              showCloseButton: true,
              focusConfirm: false,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Proceed Login!',
              cancelButtonText: 'Cancel',
            }).then((result) => {
              if (result.isConfirmed) {
                this.submit('Y');
                this.username2 = '';
                this.Email = '';
              }
            });
          }
        }
      }
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CHANGE PASSWORD — submit
  // ─────────────────────────────────────────────────────────────────────────

  onsubmit(): void {
    const p = this.pa;

    if (this.password2 !== this.password1) {
      const urlLink = `${this.CommonApiUrl}api/changepassword`;
      const reqData = {
        LoginId: this.username1,
        NewPassword: this.password1,
        OldPassword: this.password2,
        Type: this.pa,
      };

      this.loginService.onPostMethodBasicSync(urlLink, reqData).subscribe(
        (data: any) => {
          const res: any = data;
          if (data.Result) {
            Swal.fire({
              title: '<strong>Change Password</strong>',
              icon: 'info',
              html: 'Password Updated Successfully',
              showCancelButton: false,
              cancelButtonColor: '#d33',
            });
            this.loginfirst = false;
            this.forget = false;
            this.changePasswordSection = false;
          } else if (
            (res?.ErrorMessage && res?.ErrorMessage.length > 0) ||
            (res?.Result?.ErrorMessage && res?.Result?.ErrorMessage.length > 0)
          ) {
            const errorList: any[] = res.ErrorMessage || res?.Result?.ErrorMessage;
            let ulList = '';
            const entry = errorList.filter((ele) => ele.Field === 'SessionError');

            for (const element of errorList) {
              ulList += `<li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>${element?.Field}</div>
                <div style="color: red;">Message<span class="mx-2">:</span>${element?.Message}</div>
              </li>`;
            }

            if (entry.length === 0) {
              Swal.fire({
                title: '<strong>Form Validation</strong>',
                icon: 'info',
                html: `<ul class="list-group errorlist">${ulList}</ul>`,
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
              });
            }
          }
        }
      );

    } else {
      // Same password / validation checks
      if (p) {
        if (
          p === 'ChangePassword' &&
          (this.password2 === '' || this.password2 == null || this.password2 === undefined)
        ) {
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html: `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Old Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Old Password</div>
              </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
          });
        } else if (
          p === 'ForgotPassword' &&
          (this.password2 === '' || this.password2 == null || this.password2 === undefined)
        ) {
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html: `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Temporary Password</div>
                <div style="color: red;">Message<span class="mx-2">:</span>Please Enter Temporary Password</div>
              </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
          });
        }

        if (p === 'ChangePassword' && this.password2 === this.password1) {
          Swal.fire({
            title: '<strong>Form Validation</strong>',
            icon: 'info',
            html: `<ul class="list-group errorlist">
              <li class="list-group-login-field">
                <div style="color: darkgreen;">Field<span class="mx-2">:</span>Password Details</div>
                <div style="color: red;">Message<span class="mx-2">:</span>New Password cannot be same as Old Password</div>
              </li>
            </ul>`,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
          });
        }
      } else if (
        this.password1 === '' ||
        this.password1 == null ||
        this.password1 === undefined
      ) {
        Swal.fire({
          title: '<strong>Form Validation</strong>',
          icon: 'info',
          html: `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Field<span class="mx-2">:</span>New Password</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Please Enter New Password</div>
            </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
        });
      } else {
        Swal.fire({
          title: '<strong>Form Validation</strong>',
          icon: 'info',
          html: `<ul class="list-group errorlist">
            <li class="list-group-login-field">
              <div style="color: darkgreen;">Field<span class="mx-2">:</span>Mismatch Password</div>
              <div style="color: red;">Message<span class="mx-2">:</span>Old Password Cannot Be New Password</div>
            </li>
          </ul>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-down"></i> Errors!',
        });
      }
    }
  }
}
