import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { AuthService } from '../../Auth/auth.service';


@Injectable({
  providedIn: 'root',
})

export class CustomerService {
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
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }


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
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(catchError(this.handleError));
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(catchError(this.handleError));
  }
  onGetMethodSync(UrlLink: string): Observable<any[]> {
    let headers = new HttpHeaders();
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
