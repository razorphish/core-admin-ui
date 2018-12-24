import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Http,
  Headers,
  Response,
  RequestOptions,
  URLSearchParams
} from '@angular/http';

// import 'rxjs/add/operator/map';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { Observable, Subject } from 'rxjs';
import { tokenIsPresent } from '../../../shared/auth/ng2-bearer';

import { environment } from '../../../../../../environments/environment';

@Injectable()
export class AuthoritiesService {
  requireLoginSubject: Subject<boolean>;
  tokenIsBeingRefreshed: Subject<boolean>;
  currentUser: Subject<string>;
  loggedInUser: {};
  lastUrl: string;

  private _url: string = environment.apiUrlAuth;
  private _headers: Headers;
  private _options: RequestOptions;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  constructor(private http: Http, private _router: Router) {
    this.requireLoginSubject = new Subject<boolean>();
    this.tokenIsBeingRefreshed = new Subject<boolean>();
    this.currentUser = new Subject<string>();
    this.tokenIsBeingRefreshed.next(false);
    this.lastUrl = '/';
  }

  addTokens(accessToken: string, refreshToken: string) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('access_token', accessToken);
    this.loggedInUser = user;
    this.currentUser.next(JSON.stringify(user));
  }

  getRefreshTokenExpirationDate() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user.refresh_token) {
      const tokenExpDate = user['.expires'];
      const sessionExpDate = new Date(tokenExpDate.getTime() + 4 * 60000);
      if (new Date() > sessionExpDate) {
        this.logout();
      }
      return sessionExpDate;
    }

    return null;
  }

  hasRefreshToken() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const refToken = user.refresh_token;

    if (refToken == null) {
      this.logout();
    }

    return refToken != null;
  }

  isLoggedIn(): Observable<string> {
    return this.currentUser.asObservable();
  }

  isUserAuthenticated() {
    if (this.loggedIn()) {
      this.requireLoginSubject.next(false);
      return true;
    } else {
      return false;
    }
  }

  loggedIn() {
    return this.tokenNotExpired();
  }

  login(username: string, password: string) {
    const params: any = {
      username: username,
      password: password,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'password'
    };

    return this.http
      .post(this._url + 'token', params, this._options)
      .pipe(map((response: Response) => {
        // login successful if there's a jwt token in the response
        const resp = response.json();
        const user = resp;
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('access_token', user.access_token);
          this.currentUser.next(JSON.stringify(user));
          return resp;
        }
      }),
      catchError(this.handleError));
  }

  refreshToken() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
      // This guarantees that a 403 is returned
      // in the observable which will be handled by
      // interceptor
      currentUser = {
        refresh_token: ''
      };
    }

    const params: any = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: currentUser.refresh_token
    };

    return this.http
      .post(this._url + 'token', params, this._options)
      .pipe(map((response: Response) => {
        // Business as usual
        // login successful if there's a jwt token in the response
        const resp = response.json();
        const user = resp;
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('access_token', user.access_token);
          this.currentUser.next(JSON.stringify(user));
          return resp;
        }
      }),
      catchError(this.handleError));
  }

  refreshTokenSuccessHandler(data) {
    if (data.error) {
      console.log('Removing tokens.');
      this.logout();
      this.requireLoginSubject.next(true);
      this.tokenIsBeingRefreshed.next(false);
      this._router.navigateByUrl('/auth/login');
      return false;
    } else {
      this.addTokens(data.access_token, data.refresh_token);
      this.requireLoginSubject.next(false);
      this.tokenIsBeingRefreshed.next(false);
      console.log('Refreshed user token');
    }
  }

  refreshTokenErrorHandler(error) {
    this.requireLoginSubject.next(true);
    this.logout();
    this.tokenIsBeingRefreshed.next(false);
    this._router.navigate(['/auth/login']);
    console.log(error);
  }

  tokenRequiresRefresh(): boolean {
    if (!this.loggedIn()) {
      console.log('Token refresh is required');
    }

    return !this.loggedIn();
  }

  tokenNotExpired(): boolean {
    const storedUser = localStorage.getItem('currentUser');
    let user: any;

    if (storedUser) {
      user = JSON.parse(storedUser);
    } else {
      return false;
    }

    const d1 = new Date();
    const d2 = new Date(user['.expires']);

    if (d1 > d2) {
      return false;
    }
    return true;
  }

  logout() {
    // remove user from local storage to log user out
    let exists = false;
    if (localStorage.getItem('currentUser')) {
      exists = true;
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    this.requireLoginSubject.next(true);
    this.currentUser.next('');

    if (exists) {
      location.replace('/');
    }
  }

  /*///////////////////////////////////////////////
  /* Private Methods
  //////////////////////////////////////////////*/

  /**
   * Handles the error
   * @param error : Error
   */
  private handleError(error: any) {
    console.error('server error:', error);
    if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.json().error;
      } catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }
}
