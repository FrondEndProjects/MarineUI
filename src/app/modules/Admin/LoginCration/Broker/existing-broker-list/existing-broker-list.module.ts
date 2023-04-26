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
import { NbDatepickerModule } from '@nebular/theme';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExistingBrokerListComponent } from './existing-broker-list.component';
import { ExistingBrokerListRoutingModule } from './existing-broker-list-routing.module';
import { TablesModule } from '../../../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { NewBrokerDetailsComponent } from '../new-broker-details/new-broker-details.component';
import { BrokerDetailsComponent } from '../broker-details/broker-details.component';
import { AddBrokerDetailsComponent } from '../add-broker-details/add-broker-details.component';



@NgModule({
  declarations: [
    ExistingBrokerListComponent,
  NewBrokerDetailsComponent,
  BrokerDetailsComponent,
  AddBrokerDetailsComponent
  ],
  imports: [
    CommonModule,
    ExistingBrokerListRoutingModule,
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
export class ExistingBrokerListModule { }
