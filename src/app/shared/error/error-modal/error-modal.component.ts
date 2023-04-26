import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {

  @Input() data:any[]=[];
  constructor(
    protected ref: NbDialogRef<ErrorModalComponent>
  ) {
    console.log(this.data);
  }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }
}
