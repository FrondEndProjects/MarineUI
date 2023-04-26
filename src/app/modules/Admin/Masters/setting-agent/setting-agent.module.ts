import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingAgentAppEditComponent } from './setting-agent-app-edit/setting-agent-app-edit.component';
import { SettingAgentTableComponent } from './setting-agent-table/setting-agent-table.component';
import { SettingAgentComponent } from './setting-agent.component';
import { SettingAgentRoutingModule } from './setting-agent-routing.module';
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
    SettingAgentComponent,
    SettingAgentAppEditComponent,
    SettingAgentTableComponent
  ],
  imports: [
    CommonModule,
    SettingAgentRoutingModule,
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
export class SettingAgentModule { }
