
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositMasterComponent } from './deposit-master.component';
import { DepositMasterTableComponent } from './deposit-master-table/deposit-master-table.component';

const routes: Routes = [
  {
    path: '',
    component: DepositMasterComponent,
    children: [
      {
        path : 'view',
        component: DepositMasterTableComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositMasterRoutingModule { }
