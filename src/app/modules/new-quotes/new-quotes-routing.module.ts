import { EndorsementGridComponent } from './components/endorsement-grid/endorsement-grid.component';
import { PolicyGenerateComponent } from './components/policy-generate/policy-generate.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewQuotesComponent } from './new-quotes.component';
import { PremiumInfoComponent } from './components/premium-info/premium-info.component';
import { EndorsementTypeComponent } from './components/endorsement-type/endorsement-type.component';

const routes: Routes = [


  {
    path: '',
    component: NewQuotesComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer-info',
        pathMatch: 'full'
      },
      {
        path: 'endorsement-grid',
        component: EndorsementGridComponent,
        data:{
          title:'endorsementgrid'
        }
      },
      {
        path: 'endorsement-type',
        component: EndorsementTypeComponent,
        data:{
          title:'endorsementtype'
        }
      },
      {
        path: 'customer-info',
        component: CustomerInfoComponent,
        data:{
          title:'customerinfo'
        }
      },
      {
        path: 'premium-info',
        component: PremiumInfoComponent,
        data:{
          title:'premiuminfo'
        }
      },
      {
        path: 'policy-generate',
        component: PolicyGenerateComponent,
        data:{
          title:'policygenerate'
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewQuotesRoutingModule { }
