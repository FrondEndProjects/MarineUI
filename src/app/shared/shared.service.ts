import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, throwError, timer } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { IdleTimeoutManager } from 'idle-timer-manager';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  public Token: any;
  timer: IdleTimeoutManager;
  timeoutHandle: NodeJS.Timeout;
  redirectSection: boolean = false;
  timeLimit: Subscription; public value: number;

  private onView = new BehaviorSubject<any>(null);
  public readonly onViewData = this.onView.asObservable();

  private onViewSub = new BehaviorSubject<any>(null);
  public readonly onViewDataSub = this.onViewSub.asObservable();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
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

  onGetData(data:any){
    this.onView.next(data);
  }

  onGetDataSub(data:any){
    this.onViewSub.next(data);
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

  // TimeOut Session

  clearTimeOut() {
    console.log('Clear Time Out');
    const redirectStatus = sessionStorage.getItem('redirectStatus');
    // tslint:disable-next-line: triple-equals
    if ((redirectStatus == undefined && this.router != undefined)) {
      // tslint:disable-next-line: triple-equals
      if (this.router.url != '/' && this.router.url != '/login-layout/login/broker' && this.router.url != '/sessionRedirect' ) {
        window.clearTimeout(this.timeoutHandle);
        this.setTimeOutSection();
      }
    }
    return true;
  }
  setTimeOutSection() {
    this.timeoutHandle = setTimeout(() => this.showAlert(this.redirectSection, this.router), (20 * 60 * 1000));
    //this.redirectRouting();
  }
  showAlert(redirectSection,router){
    let redirectStatus = sessionStorage.getItem('redirectStatus');
    if((redirectStatus==undefined && router!= undefined)){
      if(this.router.url!= '/' && this.router.url!='' && this.router.url!='/login-layout/login/broker' && this.router.url != '/sessionRedirect'){
      sessionStorage.setItem('redirectStatus','started')
        const startValue = 1 * 60 + 5;
        this.timeLimit = timer(0, 1000).pipe(
          take(startValue + 1),
          map(value => startValue - value)
        ).subscribe(
          value => this.value = value, 
          null, 
          () => this.timeLimit = null
        );
          console.log("Alert Time Out",router,this.redirectSection,this.timeLimit);
          // Swal.fire({
          //   title: 'Your Session is About to Expire!',
          //   text: `You will be LogOut in 20 Minute 0 seconds Due to InActivity.Are You want to Stay Logged in?`,
          //   icon: 'warning',
          //   confirmButtonColor: '#3085d6',
          //   cancelButtonColor: '#d33',
          //   confirmButtonText: `Yes, Stay Loggined in!`
          // }).then((result) => {
          //   if (result.value) {
              this.router.navigate(['./sessionRedirect']);
          //   }
          // })
      }
    }
  }

  redirectRouting(){
    console.log("Redirect Time Out")
    if(this.router!=undefined){
      this.timer = new IdleTimeoutManager({
        timeout: 60*30,
        onExpired: () => {
          sessionStorage.clear();
          Swal.close();
          this.router.navigate(['./Login/sessionRedirect']);
        }
      });
    }
  }
  // Error handling
  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
