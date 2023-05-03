import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminReportComponent } from './adminreport.component';


const routes: Routes = [

  {
    path: '',
    component:AdminReportComponent,
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
export class AdminReportRoutingModule { }