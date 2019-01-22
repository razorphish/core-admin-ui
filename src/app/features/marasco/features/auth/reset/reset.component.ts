import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAuth from '@app/features/marasco/core/store/auth';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  public token: string = '';

  public validationOptions: any = {

    //Custom method
    store: this._store,
    // Rules for form validation
    rules: {
      password: {
        required: true,
        minlength: 6,
        maxlength: 20
      },
      passwordConfirm: {
        required: true,
        equalTo: '#password'
      }
    },

    // Messages for form validation
    messages: {
      password: {
        required: 'Please enter your password'
      },
      passwordConfirm: {
        required: 'Please enter your password one more time',
        equalTo: 'Please enter the same password as above'
      }
    }
    , submitHandler: this.resetPasswordSubmit
  };

  constructor(
    private _store: Store<any>,
    private _route: ActivatedRoute) {
    this.token = this._route.snapshot.paramMap.get('token')
  }

  ngOnInit() {
  }

  resetPasswordSubmit($event) {

    let model = {
      password: $event.elements.password.value,
      passwordConfirm: $event.elements.passwordConfirm.value,
      token: $event.elements.token.value
    };

    this['settings'].store.dispatch(new fromAuth.ResetPasswordAction(model));
  }
}
