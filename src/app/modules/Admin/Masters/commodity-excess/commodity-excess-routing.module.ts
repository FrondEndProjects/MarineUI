
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommodityExcessComponent } from './commodity-excess.component';
import { CommodityExcessTableComponent } from './commodity-excess-table/commodity-excess-table.component';
import { CommodityExcessAppEditComponent } from './commodity-excess-app-edit/commodity-excess-app-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CommodityExcessComponent,
    children: [
      {
        path : 'view',
        component: CommodityExcessTableComponent,
      },
      {
        path: 'add-edit',
        component: CommodityExcessAppEditComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommodityExcessRoutingModule { }
