import { CustomerGridComponent } from './components/customer-grid/customer-grid.component';
import { CustomerComponent } from './customer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: '',
    component: CustomerComponent,
  },
  {
    path: 'customer-grid',
    component: CustomerGridComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
