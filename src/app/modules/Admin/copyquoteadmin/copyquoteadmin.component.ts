import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Mydatas from '../../../app-config.json';
import { SessionStorageService } from '../../../shared/storage/session-storage.service';
import { NbMenuService } from '@nebular/theme';
import { AdminReferralService } from '../../admin-referral/admin-referral.service';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-copyquoteadmin',
  templateUrl: './copyquoteadmin.component.html',
  styleUrls: ['./copyquoteadmin.component.scss']
})
export class CopyQuoteAdminComponent implements OnInit {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  searchValue:any;
  selectedData:any;
  SearchList:any[]=[];
  public applicationId: any;
  public searchForm!: FormGroup;
  public tabActive: number = 2;
  public productNameList: any[] = [];
  public regionList: any[] = [];
  public branchList: any[] = [];
  public routerBaseLink: any = '';
  coverList:any[]=[];
  search:any;
  dob:any;
  public tableSection: boolean = false;
public tableData: any;
public columnHeader: any[] = [];
branchValue:any;
public filterValue; 
public searchCopy :any[]=[];
  constructor(
    private _formBuilder: FormBuilder,
    private adminReferralService: AdminReferralService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private menuService: NbMenuService,
    private toastrService: NbToastrService

  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.loginId = this.userDetails.LoginId;
    this.branchValue=this.userDetails.BranchCode;

    console.log('hhhhhhhhhhh',this.branchValue);
    this.searchForm = this.adminReferralService.searchForm;
    
      this.SearchList=[/*{'Code':'1',"CodeDesc":"OpenCoverNo"},
      {'Code':'2',"CodeDesc":"ProposalNo"},
      {'Code':'3',"CodeDesc":"QuoteNo"},*/
      {'Code': 'ProposalNo', "CodeDesc":'Proposal No'}
      
    ]
  }

  ngOnInit(): void {
   
  }

  get sF() {
    return this.searchForm?.controls;
  }

  onSelectCustomer(row:any,template){
   
    console.log("RowData",row.undefined);

    console.log('jjjjjjjjjjjjjj',row);
    this.coverList=[];
    if(row.undefined== true){
     
        let entry =  {
          "BranchCode":this.userDetails.BranchCode,
           "SearchValue":row.ProposalNo
        }
        this.coverList.push(entry);
  
      console.log("Cover List",this.coverList);
    }
    else if(row.undefined == false){
      let index = this.coverList.findIndex(ele=>ele.CoverId==row.CoverId);
      this.coverList.splice(index,1);
    }

  }

  onGetBranchList() {
    const urlLink = `${this.ApiUrl1}opencover/report/copyquotesearch`;
    const reqData = {
      "BranchCode": this.branchValue,
  "SearchValue": this.searchValue
    };
    this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.columnHeader = [
          {
            key: 'actions',
            display: 'select',
            config: {
              isChecked: true,
            }
          },
          {key: 'ProposalNo', display: 'Proposal No'},
          {key: 'OpenCoverNo', display: 'OpenCover No'},
          {key: 'FirstName', display: 'FirstName'},
        ];
        this.tableData = data.Result;
        
      },
      (err) => { },
    );
  }

  submit(){
console.log('this covessslist',this.coverList);
    let i=0;
      for(let u of this.coverList){
        if(u!=null){
          this.searchOpen(u)
        }
    i++;
      }
  }
  searchOpen(u){

    if(this.coverList.length!=0){
      const urlLink = `${this.ApiUrl1}opencover/report/copyquote`;
      const reqData =u
      this.adminReferralService.onPostMethodSync(urlLink, reqData).subscribe(
        (data: any) => {
          console.log(data);
          if (data.Result) {
            let type: NbComponentStatus = 'success';
            const config = {
              status: type,
              destroyByClick: true,
              duration: 4000,
              hasIcon: true,
              position: NbGlobalPhysicalPosition.TOP_RIGHT,
              preventDuplicates: false,
            };
            this.toastrService.success(data.Result);
            this.tableData="";
            this.searchValue=""
          }
          //this.searchCopy = data || [];
          
        },
        (err) => { },
      );
    }
    }
 
onEdit(row:any){}

}
