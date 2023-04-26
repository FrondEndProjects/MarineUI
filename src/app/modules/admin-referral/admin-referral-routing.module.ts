import { PendingQuotesComponent } from './components/pending-quotes/pending-quotes.component';
import { ApprovedQuotesComponent } from './components/approved-quotes/approved-quotes.component';
import { AdminReferralComponent } from './admin-referral.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RejectedQuotesComponent } from './components/rejected-quotes/rejected-quotes.component';

const routes: Routes = [

  {
    path: '',
    component: AdminReferralComponent,
    children:[
      // {
      //   path: '',
      //   redirectTo: 'pending-quote',
      //   pathMatch: 'full'
      // },
      {
        path: 'approved-quote',
        component: ApprovedQuotesComponent,
      },
      {
        path: 'pending-quote',
        component: PendingQuotesComponent,
      },
      {
        path: 'rejected-quote',
        component: RejectedQuotesComponent,
      },
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminReferralRoutingModule { }
