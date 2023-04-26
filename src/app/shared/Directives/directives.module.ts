import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropFileUploadDirective } from './drag-drop.directive';



@NgModule({
  declarations: [
    DragDropFileUploadDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DragDropFileUploadDirective,

  ],
})
export class DirectivesModule { }
