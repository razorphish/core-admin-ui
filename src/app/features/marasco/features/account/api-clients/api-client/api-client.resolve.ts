import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local
import { IApiClient } from '../shared/IApiClient';
import { ApiClientService } from '../shared/api-client.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class ApiClientResolve implements Resolve<IApiClient> {
  constructor(
    private _apiClientService: ApiClientService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting api client id: ${id}`);
    return this._apiClientService.get(id);
  }
}
