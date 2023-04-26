
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettlingAgentComponent } from './settling-agent.component';
import { SettlingAgentAppEditComponent } from './settlingAgentAppEdit/settling-agent-app-edit/settling-agent-app-edit.component';
import { SettlingAgentTableComponent } from './settlingAgentTable/settling-agent-table/settling-agent-table.component';

const routes: Routes = [
  {
    path: '',
    component: SettlingAgentComponent,
    children: [
      {
        path : 'view',
        component: SettlingAgentTableComponent,
      },
      {
        path: 'add-edit',
        component: SettlingAgentAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlingAgentRoutingModule { }
