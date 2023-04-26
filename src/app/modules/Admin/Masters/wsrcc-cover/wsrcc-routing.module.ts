
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WsrccAppEditComponent } from './wsrcc-app-edit/wsrcc-app-edit.component';
import { WsrccTableComponent } from './wsrcc-table/wsrcc-table.component';
import { WsrccComponent } from './wsrcc.component';

const routes: Routes = [
  {
    path: '',
    component: WsrccComponent,
    children: [
      {
        path : 'view',
        component: WsrccTableComponent,
      },
      {
        path: 'add-edit',
        component: WsrccAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WsrccRoutingModule { }
