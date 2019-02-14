import { MarascoNotificationAction, MarascoNotification } from '@app/features/marasco/core/interfaces/NotificationOptions.interface';
import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';

// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

import { map, catchError } from 'rxjs/operators';

import { environment } from '../../../../../../../environments/environment';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

import { WishlistAppSettings } from './WishlistAppSettings.interface'

@Injectable()
export class WishlistAppService {
  private _url: string = environment.apiUrl + 'wishlist/settings/';
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

  all(): Observable<WishlistAppSettings[]> {
    return this._authHttp
      .get(this._url)
      .pipe(map((wishlists: any) => wishlists),
        catchError(this.handleError));
  }

  delete(id: string): Observable<any> {
    return this._authHttp
      .delete(`${this._url}${id}`)
      .pipe(map((result: any) => result),
        catchError(this.handleError))
  }

  get(id: string): Observable<WishlistAppSettings> {
    return this._authHttp
      .get(`${this._url}${id}`)
      .pipe(map((wishlist: any) => wishlist),
        catchError(this.handleError));
  }

  insert(wishlist: WishlistAppSettings): Observable<WishlistAppSettings> {
    return this._authHttp
      .post(this._url, JSON.stringify(wishlist))
      .pipe(map((wishlist: WishlistAppSettings) => wishlist),
        catchError(this.handleError));
  }

  update(wishlist: WishlistAppSettings): Observable<WishlistAppSettings> {
    return this._authHttp
      .put(`${this._url}${wishlist._id}`, JSON.stringify(wishlist))
      .pipe(map((wishlist: WishlistAppSettings) => wishlist),
        catchError(this.handleError));
  }

  updateNotification(
    id: string,
    notificationId: string,
    notification: MarascoNotification): Observable<WishlistAppSettings> {
    return this._authHttp
      .put(`${this._url}${id}/notification/${notificationId}`, JSON.stringify(notification))
      .pipe(map((result: WishlistAppSettings) => result),
        catchError(this.handleError));
  }

  updateNotificationAction(
    id: string,
    notificationId: string,
    actionId: string,
    action: MarascoNotificationAction): Observable<WishlistAppSettings> {
    return this._authHttp
      .put(`${this._url}${id}/notification/${notificationId}/action/${actionId}`, JSON.stringify(action))
      .pipe(map((result: WishlistAppSettings) => result),
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
