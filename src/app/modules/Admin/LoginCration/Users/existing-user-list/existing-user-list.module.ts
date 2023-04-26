import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { TablesModule } from '../../../../../shared/Tables/tables.module';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { ExistingUserListComponent } from './existing-user-list.component';
import { NewUserDetailsComponent } from '../new-user-details/new-user-details.component';
import { ExistingUserListRoutingModule } from './existing-user-list-routing.module';
/*import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';*/



@NgModule({
  declarations: [
    ExistingUserListComponent,
  NewUserDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    ExistingUserListRoutingModule,
    TablesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    // 3rd party
    NbDatepickerModule,
    NgSelectModule,

    // material
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    //MatDialog,
  ]
}) 
export class ExistingUserListModule { }
