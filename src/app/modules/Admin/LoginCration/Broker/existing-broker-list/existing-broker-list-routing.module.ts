import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrokerDetailsComponent } from '../add-broker-details/add-broker-details.component';
import { BrokerDetailsComponent } from '../broker-details/broker-details.component';
import { NewBrokerDetailsComponent } from '../new-broker-details/new-broker-details.component';
import { ExistingBrokerListComponent } from './existing-broker-list.component';

const routes: Routes = [
  {
  path: '',
  component: ExistingBrokerListComponent,
  },
    {
      path : 'newBrokerDetails',
      component:NewBrokerDetailsComponent,
    },
    {
      path:'addBrokerDetails',
      component:AddBrokerDetailsComponent
    },
    {
      path:'brokerDetails',
      component:BrokerDetailsComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingBrokerListRoutingModule {
}


