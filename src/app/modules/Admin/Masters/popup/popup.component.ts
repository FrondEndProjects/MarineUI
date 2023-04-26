import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopUpComponent implements OnInit {
  

@Input() title:any;
   @Input() List:any[]=[];
    PolicyHeader:any[]=[];
    imageUrl:any;
  opencover: any;
   constructor( public dialogRef: MatDialogRef<PopUpComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.PolicyHeader =  [
        { key: 'Sno', display: 'Sno' },
        {
          key: 'actions',
          display: 'select',
          config: {
            select: true,
          }
        },
        { key: 'OpenCoverNo', display: 'Open CoverNo' },
        { key: 'CompanyName', display: 'Customer Name' },
        {key:"MissippiOpenCoverNo",display:'MISSIPPI OPENCOVER NO'}

       
      ];
    }
 
   ngOnInit(): void {
    this.title = this.data.title;
    this.List=this.data.list;
    console.log('hhhhhhhhhh',this.List)
   }
   submit(rowdata:any){
      // console.log('gggggggg')
      //  console.log('ggggggg',rowdata);
      //  this.opencover=rowdata.ClausesId;
      //  console.log('yyyyyyy',this.opencover)
      const selectedList: any[] = this.List.filter((ele: any) => ele.isChecked === true);
      let selectedListId: any = '';
      for (let index = 0; index < selectedList.length; index++) {
        const element = selectedList[index];
        selectedListId += element.ClausesId + ',';
        this.opencover=selectedListId
             
        //this.dialog.closeAll();
        //this.close();
      }
      this.close();
      

   }
   close(){ this.dialogRef.close(this.opencover);}
 }
