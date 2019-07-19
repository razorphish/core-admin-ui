import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';

// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../../../environments/environment';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

import { Job } from './Job.interface'

@Injectable()
export class JobsService {
  private _url: string = environment.apiUrl + 'job/';
  private _headers: Headers;
  private _options: RequestOptions;

  constructor(private _authHttp: AuthHttpService) {
    this._headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9.1'
    });

    this._headers.append('X-Requested-With', 'XMLHttpRequest');

    this._options = new RequestOptions({
      headers: this._headers,
      withCredentials: true
    });
  }

  all(): Observable<Job[]> {
    return this._authHttp
      .get(this._url)
      .pipe(map((jobs: any) => jobs),
      catchError(this.handleError));
  }

  allDetails(): Observable<Job[]> {
    return this._authHttp
      .get(`${this._url}details`)
      .pipe(map((jobs: any) => jobs),
      catchError(this.handleError));
  }

  delete(id: string): Observable<any> {
    return this._authHttp
      .delete(`${this._url}${id}`)
      .pipe(map((result: any) => result),
        catchError(this.handleError))
  }

  get(id: string): Observable<Job> {
    return this._authHttp
      .get(`${this._url}${id}`)
      .pipe(map((job: any) => job),
      catchError(this.handleError));
  }

  getDetails(id: string): Observable<Job> {
    return this._authHttp
      .get(`${this._url}${id}/details`)
      .pipe(map((job: any) => job),
      catchError(this.handleError));
  }

  insert(job: Job): Observable<Job> {
    return this._authHttp
      .post(this._url, JSON.stringify(job))
      .pipe(map((job: Job) => job),
        catchError(this.handleError));
  }

  update(job: Job): Observable<Job> {
    return this._authHttp
      .put(`${this._url}${job._id}`, JSON.stringify(job))
      .pipe(map((job: Job) => job),
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
