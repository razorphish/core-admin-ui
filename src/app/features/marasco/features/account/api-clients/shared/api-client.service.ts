import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../../../../../environments/environment';
import { IApiResponse } from '../../../../shared/IApiResponse';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

import { IApiClient } from '../../api-clients';

@Injectable()
export class ApiClientService {
  private _url: string = environment.apiUrl + 'client/';
  private _headers: Headers;
  private _options: RequestOptions;

  constructor(private _authHttp: AuthHttpService) {
    this._headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9.1'
    });

    this._options = new RequestOptions({
      headers: this._headers,
      withCredentials: true
    });
  }

  all(): Observable<IApiClient[]> {
    return (
      this._authHttp
        .get(this._url)
        .pipe(map((response: Response) => <IApiClient[]>response.json()),
        // .do(
        //   data => console.log('All: ' + JSON.stringify(data))
        // )
        catchError(this.handleError))
    );
  }

  delete(id: number): Observable<any> {
    return this._authHttp
      .delete(this._url + id)
      .pipe(map((response: Response) => <any>response.json()),
        catchError(this.handleError));
  }

  get(id: string): Observable<IApiClient> {
    return this._authHttp
      .get(this._url + id)
      .pipe(map((response: Response) => <IApiClient>response.json()),
      catchError(this.handleError));
  }

  insert(apiClient: IApiClient): Observable<IApiResponse> {
    return this._authHttp
      .post(this._url, JSON.stringify(apiClient))
      .pipe(map((response: Response) => { return response.json(); }),
        catchError(this.handleError));
  }

  refreshToken(id: string): Observable<IApiResponse> {
    return this._authHttp
      .post(this._url + id + '/rt', null)
      .pipe(map((response: Response) => { return response.json(); }),
        catchError(this.handleError));
  }

  update(apiClient: IApiClient): Observable<IApiResponse> {
    return this._authHttp
      .put(this._url + apiClient._id, JSON.stringify(apiClient))
      .pipe(map((response: Response) => { return response.json(); }),
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