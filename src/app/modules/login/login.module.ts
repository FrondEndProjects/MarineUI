import { ErrorModalModule } from './../../shared/error/error-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { BroCusLoginComponent } from './components/bro-cus-login/bro-cus-login.component';
import { IssuerLoginComponent } from './components/issuer-login/issuer-login.component';
import { LoginService } from './login.service';
import { ErrorModalComponent } from '../../shared/error/error-modal/error-modal.component';
import { SalamaLoginPageComponent } from './salama-login-page/salama-login-page.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    LoginComponent,
    BroCusLoginComponent,
    IssuerLoginComponent,
    SalamaLoginPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    NgSelectModule,
        InputTextModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
    ErrorModalModule,

  ],
  providers:[LoginService,MessageService],
  bootstrap: [LoginComponent],
})
export class LoginModule { }
