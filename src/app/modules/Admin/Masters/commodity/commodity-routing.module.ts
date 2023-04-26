
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommodityAppEditComponent } from './commodity-app-edit/commodity-app-edit.component';
import { CommodityTableComponent } from './commodity-table/commodity-table.component';
import { CommodityComponent } from './commodity.component';

const routes: Routes = [
  {
    path: '',
    component: CommodityComponent,
    children: [
      {
        path : 'view',
        component: CommodityTableComponent,
      },
      {
        path: 'add-edit',
        component: CommodityAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommodityRoutingModule { }
