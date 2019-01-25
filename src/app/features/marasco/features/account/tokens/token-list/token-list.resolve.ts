import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

// Local libraries
import { IToken } from './../shared/IToken';
import { TokenService } from './../shared/token.service';
import { ActivityLogSubjectService } from '../../../../shared/activitylog.subject-service';

@Injectable()
export class TokenListResolve implements Resolve<IToken[]> {
  constructor(
    private _TokenService: TokenService,
    private _activityLogService: ActivityLogSubjectService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    this._activityLogService.addGet('Get all tokens');
    return this._TokenService.all();
  }
}
