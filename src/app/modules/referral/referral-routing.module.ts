import { RejectedComponent } from './components/rejected/rejected.component';
import { UnApprovedComponent } from './components/un-approved/un-approved.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralComponent } from './referral.component';

const routes: Routes = [


  {
    path: '',
    component: ReferralComponent,
  },
  {
    path: 'referral-approved',
    component: ApprovedComponent,
  },
  {
    path: 'referral-unapproved',
    component: UnApprovedComponent,
  },
  {
    path: 'referral-rejected',
    component: RejectedComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferralRoutingModule { }
