
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

// Local
import { UserService } from './../shared/user.service';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class UserResolve implements Resolve<any> {
  constructor(
    private _userService: UserService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting user id: ${id}`);

    if (id === "0") {
      return of("0");
    }
    return this._userService.get(id);
  }
}
