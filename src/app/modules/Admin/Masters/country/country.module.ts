import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryTableComponent } from './country-table/country-table.component';
import { CountryAddEditComponent } from './country-add-edit/country-add-edit.component';
import { CountryComponent } from './country.component';
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
import { CountryRoutingModule } from './country-routing.module';
import { MaterialModule } from '../../../../shared/material/material.module';



@NgModule({
  declarations: [
    CountryComponent,
    CountryTableComponent,
    CountryAddEditComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
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
export class CountryModule { }
