import { CustomerComponent } from './../../customer.component';
import { CustomerService } from './../../customer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-grid',
  templateUrl: './customer-grid.component.html',
  styleUrls: ['./customer-grid.component.scss']
})
export class CustomerGridComponent implements OnInit {

  public ApiUrl1: any;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];


  public brokerList: any[] = [];
  public selectedBroker: any = '';

  public show = 'endo'
  public OpenCover:any='';


  constructor(
    private customerService: CustomerService,
    private router: Router,
    private customerComponent:CustomerComponent
  ) {
    this.ApiUrl1 = this.customerComponent.ApiUrl1;
    this.userDetails = this.customerComponent.userDetails;
    this.loginId = this.customerComponent.loginId;
    this.productId = this.customerComponent.productId;
    this.applicationId = this.customerComponent.applicationId

  }
  ngOnInit(): void {
    alert("Entered")
    this.onGetBrokerList();
    this.selectedBroker = sessionStorage.getItem('loginId');
  }

  onGetBrokerList() {
    const urlLink = `${this.ApiUrl1}menu/portfolio/dropdownlist`;
    const reqData = {
      "Type": "P",
      "LoginId": this.loginId,
      "ProductId": this.productId,
      "ApplicationId": this.applicationId,
      "BranchCode": this.userDetails?.BranchCode
    };
    this.customerService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.brokerList = data?.Result;
        this.selectedBroker = this.selectedBroker?this.selectedBroker:this.brokerList[0].LoginId;
        this.onChangeBroker();
      },
      (err) => { },
    );
  }


  onChangeBroker() {
    if(this.selectedBroker){
      this.loginId = this.selectedBroker;
    }
    this.onLoadGrid();
  }

  onLoadGrid() {
    const urlLink = `${this.ApiUrl1}menu/customerlist`;
    const reqData = {
      "LoginId":this.loginId,
      "ApplicationId":this.applicationId,
      "BranchCode":this.userDetails.BranchCode
    }
    this.customerService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.tableData = [];

        if (data?.Result) {
          this.columnHeader = [
            { key: 'FirstName', display: 'Customer Name' },
            { key: 'Email', display: 'Email' },
            { key: 'Address1', display: 'Address1' },
            { key: 'Mobile', display: 'Contact' },
          ];
          this.tableData = data?.Result;
        }
      },
      (err) => { },
    );
  }





}
