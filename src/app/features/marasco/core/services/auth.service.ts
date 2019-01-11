/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {*} error
 * @param {*} data
 */
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, Subject } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { map, catchError, share } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import { UserCredential } from './models/userCredential.model';
import { StorageService } from './storage.service';
import { UserInfo } from './models/userInfo.model';
import { TokenResult } from './models/tokenResult.model';
import { Response } from '@angular/http';

const ROLE_ADMIN = 1;

const USER_TOKEN = 'token';
const USER_LOGGED_ONCE = 'logged_once';

@Injectable()
export class AuthService {
  private userSource: UserInfo;

  private _loginSubject = new BehaviorSubject<boolean>(this.hasToken());
  private _userSubject = new BehaviorSubject<UserInfo>(this.userSource);
  public onAuthStateChanged = new BehaviorSubject<UserInfo>(this.userSource);
  public onIdTokenChanged = new BehaviorSubject<UserInfo>(this.userSource);

  private _authUrl: string = environment.apiUrlAuth;
  private _apiUrl: string = environment.apiUrl;
  private _clientId = environment.clientId;
  private _clientSecret = environment.clientSecret;

  public lastUrl: string;
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  public tokenIsBeingRefreshed: Subject<boolean>;

  constructor(
    private _http: HttpClient,
    private _storage: StorageService) {

    this.lastUrl = '/';
    console.log('created');

  }

  //createUserAndRetrieveDataWithEmailAndPassword(
  //  email: string,
  //  password: string
  //): Promise<UserCredential>;

  createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    var observable = new Observable<UserCredential>(() => {
    });

    //Inform everybody
    //this.tokenSource.next({ token: '' });
    //this.onIdTokenChanged(new UserService());
    //this.onIdTokenChanged(null);
    return observable;
  };

  //confirmPasswordReset(code: string, newPassword: string): Promise<void>;

  isLoggedIn(): Observable<boolean> {
    return this._loginSubject.asObservable();
  }

  loggedIn() {
    return this.tokenNotExpired().then(_ => _);
  }

  login(username: string, password: string, forceRefresh: boolean = false): Observable<TokenResult> {
    const params: any = {
      username: username,
      password: password,
      client_id: this._clientId,
      client_secret: this._clientSecret,
      grant_type: 'password'
    };

    return this._http
      .post<TokenResult>(this._authUrl + 'token', params)
      .pipe(map((credential: TokenResult) => {
        // login successful if there's a jwt token in the response

        if (credential && credential.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes

          //Inform everyone
          this._loginSubject.next(true);

          this.userSource = new UserInfo(credential.user);
          this.userSource.token = credential;
          this.userSource.token.forceRefresh = forceRefresh;
          this._userSubject.next(this.userSource);
          this.onAuthStateChanged.next(this.userSource);
          this.onIdTokenChanged.next(this.userSource);
          return credential;
        }
      }),
        catchError(this.handleError)
      );
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
      client_id: this._clientId,
      client_secret: this._clientSecret,
      grant_type: 'refresh_token',
      refresh_token: currentUser.refresh_token
    };

    return this._http
      .post(this._authUrl + 'token', params)
      .pipe(map((credential: TokenResult) => {
        // Business as usual
        // login successful if there's a jwt token in the response
        if (credential.user && credential.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', JSON.stringify(user));
          //localStorage.setItem('access_token', user.access_token);
          ///this.currentUser.next(JSON.stringify(user));
          this._loginSubject.next(true);
          this.onIdTokenChanged.next(credential.user);
          //this.onAuthStateChanged(credential.user);
          return credential;
        }
      }),
        catchError(this.handleError));
  }

  refreshTokenErrorHandler(error) {
    this._loginSubject.next(false);
    this.signOut();
    this.tokenIsBeingRefreshed.next(false);
    //this._router.navigate(['/auth/login']);
    console.log(error);
  }

  refreshTokenSuccessHandler(data) {
    if (data.error) {
      console.log('Removing tokens.');
      this.signOut();
      this._loginSubject.next(true);
      this.tokenIsBeingRefreshed.next(false);
      //this._router.navigateByUrl('/auth/login');
      return false;
    } else {
      this.addTokens(data.access_token, data.refresh_token);
      this._loginSubject.next(false);
      this.tokenIsBeingRefreshed.next(false);
      console.log('Refreshed user token');
    }
  }

  addTokens(accessToken: string, refreshToken: string) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('access_token', accessToken);
    //this.loggedInUser = user;
    //this.currentUser.next(JSON.stringify(user));
  }

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return new Observable<UserCredential>(null);
  };

  signOut(): Observable<any> {
    const url = this._apiUrl + 'auth/logout';
    const body: any = {};
    return this._http
      .post(url, body)
      .pipe(map((response: Response) => {
        // logout response

        //Notify listeners
        this._loginSubject.next(false);
        this._userSubject.next(null);
        this.onAuthStateChanged.next(null);
        this.onIdTokenChanged.next(null);
      }),
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      );
  };

  tokenRequiresRefresh(): boolean {
    if (!this.loggedIn()) {
      console.log('Token refresh is required');
    }

    return !this.loggedIn();
  }

  ///////////////////////////////////////
  //Private Methods
  ///////////////////////////////////////

  /**
   * handles the errors from api calls
   * @param errorResponse 
   */
  private handleError(errorResponse: HttpErrorResponse) {
    let errorInfo = {
      code: '',
      message: ''
    };

    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accor
      console.error('An error occurred:', errorResponse.error.message);
    } else if (errorResponse instanceof Response) {
      let errMessage = '';
      try {
        errMessage = errorResponse.message;
      } catch (err) {
        errMessage = errorResponse.statusText;
      }

      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }

    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${errorResponse.status}, ` +
        `body was:`, errorResponse.error);
      if (errorResponse.error) {
        errorInfo.code = errorResponse.error.error;
        errorInfo.message = errorResponse.error.error_description;
        console.log(errorResponse.error.error)
      }
    }

    // return an observable with a user-facing error message
    return throwError(errorInfo);
  };

  /**
   * True if token exists, otherwise false;
   */
  private hasToken(): boolean {
    return !!this._storage.get(USER_TOKEN);
  }

  /**
   * Determine if token has expired
   */
  private tokenNotExpired(): Promise<any> {
    return this._storage.get(USER_TOKEN)
      .then(tokenResult => {
        let token: string = '';

        if (tokenResult) {
          token = JSON.parse(tokenResult);
        } else {
          return false;
        }

        const d1 = new Date();
        const d2 = new Date(token['.expires']);

        if (d1 > d2) {
          return false;
        }
        return true;
      }).catch(err => {
        return false;
      });
  }
}
