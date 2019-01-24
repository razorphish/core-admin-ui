import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { environment } from './../../../../../../../environments/environment';
import { IApiResponse } from '../../../../core/services/models/IApiResponse';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

import { IUser } from '../../users';

@Injectable()
export class UserService {
  private _url: string = environment.apiUrl + 'user/';
  private _headers: Headers;
  //private _options: RequestOptions;

  constructor(private _authHttp: AuthHttpService) {
    this._headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9.1'
    });

    // this._options = new RequestOptions({
    //   headers: this._headers,
    //   withCredentials: true
    // });
  }

  all(): Observable<IUser[]> {
    return (
      this._authHttp
        .get(this._url)
        .pipe(map((users: any) => users),
          // .do(
          //   data => console.log('All: ' + JSON.stringify(data))
          // )
          catchError(this.handleError))
    );
  }

  delete(id: number): Observable<IApiResponse> {
    return this._authHttp
      .delete(this._url + id)
      .pipe(map((response: Response) => <any>response.json()),
        catchError(this.handleError));
  }

  get(id: string): Observable<IUser> {
    return this._authHttp
      .get(this._url + id)
      .pipe(map((user: any) => user),
        catchError(this.handleError));
  }

  insert(user: IUser): Observable<IUser> {
    return this._authHttp
      .post(this._url, JSON.stringify(user))
      .pipe(map((response: Response) => { return response.json(); }),
        catchError(this.handleError))
  }

  update(user: IUser): Observable<IUser> {
    return this._authHttp
      .put(this._url + user._id, JSON.stringify(user))
      .pipe(map((user: any) => user),
        catchError(this.handleError));
  }

  /*///////////////////////////////////////////////
  /* Private Methods
  //////////////////////////////////////////////*/

  /**
   * Handles the error
   * @param error : Error
   */
  private handleError(error: any) {

    if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.json().error;
      } catch (err) {
        errMessage = error.statusText;
      }
      return throwError(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return throwError(error || 'Node.js server error');
  }
}
