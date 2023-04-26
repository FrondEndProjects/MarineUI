import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeUploadAppEditComponent } from './exchange-upload-app-edit/exchange-upload-app-edit.component';
import { ExchangeUploadTableComponent } from './exchange-upload-table/exchange-upload-table.component';
import { ExchangeUploadComponent } from './exchange-upload.component';
import { ExchangeUploadRoutingModule } from './exchange-upload-routing.module';
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
    ExchangeUploadComponent,
    ExchangeUploadAppEditComponent,
    ExchangeUploadTableComponent
  ],
  imports: [
    CommonModule,
    ExchangeUploadRoutingModule,
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
export class ExchangeMasterUploadModule { }
