import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { AuthService } from '../../Auth/auth.service';


@Injectable({
  providedIn: 'root',
})

export class OpenCoverService {
  public Token: any;
  private onMoveStepper: BehaviorSubject<any> = new BehaviorSubject<any>('');
  onGetStepper = this.onMoveStepper.asObservable();

  private openCoverEdit: BehaviorSubject<any> = new BehaviorSubject<any>('');
  onGetOpenCoverEdit = this.openCoverEdit.asObservable();


  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }


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

  onMoveNext(val: any) {
    this.onMoveStepper.next(val);
  }

  onGetCoverEditData(val: any) {
    this.openCoverEdit.next(val);
  }

  ngbDateFormatt(data: any) {
    console.log(data);
    let d: any = data;
    if (d != null && d != undefined && d != '') {
      const splitDate = d.split('/');
      const reverseDate = splitDate.reverse();
      const joinDate = reverseDate.join('-');
      d = new Date(joinDate);
      console.log(d);
    }
    if (d instanceof Date && !isNaN(d.valueOf())) {
      const ngbDate = {
        "year": d.getFullYear(),
        "month": d.getMonth() + 1,
        "day": d.getDate()
      }
      return this.toModel(ngbDate)!;
    }
    else {
      return null;
    }
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + '-' + date.month + '-' + date.year : null;
  }

  async onPostMethodAsync(UrlLink: any, ReqObj: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append( 'Content-Type', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  async onGetMethodAsync(UrlLink: any): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return await this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  onPostMethodSync(UrlLink: string, ReqObj: any): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .post<any>(UrlLink, ReqObj, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }
  onGetMethodSync(UrlLink: string): Observable<any[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http
      .get<any>(UrlLink, { headers: headers })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
