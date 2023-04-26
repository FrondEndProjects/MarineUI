import { ExistOpenCoverComponent } from './components/exist-open-cover/exist-open-cover.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { PolicyGenerateCoverComponent } from './components/policy-generate-cover/policy-generate-cover.component';
import { PremiumComputationComponent } from './components/premium-computation/premium-computation.component';
import { CommodityInfoComponent } from './components/commodity-info/commodity-info.component';
import { CoverageInfoComponent } from './components/coverage-info/coverage-info.component';
import { NewOpenCoverComponent } from './components/new-open-cover/new-open-cover.component';
import { OpenCoverComponent } from './open-cover.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryCommodityInfoComponent } from './components/country-commodity-info/country-commodity-info.component';

const routes: Routes = [
  {
    path: '',
    component: OpenCoverComponent,
    children: [
      {
        path: 'new-open-cover-form',
        component: NewOpenCoverComponent,
        data: {
          title: 'newopencover',
        },
      },
      {
        path: 'country-commodity-info',
        component: CountryCommodityInfoComponent,
        data: {
          title: 'countryandcommodity',
        },
      },
      {
        path: 'coverage-info',
        component: CoverageInfoComponent,
        data: {
          title: 'coverageinfo',
        },
      },
      {
        path: 'commodity-info',
        component: CommodityInfoComponent,
        data: {
          title: 'commoodityinfo',
        },
      },
      {
        path: 'premium-computation',
        component: PremiumComputationComponent,
        data: {
          title: 'premiumcomputation',
        },
      },
      {
        path: 'policy-generate-cover',
        component: PolicyGenerateCoverComponent,
        data: {
          title: 'policygenerate',
        },
      },
      {
        path: 'confirmation',
        component: ConfirmationComponent,
        data: {
          title: 'confirmation',
        },
      },

    ],
  },
  {
    path: 'exist-opencover',
    component: ExistOpenCoverComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpenCoverRoutingModule { }
