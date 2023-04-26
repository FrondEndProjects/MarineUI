import { forkJoin } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../../../app-config.json';
import { AppComponent } from '../../../../../../app.component';
import { OpenCoverService } from '../../../../open-cover.service';
import { CountryCommodityInfoComponent } from '../../country-commodity-info.component';
@Component({
  selector: 'app-customer-selection',
  templateUrl: './customer-selection.component.html',
  styleUrls: ['./customer-selection.component.scss'],
})
export class CustomerSelectionComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public proposalNo = '';
  public userDetails: any;
  public filterValue: any = '';
  public tableData: any[] = [];
  public columnHeader: any[] = [];
  public customerEdit: any[] = [];
  public LoginId:any;
  constructor(
    private openCoverService: OpenCoverService,
    private countryCommodityInfoComponent: CountryCommodityInfoComponent,
    private appComponent: AppComponent,
  ) {
    this.proposalNo = this.countryCommodityInfoComponent.proposalNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
  }

  ngOnInit(): void {
    if (this.userDetails.UserType == 'admin') {
      this.LoginId = sessionStorage.getItem('customerLoginId');
     }else{
      this.LoginId = this.userDetails.LoginId;

     }
    this.onGetCustomerList();


  }

  onSelectCustomer(item: any) {
    console.log(item);
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
          key: 'CustomerId',
          display: 'Customer Id',
          config: {
            isCheck: true,
          },
        },
        { key: 'FirstName', display: 'Customer Name' },
        { key: 'Email', display: 'Email' },
        { key: 'PoBox', display: 'P.O.Box' },
        { key: 'EmirateName', display: 'Emirate Name' },
        { key: 'MissippiCustomerCode', display: 'Flag' },
      ];
      const customer: [] = list[0]?.Result?.CustomerResponse || [];
      this.tableData = customer.map((x: any) => ({
        ...x,
        isChecked: this.onCheckCustomer(x)
      }))
    })


  }

  onCheckCustomer(x) {
    const check = this.customerEdit.some((ele: any) => ele.AdditionalInsured == x.CustomerId);
    console.log(check);
    return check;
  }


  onSubmit() {
    const filterCheckedList = this.tableData.filter((ele: any) => ele.isChecked === true);
    const InsuredInfo: any[] = filterCheckedList.map(x => ({
      AdditionalInsured: x.CustomerId,
      AdditionalInsuredName: x.FirstName,
    }));
    const urlLink = `${this.ApiUrl1}OpenCover/insured/save`;
    const reqData = {
      'InsuredInfo': InsuredInfo,
      'ProposalNo': this.proposalNo,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err) => { },
    );

  }

}
