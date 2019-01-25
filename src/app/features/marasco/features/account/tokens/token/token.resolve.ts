
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';

// Local
import { TokenService } from './../shared/token.service';

import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class TokenResolve implements Resolve<any> {
  constructor(
    private _tokenService: TokenService,
    private _activityLogService: ActivityLogSubjectService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this._activityLogService.addGet(`Getting Token id: ${id}`);

    if (id === "0") {
      return of("0");
    }
    return this._tokenService.get(id);
  }
}
