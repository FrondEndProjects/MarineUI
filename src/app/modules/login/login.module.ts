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





@NgModule({
  declarations: [
    LoginComponent,
    BroCusLoginComponent,
    IssuerLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    NgSelectModule,
    ErrorModalModule,

  ],
  providers:[LoginService],
  bootstrap: [LoginComponent],
})
export class LoginModule { }
