
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstantComponent } from './constant.component';
import { ConstantTableComponent } from './constant-table/constant-table.component';
import { ConstantAppEditComponent } from './constant-app-edit/constant-app-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ConstantComponent,
    children: [
      {
        path : 'view',
        component: ConstantTableComponent,
      },
      {
        path: 'add-edit',
        component: ConstantAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstantRoutingModule { }
