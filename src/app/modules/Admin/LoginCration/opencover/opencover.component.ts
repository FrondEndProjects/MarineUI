
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-opencover-details',
  templateUrl: './opencover.component.html',
  styleUrls: ['./opencover.component.scss']
})
export class OpenCoverDocument implements OnInit {
  


    List:any;
    PolicyHeader:any[]=[];
    imageUrl:any;
  opencover: any;
   constructor( public dialogRef: MatDialogRef<OpenCoverDocument>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.List = this.data.list;
    console.log('hhhhhhhhhh',this.List)
   }
   submit(rowdata:any){
      console.log('gggggggg')
       console.log('ggggggg',rowdata);
       //this.opencover=rowdata[0].OpenCoverNo;
       console.log('yyyyyyy',this.opencover)
       this.close();

   }


   onSelectCustomer(rowData,checked){
    console.log('NNNNNNNNNN',rowData,checked);
    this.opencover=rowData.OpenCoverNo;
    // if(rowData.isChecked){
    //   this.opencover=rowData.OpenCoverNo;
    //   console.log('NNNNNNNNNN',this.opencover,rowData.OpenCoverNo,rowData)
    // }
    // else{
    //   this.opencover='';
    // }
  }
   close(){ this.dialogRef.close(this.opencover);}
 }
