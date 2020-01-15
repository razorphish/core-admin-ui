import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import {
  MarascoEmailNotification,
  MarascoNotification,
  MarascoNotificationAction
} from '@app/features/marasco/core/interfaces/NotificationOptions.interface';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IApplicationSettings } from '.';
import { environment } from '../../../../../../../environments/environment';
import { AuthHttpService } from '../../../../core/services/auth-http.service';

@Injectable()
export class ApplicationSettingsService {
  private _url: string = environment.apiUrl + 'application/settings/';
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

  /**
   * @description Consumes all for settings endpint
   * @author Antonio Marasco
   * @date 2020-01-12
   * @returns {Observable<IApplicationSettings[]>}
   * @memberof ApplicationSettingsService
   * @summary GET /api/application/settings/
   */
  all(): Observable<IApplicationSettings[]> {
    return this._authHttp.get(this._url).pipe(
      map((wishlists: any) => wishlists),
      catchError(this.handleError)
    );
  }

  /**
   * @description Consumes delete settings endpoint
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {string} id
   * @returns {Observable<any>}
   * @memberof ApplicationSettingsService
   * @summary DELETE /api/application/settings/:id
   */
  delete(id: string): Observable<any> {
    return this._authHttp.delete(`${this._url}${id}`).pipe(
      map((result: any) => result),
      catchError(this.handleError)
    );
  }

  /**
   * @description Consumes get application settings endpoint
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {string} id
   * @returns {Observable<IApplicationSettings>}
   * @memberof ApplicationSettingsService
   * @summary GET /api/application/settings/:id
   */
  get(id: string): Observable<IApplicationSettings> {
    return this._authHttp.get(`${this._url}${id}`).pipe(
      map((wishlist: any) => wishlist),
      catchError(this.handleError)
    );
  }

  /**
   * @description Consumes settings endpoint for insert
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {IApplicationSettings} applicationSetting
   * @returns {Observable<IApplicationSettings>}
   * @memberof ApplicationSettingsService
   * @summary POST /api/application/settings/
   */
  insert(
    applicationSetting: IApplicationSettings
  ): Observable<IApplicationSettings> {
    return this._authHttp
      .post(this._url, JSON.stringify(applicationSetting))
      .pipe(
        map((applicationSetting: IApplicationSettings) => applicationSetting),
        catchError(this.handleError)
      );
  }

  /**
   * @description Consumes email Notification POST call to insert
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {MarascoEmailNotification} emailNotification
   * @returns {Observable<MarascoEmailNotification>}
   * @memberof ApplicationSettingsService
   * @example insertEmailNotification(emailNotification);
   * @summary POST /api/application/settings/:id/emailNotification/
   */
  insertEmailNotification(
    applicationSettingsId: string,
    emailNotification: MarascoEmailNotification
  ): Observable<MarascoEmailNotification> {
    return this._authHttp
      .post(
        `${this._url}${applicationSettingsId}/emailNotification`,
        JSON.stringify(emailNotification)
      )
      .pipe(
        map((en: MarascoEmailNotification) => en),
        catchError(this.handleError)
      );
  }

  /**
   * @description Consumes notification POST call to insert
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {MarascoNotification} notification
   * @returns {Observable<MarascoNotification>}
   * @memberof ApplicationSettingsService
   * @example insertNotification(notification);
   * @summary POST /api/application/settings/:id/notification/
   */
  insertNotification(
    applicationSettingsId: string,
    notification: MarascoNotification
  ): Observable<MarascoEmailNotification> {
    return this._authHttp
      .post(
        `${this._url}${applicationSettingsId}/notification`,
        JSON.stringify(notification)
      )
      .pipe(
        map((n: MarascoNotification) => n),
        catchError(this.handleError)
      );
  }

  /**
   * @description Consumes email notification action POST call to insert
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {string} applicationSettingsId
   * @param {string} notificationId
   * @param {MarascoNotificationAction} notificationAction
   * @returns {Observable<MarascoEmailNotification>}
   * @memberof ApplicationSettingsService
   * @summary POST /api/application/settings/:id/notification/:notificationId/action
   */
  insertNotificationAction(
    applicationSettingsId: string,
    notificationId: string,
    notificationAction: MarascoNotificationAction
  ): Observable<MarascoEmailNotification> {
    return this._authHttp
      .post(
        `${this._url}${applicationSettingsId}/notification/${notificationId}/action/`,
        JSON.stringify(notificationAction)
      )
      .pipe(
        map((na: MarascoNotificationAction) => na),
        catchError(this.handleError)
      );
  }
  
  /**
   * @description Consumes settings endpoint
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {IApplicationSettings} applicationSetting
   * @returns {Observable<IApplicationSettings>}
   * @memberof ApplicationSettingsService
   * @summary PUT /api/application/settings/:id
   */
  update(
    applicationSetting: IApplicationSettings
  ): Observable<IApplicationSettings> {
    return this._authHttp
      .put(
        `${this._url}${applicationSetting._id}`,
        JSON.stringify(applicationSetting)
      )
      .pipe(
        map((as: IApplicationSettings) => as),
        catchError(this.handleError)
      );
  }

  /**
   * @description Consumes update email notification endpoint
   * @author Antonio Marasco
   * @date 2019-05-03
   * @param {string} applicationSettingsId
   * @param {string} emailNotificationId
   * @param {MarascoNotification} emailNotification
   * @returns {Observable<IApplicationSettings>}
   * @memberof WishlistAppService
   * @summary PUT /api/application/settings/:id/emailNotification/:emailNotificationId
   */
  updateEmailNotification(
    applicationSettingsId: string,
    emailNotificationId: string,
    emailNotification: MarascoNotification
  ): Observable<IApplicationSettings> {
    return this._authHttp
      .put(
        `${this._url}${applicationSettingsId}/emailNotification/${emailNotificationId}`,
        JSON.stringify(emailNotification)
      )
      .pipe(
        map((result: IApplicationSettings) => result),
        catchError(this.handleError)
      );
  }
  /**
   * @description Consumes update notification endpoint
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {string} applicationSettingsId
   * @param {string} notificationId
   * @param {MarascoNotification} notification
   * @returns {Observable<IApplicationSettings>}
   * @memberof ApplicationSettingsService
   * @summary PUT /api/application/settings/:id/notification/:notificationId
   */
  updateNotification(
    applicationSettingsId: string,
    notificationId: string,
    notification: MarascoNotification
  ): Observable<IApplicationSettings> {
    return this._authHttp
      .put(
        `${this._url}${applicationSettingsId}/notification/${notificationId}`,
        JSON.stringify(notification)
      )
      .pipe(
        map((result: IApplicationSettings) => result),
        catchError(this.handleError)
      );
  }

  /**
   * @description Consumes notification endpoint for update
   * @author Antonio Marasco
   * @date 2020-01-12
   * @param {string} applicationSettingsId
   * @param {string} notificationId
   * @param {string} actionId
   * @param {MarascoNotificationAction} action
   * @returns {Observable<IApplicationSettings>}
   * @memberof ApplicationSettingsService
   * @summary PUT /api/application/settings/:id/notification/:notificationId/action
   */
  updateNotificationAction(
    applicationSettingsId: string,
    notificationId: string,
    actionId: string,
    action: MarascoNotificationAction
  ): Observable<IApplicationSettings> {
    return this._authHttp
      .put(
        `${this._url}${applicationSettingsId}/notification/${notificationId}/action/${actionId}`,
        JSON.stringify(action)
      )
      .pipe(
        map((result: IApplicationSettings) => result),
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
