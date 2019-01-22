import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromAuth from '@app/features/marasco/core/store/auth';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {


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

  constructor(private _store: Store<any>) { }

  ngOnInit() {
  }

  resetPasswordSubmit($event) {

    let model = {
      email: $event.elements.email.value,
      username: $event.elements.username.value
    };

    this['settings'].store.dispatch(new fromAuth.ResetPasswordAction(model));
  }
}
