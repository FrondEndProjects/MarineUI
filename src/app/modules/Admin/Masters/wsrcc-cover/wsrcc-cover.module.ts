import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WsrccTableComponent } from './wsrcc-table/wsrcc-table.component';
import { WsrccAppEditComponent } from './wsrcc-app-edit/wsrcc-app-edit.component';
import { WsrccComponent } from './wsrcc.component';
import { WsrccRoutingModule } from './wsrcc-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbDatepickerModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { TablesModule } from '../../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../../shared/material/material.module';



@NgModule({
  declarations: [
    WsrccComponent,
    WsrccTableComponent,
    WsrccAppEditComponent
  ],
  imports: [
    CommonModule,
    WsrccRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    // 3rd party
    NbDatepickerModule,
    NgSelectModule,
    NbCardModule,

    // material
    MaterialModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,

  ]
})
export class WsrccCoverModule { }
