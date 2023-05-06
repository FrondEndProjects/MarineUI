import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, share, shareReplay, take } from 'rxjs/operators';
import { AuthService } from '../../Auth/auth.service';
import { SessionStorageService } from '../../shared/storage/session-storage.service';


@Injectable({
  providedIn: 'root',
})

export class NewQuotesService {
  public Token: any;
  private BankDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getBankDropdown = this.BankDropdown.asObservable();
  private TitleDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getTitleDropdown = this.TitleDropdown.asObservable();
  private CityDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getCityDropdown = this.CityDropdown.asObservable();
  private TransporDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getTransporDropdown = this.TransporDropdown.asObservable();
  private CoverDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getCoverDropdown = this.CoverDropdown.asObservable();
  private CarriageDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getCarriageDropdown = this.CarriageDropdown.asObservable();
  private OrginCountryDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getOrginCountryDropdown = this.OrginCountryDropdown.asObservable();
  private OrginCityDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getOrginCityDropdown = this.OrginCityDropdown.asObservable();
  private DestCountryDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getDestCountryDropdown = this.DestCountryDropdown.asObservable();
  private DestCityDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getDestCityDropdown = this.DestCityDropdown.asObservable();
  private SettlingAgentDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getSettlingAgentDropdown = this.SettlingAgentDropdown.asObservable();
  private PackageDescDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getPackageDescDropdown = this.PackageDescDropdown.asObservable();
  private IncotermsDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getIncotermsDropdown = this.IncotermsDropdown.asObservable();
  private IncotermsPrecDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getIncotermsPrecDropdown = this.IncotermsPrecDropdown.asObservable();
  private ToleranceDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getToleranceDropdown = this.ToleranceDropdown.asObservable();
  private CatgOfGoodDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getCatgOfGoodDropdown = this.CatgOfGoodDropdown.asObservable();
  private CurrencyDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getCurrencyDropdown = this.CurrencyDropdown.asObservable();
  private PartialShipDropdown: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  getPartialShipDropdown = this.PartialShipDropdown.asObservable();

  private quoteEditData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  getQuoteEditData = this.quoteEditData.asObservable();


  public customerForm: FormGroup;
  public quoteForm: FormGroup;
  public bankForm: FormGroup;
  public brokerForm: FormGroup;

  public premiumForm!: FormGroup;
  userDetails: any;
  routerBaseLink: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private _formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.routerBaseLink = this.userDetails?.routerBaseLink;
    this.onCreateFormControl();
  }


  getDropDownList(list: any[], name: string) {
    if ( name === 'bank' ) {
      this.BankDropdown.next(list);
    }
    if ( name === 'title' ) {
      this.TitleDropdown.next(list);
    }
    if ( name === 'city' ) {
      this.CityDropdown.next(list);
    }
    if ( name === 'transport' ) {
      this.TransporDropdown.next(list);
    }
    if ( name === 'cover' ) {
      this.CoverDropdown.next(list);
    }
    if ( name === 'carriage' ) {
      this.CarriageDropdown.next(list);
    }
    if ( name === 'orgCountry' ) {
      this.OrginCountryDropdown.next(list);
    }
    if ( name === 'orgCity' ) {
      this.OrginCityDropdown.next(list);
    }
    if ( name === 'destCounty' ) {
      this.DestCountryDropdown.next(list);
    }
    if ( name === 'destCity' ) {
      this.DestCityDropdown.next(list);
    }
    if ( name === 'settlingAgent' ) {
      this.SettlingAgentDropdown.next(list);
    }
    if ( name === 'packageDesc' ) {
      this.PackageDescDropdown.next(list);
    }
    if ( name === 'incoterms' ) {
      this.IncotermsDropdown.next(list);
    }
    if ( name === 'incotermsPrec' ) {
      this.IncotermsPrecDropdown.next(list);
    }
    if ( name === 'tolerance' ) {
      this.ToleranceDropdown.next(list);
    }
    if ( name === 'goodesofCat' ) {
      this.CatgOfGoodDropdown.next(list);
    }
    if ( name === 'currencyList' ) {
      this.CurrencyDropdown.next(list);
    }
    if ( name === 'partialShip' ) {
      this.PartialShipDropdown.next(list);
    }

  }

  onEditQuoteDetails(item: any) {
    this.quoteEditData.next(item);
  }
  redirectQuotePage(){
    this.sessionStorageService.remove('referral');
    sessionStorage.setItem('quotesType', 'Without-Endo');
    //sessionStorage.removeItem('quotesType')
    sessionStorage.removeItem("endorsement");
    sessionStorage.removeItem("ReferenceNo");
    // sessionStorage.removeItem('QuoteStatus');
    //this.reloadCurrentRoute();
    /*sessionStorage.removeItem('OpenCover');
    sessionStorage.removeItem('quotesType');
    sessionStorage.removeItem('MissippiCode');
    sessionStorage.removeItem('ProposalNo');
    sessionStorage.removeItem('loginId');
    sessionStorage.removeItem('WithCertifi');  
    sessionStorage.removeItem('customerLoginId');
    sessionStorage.removeItem('OpenCoverNo');*/
    this.reloadCurrentRoute();
  }
  reloadCurrentRoute() {
   
    window.location.href = `${this.routerBaseLink}/new-quotes/customer-info`;
  }
  ngbDateFormatt(data:any){
    let d:any = data;
    if(d != null && d != undefined && d != ''){
      d = new Date(data);
    }
    if(d instanceof Date && !isNaN(d.valueOf())){
      const ngbDate = {
        "year": d.getFullYear(),
        "month": d.getMonth() + 1,
        "day": d.getDate()
      }
      return this.toModel(ngbDate)!;
    }
    else{
      return null;
    }
  }

  toModel(date: NgbDateStruct | null): string | null {
		return date ? date.day + '-' + date.month + '-' + date.year : null;
	}

  onCreateFormControl() {

    this.brokerForm = this._formBuilder.group({
      channel:[null],
      borker:[null]
    })
    this.customerForm = this._formBuilder.group({
      title: [null, Validators.required],
      name: ['', Validators.required],
      coreAppcode: [''],
      city: [null, Validators.required],
      poBox: ['', Validators.required],
      mobileNo: [''],
      email: [''],
      customerVat: [''],
      Address1: [''],
      Address2: [''],
      Code:[''],
    });
    this.quoteForm = this._formBuilder.group({
      modeOfTransport: [null, Validators.required],
      cover: [null, Validators.required],
      modeOfCarriage: [null, Validators.required],
      originatingCountry: [null, Validators.required],
      originatingCity: [null],
      orginatingCityOtherYN: [false],
      orginatingCityOther: [''],
      originatingWarehouse: ['NO'],
      destinationCountry: [null, Validators.required],
      destinationCity: [null],
      destinationOtherYN: [false],
      destinationCityOther: [''],
      destinationWarehouse: ['NO'],
      policyStartDate: [null, Validators.required],
      warSrcc: ['NO'],
      warOnLand: ['NO'],
      via: [''],
      settlingAgent: [null],
      others: [''],

      goodsCategory: [null, Validators.required],
      goodsDescript: ['', Validators.required],
      insuredValue: ['0', Validators.required],
      invoiceNumber: [''],
      invoiceDate: [null],
      poPiNumber: [''],
      consignedTo: [''],
      consignedForm: [''],


      commodity: [''],
      currency: [null, Validators.required],
      currencyValue: [null, Validators.required],
      packageDescription: [null, Validators.required],
      incoterms: [null, Validators.required],
      incotermsPercentage: [null, Validators.required],
      tolerance: ['4'],
      conveyanceVesselName: [''],
      voyageNumber: [''],
      partialShipment: ['N'],
      exposureOfShipment: [null],
      currencyOfExposure: [null],
      fragileYN:['off'],
      excessDescription:['']

    });
    this.bankForm = this._formBuilder.group({
      lCBank: [null],
      lcNumber: [''],
      lcDate: [''],
      lcBankDesc: [''],
      blAwbLrRrNumber: [''],
      blAwbLrRrDate: [''],
      sailingDate: [''],
    });




    this.premiumForm = this._formBuilder.group({
      marineRate: ['', Validators.required],
      marinePremium: ['', Validators.required],
      warRate: ['', Validators.required],
      warPremium: ['', Validators.required],
      warLandRate: ['', Validators.required],
      warLandPremium: ['', Validators.required],
      additionalSelect: ['+', Validators.required],
      additionalPremium: ['', Validators.required],
      policyInsuAedEdit: ['', Validators.required],
      policyInsuAedPremium: ['', Validators.required],
      premiumWithOutVat: [''],
      vatTaxPrecentage: [''],
      vatTaxAmount: [''],
      totalPremium: [''],
      isEditClauses:['N'],
      ReferralUpdateYn:['N'],
      comments:[''],
      isFinalizeQuote:['N'],
      commissionCheck: ['N'],
      commission: [''],
      referralStatus: ['N'],
      adminRemarks: [''],




    });

  }


  getToken() {
    this.authService.isloggedToken.subscribe((event: any) => {
      if (event !== undefined && event !== '' && event != null) {
        this.Token = event;
      } else {
        this.Token = sessionStorage.getItem('UserToken');
      }
    });
    return this.Token;
  }



  async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(catchError(this.handleError),shareReplay());
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'text/plain');
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(shareReplay());
  }
  onDocumentPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    const formData: FormData = new FormData();
    formData.append('files', ReqObj.url);
    formData.append('docType','1');
    formData.append('loginid',ReqObj?.loginid);
    formData.append('productid',ReqObj?.productid);
    formData.append('quoteno', ReqObj.quoteNo);
    formData.append('remarks', 'None');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .post<any>(UrlLink, formData, { headers: headers })
      .pipe(catchError(this.handleError));
  }
  onGetMethodSync(UrlLink: string): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'text/plain');
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
