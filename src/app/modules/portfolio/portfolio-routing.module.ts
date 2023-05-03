import { FailedPoliciesComponent } from './components/failed-policies/failed-policies.component';
import { CanceledPoliciesComponent } from './components/canceled-policies/canceled-policies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtfolioGridComponent } from './components/protfolio-grid/protfolio-grid.component';
import { PortfolioComponent } from './portfolio.component';
//import { ViewPortfolioComponent } from './components/viewportfolio/viewportfolio.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
  },
  {
    path: 'grid',
    component: ProtfolioGridComponent,
  },
  {
    path: 'canceled-policies',
    component: CanceledPoliciesComponent,
  },
  {
    path: 'failed-policies',
    component: FailedPoliciesComponent,
  },
  /*{
    path: 'viewportfolio',
    component: ViewPortfolioComponent,
  },*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule { }
