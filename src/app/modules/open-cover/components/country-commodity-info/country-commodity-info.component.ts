import { CommoditySelectionComponent } from './components/commodity-selection/commodity-selection.component';
import { DestCountryComponent } from './components/dest-country/dest-country.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenCoverService } from '../../open-cover.service';
import * as Mydatas from '../../../../app-config.json';
import { Router } from '@angular/router';
import { OrginCountryComponent } from './components/orgin-country/orgin-country.component';
import { CustomerSelectionComponent } from './components/customer-selection/customer-selection.component';
import { SaleTermComponent } from './components/sale-term/sale-term.component';
import { map, startWith } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-country-commodity-info',
  templateUrl: './country-commodity-info.component.html',
  styleUrls: ['./country-commodity-info.component.scss'],
})
export class CountryCommodityInfoComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;

  @ViewChild(OrginCountryComponent) orginCountryComponent: OrginCountryComponent;
  @ViewChild(DestCountryComponent) destCountryComponent: DestCountryComponent;
  @ViewChild(CustomerSelectionComponent) customerSelectionComponent: CustomerSelectionComponent;
  @ViewChild(CommoditySelectionComponent) commoditySelectionComponent: CommoditySelectionComponent;
  @ViewChild(SaleTermComponent) saleTermComponent: SaleTermComponent;


  public orginCountry: any[] = [];
  public destiCountry: any[] = [];
  public proposalNo: any = '';

  public routerBaseLink:any='';
  showSection: boolean = false;
  saleTermComponentmTableData: any;


  constructor(
    private openCoverService: OpenCoverService,
    private router: Router,
  ) {
    this.proposalNo = sessionStorage.getItem('ProposalNo');
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
  }

  ngOnInit(): void {
    this.onGetCommodityList();
    this.onParallelCall();
  }






  onGetCommodityList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/commodity`;
    const reqData = {
      'BranchCode': this.userDetails.BelongingBranch,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data) {
          this.commoditySelectionComponent.columnHeader = [
            {
              key: 'CommodityName',
              display: 'Commodity Name',
              config: {
                isCheck: true,
              },
            },
            {
              key: 'CommodityDescription',
              display: 'Commodity Description',
              config: {
                isInputDes: true,
              },
            },
            {
              key: 'Fragile',
              display: 'Fragile',
              config: {
                isFragiCheck: true,
              },
            },
          ];
          data.Result.map((ele:any)=>{
            ele.CommodityDescription=ele.CommodityName,
            ele.Fragile = false,
            ele.isChecked = false
          });
          console.log(data.Result);
          this.commoditySelectionComponent.tableData = data?.Result;
        }
      },
      (err) => { },
    );
  }

  onParallelCall() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/saleterm`;
    const urlLink1 = `${this.ApiUrl1}opencover/dropdown/tolerance`;
    const reqData = {
      'BranchCode': this.userDetails?.BelongingBranch,
    };

    let SaleTermList = this.openCoverService.onPostMethodSync(urlLink, reqData);
    let ToleranceList = this.openCoverService.onPostMethodSync(urlLink1, reqData);

    const arr = [
      SaleTermList,
      ToleranceList
    ];
    let parallelCall = forkJoin(arr);
    parallelCall.subscribe(
      (data: any) => {
        console.log("res",data);
        let SaleTermList = data[0].Result;
        let ToleranceList = data[1].Result;
        if(SaleTermList.length!=0){
          let i = 0;
          for(let entry of SaleTermList){
                entry['isChecked'] = false;
                entry['toleranceVal'] = '4';
                entry['toleranceList'] = ToleranceList;
                i+=1;
                if(i==SaleTermList.length){
                  this.showSection = true;
                  this.saleTermComponentmTableData = SaleTermList
                  //this.saleTermComponent.tableData = SaleTermList;
                  
                  console.log("Sale Term List Data",this.saleTermComponent.tableData)
                }
          } 
        }
        else{
          this.showSection = true;
          this.saleTermComponentmTableData = []
          console.log("Sale Term List Empty Data",this.saleTermComponent.tableData)
        }
        // const saleTermList = SaleTermList.map(x => ({
        //   ...x,
        //   isChecked:false,
        //   toleranceVal:'4',
        //   toleranceList:ToleranceList
        // }));
        
      },
      (err) => { },
      () => console.log('done')
    );
  }

  onCheckPageValidation(){
    const urlLink = `${this.ApiUrl1}OpenCover/secondpage`;
    const reqData = {
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        if(data?.Result?.Status === true){
          this.onMoveFront();
        }
      });
  }


  onMoveFront() {
    this.openCoverService.onMoveNext('Front');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/coverage-info`]);
  }
  onMoveBack() {
    this.openCoverService.onMoveNext('Back');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/new-open-cover-form`]);
  }
}


