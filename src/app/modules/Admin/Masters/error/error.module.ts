import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorTableComponent } from './error-table/error-table.component';
import { ErrorAppEditComponent } from './error-app-edit/error-app-edit.component';
import { ErrorRoutingModule } from './error-routing.module';
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
import { ErrorComponent } from './error.component';
import { DialogExampleComponent } from './error-table/dialog-example/dialog-example.component';



@NgModule({
  declarations: [
    ErrorComponent,
    ErrorTableComponent,
    ErrorAppEditComponent,
    DialogExampleComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule,
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
export class ErrorModule { }
