import { Component, OnInit, TemplateRef,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NbDialogService } from '@nebular/theme';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MastersService } from '../../masters.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-wsrcc-table',
  templateUrl: './wsrcc-table.component.html',
  styleUrls: ['./wsrcc-table.component.scss']
})
export class WsrccTableComponent implements OnInit {

  names: string[] = [];




 /* open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }

  open2(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      { context: 'this is some additional data passed to dialog' });
  }

  open3() {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name => name && this.names.push(name));
  }

  openWithoutBackdrop(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        hasBackdrop: false,
      });
  }

  openWithoutBackdropClick(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        closeOnBackdropClick: false,
      });
  }

  openWithoutEscClose(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        context: 'this is some additional data passed to dialog',
        closeOnEsc: false,
      });
  }

}*/

@ViewChild('paginator') paginator: MatPaginator;

// public property
public  ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

public tableSection: boolean = false;
public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
public tableData: any;
public columnHeader: any[] = [];
public AppConfig: any = (Mydatas as any).default;
public ApiUrl1: any = this.AppConfig.ApiUrl1;
public userDetails: any;
public branchCode: any;
public filterValue;

// constructor
constructor (private masterSer: MastersService, private router: Router ) {
  this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
  if (this.userDetails) this.branchCode = this.userDetails?.LoginResponse?.BranchCode;
 }


// life cycle hooks
ngOnInit(): void {
  this.getExistingConveyance();
  // get call
}

getExistingConveyance() {
  const ReqObj = {
    'BranchCode': this.userDetails?.Result.BelongingBranch,
  };
  this.masterSer.onPostMethodSync(`${this.ApiUrl1}master/warsrcc/list`, ReqObj).subscribe(
    (data: any) => {
      console.log(data);

      if (data?.Message === 'Success') {
        this.columnHeader = [
          {key: 'CoverId', display: 'Cover Id'},
          {key: 'ClausesDescription', display: 'Clauses Description'},
          {key: 'CoverName', display: 'Cover Name'},
          {key: 'ModeOfTransportDesc', display: 'Transport Description'},
          {key: 'Status', display: 'Status'},
          {
            key: 'actions',
            display: 'Action',
            config: {
              isEdit: true,
            },
          },
          ];
        this.tableData = data?.Result;

      }
    },
    (err) => { },
  );
}

ngAfterViewInit(): void {
  // connect table and paginator
  this.dataSource.paginator = this.paginator;
}

// PUBLIC METHODS

// filter table value based on search value
public applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
}

public onEdit(event) {
  console.log(event);
  let entry = {
    "ClausesId": event?.ClausesId,
    "CoverId": event?.CoverId
  }
  sessionStorage.setItem('CoverData', JSON.stringify(entry));
  this.router.navigateByUrl('Marine/masters/wsrcc/add-edit');
}

}

