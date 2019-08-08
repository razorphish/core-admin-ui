import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { SubscriptionUser } from '../shared/SubscriptionUser.interface';
import { SubscriptionUserService } from '../shared/subscriptionUser.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class SubscriptionUserListResolve implements Resolve<SubscriptionUser[]> {
  constructor(
    private _service: SubscriptionUserService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    this._activityLogService.addGet('Get all subscription plans');
    return this._service.all();
  }
}
