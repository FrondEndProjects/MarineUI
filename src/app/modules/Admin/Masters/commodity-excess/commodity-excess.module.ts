import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityExcessAppEditComponent } from './commodity-excess-app-edit/commodity-excess-app-edit.component';
import { CommodityExcessTableComponent } from './commodity-excess-table/commodity-excess-table.component';
import { CommodityExcessComponent } from './commodity-excess.component';
import { CommodityExcessRoutingModule } from './commodity-excess-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NbDatepickerModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { TablesModule } from '../../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../../shared/material/material.module';



@NgModule({
  declarations: [
    CommodityExcessComponent,
    CommodityExcessAppEditComponent,
    CommodityExcessTableComponent
  ],
  imports: [
    CommonModule,
    CommodityExcessRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    // 3rd party
    NbDatepickerModule,
    NgSelectModule,

    // material
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ]
})
export class CommodityExcessModule { }
