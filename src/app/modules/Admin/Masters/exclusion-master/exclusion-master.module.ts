import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExclusionAppEditComponent } from './exclusion-app-edit/exclusion-app-edit.component';
import { ExclusionTableComponent } from './exclusion-table/exclusion-table.component';
import { ExclusionComponent } from './exclusion.component';
import { ExclusionRoutingModule } from './exclusion-routing.module';
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
import { NbMomentDateModule } from '@nebular/moment';
import { MaterialModule } from '../../../../shared/material/material.module';



@NgModule({
  declarations: [
    ExclusionComponent,
    ExclusionAppEditComponent,
    ExclusionTableComponent
  ],
  imports: [
    CommonModule,
    ExclusionRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    // 3rd party
    NbDatepickerModule,
    NbMomentDateModule,
    NgSelectModule,
    MaterialModule,
    // material
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ]
})
export class ExclusionMasterModule { }
