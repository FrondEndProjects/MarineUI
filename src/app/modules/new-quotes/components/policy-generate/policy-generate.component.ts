import { NewQuotesService } from './../../new-quotes.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NewQuotesComponent } from '../../new-quotes.component';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import { MatDialog } from '@angular/material/dialog';
//import { ViewDocumentComponent } from '../viewDocument/viewDocument.component';
@Component({
  selector: 'app-policy-generate',
  templateUrl: './policy-generate.component.html',
  styleUrls: ['./policy-generate.component.scss'],

})
export class PolicyGenerateComponent implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public ReferenceNo: any;
  public premiumDetails:any;
  public policyForm:FormGroup;

  public generateCerti:any='N';
  public premium:any=false;
  public nameOfBroker:any=false;
  public foreignCurrency:any=false;
  public darft:any=false;
  public bankerAssured:any=false;
  public excess:any=false;
  public routerBaseLink:any='';
  public premiumForm!: FormGroup;
  public OpenCover:any;
  QuoteStatus: string;
  uploadDocuments: any[]=[];
  uploadedDocumentsList:any[]=[];
  imageUrl: any;
  policyNo: any;
  uploadId:any;docTypeList:any[]=[];
  policySection: boolean = false;
  draftSection: boolean = false;
  schedule:boolean=false;
  currencyName: any;
  bankName: any=null;
  quoteNo: any=null;
  porttype: string;
  constructor(
    private newQuotesService: NewQuotesService,
    private _formBuilder:FormBuilder,
    private router:Router,private sessionStorageService: SessionStorageService,
    private newQuotesComponent:NewQuotesComponent,public dialogService: MatDialog,

  ) {
    this.policyForm = this.newQuotesService.premiumForm;
    this.userDetails = this.newQuotesComponent?.userDetails;
    this.currencyName = this.userDetails?.CurrencyAbbreviation;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.productId = this.newQuotesComponent.productId;
    this.ReferenceNo = sessionStorage.getItem('ReferenceNo');
    this.OpenCover = this.newQuotesComponent.OpenCover;
    this.applicationId = this.newQuotesComponent.applicationId;
    this.QuoteStatus = sessionStorage.getItem('QuoteStatus');
    this.porttype= sessionStorage.getItem('openCOverType');
    console.log('Tpes',this.porttype);
    console.log(this.QuoteStatus);
    //this.ongetUploadedDocument();
  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onGetPremiumInformation();
  }
  get premiumF() {
    return this.premiumForm?.controls;
  }

  onCreateFormControl(){
    this.policyForm = this._formBuilder.group({
      generateCerti: ['Y'],
      premium: ['N'],
      nameOfBroker: ['N'],
      foreignCurrency: ['N'],
      darft: ['N'],
      bankerAssured: ['N'],
      excess: ['N'],
    });
  }

  get policyF() {
    return this.policyForm.controls;
  }

  onGetPremiumInformation() {
    const urlLink = `${this.ApiUrl1}quote/premium/response`;
    const reqData = {
      "ReferenceNo": this.ReferenceNo,
      "BranchCode": this.userDetails.BranchCode,
      "TotalInsuredValue": 0.0,
      "EquivalentInsuredValue": 0.0
    };
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log(data);
        this.premiumDetails = data?.Result;
        this.quoteNo = this.premiumDetails?.QuoteDetails?.QuoteNo;
        this.bankName = this.premiumDetails?.LcBankDetails?.BankName;
        this.getdocTypeList();
        //this.ongetUploadedDocument();
      },
      (err) => { },
    );
  }
  getdocTypeList(){
    const urlLink = `${this.ApiUrl1}quote/dropdown/getDocumentList`;
    const reqData = {
      "CompanyId": this.userDetails?.RegionCode,
      "ProductId": this.productId,
      "DocApplicable": "DOC_COMMODITY"
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
          if(data.Result){
            if(data.Result.length!=0){
              let i=0;
              for(let doc of data.Result){
                doc['DocAvailable'] = 'N';
                i+=1;
                if(i==data.Result.length){
                  this.docTypeList = data.Result;
                  this.ongetUploadedDocument();
                }
              }
            }
          } 
    });
  }
  onUploadDocuments(event, item) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    var filename = event.target.files[0].name;
    if(filename){
      let typeList:any[] = filename.split('.');
      if(typeList.length!=0){
        let type = typeList[1];
        item['FileType'] = type;
      }
    }
    item['url'] = event.target.files[0];
    console.log('Final Display',item);
    reader.onload = (event) => {
      let imageUrl: any;
      imageUrl = event.target.result;
      item['urlPath']= imageUrl;
     
        item['FileName'] = filename;
        item['DocAvailable'] = 'P';

    }
  }
  checkUploadButton(){
    return this.docTypeList.some(ele=>ele.DocAvailable=='P');
  }
  onDeleteDoc(item){
        item.url = null;
        item.DocAvailable = 'N';
  }
  ongetUploadedDocument(){
    const urlLink = `${this.ApiUrl1}file/upload/list`;
    const reqData = {
      "LoginId": this.userDetails?.LoginId,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
      "UploadId": null
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log("Doc List",data);
      console.log('llllllllllllll',this.uploadedDocumentsList);
      this.uploadedDocumentsList=data.Result;
      if(this.uploadedDocumentsList.length!=0){
        for(let document of this.uploadedDocumentsList){
              let entry = this.docTypeList.find(ele=>ele.Code==document.UploadType);
              if(entry){
                entry['DocAvailable'] = 'S';
                entry['urlPath'] = null;
                entry['FileName'] = document.OriginalFileName;
                entry['url'] = null;
                entry['FileType']= null;
                entry['UploadId'] = document.UploadId;
              }
        }
      }
    })
  }
  /*onDownloadfile(index:any){
    console.log("this.premiumDetails",this.premiumDetails);
    let Results:any;
    const urlLink = `${this.ApiUrl1}file/download`;
    const reqData = {
      "LoginId": this.userDetails?.LoginId,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
      "UploadId": this.uploadedDocumentsList[index].UploadId
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data:any)=>{
      console.log("data",data);
          Results=data;
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', Results);
      link.setAttribute('download',Results);
      document.body.appendChild(link);
      link.click();
      link.remove();
      //var a = document.createElement("a");
      //a.href = data;
      //a.download = data;
      // start download
      //a.click();
    })
  }*/


  onDownloadfile(item){
    let entry = this.uploadedDocumentsList.find(ele=>ele.UploadId==item.UploadId);
    if(entry){
      const urlLink = `${this.ApiUrl1}file/download`;
      const reqData = {
        /*"BranchCode": this.userDetails?.BranchCode,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,*/
         "LoginId": this.userDetails?.LoginId,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
        "UploadId": entry.UploadId
      }
      
      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
        if(data?.Result){
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', data?.Result);
          link.setAttribute('download', entry.OriginalFileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
         
        }
        
  
      })
    }
    
  }
   onPolicyIntegrate() {
    const urlLink = `${this.ApiUrl1}quote/policy/integrate`;
    const reqData = {
      "ApplicationNo": this.ReferenceNo,
    }
    
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
      if (data.Message == "Success") {
          if(data?.Result?.errorDesc){
            Swal.fire(
              'Policy Failed!',
              `${data?.Result?.errorDesc}`,
              'info'
            )
          }else{
            this.policySection = true;
            this.draftSection = false;
            this.policyNo = data?.Result?.policyNo;
            //this.router.navigate([`${this.routerBaseLink}/portfolio/grid`]);
            // Swal.fire(
            //   'Policy Created!',
            //   `Policy Number : ${data?.Result?.policyNo}`,
            //   'success'
            // )
          }
          //this.router.navigate([`${this.routerBaseLink}/portfolio/grid`]);
       //this.onNavigate();

      }
    })
  }
  onUploadSubmit(){
    if(this.docTypeList.length!=0){
      let i=0;
        for(let doc of this.docTypeList){
          if(doc.DocAvailable=='P'){
            let ReqObj ={
              "url": doc.url,
              "docType": doc.Code,
              "fileName":doc.FileName,
              'productid':this.sessionStorageService.sessionStorgaeModel.productId,
              'loginid':this.userDetails?.LoginId,
              'quoteNo':this.premiumDetails?.QuoteDetails?.QuoteNo,
              'remarks': doc.CodeDescription
            }
            const urlLink = `${this.ApiUrl1}file/upload`;
            this.newQuotesService.onDocumentAltPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
              console.log(data);
              if (data) {
                  i+=1;
                  if(i==this.docTypeList.length){
                        this.ongetUploadedDocument();
                  }
              }
            });
          }
          else{
            i+=1;
            if(i==this.docTypeList.length){
              this.ongetUploadedDocument();
            }
          }
        }
      }
  }
  onSubmit() {
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
                    this.onFinalProceed();
                    this.ongetUploadedDocument();
                  }
            }
          })
        }
    }
  }
  onFinalProceed(){
    const urlLink = `${this.ApiUrl1}quote/policy/generate`;
    const reqData = {
      "ApplicationNo": this.ReferenceNo,
      "BasisValDesc": "ACTUAL AMOUNT",
      "Both": this.bankerAssured?'Y':'N',
      "BranchCode": this.userDetails?.BranchCode,
      "CertClausesYn": "N",
      "CustomerCode": this.premiumDetails?.CustomerDetails?.Code,
      "Foreign": this.foreignCurrency?'Y':'N',
      "GeneratePolicyYn": this.generateCerti,
      "LcBankDetail": this.nameOfBroker ? 'Y':'N',
      "LoginUserType": this.userDetails.UserType,
      "ModeOfPayment": "CR",
      "NoteType": "",
      "OpenCoverNo": this.OpenCover?.value,
      "PolicyExcess": this.excess?'Y':'N',
      "PremiumYN": this.premium?'Y':'N',
      "PrerecieptNo": "",
      "PrintClausesYn": "N",
      "ProductId": this.productId,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
      "QuoteStatus": this.QuoteStatus,
      "ReferralRemarks": "",
      "ReferralStatus": "",
      "ReferralUpdateYn": "N",
      "RubberStamp": "N",
      "SettlingAgent": this.premiumDetails?.SettlingAgentName,
      "ShowPremiumYn": "N",
      "TotalPremium": "",
      "LoginId":this.userDetails?.LoginId
    }
    console.log(this.bankerAssured,this.foreignCurrency,this.premium,this.excess,reqData);
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
      if (data.Message == "Success") {
        if(this.generateCerti == 'Y'){
          this.onschedule();
        }
        else if(this.generateCerti == 'Q'){
          this.router.navigate([`${this.routerBaseLink}/quotes/exist-quote`]);
        }
        else{
          this.draftSection = true;
        }
      }
    })
  }

  onschedule(){
    this.schedule=true;
    this.onPolicyIntegrate();
  }

  onNavigate(){
    if(this.userDetails.UserType == 'admin'){
      this.router.navigate([`${this.routerBaseLink}/admin-referral/pending-quote`]);
    }
    else{
      let status = sessionStorage.getItem('QuoteStatus')
      console.log('HHHHHHHHHHHHHHHHHH',status)
      if(status=='E'){
        this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-grid`]);
      }
      else{
        if(this.generateCerti == 'Q' || this.generateCerti == 'N'){
          this.router.navigate([`${this.routerBaseLink}/quotes/exist-quote`]);
        }
        else if(this.generateCerti == 'Y'){
          //this.schedule=true;
          //this.onPolicyIntegrate();
          this.router.navigate([`${this.routerBaseLink}/portfolio/grid`]);
        }
      }
      
      
    }

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
            this.uploadDocuments.push({ 'url': element,"fileName":filename,'productid':this.sessionStorageService.sessionStorgaeModel.productId,'loginid':this.userDetails?.LoginId,'quoteNo':this.premiumDetails?.QuoteDetails?.QuoteNo});

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
  onDeleteUploadedDoc(item){
    let entry = this.uploadedDocumentsList.find(ele=>ele.UploadId==item.UploadId);
    if(entry){
      const urlLink = `${this.ApiUrl1}file/delete`;
      const reqData = {
        /*"BranchCode": this.userDetails?.BranchCode,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,*/
        "LoginId": this.userDetails?.LoginId,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
        "UploadId": entry.UploadId
      }
      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
        if(data?.Result){
        console.log('kkkkkkkkkk',this.uploadedDocumentsList);
        this.getdocTypeList();
        this.ongetUploadedDocument();
        }
        
      })
      //this.uploadedDocumentsList.splice(index,1);
      //this.onSubmit(); 
    }
  }
  onDeleteUploadDoc(index){
    this.uploadDocuments.splice(index,1);
  }
 
  onDownloadSchedule(){
    const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo
    }
    
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      if(data?.Result){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result);
        link.setAttribute('download', this.premiumDetails?.QuoteDetails?.QuoteNo);
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
      

    })
  }
  onDownloadCredit(){
    const urlLink = `${this.ApiUrl1}pdf/creditNote?policyNo=${this.policyNo}`;
    this.newQuotesService.onGetMethodSync(urlLink).subscribe((data: any) => {
      if(data?.Result){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result);
        link.setAttribute('download', 'CreditNote');
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
      

    })
  }
  onDownloadDebit(){
    const urlLink = `${this.ApiUrl1}pdf/debitNote?policyNo=${this.policyNo}`;
    this.newQuotesService.onGetMethodSync(urlLink).subscribe((data: any) => {
      if(data?.Result){
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result);
        link.setAttribute('download', 'DebitNote');
        document.body.appendChild(link);
        link.click();
        link.remove();
       
      }
      

    })
  }
  getBack(){
    this.policySection = false;this.draftSection=false;
    this.schedule=false;
  }
}
