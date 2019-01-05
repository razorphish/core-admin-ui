
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { tap, filter, map, switchMap } from 'rxjs/operators';
import { AuthState } from './auth.reducer';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthTokenService } from '../../services/auth-token.service';
import { AuthService } from '../../services/auth.service';
import * as actions from './auth.actions';
import { TokenResult } from '../../services/models/tokenResult.model';

@Injectable()
export class AuthEffects {
  redirectUrl: string = '/dashboard';
  loginUrl: string = '/auth/login';


  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LoginAction),
    tap((data: any) => {
      this._authService
        .login(data.payload.username, data.payload.password)
        .subscribe((_ : TokenResult) => _)
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LogoutAction),
    tap((data: any) => {
      this.router.navigate(['']);
      console.log('logout');
      this.auth.signOut();
    })
  );

  @Effect({ dispatch: false })
  signup$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.SignupAction),
    tap((data: any) => {
      // auth
      //   .createUserWithEmailAndPassword(
      //     data.payload.username,
      //     data.payload.password
      //   )
      //   .catch(this.dispatchError);
      console.log('signup');
    })
  );

  @Effect({ dispatch: false })
  googleSign$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.GoogleSign),
    tap((data: any) => {
      // auth
      //   .signInWithPopup(new fireAuth.GoogleAuthProvider())
      //   .catch(this.dispatchError);
    })
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LoginRedirect),
    tap((data: any) => {
      this.redirectUrl = data.payload || '';
      this.router.navigate([this.loginUrl]);
    })
  );

  @Effect({ dispatch: false })
  authRedirect$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.AuthTokenPayload),
    filter(_ => this.router.url === this.loginUrl),
    tap((data: any) => {
      this.router.navigate([this.redirectUrl]);
    })
  );

  @Effect()
  authUser$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.AuthUserChange),
    switchMap((data: any) => data.payload.getIdToken()),
    tap<TokenResult>(_ => (this.authToken.token = _)),
    map(_ => this.authToken.readPayload(_)),
    map(_ => new actions.AuthTokenPayload(_))
  );


  dispatchError = err => {
    this.store.dispatch(
      new actions.AuthFailure({
        code: err.code,
        message: err.message
      })
    );
  };

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private authToken: AuthTokenService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService
  ) {

    //Login, Logout
    this.auth.onAuthStateChanged(null).subscribe(data => {
      console.log('\n\n onAuthStateChanged', data);
    });

    //Login, Logout, Token Refresh
    this.auth.onIdTokenChanged(null).subscribe(authUser => {
      console.log('\n\n onIdTokenChanged', authUser);

      if (authUser) {
        this.store.dispatch(new actions.AuthUserChange(authUser));
      } else {
        this.authToken.token = null;
        this.store.dispatch(new actions.NullToken());
      }
    });
  }
}
