import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettlingAgentComponent } from './settling-agent.component';
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
import { SettlingAgentAppEditComponent } from './settlingAgentAppEdit/settling-agent-app-edit/settling-agent-app-edit.component';
import { SettlingAgentTableComponent } from './settlingAgentTable/settling-agent-table/settling-agent-table.component';
import { SettlingAgentRoutingModule } from './settling-agent-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';



@NgModule({
  declarations: [
    SettlingAgentComponent,
    SettlingAgentAppEditComponent,
    SettlingAgentTableComponent
  ],
  imports: [
    CommonModule,
    SettlingAgentRoutingModule,
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
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SettlingAgentMasterModule { }
