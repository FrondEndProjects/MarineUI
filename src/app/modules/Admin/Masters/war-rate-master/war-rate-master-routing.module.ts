
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarRateAppEditComponent } from './war-rate-app-edit/war-rate-app-edit.component';
import { WarRateMasterComponent } from './war-rate-master.component';
import { WarRateTableComponent } from './war-rate-table/war-rate-table.component';

const routes: Routes = [
  {
    path: '',
    component: WarRateMasterComponent,
    children: [
      {
        path : 'view',
        component: WarRateTableComponent,
      },
      {
        path: 'add-edit',
        component: WarRateAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarRateModuleRoutingModule { }
