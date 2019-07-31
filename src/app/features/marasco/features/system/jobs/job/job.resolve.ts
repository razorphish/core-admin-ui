import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

// Local
import { JobsService } from '../shared';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class JobResolve implements Resolve<any> {
  constructor(
    private _jobService: JobsService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting job id: ${id}`);

    if (id === '0') {
      return of('0');
    }
    return this._jobService.getDetails(id);
  }
}
