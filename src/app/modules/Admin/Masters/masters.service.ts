import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from '../../../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  public Token: any;

  constructor(private http: HttpClient, private authService: AuthService) { }


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

  getToken() {
    this.authService.isloggedToken.subscribe((event) => {
      if(event !== undefined && event !== '' && event !== null) {
        this.Token = event;
      } else {
        this.Token = sessionStorage.getItem('UserToken');
      }
    });
    return this.Token;
  }

  async onPostMethodAsync(
    UrlLink: any,
    ReqObj: any,
  ): Promise<Observable<any[]>> {
    let headers = new HttpHeaders();
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
    .get<any>(UrlLink, {headers: headers})
    .pipe(retry(1), catchError(this.handleError));
  }


  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
