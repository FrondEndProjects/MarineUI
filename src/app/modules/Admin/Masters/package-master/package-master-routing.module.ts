
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageMasterAppEditComponent } from './package-master-app-edit/package-master-app-edit.component';
import { PackageMasterTableComponent } from './package-master-table/package-master-table.component';
import { PackageMasterComponent } from './package-master.component';

const routes: Routes = [
  {
    path: '',
    component: PackageMasterComponent,
    children: [
      {
        path : 'view',
        component: PackageMasterTableComponent,
      },
      {
        path: 'add-edit',
        component: PackageMasterAppEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageMasterRoutingModule { }
