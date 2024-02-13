import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommodityAppEditComponent } from './commodity-app-edit/commodity-app-edit.component';
import { CommodityTableComponent } from './commodity-table/commodity-table.component';
import { CommodityRoutingModule } from './commodity-routing.module';
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
import { CommodityComponent } from './commodity.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { PopUpComponent } from '../popup/popup.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RateCoverComponent } from '../RateCoverCommodity/RateCover.component';


@NgModule({
  declarations: [
    CommodityComponent,
    CommodityAppEditComponent,
    CommodityTableComponent,
    PopUpComponent,
    RateCoverComponent
  ],
  imports: [
    CommonModule,
    CommodityRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    // 3rd party
    NbDatepickerModule,
    NgSelectModule,

    // material
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDatepickerModule,
MatCheckboxModule


  ]
})
export class CommodityModule { }
