
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesExeAppEditComponent } from './sales-exe-app-edit/sales-exe-app-edit.component';
import { SalesExeTableComponent } from './sales-exe-table/sales-exe-table.component';
import { SalesExeComponent } from './sales-exe.component';

const routes: Routes = [
  {
    path: '',
    component: SalesExeComponent,
    children: [
      {
        path : 'view',
        component: SalesExeTableComponent,
      },
      {
        path: 'add-edit',
        component: SalesExeAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesExeRoutingModule { }
