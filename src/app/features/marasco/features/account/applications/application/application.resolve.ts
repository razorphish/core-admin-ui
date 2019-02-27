
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';
import { ApplicationService } from '../shared/application.service';
import { of } from 'rxjs';

@Injectable()
export class ApplicationResolve implements Resolve<any> {
  constructor(
    private _applicationService: ApplicationService,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting application id: ${id}`);
    if (id === "0") {
      return of("0");
    }
    return this._applicationService.get(id);
  }
}
