import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@env/environment';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Store } from '@ngrx/store';

import { TokenRestore, AuthInit, LoggedOnce } from '../store/auth/auth.actions';
import { AuthState } from '../store/auth/auth.reducer';
import { TokenResult } from '../models/tokenResult.model';

const ROLE_ADMIN = 1;

const USER_TOKEN = 'token';
const USER_LOGGED_ONCE = 'logged_once';

@Injectable()
export class AuthTokenService {

  private _token: TokenResult = {
    access_token: '',
    refresh_token: '',
    expires_in: '',
    expirationTime: '',
    issuedAtTime: '',
    signInProvider: '',
  }

  //private tokenSubject = new BehaviorSubject<any>(this._token);
  private tokenSubject = new BehaviorSubject<TokenResult>(this._token);

  /**
   * Token that can be subscribed (observer) to directly when changes are made
   */
  public token$ = this.tokenSubject.asObservable();

  constructor(
    private _storage: StorageService,
    private _store: Store<AuthState>
  ) { }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._store.dispatch(new AuthInit());

      this._storage.get(USER_TOKEN).then(
        token => {
          environment.log.auth &&
            console.log((!!token ? "logged" : "not logged") + " at boot");

          if (!!token) {
            try {
              let payload = this.readPayload(token);
              this._store.dispatch(new TokenRestore(payload));
            } catch (error) {
              token = null;
            }
          }

          this.token = token;

          this.token$
            .pipe(
              switchMap(this.dumpToken),
              switchMap(this.updateLoggedOnce))
            .subscribe(() => { });

          resolve(token);
        },
        error => {
          resolve(null);
        }
      );
    });
  }

  dumpToken = token => {
    environment.log.auth &&
      console.log("\n\n\n================\ndump auth token", token);
    return !!token
      ? this._storage.set(USER_TOKEN, token)
      : this._storage.remove(USER_TOKEN).then(() => null)
  };

  updateLoggedOnce = token => {
    return this._storage.get(USER_LOGGED_ONCE).then(loggedOnce => {
      if (token || loggedOnce) {
        this._store.dispatch(new LoggedOnce(true));
        return loggedOnce
          ? token
          : this._storage.set(USER_LOGGED_ONCE, Date.now()).then(_ => token);
      } else {
        return Promise.resolve(token);
      }
    });
  };

  set token(value: TokenResult) {
    this.tokenSubject.next(value);
  }

  get token(): TokenResult {
    return this.tokenSubject.value;
  }

  readPayload(token) {
    //Below is for JWT tokens...for now we'll use http tokens
    return token;
    // let payload = this.getTokenPayload(token);
    // return payload && payload.user ? Object.assign({ roles: [], id: null },
    //   { id: payload.user.id, roles: JSON.parse(payload.user.roles) }) : null
  }

  getTokenPayload(token) {
    return token
      ? JSON.parse(this.b64DecodeUnicode(token.split(".")[1]))
      : null;
  }

  b64DecodeUnicode(str) {

    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }
}

export function AuthTokenFactory(service: AuthTokenService): Function {
  return () => service.load();
}
