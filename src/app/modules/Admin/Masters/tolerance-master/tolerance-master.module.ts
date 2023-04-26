import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToleranceAppEditComponent } from './tolerance-app-edit/tolerance-app-edit.component';
import { ToleranceTableComponent } from './tolerance-table/tolerance-table.component';
import { ToleranceComponent } from './tolerance.component';
import { ToleranceRoutingModule } from './tolerance-routing.module';
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
    ToleranceComponent,
    ToleranceAppEditComponent,
    ToleranceTableComponent
  ],
  imports: [
    CommonModule,
    ToleranceRoutingModule,
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
export class ToleranceMasterModule { }
