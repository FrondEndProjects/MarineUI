
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCreationComponent } from './login-creation.component';
import { InsurenceEmpComponent } from './insurence-emp/insurence-emp.component';


const routes: Routes = [
  {
    path: '',
    component: LoginCreationComponent
    
  },
  { path: 'insurenceEmp', component: InsurenceEmpComponent },
   
  // {
  //   path: 'referralPending',
  //   component: ReferralPendingComponent,
  //   data: {
  //     preload: true,
  //     title: "Referral Pending Quotes",
  //     breadcrumb: 'Referral Pending Quotes',
  //   }
  // },
  // {
  //   path: 'referralRejected',
  //   component: ReferralRejectedComponent,
  //   data: {
  //     preload: true,
  //     title: "Referral Rejected Quotes",
  //     breadcrumb: 'Referral Rejected Quotes',
  //   }
  // },
  
  // {
  //   path: 'referralApproved',
  //   component: ReferralApprovedComponent,
  //   data: {
  //     preload: true,
  //     title: "Referral Approved Quotes",
  //     breadcrumb: 'Referral Approved Quotes',
  //   }
  // },
  // {
  //   path: 'referralReQuote',
  //   component: ReferralRequoteComponent,
  //   data: {
  //     preload: true,
  //     title: "Referral ReQuote Quotes",
  //     breadcrumb: 'Referral ReQuote Quotes',
  //   }
  // },
  // {
  //   path: 'dataManipulation',
  //   component: DataManipulationComponent,
  //   data: {
  //     preload: true,
  //     title: "Data Manipulation",
  //     breadcrumb: 'Data Manipulation',
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginCreationRoutingModule {}
