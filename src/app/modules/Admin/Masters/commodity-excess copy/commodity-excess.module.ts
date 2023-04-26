import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityExcessAppEditComponent } from './commodity-excess-app-edit/commodity-excess-app-edit.component';
import { CommodityExcessTableComponent } from './commodity-excess-table/commodity-excess-table.component';



@NgModule({
  declarations: [
    CommodityExcessAppEditComponent,
    CommodityExcessTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommodityExcessModule { }
