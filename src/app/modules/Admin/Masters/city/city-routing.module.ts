
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { CityTableComponent } from './city-table/city-table.component';
import { CityAppEditComponent } from './city-app-edit/city-app-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CityComponent,
    children: [
      {
        path : 'view',
        component: CityTableComponent,
      },
      {
        path: 'add-edit',
        component: CityAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CityRoutingModule { }
