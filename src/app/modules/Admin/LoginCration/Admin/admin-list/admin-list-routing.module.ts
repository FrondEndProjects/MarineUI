import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { UserListComponent } from './user-list.component';
//import { UserDetailsComponent } from '../user-details/user-details.component';
import { AdminListComponent } from './admin-list.component';
import { AdmindetailsComponent } from '../admin-details/admin-details.component';
const routes: Routes = [
  {
    path: '',
    component: AdminListComponent,
  },
  {
    path: 'adminDetails',
    component:AdmindetailsComponent,
    data: {
      preload: true,
      title: "Admin Details",
      breadcrumb:  "Admin Details",
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class adminRoutingModule {}
