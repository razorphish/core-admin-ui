import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

// Local
import { SubscriptionPlanService } from '../shared/subscriptionPlan.service';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class SubscriptionPlanResolve implements Resolve<any> {
  constructor(
    private _service: SubscriptionPlanService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting subscriptionPlan id: ${id}`);

    if (id === '0') {
      return of('0');
    }
    return this._service.getDetails(id);
  }
}
