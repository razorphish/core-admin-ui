import { Injectable } from '@angular/core';

import { IApiClient } from '../../api-clients';

@Injectable()
export class ApiClientFactory {
  ////////// Private variables//////////
  // private _apiClient: IApiClient;

  //////////Publicly exposed properties//////////

  //////////Constructor//////////
  /**
     * These should be singleton objects
     */
  constructor() {}

  public validate(
    apiClient: IApiClient,
    callback?: (errors: string[]) => void
  ): boolean {
    const errors: string[] = [];

    if (!apiClient) {
      throw new Error('apiClient Object Missing...');
    }

    // Check for required properties
    if (!apiClient.name) {
      errors.push('Please enter an name');
    }

    if (!apiClient.clientId) {
      errors.push('Please enter a client id');
    }

    // if (!apiClient.isTrusted) {
    //   errors.push('Please enter trust');
    // }

    if (!apiClient.applicationType) {
      errors.push('Please enter a applicationType');
    }

    if (!apiClient.allowedOrigins) {
      errors.push('Please enter allowed origins');
    }

    if (!apiClient.tokenLifeTime) {
      errors.push('Please enter token life time in minutes');
    }

    if (!apiClient.refreshTokenLifeTime) {
      errors.push('Please enter refresh token life time in minutes');
    }

    // Only check on updated obects
    if (apiClient._id) {
      if (!apiClient.dateCreated) {
        errors.push('Date Created not set');
      }
    }

    // Set errors
    if (errors.length > 0) {
      if (callback) {
        callback(errors);
      }
      return false;
    } else {
      return true;
    }
  }
}
