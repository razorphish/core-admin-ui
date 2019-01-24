import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { IApiClient } from '../shared/IApiClient';
import { ApiClientService } from '../shared/api-client.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class ApiClientListResolve implements Resolve<IApiClient[]> {
  constructor(
    private _apiClientService: ApiClientService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    this._activityLogService.addGet('Get all api clients');
    return this._apiClientService.all();
  }
}
