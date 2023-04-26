
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankMasterComponent } from './bank-master.component';
import { BankMasterAppEditComponent } from './bank-master-app-edit/bank-master-app-edit.component';
import { BankMasterTableComponent } from './bank-master-table/bank-master-table.component';

const routes: Routes = [
  {
    path: '',
    component: BankMasterComponent,
    children: [
      {
        path : 'view',
        component: BankMasterTableComponent,
      },
      {
        path: 'add-edit',
        component: BankMasterAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankMasterRoutingModule { }
