import { IssuerLoginComponent } from './components/issuer-login/issuer-login.component';
import { BroCusLoginComponent } from './components/bro-cus-login/bro-cus-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children:[
      {
        path: '',
        redirectTo: 'broker',
        pathMatch: 'full'
      },
      {
        path: 'broker',
        component: BroCusLoginComponent,
      },
      {
        path: 'issuer',
        component: IssuerLoginComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
