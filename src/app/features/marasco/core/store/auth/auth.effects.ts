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
import { environment } from '@env/environment';

import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { NotificationService } from '@app/features/marasco/core/services/notification.service';


@Injectable()
export class AuthEffects {
  redirectUrl: string = environment.redirectUrl;
  loginUrl: string = environment.loginUrl;


  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LoginAction),
    tap((data: any) => {
      this.auth
        .login(data.payload.username, data.payload.password, data.payload.forceRefresh)
        .subscribe((_: TokenResult) => { _ },
          (error: any) => { this.dispatchError(error); })
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LogoutAction),
    tap((data: any) => {
      this.router.navigate([this.loginUrl]);
      this.auth
        .signOut()
        .subscribe((_: any) => _);
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
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
        .then((socialUser: SocialUser) => {
          this.auth
            .loginSocial(socialUser)
            .subscribe((_: TokenResult) => { _ },
              (error: any) => { this.dispatchError(error); })
        })
        .catch((error: any) => {
          this.dispatchError(error);
        });
    })
  );

  @Effect({ dispatch: false })
  facebookSign$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.FacebookSign),
    tap((data: any) => {

      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
        .then((socialUser: SocialUser) => {
          this.auth
            .loginSocial(socialUser)
            .subscribe((_: TokenResult) => { _ },
              (error: any) => { this.dispatchError(error); })
        })
        .catch((error: any) => {
          this.dispatchError(error);
        });
    })
  );

  @Effect({ dispatch: false })
  linkedInSign$ = this.actions$.pipe(
    ofType(actions.AuthActionTypes.LinkedInSign),
    tap((data: any) => {

      this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID)
        .then((socialUser: SocialUser) => {
          this.auth
            .loginSocial(socialUser)
            .subscribe((_: TokenResult) => { _ },
              (error: any) => { this.dispatchError(error); })
        })
        .catch((error: any) => {
          this.dispatchError(error);
        });
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
    // tap((data: any) => console.log('Whatup!!')),
    // tap((data: any) => console.log(data)),
    switchMap((data: any) => data.payload.getIdToken()),
    tap<TokenResult>(_ => (this.authToken.token = _)),
    map(_ => this.authToken.readPayload(_)),
    map(_ => new actions.AuthTokenPayload(_))
  );


  dispatchError = err => {
    //Notify, if applicable
    this.dispatchErrorNotification(err);
    this.store.dispatch(
      new actions.AuthFailure({
        code: err.code,
        message: err.message
      })
    );
  };

  dispatchErrorNotification(error: any) {
    if (!error.code) {
      this.notify('Fatal Error occurred', 'Please contact your administrator', error);
      return;
    }

    switch (error.code) {
      case 'invalid_grant':
        this.notify('Invalid username and/or password', 'Please re-enter your sign in credentials.', ' ');
        break;
      default:
        this.notify('Error occurred', 'Please contact your administrator');
        break;
    }
  }

  notify(title, content, number?) {

    this._notificationService.bigBox({
      title: title,
      content: content,
      color: '#C46A69',
      icon: 'fa fa-warning shake animated',
      number: number || '1',
      timeout: 6000
    });
  }

  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private authToken: AuthTokenService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: SocialAuthService,
    private _notificationService: NotificationService,
  ) {

    //Login/Logout
    this.auth.onAuthStateChanged.subscribe(data => {
      //console.log('\n\n onAuthStateChanged', data);
    });

    //Login, Logout, Token Refresh
    this.auth.onIdTokenChanged.subscribe(authUser => {
      //console.log('\n\n onIdTokenChanged', authUser);

      // if (typeof authUser.getIdToken === "function") {
      //   console.log('I see it');
      // } else {
      //   console.log('I dont see it');
      // }

      if (authUser) {
        this.store.dispatch(new actions.AuthUserChange(authUser));
      } else {
        this.authToken.token = null;
        this.store.dispatch(new actions.NullToken());
      }
    });
  }
}
