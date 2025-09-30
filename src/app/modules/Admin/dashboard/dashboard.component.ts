import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../../app-config.json';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
//import { MastersService } from '../../../../../Masters/masters.service';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { MastersService } from '../Masters/masters.service';
import { OpenCoverService } from '../../open-cover/open-cover.service';
import { DatePipe } from '@angular/common';
//import { OpenCoverService } from '.open-cover.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @ViewChild('chartContainer1') chartContainer1!: ElementRef;
  private myChart!: echarts.ECharts;
  private myChart2!: echarts.ECharts;
  @ViewChild('referralChart', { static: false }) referralChart!: ElementRef;
  chart: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  userDetails: any
  ProductId: any
  brokerProductQuoteListData: any[] = [];
  brokerProductPolicyListData: any[] = [];
  brokerQuoteListData: any;
  brokerPlocyListData: any;
  brokerReferralPenidngListData: any[] = [];
  brokerReferralApprovedListData: any[] = [];
  brokerReferralRejectedListData: any[] = [];
  issuerListData: any;
  userListData: any;
  adminListData: any;
  referralOverAllList: any[];
  issuerProductQuoteListData: any;
  issuerProductPolicyListData: any;
  issuerQuoteListData: any;
  issuerPolicyListData: any;
  issuerReferralPendingListData: any;
  issuerReferralApprovedListData: any;
  issuerReferralRejectedListData: any;
  overallRefrralList: any[] = [];
  topBrokerList: any[] = [];
  topReferralList: any[] = [];
  topCustomerList: any[] = [];
  OpenCoverNo: any;
  columnHeader1: { key: string; display: string; }[];
  columnHeader2: { key: string; display: string; }[];
  constructor(private adminReferralService: AdminReferralService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    let open = JSON.parse(sessionStorage.getItem('OpenCover'));
    this.OpenCoverNo = open?.value

    this.ProductId = this.userDetails?.Result?.ProductId;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initPieChart('rejectedChart', this.brokerReferralRejectedListData, 'Rejected');
      this.initPieChart('pendingChart', this.brokerReferralPenidngListData, 'Pending');
      this.initPieChart('approvedChart', this.brokerReferralApprovedListData, 'Approved');
      this.brokerPolicyAndQuodation();

    }, 1000);
  }

  ngOnInit(): void {

    if (this.userDetails?.Result?.UserType == 'Broker') {
      this.getBrokerList();

    }
    if (this.userDetails?.Result?.UserType == 'Issuer') {
      this.getIssuerList();

    }
    if (this.userDetails?.Result?.UserType == 'admin') {
      this.getAdminList();

    }
    if (this.userDetails?.Result?.SubUserType == 'b2c' || this.userDetails?.Result?.UserType == 'User') {
      this.getUserList();

    }

  }

  getBrokerList() {
    const urlLink = `${this.ApiUrl1}menu/dashbord/quote/product/brokerlist`;
    let ApplicationId = null;
    if (this.userDetails?.Result?.UserType != 'admin') {
      ApplicationId = '1';
    }
    else {
      ApplicationId = this.userDetails?.Result?.LoginId;
    }
    const reqData = {
      "ProductId": this.ProductId,
      "ApplicationId": ApplicationId,
      "BranchCode": this.userDetails?.Result?.BranchCode,
      "LoginId": this.userDetails?.Result?.LoginId,
      "OpenCoverNo": this.ProductId == '11' ? this.OpenCoverNo : ''
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.brokerProductQuoteListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink1 = `${this.ApiUrl1}menu/dashbord/policy/product/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink1, reqData).subscribe(
      (data: any) => {
        this.brokerProductPolicyListData = data?.Result;

      },
      (err) => { },
    );
    const urlLink2 = `${this.ApiUrl1}menu/dashbord/quote/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink2, reqData).subscribe(
      (data: any) => {
        this.brokerQuoteListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink3 = `${this.ApiUrl1}menu/dashbord/policy/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink3, reqData).subscribe(
      (data: any) => {
        this.brokerPlocyListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink4 = `${this.ApiUrl1}menu/dashbord/referralpending/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink4, reqData).subscribe(
      (data: any) => {
        this.brokerReferralPenidngListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink5 = `${this.ApiUrl1}menu/dashbord/referralapproved/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink5, reqData).subscribe(
      (data: any) => {
        this.brokerReferralApprovedListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink6 = `${this.ApiUrl1}menu/dashbord/referralreject/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink6, reqData).subscribe(
      (data: any) => {
        this.brokerReferralRejectedListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink7 = `${this.ApiUrl1}menu/dashbord/topbroker/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink7, reqData).subscribe(
      (data: any) => {
        // this.topBrokerList = data?.Result;
        this.columnHeader1 = [
          { key: 'Name', display: 'Name' },
          { key: 'Count', display: 'Count' },
          { key: 'Premium', display: 'Premium' },
        ];
        this.topBrokerList = data?.Result;

      },
      (err) => { },
    );
    const urlLink8 = `${this.ApiUrl1}menu/dashbord/topreferral/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink8, reqData).subscribe(
      (data: any) => {
        this.columnHeader2 = [
          { key: 'Name', display: 'Name' },
          { key: 'QuoteNo', display: 'QuoteNo' },
          { key: 'CustomerName', display: 'Customer Name' },
          { key: 'ProductName', display: 'Product Name' },
          { key: 'ReferralUpdate', display: 'Referral Update' },
          { key: 'ReferralStatus', display: 'Status' },
          { key: 'TimeDifference', display: 'Time Difference' },
        ];
        this.topReferralList = data?.Result;
      },
      (err) => { },
    );
    const urlLink9 = `${this.ApiUrl1}menu/dashbord/topcustomer/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink9, reqData).subscribe(
      (data: any) => {
        this.columnHeader1 = [
          { key: 'Name', display: 'Name' },
          { key: 'Count', display: 'Count' },
          { key: 'Premium', display: 'Premium' },
        ];
        this.topCustomerList = data?.Result;
      },
      (err) => { },
    );

    setTimeout(() => {
      this.initPieChart('rejectedChart', this.brokerReferralRejectedListData, 'Rejected');
      this.initPieChart('pendingChart', this.brokerReferralPenidngListData, 'Pending');
      this.initPieChart('approvedChart', this.brokerReferralApprovedListData, 'Approved');
      this.brokerPolicyAndQuodation();

    }, 1000);
  }
  getIssuerList() {

    const urlLink = `${this.ApiUrl1}menu/dashbord/quote/product/issuerlist`;
    let ApplicationId = null;
    if (this.userDetails?.Result?.UserType != 'admin') {
      ApplicationId = '1';
    }
    else {
      ApplicationId = this.userDetails?.Result?.LoginId;
    }
    const reqData = {
      "ProductId": this.ProductId,
      "ApplicationId": ApplicationId,
      "BranchCode": this.userDetails?.Result?.BranchCode,
      "LoginId": this.userDetails?.Result?.LoginId,
      "OpenCoverNo": this.ProductId == '11' ? this.OpenCoverNo : ''
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.brokerProductQuoteListData = data?.Result;
      },
      (err) => { },
    );

    const urlLink1 = `${this.ApiUrl1}menu/dashbord/policy/product/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink1, reqData).subscribe(
      (data: any) => {
        this.brokerProductPolicyListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink2 = `${this.ApiUrl1}menu/dashbord/quote/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink2, reqData).subscribe(
      (data: any) => {
        this.brokerQuoteListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink3 = `${this.ApiUrl1}menu/dashbord/policy/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink3, reqData).subscribe(
      (data: any) => {
        this.brokerPlocyListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink4 = `${this.ApiUrl1}menu/dashbord/referralpending/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink4, reqData).subscribe(
      (data: any) => {
        this.brokerReferralPenidngListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink5 = `${this.ApiUrl1}menu/dashbord/referralapproved/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink5, reqData).subscribe(
      (data: any) => {
        this.brokerReferralApprovedListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink6 = `${this.ApiUrl1}menu/dashbord/referralreject/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink6, reqData).subscribe(
      (data: any) => {
        this.brokerReferralRejectedListData = data?.Result;
      },
      (err) => { },
    );

    const urlLink7 = `${this.ApiUrl1}menu/dashbord/topbroker/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink7, reqData).subscribe(
      (data: any) => {
        // this.topBrokerList = data?.Result;
        this.columnHeader1 = [
          { key: 'Name', display: 'Name' },
          { key: 'Count', display: 'Count' },
          { key: 'Premium', display: 'Premium' },
        ];
        this.topBrokerList = data?.Result;

      },
      (err) => { },
    );
    const urlLink8 = `${this.ApiUrl1}menu/dashbord/topreferral/issuerlist`;
    this.adminReferralService.onPostMethodSync(urlLink8, reqData).subscribe(
      (data: any) => {
        this.columnHeader2 = [
          { key: 'Name', display: 'Name' },
          { key: 'QuoteNo', display: 'QuoteNo' },
          { key: 'CustomerName', display: 'Customer Name' },
          { key: 'ProductName', display: 'Product Name' },
          { key: 'ReferralUpdate', display: 'Referral Update' },
          { key: 'ReferralStatus', display: 'Status' },
          { key: 'TimeDifference', display: 'Time Difference' },
        ];
        this.topReferralList = data?.Result;
      },
      (err) => { },
    );
    const urlLink9 = `${this.ApiUrl1}menu/dashbord/topcustomer/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink9, reqData).subscribe(
      (data: any) => {
        this.columnHeader1 = [
          { key: 'Name', display: 'Name' },
          { key: 'Count', display: 'Count' },
          { key: 'Premium', display: 'Premium' },
        ];
        this.topCustomerList = data?.Result;
      },
      (err) => { },
    );

    setTimeout(() => {
      this.initPieChart('rejectedChart', this.brokerReferralRejectedListData, 'Rejected');
      this.initPieChart('pendingChart', this.brokerReferralPenidngListData, 'Pending');
      this.initPieChart('approvedChart', this.brokerReferralApprovedListData, 'Approved');
      this.brokerPolicyAndQuodation();

    }, 1000);
  }
  getUserList() {

    const urlLink = `${this.ApiUrl1}menu/dashbord/quote/product/userlist`;
    let ApplicationId = null;
    if (this.userDetails?.Result?.UserType != 'admin') {
      ApplicationId = '1';
    }
    else {
      ApplicationId = this.userDetails?.Result?.LoginId;
    }
    const reqData = {
      "ProductId": this.ProductId,
      "ApplicationId": ApplicationId,
      "BranchCode": this.userDetails?.Result?.BranchCode,
      "LoginId": this.userDetails?.Result?.LoginId,
      "OpenCoverNo": this.ProductId == '11' ? this.OpenCoverNo : ''
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.brokerProductQuoteListData = data?.Result;
      },
      (err) => { },
    );



    const urlLink1 = `${this.ApiUrl1}menu/dashbord/policy/product/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink1, reqData).subscribe(
      (data: any) => {
        this.brokerProductPolicyListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink2 = `${this.ApiUrl1}menu/dashbord/quote/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink2, reqData).subscribe(
      (data: any) => {
        this.brokerQuoteListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink3 = `${this.ApiUrl1}menu/dashbord/policy/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink3, reqData).subscribe(
      (data: any) => {
        this.brokerPlocyListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink4 = `${this.ApiUrl1}menu/dashbord/referralpending/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink4, reqData).subscribe(
      (data: any) => {
        this.brokerReferralPenidngListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink5 = `${this.ApiUrl1}menu/dashbord/referralapproved/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink5, reqData).subscribe(
      (data: any) => {
        this.brokerReferralApprovedListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink6 = `${this.ApiUrl1}menu/dashbord/referralreject/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink6, reqData).subscribe(
      (data: any) => {
        this.brokerReferralRejectedListData = data?.Result;
      },
      (err) => { },
    );

    // const urlLink7 = `${this.ApiUrl1}menu/dashbord/topbroker/issuerlist`;
    // this.adminReferralService.onPostMethodSync(urlLink7, reqData).subscribe(
    //   (data: any) => {
    //     // this.topBrokerList = data?.Result;
    //     this.columnHeader1 = [
    //       { key: 'Name', display: 'Name' },
    //       { key: 'Count', display: 'Count' },
    //       { key: 'Premium', display: 'Premium' },
    //     ];
    //     this.topBrokerList = data?.Result;

    //   },
    //   (err) => { },
    // );
    const urlLink8 = `${this.ApiUrl1}menu/dashbord/topreferral/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink8, reqData).subscribe(
      (data: any) => {
        this.columnHeader2 = [
          { key: 'Name', display: 'Name' },
          { key: 'QuoteNo', display: 'QuoteNo' },
          { key: 'CustomerName', display: 'Customer Name' },
          { key: 'ProductName', display: 'Product Name' },
          { key: 'ReferralUpdate', display: 'Referral Update' },
          { key: 'ReferralStatus', display: 'Status' },
          { key: 'TimeDifference', display: 'Time Difference' },
        ];
        this.topReferralList = data?.Result;
      },
      (err) => { },
    );
    const urlLink9 = `${this.ApiUrl1}menu/dashbord/topcustomer/userlist`;
    this.adminReferralService.onPostMethodSync(urlLink9, reqData).subscribe(
      (data: any) => {
        this.columnHeader1 = [
          { key: 'Name', display: 'Name' },
          { key: 'Count', display: 'Count' },
          { key: 'Premium', display: 'Premium' },
        ];
        this.topCustomerList = data?.Result;
      },
      (err) => { },
    );

    setTimeout(() => {
      this.initPieChart('rejectedChart', this.brokerReferralRejectedListData, 'Rejected');
      this.initPieChart('pendingChart', this.brokerReferralPenidngListData, 'Pending');
      this.initPieChart('approvedChart', this.brokerReferralApprovedListData, 'Approved');
      this.brokerPolicyAndQuodation();

    }, 1000);
  }
  getAdminList() {

    const urlLink = `${this.ApiUrl1}menu/dashbord/quote/product/adminlist`;
    let ApplicationId = null;
    if (this.userDetails?.Result?.UserType != 'admin') {
      ApplicationId = '1';
    }
    else {
      ApplicationId = this.userDetails?.Result?.LoginId;
    }
    const reqData = {
      "ProductId": this.ProductId,
      "ApplicationId": ApplicationId,
      "BranchCode": this.userDetails?.Result?.BranchCode,
      "LoginId": this.userDetails?.Result?.LoginId,
      "OpenCoverNo": this.ProductId == '11' ? this.OpenCoverNo : ''
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.brokerProductQuoteListData = data?.Result;
      },
      (err) => { },
    );

    const urlLink1 = `${this.ApiUrl1}menu/dashbord/policy/product/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink1, reqData).subscribe(
      (data: any) => {
        this.brokerProductPolicyListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink2 = `${this.ApiUrl1}menu/dashbord/quote/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink2, reqData).subscribe(
      (data: any) => {
        this.brokerQuoteListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink3 = `${this.ApiUrl1}menu/dashbord/policy/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink3, reqData).subscribe(
      (data: any) => {
        this.brokerPlocyListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink4 = `${this.ApiUrl1}menu/dashbord/referralpending/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink4, reqData).subscribe(
      (data: any) => {
        this.brokerReferralPenidngListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink5 = `${this.ApiUrl1}menu/dashbord/referralapproved/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink5, reqData).subscribe(
      (data: any) => {
        this.brokerReferralApprovedListData = data?.Result;
      },
      (err) => { },
    );
    const urlLink6 = `${this.ApiUrl1}menu/dashbord/referralreject/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink6, reqData).subscribe(
      (data: any) => {
        this.brokerReferralRejectedListData = data?.Result;
      },
      (err) => { },
    );

    const urlLink7 = `${this.ApiUrl1}menu/dashbord/topbroker/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink7, reqData).subscribe(
      (data: any) => {
        // this.topBrokerList = data?.Result;
        this.columnHeader1 = [
          { key: 'Name', display: 'Name' },
          { key: 'Count', display: 'Count' },
          { key: 'Premium', display: 'Premium' },
        ];
        this.topBrokerList = data?.Result;

      },
      (err) => { },
    );
    const urlLink8 = `${this.ApiUrl1}menu/dashbord/topreferral/adminlist`;
    this.adminReferralService.onPostMethodSync(urlLink8, reqData).subscribe(
      (data: any) => {
        this.columnHeader2 = [
          { key: 'Name', display: 'Name' },
          { key: 'QuoteNo', display: 'QuoteNo' },
          { key: 'CustomerName', display: 'Customer Name' },
          { key: 'ProductName', display: 'Product Name' },
          { key: 'ReferralUpdate', display: 'Referral Update' },
          { key: 'ReferralStatus', display: 'Status' },
          { key: 'TimeDifference', display: 'Time Difference' },
        ];
        this.topReferralList = data?.Result;
      },
      (err) => { },
    );
    const urlLink9 = `${this.ApiUrl1}menu/dashbord/topcustomer/brokerlist`;
    this.adminReferralService.onPostMethodSync(urlLink9, reqData).subscribe(
      (data: any) => {
        this.columnHeader1 = [
          { key: 'Name', display: 'Name' },
          { key: 'Count', display: 'Count' },
          { key: 'Premium', display: 'Premium' },
        ];
        this.topCustomerList = data?.Result;
      },
      (err) => { },
    );

    setTimeout(() => {
      this.initPieChart('rejectedChart', this.brokerReferralRejectedListData, 'Rejected');
      this.initPieChart('pendingChart', this.brokerReferralPenidngListData, 'Pending');
      this.initPieChart('approvedChart', this.brokerReferralApprovedListData, 'Approved');
      this.brokerPolicyAndQuodation();

    }, 1000);
  }

  brokerPieChart() {
    const chartDom = document.getElementById('chart-container')!;
    const myChart = echarts.init(chartDom);
    console.log(this.brokerProductPolicyListData, "brokerProductPolicyListData");

    const chartData = this.brokerProductPolicyListData.map(item => ({
      name: item.Name,
      value: Number(item.Premium) ?? 0,
      count: item.Count ?? 0
    }));

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: (params: any) => {
          const premiumFormatted = new Intl.NumberFormat('en-IN').format(params.value);
          return `
        ${params.name}<br/>
        Premium: ${premiumFormatted}<br/>
        Count: ${params.data.count}
      `;
        },
        textStyle: {
          fontSize: 10
        }
      },
      legend: {
        top: 'top',
        itemGap: 0,
        textStyle: {
          fontSize: 12
        }
      },
      series: [
        {
          name: 'Premium',
          type: 'pie',
          // radius: ['45%', '65%'],
          radius: '60%',
          center: ['60%', '40%'],
          label: {
            formatter: '{b}: {c} ({d}%)',
            fontSize: 12
          },
          data: chartData
        }
      ]
    };


    myChart.setOption(option);
    window.addEventListener('resize', () => myChart.resize());

    const chartDom1 = document.getElementById('chart-container1')!;
    const myChart1 = echarts.init(chartDom1);
    console.log(this.brokerProductPolicyListData, "brokerProductPolicyListData");

    const chartData1 = this.brokerProductQuoteListData.map(item => ({
      name: item.Name,
      value: Number(item.Premium) ?? 0,
      count: item.Count ?? 0
    }));

    const option1: echarts.EChartsOption = {
      tooltip: {
        trigger: 'item',
        appendToBody: true,
        formatter: (params: any) => {
          const premiumFormatted = new Intl.NumberFormat('en-IN').format(params.value);
          return `
        ${params.name}<br/>
        Premium: ${premiumFormatted}<br/>
        Count: ${params.data.count}
      `;
        },
        textStyle: {
          fontSize: 10
        }
      },
      legend: {
        top: 'top',
        itemGap: 0,
        textStyle: {
          fontSize: 12
        }
      },
      series: [
        {
          name: 'Premium',
          type: 'pie',
          // radius: ['45%', '65%'],
          radius: '60%',
          center: ['60%', '40%'],
          label: {
            formatter: '{b}: {c} ({d}%)',
            fontSize: 12
          },
          data: chartData1
        }
      ]
    };


    myChart1.setOption(option1);
    window.addEventListener('resize', () => myChart1.resize());


  }

  brokerPolicyAndQuodation() {

    const dom = this.chartContainer?.nativeElement;
    this.myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    let xAxisData: string[] = [];
    let policyCountData: number[] = [];
    let premiumData: number[] = [];

    if (this.brokerPlocyListData.length !== 0) {
      xAxisData = this.brokerPlocyListData.map((item: { Name: string }) =>
        (item.Name || 'Unnamed').replace(/\s+/g, '\n')
      );
      policyCountData = this.brokerPlocyListData.map((item: { Count: string }) => parseInt(item.Count, 10));
      premiumData = this.brokerPlocyListData.map((item: { Premium: string }) => parseFloat(item.Premium));
    }

    const option: echarts.EChartsOption = {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut',
      title: {
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        appendToBody: true,
        textStyle: {
          color: '#000',
          fontSize: 13,
          fontFamily: 'Segoe UI'
        },
        formatter: (params: any) => {
          const name = params[0]?.name ?? '';
          const seriesData = params
            .map(
              (p: any) => `
      <div>
        <span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${p.color};"></span>
        ${p.seriesName}: <b>${p.value}</b>
      </div>`
            )
            .join('');
          return `
      <div style="margin-bottom: 8px;"><b>${name}</b></div>
      ${seriesData}
    `;
        },
        extraCssText: `
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    max-width: 250px;
    white-space: normal;
  `
      },
      legend: {
        top: 30,
        data: ['Policy Count', 'Premium']
      },
      grid: {
        top: 80,
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            show: false
          },
          axisLine: {
            lineStyle: { color: '#aaa' }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1,
          axisLine: { lineStyle: { color: '#3399ff' } },
          splitLine: { show: false },
          axisLabel: {
            formatter: (value: number) => `${Math.round(value)}`
          }

        },
        {
          type: 'value',
          minInterval: 1,
          axisLabel: {
            formatter: (val: number) =>
              val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`
          },
          axisLine: { lineStyle: { color: '#66cc00' } },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: 'Policy Count',
          type: 'bar',
          yAxisIndex: 0,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: '#66aaff' },
            //   { offset: 1, color: '#0044cc' }
            // ])
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#a2cffe' }, // soft pastel blue
              { offset: 1, color: '#0072ff' }  // vibrant blue
            ])
          },
          data: policyCountData
        },
        {
          name: 'Premium',
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#cbf3f0' },  // soft mint
              { offset: 1, color: '#70e000' }  // fresh green
            ])
          },
          data: premiumData
        }
      ]
    };

    this.myChart.setOption(option);


    const dom1 = this.chartContainer1.nativeElement;
    this.myChart2 = echarts.init(dom1, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    let xAxisData1: string[] = [];
    let policyCountData1: number[] = [];
    let premiumData1: number[] = [];

    if (this.brokerQuoteListData?.length != 0 && this.brokerQuoteListData != null) {
      xAxisData1 = this.brokerQuoteListData.map((item: { Name: string }) =>
        (item.Name || 'Unnamed').replace(/\s+/g, '\n')
      );
      policyCountData1 = this.brokerQuoteListData.map((item: { Count: string }) => parseInt(item.Count, 10));
      premiumData1 = this.brokerQuoteListData.map((item: { Premium: string }) => parseFloat(item.Premium));
    }

    const option1: echarts.EChartsOption = {
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicOut',
      title: {
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        appendToBody: true,
        textStyle: {
          color: '#000',
          fontSize: 13,
          fontFamily: 'Segoe UI'
        },
        formatter: (params: any) => {
          const name = params[0]?.name ?? '';
          const seriesData = params
            .map(
              (p: any) => `
      <div>
        <span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${p.color};"></span>
        ${p.seriesName}: <b>${p.value}</b>
      </div>`
            )
            .join('');
          return `
      <div style="margin-bottom: 8px;"><b>${name}</b></div>
      ${seriesData}
    `;
        },
        extraCssText: `
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    max-width: 250px;
    white-space: normal;
  `
      },
      legend: {
        top: 30,
        data: ['Quote Count', 'Premium']
      },
      grid: {
        top: 80,
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData1,
          axisLabel: {
            show: false
          },
          axisLine: {
            lineStyle: { color: '#aaa' }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: { lineStyle: { color: '#000' } },
          splitLine: { show: false },
          minInterval: 1,
          axisLabel: {
            formatter: (value: number) => `${Math.round(value)}`
          }
        },
        {
          type: 'value',
          minInterval: 1,
          axisLabel: {
            formatter: (val: number) =>
              val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`
          },
          axisLine: { lineStyle: { color: '#000' } },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: 'Quote Count',
          type: 'bar',
          yAxisIndex: 0,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#E0BBE4' },  // Soft Lavender
              { offset: 1, color: '#7F00FF' }   // Vivid Purple
            ])
          },
          data: policyCountData1
        },
        {
          name: 'Premium',
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#FFE0B2' },  // Light Peach
              { offset: 1, color: '#FF7043' }   // Deep Orange
            ])
          },
          data: premiumData1
        }
      ]
    };

    this.myChart2.setOption(option1);

  }

  // initPieChart(containerId: string, dataList: any[], title: string) {
  //   const chartDom = document.getElementById(containerId)!;
  //   const chart = echarts.init(chartDom);

  //   const data = dataList.map(item => ({
  //     name: item.Name,
  //     value: parseFloat(item.Count || 0),
  //     count: item.Count || 0,
  //     premium: item.Premium || 0
  //   }));

  //   const hasData = data.some(item => item.value > 0);

  //   chart.setOption({
  //     title: {
  //       text: title,
  //       left: 'center',
  //       top: 10,
  //       textStyle: { fontSize: 14 }
  //     },
  //     tooltip: {
  //       trigger: 'item',
  //       formatter: (params: any) => {
  //         return `
  //         ${params.name ? params.name : ''}<br/>
  //         Count: ${params.data.count ? params.data.count : 0}<br/>
  //         Premium: ${params.data.premium ? params.data.premium : 0}<br/>
  //       `;
  //       }
  //     },
  //     series: [
  //       {
  //         type: 'pie',
  //         radius: '70%',
  //         data: hasData ? data : [{ name: 'No Data', value: 1 }],
  //         emphasis: {
  //           itemStyle: {
  //             shadowBlur: 5,
  //             shadowOffsetX: 0,
  //             shadowColor: 'rgba(0, 0, 0, 0.3)'
  //           }
  //         },
  //         label: {
  //           formatter: (params: any) => {
  //             return `${params.name ? params.name : ''}\nCount: ${params.data.count ? params.data.count : 0}\nPremium: ${params.data.premium ? params.data.premium : 0}`;
  //           }
  //         }
  //       }
  //     ]
  //   });
  // }

  initPieChart(containerId: string, dataList: any[], title: string) {
    const chartDom = document.getElementById(containerId)!;
    const chart = echarts.init(chartDom);

    const colorPalette = [
      '#6FB1FC', '#FFA97A', '#8EE2B3', '#FFB38A',
      '#FF9A94', '#B28DFF', '#E6D37F', '#9ADCF2'
    ];

    const data = dataList.map((item, index) => ({
      name: item.Name,
      value: parseFloat(item.Count || 0),
      count: item.Count || 0,
      premium: item.Premium || 0,
      itemStyle: {
        shadowBlur: 15,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        borderColor: '#fff',
        borderWidth: 2,
        color: colorPalette[index % colorPalette.length]
      }
    }));

    const hasData = data.some(item => item.value > 0);

    chart.setOption({
      backgroundColor: '#fff',
      // title: {
      //   text: title,
      //   left: 'center',
      //   top: 10,
      //   textStyle: { fontSize: 14, fontWeight: 'normal', color: '#333' }
      // },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: {
          color: '#333',
          fontSize: 13
        },
        formatter: (params: any) => {
          return `
          <strong>${params.name || ''}</strong><br/>
          Count: ${params.data.count || 0}<br/>
          Premium: ${params.data.premium || 0}
        `;
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          data: hasData ? data : [{
            name: 'No Data',
            value: 1,
            itemStyle: {
              color: '#eee',
              shadowBlur: 0
            }
          }],
          emphasis: {
            itemStyle: {
              shadowBlur: 25,
              shadowColor: 'rgba(0, 0, 0, 0.35)',
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          label: {
            color: '#444',
            formatter: (params: any) => {
              return `${params.name || ''}\nCount: ${params.data.count || 0}\nPremium: ${params.data.premium || 0}`;
            }
          },
          labelLine: {
            smooth: true,
            length: 10,
            length2: 15,
            lineStyle: {
              color: '#999'
            }
          }
        }
      ]
    });
  }

  formatNumberWithCommas(value: any): string {
    const num = Number(value || 0);
    return num.toLocaleString('en-IN'); // For Indian-style commas like 1,00,000
    // return num.toLocaleString('en-US'); // For Western-style like 100,000
  }
} 
