import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public activeMenu: any = 'menu1'
  public policyInfo: any;
  public opencoveryn:any;
  public routerBaseLink:any='';
  public userDetails:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  Mop:any=false;
  constructor(
    private router: Router,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.policyInfo = JSON.parse(sessionStorage.getItem('policyGenerated') || '{}');

    console.log('KKKKKKKKKK',this.policyInfo);
    this.opencoveryn= sessionStorage.getItem('newpolicyyn');
    console.log('MMMMMMM',this.opencoveryn);
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    let Type=sessionStorage.getItem('ReportNo');
    if(Type=='12'){
      this.Mop=true;
    }
    else{
      this.Mop=false;
    }
  }

  onMove() {
    sessionStorage.removeItem('ProposalNo');
    this.router.navigate([`${this.routerBaseLink}/new-open-cover/exist-opencover`]);

  }


  getCreditPdf(){
    let ReqObj:any,UrlLink:any;
    // ReqObj = {
    //   "BranchCode": this.userDetails?.BranchCode,
    //   "QuoteNo": rowData.data?.QuoteNo
    // }
       UrlLink = `${this.ApiUrl1}pdf/openCovercreditNote?policyNo=${this.policyInfo?.OpenCoverNo}`;
       //pdf/creditNote?policyNo=${rowData.data?.OpenCoverNo};
      this.sharedService.onGetMethodSync(UrlLink).subscribe(
        (data: any) => {
          let Results=data.Result;
          this.onDownloadSchedule(Results,'Credit')
        });
  }
  getDebitPdf(){
    let ReqObj:any,UrlLink:any;
       UrlLink = `${this.ApiUrl1}pdf/openCoverdebitNote?policyNo=${this.policyInfo?.OpenCoverNo}`;
       //pdf/debitNote?policyNo=${rowData.data?.OpenCoverNo}`;
      this.sharedService.onGetMethodSync(UrlLink).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,'Debit')
        });
  }

  onDownloadSchedule(Results,rowData){

    console.log('jjjjjjjj',Results)
      if(Results){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', Results);
        link.setAttribute('download',rowData);
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
  }

  scheduled(){
    let Results='';
    console.log('rrrrrrr',this.policyInfo?.OpenCoverNo,this.policyInfo?.ProposalNo)
    const urlLink = `${this.ApiUrl1}pdf/opencover`;
    const reqData = {
      "BranchCode":this.userDetails.BranchCode,
      "EndtStatus":"Y",
      "ImageStatus": "Y",
      "OpenCoverNo": this.policyInfo?.OpenCoverNo,
      "ProposalNo": this.policyInfo?.ProposalNo,
      "Status":"P"
    };
    this.sharedService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        Results=data.Result
        this.onDownloadSchedule(Results,'Schedule');
      },
      (err) => { },
    );
  }
}
