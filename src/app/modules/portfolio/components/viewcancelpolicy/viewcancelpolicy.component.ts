import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-viewcancelpolicy',
  templateUrl: './viewcancelpolicy.component.html',
  styleUrls: ['./viewcancelpolicy.component.scss']
})
export class ViewcancelpolicyComponent implements OnInit {

    title:any;
    imageUrl:any;
   constructor( public dialogRef: MatDialogRef<ViewcancelpolicyComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }
 
   ngOnInit(): void {
       this.title = this.data?.title;
      
   }
   close(){ this.dialogRef.close();}
   
}