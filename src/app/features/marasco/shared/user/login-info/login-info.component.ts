import { Component, OnInit } from '@angular/core';
import { LayoutService } from '@app/features/marasco/core/services/layout.service';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@app/features/marasco/core/services/auth.service';
import * as fromAuth from '../../../core/store/auth';
import { map, take } from 'rxjs/operators';
import { UserInfo } from '@app/features/marasco/core/models/userInfo.model';
import { User } from '@app/features/marasco/core/interfaces/UserInfo.interface';

const defaultUser1 : User = new UserInfo(); 
defaultUser1._id = '';
defaultUser1.username = 'Guest';
defaultUser1.firstName= 'Guest';
defaultUser1.lastName= '';
defaultUser1.email= '@';

@Component({
  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  public user$;



  constructor(
    private store: Store<fromAuth.AuthState>,
    private layoutService: LayoutService) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(
      select(fromAuth.getUser),
      map(result => {
        if (!result) {
         
          return defaultUser1;
        }

        return result.user;
      })
    );
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
