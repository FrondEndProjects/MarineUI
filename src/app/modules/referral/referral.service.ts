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
import * as Mydatas from '../../app-config.json';


@Injectable({
  providedIn: 'root',
})

export class ReferralService {
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;

  public Token: any;
  public reasonList:any[]=[];
  userDetails: any;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.userDetails = this.userDetails?.LoginResponse;
    this.onGetReasonDropdown();
  }


  setReasonList(list:any) {
     this.reasonList = list;
  }
  getReasonList(){
   return this.reasonList;
  }


  onGetReasonDropdown(){
    const urlLink = `${this.ApiUrl1}menu/rejectedreasons`;
    const reqData = {
      "BranchCode": this.userDetails?.BranchCode
    };
    this.onPostMethodSync(urlLink, reqData).subscribe(
      (data: any) => {
        this.setReasonList(data?.Result);
      },
      (err) => { },
    );
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
