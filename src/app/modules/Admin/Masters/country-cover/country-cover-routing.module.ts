
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryCoverAppEditComponent } from './country-cover-app-edit/country-cover-app-edit.component';
import { CountryCoverTableComponent } from './country-cover-table/country-cover-table.component';
import { CountryCoverComponent } from './country-cover.component';

const routes: Routes = [
  {
    path: '',
    component: CountryCoverComponent,
    children: [
      {
        path : 'view',
        component: CountryCoverTableComponent,
      },
      {
        path: 'add-edit',
        component: CountryCoverAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryCoverRoutingModule { }
