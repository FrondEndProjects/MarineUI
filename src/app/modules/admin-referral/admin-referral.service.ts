import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { AuthService } from '../../Auth/auth.service';


@Injectable({
  providedIn: 'root',
})

export class AdminReferralService {
  public Token: any;
  public searchForm!: FormGroup;
  private tableList: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  tableData = this.tableList.asObservable();
  private tableHeader: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  columnHeader = this.tableHeader.asObservable();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private _formBuilder: FormBuilder,
  ) {
    this.onCreateFormControl();
  }

  onCreateFormControl() {
    this.searchForm = this._formBuilder.group({
      productName: [null, Validators.required],
      regions: ['100002', Validators.required],
      branch: [null, Validators.required]
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

  onSetTableData(data:any[],header:any[]){
   this.tableList.next(data);
   this.tableHeader.next(header);
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
