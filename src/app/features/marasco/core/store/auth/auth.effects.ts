
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';


import { tap, filter, map } from 'rxjs/operators';
import { AuthState } from './auth.reducer';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthTokenService } from '../../services/auth-token.service';
import { AuthService } from './../../../core/services/auth.service';
import * as actions from './auth.actions';

@Injectable()
export class AuthEffects {
  redirectUrl: string = '/dashboard';
  loginUrl: string = '/auth/login';
  user = {};

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LoginAction),
    tap((data: any) => {
      console.log(data);
      console.log(data.payload.username);
      // auth
      //   .signInWithEmailAndPassword(
      //     data.payload.username,
      //     data.payload.password
      //   )
      //   .catch(this.dispatchError);
      this._authService
        .login(data.payload.username, data.payload.password)
        .subscribe(user => {
          this.user = user
        })
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LogoutAction),
    tap((data: any) => {
      this.router.navigate(['']);
      console.log('logout');
      //auth.signOut();
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
    //switchMap((data: any) => data.payload.getIdToken()),
    tap(_ => (this.authToken.token = _)),
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
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService
  ) {
    //auth.onAuthStateChanged(data => {
    // console.log('\n\n onAuthStateChanged', data);
    //});

    //auth.onIdTokenChanged(authUser => {
    // console.log('\n\n onIdTokenChanged', data);
    // if (authUser) {
    //   this.store.dispatch(new actions.AuthUserChange(authUser));
    // } else {
    //   this.authToken.token = null;
    //   this.store.dispatch(new actions.NullToken());
    // }
    //});


  }
}
