import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankMasterAppEditComponent } from './bank-master-app-edit/bank-master-app-edit.component';
import { BankMasterTableComponent } from './bank-master-table/bank-master-table.component';
import { BankMasterRoutingModule } from './bank-master-routing.module';
import { BankMasterComponent } from './bank-master.component';
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
    BankMasterComponent,
    BankMasterAppEditComponent,
    BankMasterTableComponent
  ],
  imports: [
    CommonModule,
    BankMasterRoutingModule,
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
export class BankMasterModule { }
