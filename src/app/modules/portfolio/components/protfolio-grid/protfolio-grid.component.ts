import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { Observable, merge, combineLatest, forkJoin } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PortfolioService } from '../../portfolio.service';
import { PortfolioComponent } from '../../portfolio.component';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
//import { NewQuotesService } from 'src/app/modules/new-quotes/new-quotes.service';
//import { NewQuotesService } from 'src/app/modules/new-quotes/new-quotes.service';
import { NewQuotesService } from '../../../new-quotes/new-quotes.service';

@Component({
  selector: 'app-protfolio-grid',
  templateUrl: './protfolio-grid.component.html',
  styleUrls: ['./protfolio-grid.component.scss'],
  providers: [PortfolioComponent]

})
export class ProtfolioGridComponent implements OnInit {


  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public FilterValue: any;

  public tableData: any[] = [];
  public columnHeader: any[] = [];
  uploadedDocumentsList:any[]=[];


  public brokerList: any[] = [];
  public selectedBroker: any = '';
  otherPolicyNo:any=null;
  public show = 'endo'
  public OpenCover:any='';
  public routerBaseLink:any='';
  isIssuer: boolean;
  userType: any=null;
  imageUrl: any;
  uploadDocuments: any[]=[];
  quote: any;
  policy: any;


  constructor(
    private portfolioBrokerService: PortfolioService,
    private router: Router,
    private portfolioComponent:PortfolioComponent,
    private sessionStorageService: SessionStorageService,
    private dialog: MatDialog,
    private newQuotesService: NewQuotesService,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.productId = this.sessionStorageService.sessionStorgaeModel.productId;
    this.userDetails = this.userDetails?.LoginResponse;
    this.userType = this.userDetails?.UserType;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.OpenCover = this.portfolioComponent?.OpenCover;
    console.log(this.OpenCover);

    if (this.userDetails?.UserType === 'Broker' || this.userDetails?.UserType === 'User') {
      this.loginId = this.userDetails.LoginId;
      console.log('LLLLLLLLLLLLLL',this.loginId);
      this.applicationId = '1';
    }
    if (this.userDetails?.UserType !== 'Broker' && this.userDetails?.UserType !== 'User') {
      this.loginId = '';
      this.applicationId = this.userDetails?.LoginId;
    }


     // Broker
     if (this.userDetails?.UserType != "RSAIssuer") {
      //this.loginId = this.userDetails?.LoginId;
      //this.applicationId = '1';
      this.isIssuer = false;

    }
    // Issuer

    if (this.userDetails?.UserType == "RSAIssuer"){
      //this.loginId = this.endorsement?.LoginId || '';
      //.applicationId = this.userDetails.LoginId;
      this.isIssuer = true;
    }


  }
  ngOnInit(): void {
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
    this.portfolioBrokerService.onPostMethodSync(urlLink, reqData).subscribe(
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
      console.log('RRRRRRRRRR',this.loginId)
      if( this.userDetails?.UserType !== 'User'){
      this.loginId = this.selectedBroker;
      }
      console.log('kkkkkkkkkkkk',this.loginId)
    }
    this.onLoadGrid();
  }
  onmenu(row,rowData,template){
    console.log('jjjjjjjjjjj',row)
    console.log('kkkkkkkk',rowData)
      if(rowData=='Schedule' || rowData=='Policy Wordings')  this.getSchedulePdf(row,rowData);

      if(rowData=='Documents'){
        this.OpenDocument(template,row)
      }
      if(rowData == 'Debit Note'){
        this.getDebitPdf(row,rowData);
      }
      if(rowData=='Credit Note'){
        this.getCreditPdf(row,rowData);
      }
  }

  submit(){
    if(this.uploadDocuments.length!=0){
      let i=0;
        for(let doc of this.uploadDocuments){
          const urlLink = `${this.ApiUrl1}file/upload`;
          this.newQuotesService.onDocumentPostMethodSync(urlLink, doc).subscribe((data: any) => {
            console.log(data);
            if (data) {
                 i+=1;
                 if(i==this.uploadDocuments.length)
                  {
                    this.uploadedDocumentsList = []; 
                    this.uploadDocuments=[];
                    //this.close();
                    this.ongetUploadedDocument();
                    this.close();
                  }
            }
          })
        }
    }
    else{
     
    }
  }
  
  ongetUploadedDocument(){
    //console.log('fffffffffff',this.QuoteNo);
    //this.uploadedDocumentsList=[];
    const urlLink = `${this.ApiUrl1}file/upload/list`;
    const reqData = {
      "LoginId": this.userDetails?.LoginId,
      "QuoteNo": this.quote,
      "UploadId": null
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log("Doc List kkkkkkkkkkkkk",data);
      this.uploadedDocumentsList=data.Result;
    })
  }
  onUploadDocument(event: any, eventType: string) {
    console.log(event);
    console.log('hhhhhhh',eventType)
    let fileList;
    if (eventType == 'click') {
    let fileList = event.target.files;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          let Exist = this.uploadDocuments.some((ele: any) => ele.fileName == filename);
          console.log("Element Exist",Exist)
          if (!Exist) {
            this.uploadDocuments.push({ 'url': element,"fileName":filename,'productid':this.sessionStorageService.sessionStorgaeModel.productId,'loginid':this.userDetails?.LoginId,'quoteNo':this.quote});
            console.log('jjjjjj',this.uploadDocuments)
          }
          else {
            Swal.fire(
              `Selected File ${element.name} Already Exist`,
              'Invalid Document'
            )
          }

        }

    }
      
    }
    if (eventType == 'drop') {
      fileList = event[0];
    }
    
  }


  OpenDocument( templateRef,row ){
     console.log('uuuuuuuuu',row.data)
     this.policy=row.data.PolicyNo
     this.quote=row.data.QuoteNo;
      let dialogRef = this.dialog.open(templateRef, {
       width: '100%',
       height:'80%'
     });
     this.ongetUploadedDocument();
    
  }
  onDeleteUploadedDoc(index){
    const urlLink = `${this.ApiUrl1}file/delete`;
    const reqData = {
      /*"BranchCode": this.userDetails?.BranchCode,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,*/
       "LoginId": this.userDetails?.LoginId,
      "QuoteNo": this.quote,
      "UploadId": this.uploadedDocumentsList[index].UploadId
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      if(data?.Result){
       console.log('kkkkkkkkkk',this.uploadedDocumentsList);
       this.ongetUploadedDocument();
      }
      
    })
    //this.uploadedDocumentsList.splice(index,1);
    //this.onSubmit(); 
  }

  onDeleteUploadDoc(index){
    this.uploadDocuments.splice(index,1);
  }
    close(){
     
      this.dialog.closeAll();
    }
  
  
  getSchedulePdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    ReqObj = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo": rowData.data?.QuoteNo
    }
    if(type=='Schedule'){
      
       UrlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    }
    else if(type == 'Policy Wordings'){
      type = 'PolicyWordings'
       UrlLink = `${this.ApiUrl1}pdf/policywording`;
    }
      this.portfolioBrokerService.onPostMethodSync(UrlLink, ReqObj).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,type)
        });
  }

  getCreditPdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    // ReqObj = {
    //   "BranchCode": this.userDetails?.BranchCode,
    //   "QuoteNo": rowData.data?.QuoteNo
    // }
       UrlLink = `${this.ApiUrl1}pdf/creditNote?policyNo=${rowData.data?.PolicyNo}`;
      this.portfolioBrokerService.onGetMethodSync(UrlLink).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,type)
        });
  }
  getDebitPdf(rowData,type){
    let ReqObj:any,UrlLink:any;
    // ReqObj = {
    //   "BranchCode": this.userDetails?.BranchCode,
    //   "QuoteNo": rowData.data?.QuoteNo
    // }
       UrlLink = `${this.ApiUrl1}pdf/debitNote?policyNo=${rowData.data?.PolicyNo}`;
      this.portfolioBrokerService.onGetMethodSync(UrlLink).subscribe(
        (data: any) => {
          let Results=data.Result
          this.onDownloadSchedule(Results,type)
        });
  }
  onDownloadSchedule(Results,rowData){

    console.log('jjjjjjjj',Results)
   /* const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo":row.QuoteNo
    }*/
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
  onLoadGrid() {
    this.tableData = [];let loginId = null,applicationId=null;
    if(this.otherPolicyNo==null){loginId = this.loginId;applicationId = this.applicationId; }
    console.log('LLLLLLLLLLLLLLMMMMMMMMMM',this.loginId);
    const urlLink = `${this.ApiUrl1}menu/portfolio/policy`;
    const reqData = {
      "OpenCoverNo": this.OpenCover?.value,
      "LoginId": loginId,
      "ProductId": this.productId,
      "ApplicationId": applicationId,
      "OtherPolicyNo": this.otherPolicyNo,
      "BranchCode": this.userDetails?.BranchCode
    }
    this.portfolioBrokerService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.tableData = [];

        if (data?.Result) {
          this.columnHeader = [

            { key: 'QuoteNo', display: 'Quote No', sticky: false, },
            { key: 'CustomerName', display: 'Customer Name' },
            { key: 'QuotationDate', display: 'Policy Date' },
            { key: 'Premium', display: 'Premium' },
            { key: 'PremiumCurrencyName', display: 'Currency' },
            { key: 'PolicyNo', display: 'Policy No' },
            { key: 'Username', display: 'Username' },
            { key: 'GoodsDescription', display: 'Goods' },
            { key: 'LcDate', display: 'LC Date' },
            { key: 'LcNumber', display: 'LC Number' },
            { key: 'BlAwbNo', display: 'Bill No' },
            { key: 'BlAwbDate', display: 'Bill Date' },
            {
              key: 'endorse',
              display: 'Endorse',
              sticky: true,
              config: {
                isActionBtn: true,
                isActionBtnName: 'add',
                isNgxIcon:'fas fa-plus-circle',
                bg: 'primary'
              }
            },
            {
              key: 'actions',
              display: 'Action',
              sticky: true,
              config: {
                isMenuAction: true,
                menuList: [
                  { name: 'Schedule' },
                  { name: 'Debit Note' },
                  { name: 'Credit Note' },
                  { name: 'Policy Wordings' },
                  { name: 'Documents' },
                  
                ]
              },
            },
          ];
          this.tableData = data?.Result.map(x => ({
            ...x,
            isClicked: false
          }));;
        }
      },
      (err) => { },
    );
  }

  isActionBtn(event: any) {
    console.log('llllllllllllll',event)
     const data:any = {
      'PolicyNo':event.PolicyNo,
      'QuoteNo':event.QuoteNo,
      'LoginId':this.selectedBroker
     }
     if(this.otherPolicyNo!=null) data['LoginId'] = event.LoginId
     console.log(data);
    sessionStorage.setItem('portfolio',JSON.stringify(data));
    sessionStorage.setItem('quotesType', 'With-Endo');
    this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-grid`]);
  }



}
