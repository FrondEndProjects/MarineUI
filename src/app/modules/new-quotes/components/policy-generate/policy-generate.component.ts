import { NewQuotesService } from './../../new-quotes.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Mydatas from '../../../../app-config.json';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public userDetails: any;
  public productId: any;
  public loginId: any;
  public applicationId: any;
  public ReferenceNo: any;
  public premiumDetails: any;
  aki_error: any
  public policyForm: FormGroup;
  policuNoGenerate: boolean = false;
  public generateCerti: any = 'N';
  public payment_type: any;
  public premium: any = false;
  public nameOfBroker: any = false;
  public foreignCurrency: any = false;
  public darft: any = false;
  public bankerAssured: any = false;
  public excess: any = false;
  integrationErrorList: any[] = [];
  bank_list: any[] = [];
  payment_type_list: any[] = [];
  public routerBaseLink: any = '';
  public premiumForm!: FormGroup;
  public OpenCover: any;
  QuoteStatus: string;
  uploadDocuments: any[] = [];
  uploadedDocumentsList: any[] = [];
  imageUrl: any;
  policyNo: any;
  uploadId: any; docTypeList: any[] = [];
  policySection: boolean = false;
  draftSection: boolean = false;
  schedule: boolean = false;
  currencyName: any;
  bankName: any = null;
  quoteNo: any = null;
  porttype: string;
  certificateNo: any;
  PaymentId: any;
  payee_name: any;
  pay_amount: any;
  micr_number: any;
  bank_name: any;
  cheque_number: any;
  cheque_date: any;
  QuoteNo: any;
  redirectUrl: any;
  pay_mobile_number: any;
  pay_mobile_code: any;
  constructor(
    private newQuotesService: NewQuotesService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private sessionStorageService: SessionStorageService,
    private newQuotesComponent: NewQuotesComponent, public dialogService: MatDialog,

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
    this.porttype = sessionStorage.getItem('openCOverType');
    console.log('Tpes', this.porttype);
    console.log(this.userDetails, "ddddddddddd");
    //this.ongetUploadedDocument();
  }

  ngOnInit(): void {
    this.onCreateFormControl();
    this.onGetPremiumInformation();
    this.getpaymentType();
    this.route.queryParamMap.subscribe((params: any) => {
      console.log("Params", params.params)
      let quoteNo = params?.params?.QuoteNo;
      let type = params?.params?.type;
      if (quoteNo) {
        this.quoteNo = quoteNo;
        this.QuoteNo = quoteNo;
        this.checkStatus();
        // this.paramSection = true;
        // if(type!='cancel') this.successSection = true;
      }
    })
  }
  get premiumF() {
    return this.premiumForm?.controls;
  }

  onCreateFormControl() {
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
  getdocTypeList() {
    const urlLink = `${this.ApiUrl1}quote/dropdown/getDocumentList`;
    const reqData = {
      "CompanyId": this.userDetails?.RegionCode,
      "ProductId": this.productId,
      "DocApplicable": "DOC_COMMODITY"
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      if (data.Result) {
        if (data.Result.length != 0) {
          let i = 0;
          for (let doc of data.Result) {
            doc['DocAvailable'] = 'N';
            i += 1;
            if (i == data.Result.length) {
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
    if (filename) {
      let typeList: any[] = filename.split('.');
      if (typeList.length != 0) {
        let type = typeList[1];
        item['FileType'] = type;
      }
    }
    item['url'] = event.target.files[0];
    console.log('Final Display', item);
    reader.onload = (event) => {
      let imageUrl: any;
      imageUrl = event.target.result;
      item['urlPath'] = imageUrl;

      item['FileName'] = filename;
      item['DocAvailable'] = 'P';

    }
  }
  checkUploadButton() {
    return this.docTypeList.some(ele => ele.DocAvailable == 'P');
  }
  onDeleteDoc(item) {
    item.url = null;
    item.DocAvailable = 'N';
  }
  ongetUploadedDocument() {
    const urlLink = `${this.ApiUrl1}file/upload/list`;
    const reqData = {
      "LoginId": this.userDetails?.LoginId,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
      "UploadId": null
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log("Doc List", data);
      console.log('llllllllllllll', this.uploadedDocumentsList);
      this.uploadedDocumentsList = data.Result;
      if (this.uploadedDocumentsList.length != 0) {
        for (let document of this.uploadedDocumentsList) {
          let entry = this.docTypeList.find(ele => ele.Code == document.UploadType);
          if (entry) {
            entry['DocAvailable'] = 'S';
            entry['urlPath'] = null;
            entry['FileName'] = document.OriginalFileName;
            entry['url'] = null;
            entry['FileType'] = null;
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


  onDownloadfile(item) {
    let entry = this.uploadedDocumentsList.find(ele => ele.UploadId == item.UploadId);
    if (entry) {
      const urlLink = `${this.ApiUrl1}file/download`;
      const reqData = {
        /*"BranchCode": this.userDetails?.BranchCode,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,*/
        "LoginId": this.userDetails?.LoginId,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
        "UploadId": entry.UploadId
      }

      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
        if (data?.Result) {
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
      "ReintegrateStatus": 'N'
    }

    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
      if (data.Message == "Success") {
        // if(data?.Result?.errorDesc && !data?.Result?.certificateNo){
        //   Swal.fire(
        //     'Policy Failed!',
        //     `${data?.Result?.errorDesc}`,
        //     'info'
        //   )
        // }else{
        this.policySection = true;
        this.draftSection = false;
        this.policyNo = data?.Result?.policyNo;
        if (data?.Result?.certificateNo) {
          this.certificateNo = data?.Result?.certificateNo;
        }
        else {
          this.integrationErrorList = data?.Result?.integrationErrorList;
          // const rawErrorDesc = data.Result.errorDesc;G

          // const rawErrorDesc = data.Result.errorDesc;
          // const errorDescString = data.Result.errorDesc;
          // const errorList = errorDescString.replaceAll(', fieldValue=','');
          // // console.log("Final",JSON.parse(errorList))
          // let d =errorList.split('},')
          // console.log("Final",JSON.parse(d))
        }



        //this.router.navigate([`${this.routerBaseLink}/portfolio/grid`]);
        // Swal.fire(
        //   'Policy Created!',
        //   `Policy Number : ${data?.Result?.policyNo}`,
        //   'success'
        // )
        // }
        //this.router.navigate([`${this.routerBaseLink}/portfolio/grid`]);
        //this.onNavigate();

      }
    })
  }
  convertErrorDescToList(errorDesc: string): any[] {
    try {
      // Step 1: Clean and transform to valid JSON
      const fixed = errorDesc
        .replace(/([{,]\s*)(\w+)=/g, '$1"$2":"')   // Wrap keys
        .replace(/,\s*(\w+)=/g, ',"$1":"')         // More keys
        .replace(/=([^,}\]]+)/g, '":"$1"')         // Wrap values
        .replace(/,(\s*})/g, '"$1')                // End of object
        .replace(/},\s*{/g, '}|{');                // Separate objects

      // Step 2: Split into object strings
      const objectStrings = fixed.split('|');

      // Step 3: Parse each object
      return objectStrings.map(str => JSON.parse(str));
    } catch (err) {
      console.error('❌ Failed to convert errorDesc to List:', err);
      return [];
    }
  }
  onUploadSubmit() {
    if (this.docTypeList.length != 0) {
      let i = 0;
      for (let doc of this.docTypeList) {
        if (doc.DocAvailable == 'P') {
          let ReqObj = {
            "url": doc.url,
            "docType": doc.Code,
            "fileName": doc.FileName,
            'productid': this.sessionStorageService.sessionStorgaeModel.productId,
            'loginid': this.userDetails?.LoginId,
            'quoteNo': this.premiumDetails?.QuoteDetails?.QuoteNo,
            'remarks': doc.CodeDescription
          }
          const urlLink = `${this.ApiUrl1}file/upload`;
          this.newQuotesService.onDocumentAltPostMethodSync(urlLink, ReqObj).subscribe((data: any) => {
            console.log(data);
            if (data) {
              i += 1;
              if (i == this.docTypeList.length) {
                this.ongetUploadedDocument();
              }
            }
          });
        }
        else {
          i += 1;
          if (i == this.docTypeList.length) {
            this.ongetUploadedDocument();
          }
        }
      }
    }
  }
  onSubmit() {
    if (this.uploadDocuments.length != 0) {
      let i = 0;
      for (let doc of this.uploadDocuments) {
        const urlLink = `${this.ApiUrl1}file/upload`;
        this.newQuotesService.onDocumentPostMethodSync(urlLink, doc).subscribe((data: any) => {
          console.log(data);
          if (data) {
            i += 1;
            if (i == this.uploadDocuments.length) {
              this.uploadedDocumentsList = [];
              this.uploadDocuments = [];
              // if (this.payment_type != '4') {
              // this.onFinalProceed('submit');

              // }
              // else {
              // this.onschedule();
              // }
              this.onFinalProceed('submit');
              this.ongetUploadedDocument();
            }
          }
        })
      }
    }
  }

  generateCertiCheck() {
    if (this.generateCerti == 'Y' && this.payment_type != null && this.payment_type != '') {
      this.onschedule();
    }
    else {
      this.onFinalProceed('submit');
    }
  }

  onFinalProceed(type) {
    const urlLink = `${this.ApiUrl1}quote/policy/generate`;
    const reqData = {
      "ApplicationNo": this.ReferenceNo,
      "BasisValDesc": "ACTUAL AMOUNT",
      "Both": this.bankerAssured ? 'Y' : 'N',
      "BranchCode": this.userDetails?.BranchCode,
      "CertClausesYn": "N",
      "CustomerCode": this.premiumDetails?.CustomerDetails?.Code,
      "Foreign": this.foreignCurrency ? 'Y' : 'N',
      "GeneratePolicyYn": this.generateCerti,
      "LcBankDetail": this.nameOfBroker ? 'Y' : 'N',
      "LoginUserType": this.userDetails.UserType,
      "ModeOfPayment": "CR",
      "NoteType": "",
      "OpenCoverNo": this.OpenCover?.value,
      "PolicyExcess": this.excess ? 'Y' : 'N',
      "PremiumYN": this.premium ? 'Y' : 'N',
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
      "LoginId": this.userDetails?.LoginId
    }
    console.log(this.bankerAssured, this.foreignCurrency, this.premium, this.excess, reqData);
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      console.log(data);
      if (data.Message == "Success") {
        if (data.Result.PolicyNo) {
          this.policuNoGenerate = true;
        }
        else {
          this.policuNoGenerate = false;

        }
        if (this.generateCerti == 'Y') {
          sessionStorage.setItem('quotePaymentId', data.Result.PaymentId);
          if (data.Result) {
            this.pay_amount = data.Result.Premium;
            this.PaymentId = data.Result.PaymentId;
            this.QuoteNo = data.Result.QuoteNo;
            // this.inserPyment(data.Result)

          }
          // this.PaymentId = data.Result.PaymentId
          // }
          // else {
          // alert(this.payment_type)
          if (type != 'payment' && this.payment_type != '' && this.payment_type != null) {
            this.onschedule();
          }

        }
        else if (this.generateCerti == 'Q') {
          this.router.navigate([`${this.routerBaseLink}/quotes/exist-quote`]);
        }
        else {
          this.draftSection = true;
        }
      }
    })
  }

  onschedule() {
    // this.schedule = true;
    if (this.payment_type == '1') {
      if (this.payee_name != '' && this.pay_amount != '' && this.payee_name != null && this.pay_amount != null) {
        this.inserPyment()

      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Validation Errors',
          html: 'Payment Deatil is Required'
        });
      }
    }
    if (this.payment_type == '2') {
      if (this.bank_name != '' && this.micr_number != '' && this.cheque_number != '' && this.cheque_date != '' && this.bank_name != null && this.micr_number != null && this.cheque_number != null && this.cheque_date != null) {
        this.inserPyment()

      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Validation Errors',
          html: 'Payment Deatil is Required'
        });
      }
    }
    if (this.payment_type == '4' || this.payment_type == '3') {
      this.inserPyment()
    }
    if (this.payment_type == '5') {
      if (this.pay_mobile_code != '' && this.pay_mobile_number != '' && this.pay_mobile_code != null && this.pay_mobile_number != null) {
        this.inserPyment()

      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Validation Errors',
          html: 'Payment Deatil is Required'
        });
      }
    }
    // this.onPolicyIntegrate();
  }

  onNavigate() {
    if (this.userDetails.UserType == 'admin') {
      this.router.navigate([`${this.routerBaseLink}/admin-referral/pending-quote`]);
    }
    else {
      let status = sessionStorage.getItem('QuoteStatus')
      console.log('HHHHHHHHHHHHHHHHHH', status)
      if (status == 'E') {
        this.router.navigate([`${this.routerBaseLink}/new-quotes/endorsement-grid`]);
      }
      else {
        if (this.generateCerti == 'Q' || this.generateCerti == 'N') {
          this.router.navigate([`${this.routerBaseLink}/quotes/exist-quote`]);
        }
        else if (this.generateCerti == 'Y') {
          //this.schedule=true;
          //this.onPolicyIntegrate();
          this.router.navigate([`${this.routerBaseLink}/portfolio/grid`]);
        }
      }


    }

  }

  onUploadDocument(event: any, eventType: string) {
    console.log(event);
    console.log('hhhhhhh', eventType)
    let fileList;
    if (eventType == 'click') {
      let fileList = event.target.files;
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
        var reader: any = new FileReader();
        reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          let Exist = this.uploadDocuments.some((ele: any) => ele.fileName == filename);
          console.log("Element Exist", Exist)
          if (!Exist) {
            this.uploadDocuments.push({ 'url': element, "fileName": filename, 'productid': this.sessionStorageService.sessionStorgaeModel.productId, 'loginid': this.userDetails?.LoginId, 'quoteNo': this.premiumDetails?.QuoteDetails?.QuoteNo });

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
  onDeleteUploadedDoc(item) {
    let entry = this.uploadedDocumentsList.find(ele => ele.UploadId == item.UploadId);
    if (entry) {
      const urlLink = `${this.ApiUrl1}file/delete`;
      const reqData = {
        /*"BranchCode": this.userDetails?.BranchCode,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,*/
        "LoginId": this.userDetails?.LoginId,
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
        "UploadId": entry.UploadId
      }
      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
        if (data?.Result) {
          console.log('kkkkkkkkkk', this.uploadedDocumentsList);
          this.getdocTypeList();
          this.ongetUploadedDocument();
        }

      })
      //this.uploadedDocumentsList.splice(index,1);
      //this.onSubmit(); 
    }
  }
  onDeleteUploadDoc(index) {
    this.uploadDocuments.splice(index, 1);
  }

  onDownloadSchedule() {
    const urlLink = `${this.ApiUrl1}pdf/portalcertificate`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode,
      "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo,
      "PrintQuoteYn": "N"
    }

    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      if (data?.Result) {
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
  onDownloadCredit() {
    const urlLink = `${this.ApiUrl1}pdf/creditNote?policyNo=${this.policyNo}`;
    this.newQuotesService.onGetMethodSync(urlLink).subscribe((data: any) => {
      if (data?.Result) {
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
  onDownloadDebit() {
    const urlLink = `${this.ApiUrl1}pdf/debitNote?policyNo=${this.policyNo}`;
    this.newQuotesService.onGetMethodSync(urlLink).subscribe((data: any) => {
      if (data?.Result) {
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
  onDownloadAKIDoc() {
    if (this.certificateNo) {
      const urlLink = `${this.ApiUrl1}Integration/get/certificate`;
      const reqData = {
        "QuoteNo": this.premiumDetails?.QuoteDetails?.QuoteNo
        // "QuoteNo": '100707'
      }

      this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
        if (data?.Result) {
          if (data.Result.rmsg.length !== 0 && (data.Result.rmsg != 'Sucess' || data.Result.rmsg != 'sucess')) {
            const errorMessages = data.Result.rmsg
              .map((item: any, index: number) => `${index + 1}. ${item.errorText}`)
              .join('<br>');

            Swal.fire({
              icon: 'error',
              title: 'Validation Errors',
              html: errorMessages
            });
          }
          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.setAttribute('href', data?.Result.rObj.blobDownloadURL);
          link.setAttribute('download', this.premiumDetails?.QuoteDetails?.QuoteNo);
          document.body.appendChild(link);
          link.click();
          link.remove();

        }


      })
    }
    // else{
    //   Swal.fire(
    //     'Document Generate Failed!',
    //     // `${data?.Result?.Message}`,
    //     'info'
    //   )
    // }

  }
  getBack() {
    this.policySection = false; this.draftSection = false;
    this.schedule = false;
  }

  inserPyment() {

    const urlLink = `${this.ApiUrl1}quote/policy/insertPayment`;
    const reqData = {
      "CreatedBy": this.userDetails?.LoginId,
      "InsuranceId": this.userDetails?.InsuranceId,
      "Premium": this.pay_amount,
      "QuoteNo": this.QuoteNo,
      "Remarks": "None",
      "PayeeName": this.payee_name,
      "SubUserType": this.userDetails?.SubUserType,
      "UserType": this.userDetails?.UserType,
      "MICRNo": this.micr_number,
      "BankName": this.bank_name,
      "ChequeNo": this.cheque_number,
      "ChequeDate": this.cheque_date,
      "PaymentType": this.payment_type,
      "Payments": "",
      "PaymentId": this.PaymentId,
      "AccountNumber": null,
      "IbanNumber": null,
      "WhatsappNo": null,
      "WhatsappCode": null,
      "MobileCode1": this.pay_mobile_code,
      "MobileNo1": this.pay_mobile_number
    }
    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
      alert(this.payment_type)
      console.log(data.Result.paymentUrl != null && data.Result.paymentUrl != '');
      console.log(data.Message == 'Success');



      if (data.Message == 'Success') {
        // if (data.Result != null) {
        if (data.Result != null && data.Result.paymentUrl != null && data.Result.paymentUrl != '') {
          // alert(1)
          this.redirectUrl = data.Result.paymentUrl;
          const absoluteURL =
            new URL(this.redirectUrl, window.location.href);

          window.location.href = absoluteURL.href;

        }
        else if (this.payment_type == '1' || this.payment_type == '2' || this.payment_type == '3' && data.IsError == false && data.Result.paymentStatus =='COMPLETED') {
          // alert(2)
          this.schedule = true;
          this.onPolicyIntegrate()
        }
        else {
          // alert(3)
          Swal.fire({
            icon: 'error',
            title: 'Validation Errors',
            html: 'Error'
          });
        }
        // }
      }
    })
  }

  getpaymentType() {
    // const urlLink = `${this.ApiUrl1}quote/dropdown/paymenttypes`;
    // const reqData = {
    //   "BranchCode": this.userDetails?.BelongingBranch,
    //   "InsuranceId": this.userDetails?.InsuranceId,
    //   "UserType": this.userDetails?.UserType,
    //   "SubUserType": this.userDetails?.SubUserType,
    //   "ProductId": "46",
    //   "CreatedBy": this.userDetails?.LoginId,
    //   "AgencyCode": "12887"
    // }

    // this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe((data: any) => {
    //   console.log(data);
    //   if (data.Result) {

    //   }
    // })
    this.payment_type_list = [
      {
        "Code": "1",
        "CodeDesc": "Cash",
        "CodeDescLocal": "Cash",
        "Type": null
      },
      {
        "Code": "3",
        "CodeDesc": "Credit",
        "CodeDescLocal": "Credit",
        "Type": null
      },
      {
        "Code": "2",
        "CodeDesc": "Cheque",
        "CodeDescLocal": "Cheque",
        "Type": null
      },
      {
        "Code": "4",
        "CodeDesc": "Online Payment",
        "CodeDescLocal": "Online Payment",
        "Type": null
      },
      {
        "Code": "5",
        "CodeDesc": "Pay BY Mobile Money",
        "CodeDescLocal": "Pay BY Mobile Money",
        "Type": null
      },
      {
        "Code": "6",
        "CodeDesc": "Debit Card",
        "CodeDescLocal": "Debit Card",
        "Type": null
      }
    ]
  }

  onPaymentTypeChange(event: any) {
    // console.log(event, "event");
    // if (event.Code == '1') {
    this.onFinalProceed('payment');
    // }
    // const selectedValue = (event.target as HTMLInputElement).value;
    // this.onFinalProceed('payment');

    // if (selectedValue === 'cash') {

    // } else if (selectedValue === 'online') {

    // }
  }

  checkStatus() {

    let ReqObj = {
      "InsuranceId": this.userDetails?.InsuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${this.QuoteNo}`;

    this.newQuotesService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data, "dataaaaaaaaaaaaaaaaaaaaaa");

        if (data.result == 'FAIL') {

          Swal.fire({
            icon: 'error',
            title: 'Payment',
            html: 'FAIL'
          });

        }
        else {
          this.schedule = true;
          this.onPolicyIntegrate()
        }
      });
  }
  onGenerateCertificateTypeChange() {
    this.payment_type = null
  }
}

