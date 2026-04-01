import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Auth/auth.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public CryKey: any = 'MaaN';
  public Token: any;
  public username = 'motor';
  public password = 'motor123#';
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getToken() {
    this.authService.isloggedToken.subscribe((event: any) => {
      if (event != undefined && event != '' && event != null) {
        this.Token = event;
      } else {
        this.Token = sessionStorage.getItem("UserToken");
      }
    });
    return this.Token;
  }







  async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return await this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  // onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
  //   let headers = new HttpHeaders();
  //   headers = headers.append('Authorization', 'Basic ' + this.getToken());
  //   return this.http
  //     .post<any>(UrlLink, ReqObj, { headers: headers })
  //     .pipe(retry(1), catchError(this.handleError));
  // }
  onPostMethodBasicSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    return this.http
      .post<any>(UrlLink, ReqObj)
      .pipe(retry(1), catchError(this.handleError));
  }

  onGetMethodSync(UrlLink: string): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + this.getToken());
    return this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    const headers = new HttpHeaders();
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  onPostMethodBearerSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  private productIdSubject = new BehaviorSubject<string>(
    sessionStorage.getItem('ProductId')
  );
  productId$ = this.productIdSubject.asObservable();

  setProductId(id: string) {
    sessionStorage.setItem('ProductId', id);
    this.productIdSubject.next(id);
  }

  getProductId(): string {
    return this.productIdSubject.value;
  }
  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
