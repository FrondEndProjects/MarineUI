import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { OpenCoverService } from '../../../../open-cover.service';
import * as Mydatas from '../../../../../../app-config.json';
import { CountryCommodityInfoComponent } from '../../country-commodity-info.component';
import { AppComponent } from '../../../../../../app.component';
@Component({
  selector: 'app-sale-term',
  templateUrl: './sale-term.component.html',
  styleUrls: ['./sale-term.component.scss'],
})
export class SaleTermComponent implements OnInit {
  @Input('tableData') tableData: any[] = [];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public saleTermList: any[] = [];
  public filterValue: any = '';
  public columnHeader: any[] = [];
  showSection:boolean = false;totalSelected:any=null;

  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
    private countryCommodityInfoComponent: CountryCommodityInfoComponent,
    private appComponent: AppComponent,
  ) {
    this.proposalNo = this.countryCommodityInfoComponent.proposalNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnInit(): void {
    this.columnHeader = [
      {
        key: 'SaleTermName',
        display: 'SaleTerm Name',
        config: {
          isBsCheckBox: true,
          model: 'isChecked'
        },
      },

      {
        key: 'toleranceList',
        display: 'Tolerance List',
        config: {
          isdropdownLis: true,
          keyName: 'ToleranceName',
          KeyCode: 'ToleranceId',
          model: 'toleranceVal'
        },
      },

    ];
    this.onEdit();
  }

  onSelectCustomer(item: any) {
    console.log(item);
  }

  onGetTolarenceName(list:any[],id:any){
     let idx = list.findIndex((ele:any)=>ele.ToleranceId == id);
     return list[idx].ToleranceName;
  }

  onSaveSaleterm(){
    const urlLink = `${this.ApiUrl1}OpenCover/saleterm/save`;
    const selectedList:any[] = this.tableData.filter((ele:any)=>ele.isChecked === true);

    const SaleTermInfo: any[] = selectedList.map(x => ({
      "SaleTermId": x.SaleTermId,
      "SaleTermName": x.SaleTermName
    }));

    const reqData = {
      "ProposalNo": this.proposalNo,
      "SaleTermInfo": SaleTermInfo,
    };

    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe((ele:any)=>{
      this.filterValue=null;
      this.onSaveTolarence();
    })
  }

  onSaveTolarence(){
    const urlLink = `${this.ApiUrl1}OpenCover/tolerance/save`;
    const selectedList:any[] = this.tableData.filter((ele:any)=>ele.isChecked === true);

    const ToleranceInfo: any[] = selectedList.map(x => ({
      "ToleranceId": `${x.SaleTermId}~${x.toleranceVal}`,
      "ToleranceName": `${x.SaleTermName}+${this.onGetTolarenceName(x.toleranceList,x.toleranceVal)}`
    }));

    const reqData = {
      "ProposalNo": this.proposalNo,
      "ToleranceInfo": ToleranceInfo
    };

    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe((ele:any)=>{
       this.filterValue=null;
       this.onEdit();
    })
  }

  // onParallelCall() {
  //   const urlLink = `${this.ApiUrl1}OpenCover/saleterm/save`;
  //   const urlLink1 = `${this.ApiUrl1}OpenCover/tolerance/save`;
  //   const user = this.userDetails?.LoginResponse;

  //   const selectedList:any[] = this.tableData.filter((ele:any)=>ele.isChecked === true);

  //   const SaleTermInfo: any[] = selectedList.map(x => ({
  //     "SaleTermId": x.SaleTermId,
  //     "SaleTermName": x.SaleTermName
  //   }));

  //   const ToleranceInfo: any[] = selectedList.map(x => ({
  //     "ToleranceId": `${x.SaleTermId}~${x.toleranceVal}`,
  //     "ToleranceName": `${x.SaleTermName}+${this.onGetTolarenceName(x.toleranceList,x.toleranceVal)}`
  //   }));
  //   const reqData = {
  //     "ProposalNo": this.proposalNo,
  //     "SaleTermInfo": SaleTermInfo,
  //   };
  //   const reqData1 = {
  //     "ProposalNo": this.proposalNo,
  //     "ToleranceInfo": ToleranceInfo
  //   };

  //   console.log(reqData,reqData1)

  //   let SaleTermList = this.openCoverService.onPostMethodSync(urlLink, reqData);
  //   let ToleranceList = this.openCoverService.onPostMethodSync(urlLink1, reqData1);

  //   const arr = [
  //     SaleTermList,
  //     ToleranceList
  //   ];
  //   let parallelCall = forkJoin(arr);
  //   parallelCall.subscribe(
  //     (data: any) => {
  //       console.log("res", data);

  //     },
  //     (err) => { },
  //     () => console.log('done')
  //   );
  // }

  onEdit() {
    const urlLink = `${this.ApiUrl1}OpenCover/saleterm/edit`;
    const urlLink1 = `${this.ApiUrl1}OpenCover/tolerance/edit`;

    const reqData = {
      'BranchCode': this.userDetails.BranchCode,
      'ProposalNo': this.proposalNo,
    };
    const SaleTermList = this.openCoverService.onPostMethodSync(urlLink, reqData);
    const ToleranceList = this.openCoverService.onPostMethodSync(urlLink1, reqData);
    const arr = [
      SaleTermList,
      ToleranceList
    ];
    let parallelCall = forkJoin(arr);
    parallelCall.subscribe(
      (data: any) => {
        console.log("edit", data);
        let SaleTermList:any[] = data[0].Result?.SaleTermInfo || [];
        let ToleranceList:any[] = data[1].Result?.ToleranceInfo || [];
        if(ToleranceList.length!=0){
          for (let index = 0; index < ToleranceList.length; index++) {
            const element = ToleranceList[index];
            let splitval = element.ToleranceId.split('~');
            console.log("Split Process",this.tableData,splitval);
            let idx = this.tableData.findIndex((ele:any)=>ele.SaleTermId == splitval[0]);
            console.log("Entered 1",splitval,idx);
            if(idx>=0){
              if(this.tableData[idx]?.isChecked!=undefined && this.tableData[idx]?.isChecked!=null){
                console.log("Entered 3",this.tableData[idx]);
                this.tableData[idx].isChecked = true;
                this.tableData[idx].toleranceVal = splitval[1];
                console.log("Entered 4",this.tableData[idx]);
              }
              else{
                console.log("Entered 2",idx);
                let entry = this.tableData[idx];
                entry['isChecked'] = true;
                entry['toleranceVal'] = splitval[1];
                console.log("Entered Final Set Value",entry,idx)
              }
            }   
            
            if(index==ToleranceList.length-1){
              this.totalSelected = this.tableData.filter(ele=>ele.isChecked==true).length;
              this.tableData = this.tableData.filter(ele=>ele.isChecked==true).concat(this.tableData.filter(ele=>ele.isChecked!=true))
              console.log("Filtered Data",this.tableData.filter(ele=>ele.isChecked==true))
              this.showSection = true;
            }
          }
        }
        else{
          this.showSection = true;
        } 

      },
      (err) => { },
      () => console.log('done')
    );

  }

}
