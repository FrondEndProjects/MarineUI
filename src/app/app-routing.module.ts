import { EndorsementComponent } from './modules/endorsement/endorsement.component';
import { SearchComponent } from './modules/search/search.component';
import { CopyQuoteComponent } from './modules/copy-quote/copy-quote.component';
import { ReportComponent } from './modules/report/report.component';
import { OpenCoverLayoutComponent } from './layout/open-cover-layout/open-cover-layout.component';
import { ProductLayoutComponent } from './layout/product-layout/product-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { PortfolioComponent } from './modules/portfolio/portfolio.component';
import { OpenCoverGridComponent } from './modules/open-cover-grid/open-cover-grid.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductSelectionComponent } from './modules/product-selection/product-selection.component';
import { AuthGuard } from './Auth/auth.guard';
import { SessionRedirectComponent } from './layout/components/session-redirect/session-redirect.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'sessionRedirect', 
    component: SessionRedirectComponent
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'login',
    //     loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    //   },

    // ]
  },
  {
    path: 'product-layout',
    component: ProductLayoutComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: 'product',
        component: ProductSelectionComponent,
      },
      {
        path: 'opencover',
        component: OpenCoverGridComponent,
      },
    ]
  },
  {
    path: 'marine-opencover',
    component: OpenCoverLayoutComponent,
    canActivate: [AuthGuard],
    data:{
      title:'marine-opencover'
    },
    children: [
      {
        path: 'new-quotes',
        loadChildren: () => import('./modules/new-quotes/new-quotes.module').then(m => m.NewQuotesModule),
      },
      {
        path: 'quotes',
        loadChildren: () => import('./modules/quotes/quotes.module').then(m => m.QuotesModule),
      },
      {
        path: 'portfolio',
        loadChildren: () => import('./modules/portfolio/portfolio.module').then(m => m.PortfolioModule),

      },
      {
        path: 'customer',
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'referral',
        loadChildren: () => import('./modules/referral/referral.module').then(m => m.ReferralModule),
      },

      {
        path: 'report',
        component:ReportComponent
      },
      {
        path: 'copy-quote',
        component:CopyQuoteComponent
      },
      {
        path: 'search',
        component:SearchComponent
      },
      {
        path: 'endorsement',
        component:EndorsementComponent
      },
    ]
  },


  {
    path: 'Marine',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    data:{
      link:'Marine'
    },
    children: [
      {
        path: 'new-open-cover',
        loadChildren: () => import('./modules/open-cover/open-cover.module').then(m => m.OpenCoverModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/Admin/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'admin-referral',
        loadChildren: () => import('./modules/admin-referral/admin-referral.module').then(m => m.AdminReferralModule),
      },
      {
        path: 'pendingtoaccept',
        loadChildren: () => import('./modules/Admin/pendingtoaccept/pending.module').then(m => m.PendingModule)
      },
      {
        path: 'expired',
        loadChildren: () => import('./modules/Admin/Expiredopencover/expiredopencover.module').then(m => m.ExpiredModule)
      },
      {
        path: 'renewalpending',
        loadChildren: () => import('./modules/Admin/RenewalBuilding/renewalpending.module').then(m => m.RenewalPendingModule)
      },
      {
        path: 'lappsedpolicy',
        loadChildren: () => import('./modules/Admin/LapsedPolicy/lapsedpolicy.module').then(m => m.LappsedModule)
      },
      {
        path: 'copyquoteadmin',
        loadChildren: () => import('./modules/Admin/copyquoteadmin/copyquoteadmin.module').then(m => m.CopyQuoteAdmin)
      },
      {
        path: 'adminportfolio',
        loadChildren: () => import('./modules/Admin/AdminPortfolio/adminportfolio.module').then(m => m.AdminPortfolioModule)
      },
      {
        path: 'branchreport',
        loadChildren: () => import('./modules/Admin/BranchReports/branchreports.module').then(m => m.BranchCoverModule)
      },
      {
        path: 'adminreport',
        loadChildren: () => import('./modules/Admin/adminreport/adminreport.module').then(m => m.AdminReportModule)
      },
      {
        path: 'opencoverreport',
        loadChildren: () => import('./modules/Admin/opencoverreport/opencoverreport.module').then(m => m.opencoverReportModule)
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
      },
      {
        path: 'viewportfolio',
        loadChildren: () => import('./modules/Admin/viewportfolio/viewportfolio.module').then(m => m.ViewPortfolioComponentRoutingModuleModule)
      },
      {
        path: 'new-quotes',
        loadChildren: () => import('./modules/new-quotes/new-quotes.module').then(m => m.NewQuotesModule),
      },
        //loginCreation
        {
          path:'loginCreation/existingBrokers',
          loadChildren: () => import('./modules/Admin/LoginCration/Broker/existing-broker-list/existing-broker-list.module').then(m => m.ExistingBrokerListModule)
        },
        {
          path:'loginCreation/admin',
        loadChildren: () => import('./modules/Admin/LoginCration/Admin/admin-list/admin-list.module').then(m => m.adminListModule)
      },
      {
        path:'loginCreation/issuer',
      loadChildren: () => import('./modules/Admin/LoginCration/Issuer/issuer-list/issuer-list.module').then(m => m.issuerListModule)
    },
        {
          path:'loginCreation/existingUser',
          loadChildren: () => import('./modules/Admin/LoginCration/Users/existing-user-list/existing-user-list.module').then(m => m.ExistingUserListModule)
        },
       // masters
      {
        path: 'masters/conveyance',
        loadChildren: () => import('./modules/Admin/Masters/conveyance/conveyance.module').then(m => m.ConveyanceModule),
      },
      {
        path: 'masters/country',
        loadChildren: () => import('./modules/Admin/Masters/country/country.module').then(m => m.CountryModule),
      },
      {
        path: 'masters/country-cover',
        loadChildren: () => import('./modules/Admin/Masters/country-cover/country-cover.module').then(m => m.CountryCoverModule),
      },
      {
        path: 'masters/commodity',
        loadChildren: () => import('./modules/Admin/Masters/commodity/commodity.module').then(m => m.CommodityModule),
      },
      {
        path: 'masters/bank-master',
        loadChildren: () => import('./modules/Admin/Masters/bank-master/bank-master.module').then(m => m.BankMasterModule),
      },
      {
        path: 'masters/war-rate',
        loadChildren: () => import('./modules/Admin/Masters/war-rate-master/war-rate-master.module').then(m => m.WarRateMasterModule),
      },
      {
        path: 'masters/package',
        loadChildren: () => import('./modules/Admin/Masters/package-master/package-master.module').then(m => m.PackageMasterModule),
      },
      {
        path: 'masters/sale-term',
        loadChildren: () => import('./modules/Admin/Masters/sale-term-master/sale-term-master.module').then(m => m.SaleTermMasterModule),
      },
      {
        path: 'masters/tolerance',
        loadChildren: () => import('./modules/Admin/Masters/tolerance-master/tolerance-master.module').then(m => m.ToleranceMasterModule),
      },
      {
        path: 'masters/commodity-excess',
        loadChildren: () => import('./modules/Admin/Masters/commodity-excess/commodity-excess.module').then(m => m.CommodityExcessModule),
      },
      {
        path: 'masters/settling-agent',
        loadChildren: () => import('./modules/Admin/Masters/settlingAgentMaster/settling-agent.module').then(m => m.SettlingAgentMasterModule),
      },
      {
        path: 'masters/exchange-master',
        loadChildren: () => import('./modules/Admin/Masters/exchange-master/exchange-master.module').then(m => m.ExchangeMasterModule),
      },
      {
        path: 'masters/exchange-master-upload',
        loadChildren: () => import('./modules/Admin/Masters/exchange-master-upload/exchange-master-upload.module').then(m => m.ExchangeMasterUploadModule),
      },
      {
        path: 'masters/currency',
        loadChildren: () => import('./modules/Admin/Masters/currency-master/currency-master.module').then(m => m.CurrencyMasterModule),
      },
      {
        path: 'masters/extra-cover',
        loadChildren: () => import('./modules/Admin/Masters/extra-cover/extra-cover.module').then(m => m.ExtraCoverModule),
      },
      {
        path: 'masters/transport',
        loadChildren: () => import('./modules/Admin/Masters/mode-of-transport/mode-of-transport.module').then(m => m.ModeOfTransportModule),
      },
      {
        path: 'masters/warranty',
        loadChildren: () => import('./modules/Admin/Masters/warranty-master/warranty-master.module').then(m => m.WarrantyMasterModule),
      },
      {
        path: 'masters/constant',
        loadChildren: () => import('./modules/Admin/Masters/constant-master/constant-master.module').then(m => m.ConstantMasterModule),
      },
      {
        path: 'masters/exclusion',
        loadChildren: () => import('./modules/Admin/Masters/exclusion-master/exclusion-master.module').then(m => m.ExclusionMasterModule),
      },
      {
        path: 'masters/city',
        loadChildren: () => import('./modules/Admin/Masters/city/city.module').then(m => m.CityModule),
      },
      {
        path: 'masters/clause',
        loadChildren: () => import('./modules/Admin/Masters/clause-id/clause-id.module').then(m => m.ClauseIdModule),
      },
      {
        path: 'masters/wsrcc',
        loadChildren: () => import('./modules/Admin/Masters/wsrcc-cover/wsrcc-cover.module').then(m => m.WsrccCoverModule),
      },
      {
        path: 'masters/cover',
        loadChildren: () => import('./modules/Admin/Masters/cover/cover.module').then(m => m.CoverModule),
      },
      {
        path: 'masters/error',
        loadChildren: () => import('./modules/Admin/Masters/error/error.module').then(m => m.ErrorModule),
      },
      {
        path: 'masters/sales-exe',
        loadChildren: () => import('./modules/Admin/Masters/sales-exe-master/sales-exe-master.module').then(m => m.SalesExeMasterModule),
      },
      {
        path: 'deposit-master',
        loadChildren: () => import('./modules/Admin/Masters/deposit-master/deposit-master.module').then(m => m.DepositMasterModule),
      },
    ],
  },





  // { path: '**', redirectTo: 'login-layout' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
