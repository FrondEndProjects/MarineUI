import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportAppEditComponent } from './transport-app-edit/transport-app-edit.component';
import { TransportTableComponent } from './transport-table/transport-table.component';
import { TransportComponent } from './transport.component';
import { TransportRoutingModule } from './transport-routing.module';
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
    TransportComponent,
    TransportAppEditComponent,
    TransportTableComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
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
export class ModeOfTransportModule { }
