import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantAppEditComponent } from './constant-app-edit/constant-app-edit.component';
import { ConstantTableComponent } from './constant-table/constant-table.component';
import { ConstantComponent } from './constant.component';
import { ConstantRoutingModule } from './constant-routing.module';
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



@NgModule({
  declarations: [
    ConstantComponent,
    ConstantAppEditComponent,
    ConstantTableComponent
  ],
  imports: [
    CommonModule,
    ConstantRoutingModule,
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
  ]
})
export class ConstantMasterModule { }
