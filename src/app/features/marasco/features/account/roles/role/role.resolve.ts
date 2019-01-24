
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';
import { RoleService } from './../shared/role.service';
import { of } from 'rxjs';

@Injectable()
export class RoleResolve implements Resolve<any> {
  constructor(
    private _roleService: RoleService,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting user id: ${id}`);
    if (id === "0") {
      return of("0");
    }
    return this._roleService.get(id);
  }
}
