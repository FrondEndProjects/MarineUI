
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingAgentAppEditComponent } from './setting-agent-app-edit/setting-agent-app-edit.component';
import { SettingAgentTableComponent } from './setting-agent-table/setting-agent-table.component';
import { SettingAgentComponent } from './setting-agent.component';

const routes: Routes = [
  {
    path: '',
    component: SettingAgentComponent,
    children: [
      {
        path : 'view',
        component: SettingAgentTableComponent,
      },
      {
        path: 'add-edit',
        component: SettingAgentAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingAgentRoutingModule { }
