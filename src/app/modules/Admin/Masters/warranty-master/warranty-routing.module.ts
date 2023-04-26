
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarrantyAppEditComponent } from './warranty-app-edit/warranty-app-edit.component';
import { WarrantyTableComponent } from './warranty-table/warranty-table.component';
import { WarrantyComponent } from './warranty.component';

const routes: Routes = [
  {
    path: '',
    component: WarrantyComponent,
    children: [
      {
        path : 'view',
        component: WarrantyTableComponent,
      },
      {
        path: 'add-edit',
        component: WarrantyAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarrantyRoutingModule { }
