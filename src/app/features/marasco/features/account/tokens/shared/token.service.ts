import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../../../environments/environment';
import { IApiResponse } from '../../../../core/services/models/IApiResponse';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

import { IToken } from '../../tokens';

@Injectable()
export class TokenService {
  private _url: string = environment.apiUrl + 'token/';
  private _headers: Headers;
  //private _options: RequestOptions;

  constructor(private _authHttp: AuthHttpService) {
    this._headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9.1'
    });

  }

  all(): Observable<IToken[]> {
    return (
      this._authHttp
        .get(this._url)
        .pipe(map((tokens: any) => tokens),
          // .do(
          //   data => console.log('All: ' + JSON.stringify(data))
          // )
          catchError(this.handleError))
    );
  }

  delete(id: number): Observable<IApiResponse> {
    return this._authHttp
      .delete(this._url + id)
      .pipe(map((result: any) => result),
        catchError(this.handleError));
  }

  get(id: string): Observable<IToken> {
    return this._authHttp
      .get(this._url + id)
      .pipe(map((token: any) => token),
        catchError(this.handleError));
  }

  insert(token: IToken): Observable<IToken> {
    return this._authHttp
      .post(this._url, JSON.stringify(token))
      .pipe(map((token: any) => token),
        catchError(this.handleError))
  }

  update(token: IToken): Observable<IToken> {
    return this._authHttp
      .put(this._url + token._id, JSON.stringify(token))
      .pipe(map((token: any) => token),
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
