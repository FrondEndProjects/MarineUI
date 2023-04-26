
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeUploadAppEditComponent } from './exchange-upload-app-edit/exchange-upload-app-edit.component';
import { ExchangeUploadTableComponent } from './exchange-upload-table/exchange-upload-table.component';
import { ExchangeUploadComponent } from './exchange-upload.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeUploadComponent,
    children: [
      {
        path : 'view',
        component: ExchangeUploadTableComponent,
      },
      {
        path: 'add-edit',
        component: ExchangeUploadAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeUploadRoutingModule { }
