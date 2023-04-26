
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoverAppEditComponent } from './cover-app-edit/cover-app-edit.component';
import { CoverTableComponent } from './cover-table/cover-table.component';
import { CoverComponent } from './cover.component';

const routes: Routes = [
  {
    path: '',
    component: CoverComponent,
    children: [
      {
        path : 'view',
        component: CoverTableComponent,
      },
      {
        path: 'add-edit',
        component: CoverAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverRoutingModule { }
