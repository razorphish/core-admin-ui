import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { of } from 'rxjs';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';
import { ApplicationService } from '../shared/application.service';

@Injectable()
export class ApplicationResolve implements Resolve<any> {
  constructor(
    private _applicationService: ApplicationService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting application id: ${id}`);
    if (id === '0') {
      return of('0');
    }
    return this._applicationService.getDetails(id);
  }
}
