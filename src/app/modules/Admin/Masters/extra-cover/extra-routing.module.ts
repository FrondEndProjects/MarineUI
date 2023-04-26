
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraAppEditComponent } from './extra-app-edit/extra-app-edit.component';
import { ExtraTableComponent } from './extra-table/extra-table.component';
import { ExtraComponent } from './extra.component';

const routes: Routes = [
  {
    path: '',
    component: ExtraComponent,
    children: [
      {
        path : 'view',
        component: ExtraTableComponent,
      },
      {
        path: 'add-edit',
        component: ExtraAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraRoutingModule { }
