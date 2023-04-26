
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleTermAppEditComponent } from './sale-term-app-edit/sale-term-app-edit.component';
import { SaleTermTableComponent } from './sale-term-table/sale-term-table.component';
import { SaleTermComponent } from './sale-term.component';

const routes: Routes = [
  {
    path: '',
    component: SaleTermComponent,
    children: [
      {
        path : 'view',
        component: SaleTermTableComponent,
      },
      {
        path: 'add-edit',
        component: SaleTermAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleTermRoutingModule { }
