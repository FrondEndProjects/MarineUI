import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserDetailsComponent } from '../new-user-details/new-user-details.component';
import { ExistingUserListComponent } from './existing-user-list.component';

const routes: Routes = [
  {
  path: '',
  component: ExistingUserListComponent,
  },
    {
      path : 'newUserDetails',
      component:NewUserDetailsComponent,
    }
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingUserListRoutingModule {
}


