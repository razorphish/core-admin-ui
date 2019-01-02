import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { delay, tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';

import { UserService } from './user.service';
import { UserCredential } from './models/userCredential.model';
import { TokenResult } from './models/tokenResult.model';
import { StorageService } from './storage.service';

const ROLE_ADMIN = 1;

const USER_TOKEN = 'token';
const USER_LOGGED_ONCE = 'logged_once';

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {*} error
 * @param {*} data
 */


@Injectable()
export class AuthService {
  private _loginSubject = new BehaviorSubject<boolean>(this.hasToken());

  private _url: string = environment.apiUrlAuth;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private _http: HttpClient,
    private _storage: StorageService,) {

  }

  isLoggedIn(): Observable<boolean> {
    return this._loginSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!this._storage.get(USER_TOKEN);
  }

  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return new Observable<UserCredential>(null);
  };

  login(username: string, password: string): Observable<Object> {
    const params: any = {
      username: username,
      password: password,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'password'
    };

    return this._http
      .post(this._url + 'token', params)
      .pipe(map((response: Response) => {
        // login successful if there's a jwt token in the response
        const resp = response.json();
        const user = resp;
        if (user /*&& user.access_token*/) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem('currentUser', JSON.stringify(user));
          //localStorage.setItem('access_token', user.access_token);
          ///this.currentUser.next(JSON.stringify(user));
          return resp;
        }
      }),
        catchError(this.handleError));
  }

  signOut(): Observable<void> {
    let observable = new Observable<void>(null);

    return observable;
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
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
}
