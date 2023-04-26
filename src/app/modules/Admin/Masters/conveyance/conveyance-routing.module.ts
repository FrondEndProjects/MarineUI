import { ConveyanceAddAditComponent } from './conveyance-add-adit/conveyance-add-adit.component';
import { ConveyanceTableComponent } from './conveyance-table/conveyance-table.component';
import { ConveyanceComponent } from './conveyance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ConveyanceComponent,
    children: [
      {
        path : 'view',
        component: ConveyanceTableComponent,
      },
      {
        path: 'add-edit',
        component: ConveyanceAddAditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConveyanceRoutingModule { }
