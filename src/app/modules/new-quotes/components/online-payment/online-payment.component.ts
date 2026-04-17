import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Mydatas from '../../../../app-config.json';
import { NewQuotesService } from './../../new-quotes.service';
import { NewQuotesComponent } from '../../new-quotes.component';
import { SessionStorageService } from '../../../../shared/storage/session-storage.service';
import Swal from 'sweetalert2';

/**
 * Amazon Payment Services (PayFort) — Hosted Checkout
 *
 * Flow:
 * 1. Read payment data from sessionStorage
 * 2. STEP 1: insertPayment API → paymentId + merchantReference
 * 3. STEP 2: selcom/salama/checkout API → PayFort params INCLUDING signature
 * 4. Map response directly to form fields (use BACKEND signature)
 * 5. Auto-submit hidden form POST → PayFort paymentPage
 *
 * Note: Signature is computed SERVER-SIDE and returned by the checkout API.
 * This is the most secure and reliable approach — the SHA Request Phrase
 * never leaves the backend.
 */
@Component({
  selector: 'app-online-payment',
  templateUrl: './online-payment.component.html',
  styleUrls: ['./online-payment.component.scss']
})
export class OnlinePaymentComponent implements OnInit {

  @ViewChild('payfortForm') payfortForm: ElementRef;

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;

  // Sandbox:    https://sbcheckout.payfort.com/FortAPI/paymentPage
  // Production: https://checkout.payfort.com/FortAPI/paymentPage
  payfort_url: string = 'https://sbcheckout.payfort.com/FortAPI/paymentPage';

  // ── PayFort Form Parameters (populated from checkout API) ─
  command: string = '';
  access_code: string = '';
  merchant_identifier: string = '';
  merchant_reference: string = '';
  amount: string = '';
  currency: string = '';
  language: string = 'en';
  customer_email: string = '';
  customer_ip: string = '';
  signature: string = '';
  order_description: string = '';
  customer_name: string = '';
  return_url: string = '';
  phone_number: string = '';
  token_name: string = '';
  payment_option: string = '';
  eci: string = '';
  remember_me: string = 'NO';
  merchant_extra: string = '';
  merchant_extra1: string = '';
  merchant_extra2: string = '';
  merchant_extra3: string = '';
  merchant_extra4: string = '';
  merchant_extra5: string = '';

  // ── Data from policy-generate ─────────────────────────────
  quoteNo: string = '';
  payAmount: any = 0;
  merchantName: string = '';
  paymentId: any = null;
  merchantReference: any;
  insuranceId: string = '';
  loginId: string = '';
  subUserType: string = '';
  userType: string = '';
  branchCode: string = '';
  referenceNo: string = '';
  productId: string = '';
  currencyName: string = '';
  routerBaseLink: string = '';

  // ── UI ────────────────────────────────────────────────────
  isLoading: boolean = true;
  isError: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private newQuotesService: NewQuotesService,
    private newQuotesComponent: NewQuotesComponent,
    private sessionStorageService: SessionStorageService
  ) {
    this.routerBaseLink = this.newQuotesComponent?.userDetails?.routerBaseLink || '';
  }

  ngOnInit(): void {
    const paymentDataStr = sessionStorage.getItem('onlinePaymentData');
    if (paymentDataStr) {
      const pd = JSON.parse(paymentDataStr);
      this.quoteNo = pd.quoteNo || '';
      this.payAmount = pd.payAmount || 0;
      this.merchantName = pd.merchantName || 'MOTOR B2C and B2B Portal';
      this.customer_email = pd.customerEmail || '';
      this.customer_name = pd.customerName || '';
      this.paymentId = pd.paymentId || null;
      this.insuranceId = pd.insuranceId || '';
      this.loginId = pd.loginId || '';
      this.subUserType = pd.subUserType || '';
      this.userType = pd.userType || '';
      this.branchCode = pd.branchCode || '';
      this.referenceNo = pd.referenceNo || '';
      this.productId = pd.productId || '';
      this.currencyName = pd.currencyName || 'AED';

      if (!this.paymentId) {
        this.paymentId = sessionStorage.getItem('quotePaymentId');
      }

      this.callInsertPayment();
    } else {
      this.isLoading = false;
      this.isError = true;
      this.errorMessage = 'Payment session expired. Please go back and try again.';
    }
  }

  /**
   * STEP 1: Call insertPayment API.
   */
  callInsertPayment() {
    const urlLink = `${this.ApiUrl1}quote/policy/insertPayment`;

    const reqData = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "Premium": this.payAmount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "PayeeName": this.customer_name || this.merchantName,
      "SubUserType": this.subUserType,
      "UserType": this.userType,
      "MICRNo": null,
      "BankName": null,
      "ChequeNo": null,
      "ChequeDate": null,
      "PaymentType": "4",
      "Payments": "",
      "PaymentId": this.paymentId,
      "AccountNumber": null,
      "IbanNumber": null,
      "WhatsappNo": null,
      "WhatsappCode": null,
      "MobileCode1": null,
      "MobileNo1": null
    };

    console.log('STEP 1 → insertPayment:', urlLink, reqData);

    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('insertPayment response:', data);

        if (data?.Message === 'Success' && data?.Result) {
          if (data.Result.paymentId) {
            this.paymentId = data.Result.paymentId;
            this.merchantReference = data.Result.merchantReference;
            sessionStorage.setItem('quotePaymentId', this.paymentId);
            sessionStorage.setItem('merchantReference', this.merchantReference);
          }

          if (data.Result.paymentStatus == 'COMPLETED') {
            sessionStorage.removeItem('onlinePaymentData');
            this.router.navigate([`${this.routerBaseLink}/new-quotes/policy-generate`], {
              queryParams: { QuoteNo: this.quoteNo, type: 'success' }
            });
            return;
          }

          this.getCheckoutParams();

        } else {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = data?.ErrorMessage || 'Failed to initialize payment. Please try again.';
          console.error('insertPayment returned error:', data);
        }
      },
      (err) => {
        console.error('insertPayment API failed:', err);
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Could not connect to payment server. Please check your connection and try again.';
      }
    );
  }

  /**
   * STEP 2: Call checkout API — returns PayFort params INCLUDING signature.
   */
  getCheckoutParams() {
    const urlLink = `${this.CommonApiUrl}selcom/salama/checkout`;

    const reqData = {
      "QuoteNo": this.quoteNo,
      "PaymentId": this.paymentId,
      "MerchantReferenceNo": this.merchantReference,
      "PaymentType": "4"
    };

    console.log('STEP 2 → checkout:', urlLink, reqData);

    this.newQuotesService.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        console.log('Checkout API FULL response:', JSON.stringify(data, null, 2));

        if (data?.Message === 'Success' && !data?.IsError && data?.Result) {
          const r = data.Result;

          // Map ALL values DIRECTLY from API response — including signature
          this.command = r.command || 'PURCHASE';
          this.access_code = r.access_code || '';
          this.merchant_identifier = r.merchant_identifier || '';
          this.merchant_reference = r.merchant_reference || '';
          this.amount = String(r.amount || '');
          this.currency = r.currency || 'AED';
          this.language = r.language || 'en';
          this.customer_email = r.customer_email || '';
          this.customer_ip = r.customer_ip || '';
          this.order_description = r.order_description || 'Marine Policy';
          this.return_url = r.return_url || '';
          this.customer_name = r.customer_name || '';
          this.signature = r.signature || '';

          // Validate all required fields
          if (!this.access_code || !this.merchant_identifier) {
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = 'Payment gateway configuration is missing. Please contact support.';
            console.error('Missing access_code or merchant_identifier:', r);
            return;
          }

          if (!this.signature) {
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = 'Payment signature missing from backend response. Please contact support.';
            console.error('Backend did not return signature:', r);
            return;
          }

          console.log('═══════════════════════════════════════════');
          console.log('PayFort form ready:');
          console.log('  payfort_url:         ', this.payfort_url);
          console.log('  command:             ', this.command);
          console.log('  access_code:         ', this.access_code);
          console.log('  merchant_identifier: ', this.merchant_identifier);
          console.log('  merchant_reference:  ', this.merchant_reference);
          console.log('  amount:              ', this.amount);
          console.log('  currency:            ', this.currency);
          console.log('  language:            ', this.language);
          console.log('  customer_email:      ', this.customer_email);
          console.log('  customer_ip:         ', this.customer_ip);
          console.log('  order_description:   ', this.order_description);
          console.log('  return_url:          ', this.return_url);
          console.log('  customer_name:       ', this.customer_name);
          console.log('  signature:           ', this.signature);
          console.log('═══════════════════════════════════════════');

          this.isLoading = false;

          // Auto-submit form → redirect to PayFort
          setTimeout(() => {
            this.submitPayfortForm();
          }, 800);

        } else {
          this.isLoading = false;
          this.isError = true;
          this.errorMessage = data?.ErrorMessage || 'Failed to initialize payment. Please try again.';
          console.error('Checkout API returned error:', data);
        }
      },
      (err) => {
        console.error('Checkout API failed:', err);
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Could not connect to payment server. Please check your connection and try again.';
      }
    );
  }

  /**
   * Submit hidden HTML form POST to PayFort.
   * PayFort renders their native payment page. After payment,
   * PayFort redirects to return_url with response params.
   */
  submitPayfortForm() {
    if (this.payfortForm?.nativeElement) {
      console.log('Submitting PayFort form →', this.payfort_url);
      this.payfortForm.nativeElement.submit();
    } else {
      console.error('PayFort form element not found');
      this.isError = true;
      this.errorMessage = 'Unable to redirect to payment page. Please try again.';
    }
  }

  goBack() {
    sessionStorage.removeItem('onlinePaymentData');
    this.router.navigate([`${this.routerBaseLink}/new-quotes/policy-generate`]);
  }
}