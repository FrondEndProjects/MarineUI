import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../../app-config.json';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
//import { MastersService } from '../../../../../Masters/masters.service';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { MastersService } from '../Masters/masters.service';
import { OpenCoverService } from '../../open-cover/open-cover.service';
import { NewQuotesService } from '../../new-quotes/new-quotes.service';
//import { OpenCoverService } from '.open-cover.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public searchForm!: FormGroup;
  public tabActive: number = 2;
  public productNameList: any[] = [];
  public regionList: any[] = [];
  public branchList: any[] = [];
  public routerBaseLink: any = '';
  public tableSection: boolean = false;
public tableData: any;
public columnHeader: any[] = [];
branchValue:any;
public filterValue;  
public loginTypeList: any[] = [];
public loginType:any[]=[];
    usertype: any;
  constructor(
    private openCoverService: OpenCoverService,
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private menuService: NbMenuService,
    private masterSer: MastersService,
    private newQuotesService: NewQuotesService,

  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.searchForm = this.adminReferralService.searchForm;
    //this.loginId = this.userDetails.LoginId;
    this.usertype=this.userDetails.UserType
    this.columnHeader = [
        {key: 'S.No', display: 'S.No'},
        {key: 'ProposalNumber', display: 'Proposal No'},
        {key: 'CustomerName', display: 'Customer Name'},
        {key: 'PolicyStartDate', display: 'Policy Start Date'},
        {key: 'PolicyEndDate', display: 'Policy End Date'},
       //{key: 'EffectiveDate', display: 'Effective Date'},
        {key: 'Draft', display: 'Draft'},
        {
          key: 'actions',
          display: 'Edit',
          config: {
            isEdit: true,
          }
        }
      ];
      this.onGetLoginTypeDropdownList() 
      //this.onGetBranchList();
  }

  ngOnInit(): void {
   
  }

  onDownloadSchedule(row:any){

    console.log('jjjjjjjj',row)
    const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo":row.QuoteNo
    }
    
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      if(data?.Result){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result);
        link.setAttribute('download', row.QuoteNo);
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
      

    })
  }
  /*onGetBranchList() {
    const urlLink = `${this.ApiUrl1}login/getBranchDetail`;
    const reqData = {
      'RegionCode': '01',
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.branchList = data || [];
        this.getExistingAdmin();
      },
      (err) => { },
    );
  }*/


  onGetLoginTypeDropdownList() {
    const urlLink = `${this.ApiUrl1}opencover/dropdown/existing/brokerList`;
    const reqData = {
      'BranchCode': this.userDetails?.BranchCode,
    };
    this.openCoverService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        if (data?.Message === 'Success') {
          this.loginTypeList = data?.Result;
        }
      },
      (err) => { },
    );
  }

  getExistingAdmin(){

    let ReqObj = {
       "BranchCode": this.branchValue,
  "LoginId": this.loginType,
  "Status": "A",
  "UserType": this.usertype
   }

    let urlLink = `${this.ApiUrl1}OpenCover/pendingtoapproved`;
 this.masterSer.onPostMethodSync(urlLink, ReqObj).subscribe(
   (data: any) => {
     if (data?.Result) {
       console.log(data);
       this.tableData = data?.Result;
     }
   }, (err) => { }
 );
}

public applyFilter(event: Event) {
  this.filterValue = (event.target as HTMLInputElement).value;
}

  get sF() {
    return this.searchForm?.controls;
  }
onEdit(row:any){}

}
