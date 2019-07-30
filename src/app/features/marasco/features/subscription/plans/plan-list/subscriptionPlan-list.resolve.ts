import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { SubscriptionPlan } from '../shared/SubscriptionPlan.interface';
import { SubscriptionPlanService } from '../shared/subscriptionPlan.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class SubscriptionPlanListResolve implements Resolve<SubscriptionPlan[]> {
  constructor(
    private _service: SubscriptionPlanService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    this._activityLogService.addGet('Get all subscription plans');
    return this._service.all();
  }
}
