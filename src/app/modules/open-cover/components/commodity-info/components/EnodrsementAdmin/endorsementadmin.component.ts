import { MaterialTableComponent } from '../../../../../../shared/Tables/material-table/material-table.component';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import * as Mydatas from '../../../../../../app-config.json';
import { OpenCoverService } from '../../../../open-cover.service';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-endorsement-admin',
  templateUrl: './endorsementadmin.component.html',
  styleUrls: ['./endorsementadmin.component.scss']
})

export class EndorsementComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public customerEdit: any[] = [];Remarks:any;
  tableData1:any[]=[];
  public LoginId:any;totalSelected:any=null;EndorsementList:any[]=[];
  show: any= false;
  EndorsementStatus: any;
  EndorsementNew: any[]=[];CancelRemarks:any;EffectiveDateStart:any;
  constructor(
    private openCoverService: OpenCoverService,private datePipe:DatePipe
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnInit(): void {
    this.firstGrid();
    this.editapis();
    if (this.userDetails.UserType == 'admin') {
      this.LoginId = sessionStorage.getItem('customerLoginId');
     }else{
      this.LoginId = this.userDetails.LoginId;

     }
    //this.onGetCustomerList();


  }

  firstGrid(){
    const urlLink = `${this.ApiUrl1}OpenCover/endorsement/list`;
    let ReqObj={
      "ProductId": "11"
    }
    this.openCoverService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log('Datas',data);
    this.tableData1 = data;
    this.columnHeader = [
      {
        key: 'EndtTypeId',
        display: 'EndtTypeId',
        config: {
          isCheck: true,
        },
      },
      { key: 'EndtType', display: 'Endt Type' },
      { key: 'EndtTypeCategory', display: 'Endt Type Category' },
    ];
        //this.filterValue = null;
        //this.onGetCustomerList();
      },
      (err) => { },
    );
  }

  editapis(){
      const urlLink = `${this.ApiUrl1}OpenCover/endorsement/edit`;
      let ReqObj={
        "ProposalNo": this.proposalNo,
        "BranchCode": this.userDetails.BranchCode
      }
      this.openCoverService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log('Datas',data);
          this.EndorsementStatus = data?.EndorsementStatus;
          this.Remarks = data?.EndorsementRemarks;
          let MenuIds=data?.EndorsementType;
          let attach= MenuIds.split(',');
           let MenuId = MenuIds;
          console.log('MenuIds',MenuId);
          this.EndorsementList= attach.filter(item => item!='');
          // this.EndorsementNew.push(data?.EndorsementType);
          // alert(this.EndorsementNew)
        },
        (err) => { },
      );
    
  }
  onSelectCustomer(item: any) {
    console.log(item);
  }

  checkSections(item:any){
    if(this.EndorsementList){
      if(this.EndorsementList.length!=0){
        let exist =this.EndorsementList.some(ele=>ele == item);
        if(exist) return true;
        else false
      }
      else return false;
    } 
    else return false;
  }
  Checknew(event,table){
    console.log('Eventsss',event,table);
    if(event){
      this.EndorsementList.push(table);
      
    }
    else {
      let end= this.EndorsementList.findIndex(ele => ele == table)
      this.EndorsementList.splice(end,1);
      // if(table == '42'){
      //   this.show=false;
      // }
      // else {
      //   this.show=true;
      // }
    }
    if(table == '42' && event){
        this.show=true;
      }
      else if (table == '42' && !event){
        this.show=false;
      }
  }

  onGetCustomerList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/customerlist`;
    const urlLink2 = `${this.ApiUrl1}OpenCover/insured/edit`;

    const reqData = {
      'LoginId': this.LoginId,
      'CustomerId': '',
      'BranchCode': this.userDetails.BranchCode,
    };
    const reqData2 = {
      'BranchCode': this.userDetails.BranchCode,
      'ProposalNo': this.proposalNo,
    };
    const customerList = this.openCoverService.onPostMethodSync(urlLink, reqData);
    const customerListEdit = this.openCoverService.onPostMethodSync(urlLink2, reqData2);

    forkJoin([customerList, customerListEdit]).subscribe((list: any) => {
      console.log('customer-edit',list);
      this.customerEdit = list[1]?.Result?.InsuredInfo || [];
      this.columnHeader = [
        {
          key: 'EndtTypeCategoryId',
          display: 'Endt Type CategoryId',
          config: {
            isCheck: true,
          },
        },
        { key: 'EndtType', display: 'EndtType' },
        { key: 'EndtTypeCategory', display: 'Endt TypeCategory' },
      ];
      //const customer: [] = list[0]?.Result?.CustomerResponse || [];
      // let customerChecked:any[] = customer.map((x: any) => ({
      //   ...x,
      //   isChecked: this.onCheckCustomer(x)
      // }));
      // let customersOpted:any[] = customerChecked.filter(ele=>ele.isChecked==true);
      // this.totalSelected = customersOpted.length;
      // let customersNotOpted = customerChecked.filter(ele=>ele.isChecked!=true);
      //this.tableData = customersOpted.concat(customersNotOpted);
    })


  }

  onCheckCustomer(x) {
    const check = this.customerEdit.some((ele: any) => ele.AdditionalInsured == x.CustomerId);
    console.log(check);
    return check;
  }


  onSubmit( uwList) {
    // const filterCheckedList = this.tableData.filter((ele: any) => ele.isChecked === true);
    // const InsuredInfo: any[] = filterCheckedList.map(x => ({
    //   AdditionalInsured: x.CustomerId,
    //   AdditionalInsuredName: x.FirstName,
    // }));
    
    const urlLink = `${this.ApiUrl1}OpenCover/endorsement/update`;
    const reqData = {
      // 'InsuredInfo': InsuredInfo,
      // 'ProposalNo': this.proposalNo,
      "CancelDate":this.EffectiveDateStart,
     "CancelRemarks": this.CancelRemarks,
      "EndorsementInfo":uwList,
  "EndtRemarks": this.Remarks,
  "EndtYn": "Y",
  "ProposalNo": this.proposalNo
    };
    if (reqData.CancelDate!= '' && reqData.CancelDate != null && reqData.CancelDate != undefined) {
      reqData['CancelDate'] =  this.datePipe.transform(reqData.CancelDate, "dd/MM/yyyy")
    }
    else{
      reqData['CancelDate'] = "";
    }
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.filterValue = null;

        if(data?.Result.ErrorMessage==null){
          this.editapis();
        }
        // this.onGetCustomerList();
      },
      (err) => { },
    );

  }

  onFinalSub(){
    let uwList=[];
     console.log('hhh',this.EndorsementList)
  if(this.EndorsementList.length!=0){
    let i=0;
    for(let uw of this.EndorsementList){
      console.log('ueeee',uw)
      let entry = {"EndType":uw}
      uwList.push(entry);
      console.log('uuuuuu',uwList)
      i++;
      if(i==this.EndorsementList.length){ this.onSubmit(uwList)} 
    }
  }
  }
}