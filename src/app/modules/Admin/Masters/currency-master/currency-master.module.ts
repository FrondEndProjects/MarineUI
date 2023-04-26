import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyAppEditComponent } from './currency-app-edit/currency-app-edit.component';
import { CurrencyTableComponent } from './currency-table/currency-table.component';
import { CurrencyComponent } from './currency.component';
import { CurrencyRoutingModule } from './currency-routing.module';
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
    CurrencyComponent,
    CurrencyAppEditComponent,
    CurrencyTableComponent
  ],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
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
export class CurrencyMasterModule { }
