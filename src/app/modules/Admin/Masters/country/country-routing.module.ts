
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryAddEditComponent } from './country-add-edit/country-add-edit.component';
import { CountryTableComponent } from './country-table/country-table.component';
import { CountryComponent } from './country.component';

const routes: Routes = [
  {
    path: '',
    component: CountryComponent,
    children: [
      {
        path : 'view',
        component: CountryTableComponent,
      },
      {
        path: 'add-edit',
        component: CountryAddEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryRoutingModule { }
