import { RejectedQuoteComponent } from './components/rejected-quote/rejected-quote.component';
import { LapsedQuoteComponent } from './components/lapsed-quote/lapsed-quote.component';
import { ExistQuoteComponent } from './components/exist-quote/exist-quote.component';
import { QuotesComponent } from './quotes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AkiDocAdminComponent } from '../new-quotes/components/customer-info/components/aki-doc-admin/aki-doc-admin.component';

const routes: Routes = [
  {
    path: 'exist-quote',
    component: ExistQuoteComponent,
  },
  {
    path: 'lapsed-quote',
    component: LapsedQuoteComponent,
  },
  {
    path: 'rejected-quote',
    component: RejectedQuoteComponent,
  },
  {
    path: 'aki-doc-admin',
    component: AkiDocAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
