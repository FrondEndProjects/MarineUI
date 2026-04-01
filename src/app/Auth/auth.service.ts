import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
@Injectable()
export class AuthService {


  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private loggedToken: BehaviorSubject<any> = new BehaviorSubject<any>('');

  private branchCodeSubject = new BehaviorSubject<string | null>(null);
  branchCode$ = this.branchCodeSubject.asObservable();

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isloggedToken() {
    return this.loggedToken.asObservable();
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private injector: Injector,
    @Inject(DOCUMENT) private _document: Document,
  ) {

  }

  setBranchCode(code: any) {
    this.branchCodeSubject.next(code);
  }

  login(userDetails: any) {
    if (userDetails?.LoginResponse && userDetails?.LoginResponse?.Token != null) {
      this.loggedIn.next(true);
    }
  }

  UserToken(newUserToken: any) {
    this.loggedToken.next(newUserToken);
  }

  logout() {
    this.loggedIn.next(false);
  }
  getLoginDetails() {
    try {
      const userDetails = sessionStorage.getItem('Userdetails');

      // Check if item exists
      if (!userDetails) {
        console.warn('User details not found in sessionStorage');
        return null; // Or you can return an empty object or handle accordingly
      }

      // Attempt to parse the stored JSON data
      return JSON.parse(userDetails);
    } catch (error) {
      console.error('Error parsing user details from sessionStorage:', error);
      return null; // Or handle the error as needed
    }
  }
}
