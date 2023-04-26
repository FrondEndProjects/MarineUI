
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToleranceAppEditComponent } from './tolerance-app-edit/tolerance-app-edit.component';
import { ToleranceTableComponent } from './tolerance-table/tolerance-table.component';
import { ToleranceComponent } from './tolerance.component';

const routes: Routes = [
  {
    path: '',
    component: ToleranceComponent,
    children: [
      {
        path : 'view',
        component: ToleranceTableComponent,
      },
      {
        path: 'add-edit',
        component: ToleranceAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToleranceRoutingModule { }
