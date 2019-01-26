import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';


import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../../../environments/environment';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

import { Application } from './application.interface';

@Injectable()
export class ApplicationService {
  private _url: string = environment.apiUrl + 'application/';

  constructor(private _authHttp: AuthHttpService) {
  }

  all(): Observable<any> {
    return this._authHttp
        .get(this._url)
        .pipe(map((applications: any) => applications),
        catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this._authHttp
      .delete(this._url + id)
      .pipe(map((result: any) => result),
        catchError(this.handleError));
  }

  get(id: string): Observable<Application> {
    return this._authHttp
      .get(this._url + id)
      .pipe(map((client: any) => client),
      catchError(this.handleError));
  }

  insert(application: Application): Observable<Application> {
    return this._authHttp
      .post(this._url, JSON.stringify(application))
      .pipe(map((client: any) => client),
        catchError(this.handleError));
  }

  update(application: Application): Observable<Application> {
    return this._authHttp
      .put(this._url + application._id, JSON.stringify(application))
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
    console.error('server error:', error);
    if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.json().error;
      } catch (err) {
        errMessage = error.statusText;
      }
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
