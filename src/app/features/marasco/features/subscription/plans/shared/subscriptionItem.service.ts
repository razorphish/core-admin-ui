import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../../../environments/environment';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

import { SubscriptionItem } from './SubscriptionItem.interface';

@Injectable()
export class SubscriptionItemService {
  private _url: string = environment.apiUrl + 'subscription/plan/item';
  private _headers: Headers;
  private _options: RequestOptions;

  constructor(private _authHttp: AuthHttpService) {
    this._headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9.1',
    });

    this._headers.append('X-Requested-With', 'XMLHttpRequest');

    this._options = new RequestOptions({
      headers: this._headers,
      withCredentials: true,
    });
  }

  all(): Observable<SubscriptionItem[]> {
    return this._authHttp.get(this._url).pipe(
      map((subscriptionPlans: any) => subscriptionPlans),
      catchError(this.handleError)
    );
  }

  allDetails(): Observable<SubscriptionItem[]> {
    return this._authHttp.get(`${this._url}details`).pipe(
      map((subscriptionPlans: any) => subscriptionPlans),
      catchError(this.handleError)
    );
  }

  delete(id: string): Observable<any> {
    return this._authHttp.delete(`${this._url}${id}`).pipe(
      map((result: any) => result),
      catchError(this.handleError)
    );
  }

  get(id: string): Observable<SubscriptionItem> {
    return this._authHttp.get(`${this._url}${id}`).pipe(
      map((subscriptionPlan: any) => subscriptionPlan),
      catchError(this.handleError)
    );
  }

  getDetails(id: string): Observable<SubscriptionItem> {
    return this._authHttp.get(`${this._url}${id}/details`).pipe(
      map((subscriptionPlan: any) => subscriptionPlan),
      catchError(this.handleError)
    );
  }

  insert(subscriptionItem: SubscriptionItem): Observable<SubscriptionItem> {
    return this._authHttp
      .post(this._url, JSON.stringify(subscriptionItem))
      .pipe(
        map((subcriptionItem: SubscriptionItem) => subcriptionItem),
        catchError(this.handleError)
      );
  }

  update(subcriptionItem: SubscriptionItem): Observable<SubscriptionItem> {
    return this._authHttp
      .put(
        `${this._url}${subcriptionItem._id}`,
        JSON.stringify(subcriptionItem)
      )
      .pipe(
        map((item: SubscriptionItem) => item),
        catchError(this.handleError)
      );
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
