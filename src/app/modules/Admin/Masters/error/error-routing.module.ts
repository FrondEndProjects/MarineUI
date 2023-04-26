
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorAppEditComponent } from './error-app-edit/error-app-edit.component';
import { ErrorTableComponent } from './error-table/error-table.component';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    children: [
      {
        path : 'view',
        component: ErrorTableComponent,
      },
      {
        path: 'add-edit',
        component: ErrorAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule { }
