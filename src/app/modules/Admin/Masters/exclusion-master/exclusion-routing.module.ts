
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExclusionAppEditComponent } from './exclusion-app-edit/exclusion-app-edit.component';
import { ExclusionTableComponent } from './exclusion-table/exclusion-table.component';
import { ExclusionComponent } from './exclusion.component';

const routes: Routes = [
  {
    path: '',
    component: ExclusionComponent,
    children: [
      {
        path : 'view',
        component: ExclusionTableComponent,
      },
      {
        path: 'add-edit',
        component: ExclusionAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExclusionRoutingModule { }
