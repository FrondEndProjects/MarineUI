import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LapsedComponent } from './lapsedpolicy.component';

const routes: Routes = [

  {
    path: '',
    component: LapsedComponent,
    /*children:[
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
    ]*/
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LappsedRoutingModule { }