import { IssuerDetailsComponent } from './../issuer-details/issuer-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NbDatepickerModule,NbCardModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
//import { ExistingBrokerListComponent } from './existing-broker-list.component';
//import { ExistingBrokerListRoutingModule } from './existing-broker-list-routing.module';
import { TablesModule } from '../../../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../../../shared/material/material.module';
//import { AdminListComponent } from './admin-list.component';
//import { adminRoutingModule } from './admin-list-routing.module';
import { IssuerListComponent } from './issuer-list.component';
import { issuerRoutingModule } from './issuer-list-routing.module';




@NgModule({
  declarations: [
    IssuerListComponent,
    IssuerDetailsComponent


  ],
  imports: [
    CommonModule,
    issuerRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    NbDatepickerModule,
    NgSelectModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    NbCardModule
  ]
})
export class issuerListModule { }
