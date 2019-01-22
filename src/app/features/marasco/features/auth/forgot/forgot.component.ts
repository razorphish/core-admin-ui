import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAuth from '@app/features/marasco/core/store/auth';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {

  public validationOptions: any = {

    //Custom method
    store: this._store,
    // Rules for form validation
    rules: {
      username: {
        // required: function (element) {
        //   return $("#email").is(':empty');
        // }
      },
      email: {
        required: function (element) {
          return !$('#username').val();
        },
        email: true
      }
    },

    // Messages for form validation
    messages: {
      username: {
        required: 'Please enter a username or email'
      },
      email: {
        required: 'Please enter your email address',
        email: 'Please enter a VALID email address'
      }
    }
    , submitHandler: this.forgotPasswordSubmit
  };

  constructor(private _store: Store<any>) { }

  ngOnInit() {
  }

  forgotPasswordSubmit($event) {

    let model = {
      email: $event.elements.email.value,
      username: $event.elements.username.value
    };

    this['settings'].store.dispatch(new fromAuth.ForgotPasswordAction(model));
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
}
