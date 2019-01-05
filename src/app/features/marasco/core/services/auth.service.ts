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

import { delay, tap, map, catchError, share } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import { UserService } from './user.service';
import { UserCredential } from './models/userCredential.model';
import { StorageService } from './storage.service';
import { UserInfo } from './models/userInfo.model';
import { TokenResult } from './models/tokenResult.model';

const ROLE_ADMIN = 1;

const USER_TOKEN = 'token';
const USER_LOGGED_ONCE = 'logged_once';

@Injectable()
export class AuthService {
  private _loginSubject = new BehaviorSubject<boolean>(this.hasToken());
  private _url: string = environment.apiUrlAuth;
  private _clientId = environment.clientId;
  private _clientSecret = environment.clientSecret;

  public currentUser: UserService | null;
  public lastUrl: string;
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  public tokenIsBeingRefreshed: Subject<boolean>;

  constructor(
    private _http: HttpClient,
    private _storage: StorageService) {
      this.lastUrl = '/';
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
    this.onIdTokenChanged(null);
    return observable;
  };

  //confirmPasswordReset(code: string, newPassword: string): Promise<void>;

  isLoggedIn(): Observable<boolean> {
    return this._loginSubject.asObservable().pipe(share());
  }

  loggedIn() {
    return this.tokenNotExpired().then(_ => _);
  }

  login(username: string, password: string): Observable<TokenResult> {
    const params: any = {
      username: username,
      password: password,
      client_id: this._clientId,
      client_secret: this._clientSecret,
      grant_type: 'password'
    };

    return this._http
      .post<TokenResult>(this._url + 'token', params)
      .pipe(map((credential: TokenResult) => {
        // login successful if there's a jwt token in the response

        if (credential && credential.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', JSON.stringify(user));
          //localStorage.setItem('access_token', user.access_token);
          ///this.currentUser.next(JSON.stringify(user));
          this._loginSubject.next(true);
          this.onIdTokenChanged(credential.user);
          this.onAuthStateChanged(credential.user);
          return credential;
        }
      }),
        catchError(this.handleError)
      );
  }

  /**
  * Observer for changes to the signed in user's Id token including sign in , sign out
  * @param user {UserService} user User data that informs observers/subscribers
  * @example .onAuthStateChanged(null).subscribe((token) => { this._store.dispatch(new actions.Idtoken(user)) })
  */
  onAuthStateChanged(user: UserInfo) {
    var tokenObservable = new Observable(observer => {
      observer.next(user);
      observer.complete();
    });

    return tokenObservable;
  }

  /**
  * Observer for changes to the signed in user's Id token including sign in , sign out, and token refresh
  * @param user {UserService} user User data that informs observers/subscribers
  * @example .onIdTokenChanged(null).subscribe((token) => { this._store.dispatch(new actions.Idtoken(user)) })
  */
  onIdTokenChanged(user: UserInfo): Observable<UserInfo> {
    var tokenObservable = new Observable<UserInfo>(observer => {
      observer.next(user);
      observer.complete();
    });

    return tokenObservable;
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
      .post(this._url + 'token', params)
      .pipe(map((credential: TokenResult) => {
        // Business as usual
        // login successful if there's a jwt token in the response
        if (credential.user && credential.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', JSON.stringify(user));
          //localStorage.setItem('access_token', user.access_token);
          ///this.currentUser.next(JSON.stringify(user));
          this._loginSubject.next(true);
          this.onIdTokenChanged(credential.user);
          this.onAuthStateChanged(credential.user);
          return credential;
        }
      }),
      catchError(this.handleError));
  }

  refreshTokenErrorHandler(error) {
    this._loginSubject.next(true);
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

  signOut(): Observable<void> {
    let observable = new Observable<void>(null);


    this._loginSubject.next(false);

    //Notify listeners
    this.onAuthStateChanged(null);
    this.onIdTokenChanged(null);

    return observable;
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
   * @param error 
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accor
      console.error('An error occurred:', error.error.message);
    } else if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.message;
      } catch (err) {
        errMessage = error.statusText;
      }

      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }

    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
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
