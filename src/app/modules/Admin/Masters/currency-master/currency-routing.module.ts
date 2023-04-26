
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyAppEditComponent } from './currency-app-edit/currency-app-edit.component';
import { CurrencyTableComponent } from './currency-table/currency-table.component';
import { CurrencyComponent } from './currency.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyComponent,
    children: [
      {
        path : 'view',
        component: CurrencyTableComponent,
      },
      {
        path: 'add-edit',
        component: CurrencyAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrencyRoutingModule { }
