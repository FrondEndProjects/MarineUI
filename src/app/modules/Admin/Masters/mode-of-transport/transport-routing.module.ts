
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportAppEditComponent } from './transport-app-edit/transport-app-edit.component';
import { TransportTableComponent } from './transport-table/transport-table.component';
import { TransportComponent } from './transport.component';

const routes: Routes = [
  {
    path: '',
    component: TransportComponent,
    children: [
      {
        path : 'view',
        component: TransportTableComponent,
      },
      {
        path: 'add-edit',
        component: TransportAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportRoutingModule { }
