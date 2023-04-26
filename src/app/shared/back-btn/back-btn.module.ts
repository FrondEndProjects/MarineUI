import { BackBtnComponent } from './back-btn.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule } from '@nebular/theme';
@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,

  ],
  declarations: [ BackBtnComponent ],
  exports : [ BackBtnComponent ],
})
export class BackBtnModule { }
