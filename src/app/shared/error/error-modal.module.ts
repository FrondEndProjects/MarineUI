import { MaterialModule } from './../material/material.module';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  declarations: [ErrorModalComponent],

  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbCardModule,
    NbButtonModule
  ],
  exports: [ErrorModalComponent],
})
export class ErrorModalModule { }
