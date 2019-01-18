import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromAuth from '@app/features/marasco/core/store/auth';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {

  constructor(
    private _store: Store<any>,
    private router: Router) { }

  ngOnInit() {
  }

  submit(event){
    event.preventDefault();
    this.router.navigate(['/dashboard/+analytics'])
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
