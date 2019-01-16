//**DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */
// import { Subject } from 'rxjs';
// import { takeUntil, tap } from 'rxjs/operators';
// import *  as actions from '../../../core/store/auth/auth.actions';
// import { AuthService as SocialAuthService, SocialUser } from "angularx-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
// import { Actions } from '@ngrx/effects';
//\\DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '@app/features/marasco/core/store/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  //**DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */
  //destroyed$ = new Subject<boolean>();
  //\\DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */

  form: FormGroup;

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  forceRefresh = new FormControl('', Validators.required);

  // constructor(
  //   updates$: Actions,
  //   formBuilder: FormBuilder,
  //   private _store: Store<any>,
  //   private _notificationService: NotificationService,
  //   private authService: SocialAuthService
  //   ) {

  constructor(
    formBuilder: FormBuilder,
    private _store: Store<any>
  ) {

    //**DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */
    // updates$
    //   .ofType(actions.AuthActionTypes.AuthFailure)
    //   .pipe(takeUntil(this.destroyed$),
    //     tap((error: any) => {
    //       this.dispatchError(error);
    //     }),
    //   )
    //   .subscribe();
    //\\DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */

    this.form = formBuilder.group({
      'username': this.username,
      'password': this.password,
      'forceRefresh': this.forceRefresh
    });
  }

  ngOnInit() {

  }
  //**DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */
  // dispatchError(error: any) {
  //   switch (error.payload.code) {
  //     case 'invalid_grant':
  //       this.notify('Invalid username and/or password', 'Please re-enter your sign in credentials.', ' ');
  //       break;
  //     default:
  //       this.notify('Error occurred', 'Please contact your administrator');
  //       break;
  //   }
  // }
  //\\DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */

  login($event) {
    $event.preventDefault();
    this._store.dispatch(new fromAuth.LoginAction({ username: this.username.value, password: this.password.value, forceRefresh: this.forceRefresh.value }));
  }

  signInWithGoogle(): void {
    //this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this._store.dispatch(new fromAuth.GoogleSign());
  }

  signInWithFB(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    this._store.dispatch(new fromAuth.FacebookSign());
  }

  signInWithLinkedIn(): void {
    //this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
    this._store.dispatch(new fromAuth.LinkedInSign());
  }

  ngOnDestroy(): void {
    //**DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */
    //this.destroyed$.next(true);
    //this.destroyed$.complete();
    //\\DO NOT DELETE:  THIS IS SUBSCRIBE TO ACTION EXAMPLE */
  }
}
