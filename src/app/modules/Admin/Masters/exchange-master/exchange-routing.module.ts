
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeAppEditComponent } from './exchange-app-edit/exchange-app-edit.component';
import { ExchangeTableComponent } from './exchange-table/exchange-table.component';
import { ExchangeComponent } from './exchange.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeComponent,
    children: [
      {
        path : 'view',
        component: ExchangeTableComponent,
      },
      {
        path: 'add-edit',
        component: ExchangeAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeMasterRoutingModule { }
