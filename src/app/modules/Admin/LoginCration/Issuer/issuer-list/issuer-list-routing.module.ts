import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { UserListComponent } from './user-list.component';
//import { UserDetailsComponent } from '../user-details/user-details.component';
//import { AdminListComponent } from './admin-list.component';
import { IssuerListComponent } from './issuer-list.component';
import { IssuerDetailsComponent } from '../issuer-details/issuer-details.component';
const routes: Routes = [
  {
    path: '',
    component:IssuerListComponent,
  },
  {
    path: 'issuerDetails',
    component:IssuerDetailsComponent,
    data: {
      preload: true,
      title: "issuer Details",
      breadcrumb:  "issuer Details",
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class issuerRoutingModule {}
