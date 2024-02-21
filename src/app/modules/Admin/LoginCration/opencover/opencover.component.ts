
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
  opencover: any;newList:any[]=[];
  pro: any=[];OpenCoverNo:any;
  selectedMenuList:any[]=[];
  MenuIds: any;
   constructor( public dialogRef: MatDialogRef<OpenCoverDocument>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.PolicyHeader =  [
        // { key: 'Sno', display: 'Sno' },
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
    let MenuIds=this.data.lists?.OpenCoverNo;
    let attach= MenuIds.split(',');
    this.MenuIds = MenuIds;
    console.log('MenuIds',this.MenuIds);
    this.selectedMenuList = attach.filter(item => item!='');
    // this.pro.push(this.data.lists);
    // this.newList.push(this.pro[0].OpenCoverNo);
    console.log('hhhhhhhhhh',this.List);
    console.log('Listssss',this.selectedMenuList)
   }

   onCheckCustomerId(rowdata){
    return rowdata.OpenCoverNo== this.pro.OpenCoverNo;
}

   checkeds(row){
    if(this.selectedMenuList){
      if(this.selectedMenuList.length!=0){
        let exist = this.selectedMenuList.some(ele=>ele == row.OpenCoverNo);
        this.newList = this.selectedMenuList;
        if(exist) return true;
        else false
      }
      else return false;
    } 
    else return false;
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
   close(){ this.dialogRef.close(this.newList);}


  //  onSelectOpenCover(rowData,event){ 
  //   let Endrosement; let endorsements 
  //   // if(this.List.length!=0){
  //   //     let entry = this.List.find(ele=>ele.OpenCoverNo==rowData.OpenCoverNo)
  //   //     if(entry?.OpenCoverNo[0]){
  //   //       endorsements = entry?.OpenCoverNo[0];
  //   //     }
  //   //     else if(entry){
  //   //         endorsements = entry?.OpenCoverNo[0]?.split(',');
  //   //         Endrosement=endorsements.some(ele=>ele==rowData.OpenCoverNo);
  //   //     }
  //   // }
  //   console.log('llllllllllllll',endorsements);
  //   console.log('hhhhhhhhhhhh',event);
  //   let type:any;let list:any
  //   if(event==true){
  //     if(this.List.length!=0){
  //       let exist = this.List.some(ele=>ele.OpenCoverNo == rowData.OpenCoverNo);
  //       if(exist){
  //           let entry = this.List.find(ele=>ele.OpenCoverNo== rowData.OpenCoverNo)
  //           if(entry && this.OpenCoverNo!=null){
  //             this.OpenCoverNo = this.OpenCoverNo +','+this.pro[0].OpenCoverNo+','+rowData.OpenCoverNo;
  //              console.log('Open Cover No',this.OpenCoverNo);
  //           }
  //           else{
  //             if(entry && this.OpenCoverNo==null){
  //               this.OpenCoverNo = this.pro[0].OpenCoverNo+','+rowData.OpenCoverNo;
  //                console.log('Open Cover No',this.OpenCoverNo);
  //             }
  //           }
  //       }
  //   }
  //   }
  //   else{
  //     if(endorsements.length!=0){
  //       let exist = endorsements.some(ele=>ele == rowData.OpenCoverNo);
  //       if(exist){
  //           endorsements.splice(endorsements.findIndex(ele=>ele == rowData.OpenCoverNo),1);
  //           let i=0,finalString = ''
  //           if(endorsements.length!=0){
  //               for(let endorse of endorsements){
  //                   if(finalString=='') finalString = endorse;
  //                   else finalString = finalString+','+endorse;
  //                   i+=1;
  //                   if(i==endorsements.length){
  //                       let entry = this.List.find(ele=>ele.OpenCoverNo== rowData.OpenCoverNo)
  //                       entry.OpenCoverNo[0] = finalString;
  //                   }
  //               }
  //           }
            
  //       }
  //   }
  //   } 
  // }
    onSelectCover(rowData,event){
       if(event==true){ 
        let n = this.pro.find(ele => ele.OpenCoverNo == rowData.OpenCoverNo);
        this.newList.push(rowData.OpenCoverNo);
        console.log('TTTTTTT',this.newList)
       }
       else{
        console.log('this.newList',this.newList,rowData?.OpenCoverNo);
        // let g= this.newList.indexOf(ele => ele==rowData?.OpenCoverNo);
        // console.log('HHHHHH',g)
        // if(g){
        //   this.newList.splice(g,1);
        // }
        this.newList.splice(this.newList.findIndex(ele=>ele == rowData?.OpenCoverNo),1);
        console.log('GGGGG',this.newList)
       }
    }
 }
