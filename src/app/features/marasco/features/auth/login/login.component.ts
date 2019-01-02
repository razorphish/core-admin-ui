//import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromAuth from "@app/features/marasco/core/store/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  auth$;

  form: FormGroup;
  email = new FormControl("", Validators.required);

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private _store: Store<any>) {
    this.auth$ = this._store.select(fromAuth.getAuthState);

    this.form = formBuilder.group({
      "email": this.email,
      "password": ["", Validators.required]
    });
  }

  ngOnInit() {
  }

  login($event) {
    $event.preventDefault();

    console.log(this.email.value);
    // this._authService.login();

    // this.router.navigate(['/dashboard'])
    this._store.dispatch(new fromAuth.LoginAction({ username: this.email }));
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.form.controls.email);
  }

}
