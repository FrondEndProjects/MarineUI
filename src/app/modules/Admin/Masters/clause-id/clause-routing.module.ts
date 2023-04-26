
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClauseComponent } from './clause.component';
import { ClauseTableComponent } from './clause-table/clause-table.component';
import { ClauseAppEditComponent } from './clause-app-edit/clause-app-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ClauseComponent,
    children: [
      {
        path : 'view',
        component: ClauseTableComponent,
      },
      {
        path: 'add-edit',
        component: ClauseAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClauseRoutingModule { }
