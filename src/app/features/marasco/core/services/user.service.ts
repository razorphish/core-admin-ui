import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { JsonApiService } from "@app/features/marasco/core/services/json-api.service";

import { TokenResult } from './models/tokenResult.model';
import { UserInfo } from './models/userInfo.model';
import { UserCredential } from './models/userCredential.model';
import { AuthCredential } from './models/authCredential.model';

const defaultUser = {
  username: "Guest"
}

@Injectable()
export class UserService implements UserInfo {
  public user$ = new BehaviorSubject({ ...defaultUser });

  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string;
  providerData: (UserInfo | null)[];
  providerId: string;
  refreshToken: string;
  uid: string;

  constructor(private jsonApiService: JsonApiService) {
    this.jsonApiService.fetch("/user/login-info.json").subscribe(this.user$)
  }

  delete(): Observable<void> {
    return new Observable<void>(null);
  };

  getIdToken(forceRefresh?: boolean): Observable<string> {
    return new Observable<string>(null);
  };

  getIdTokenResult(
    forceRefresh?: boolean
  ): Observable<TokenResult> {
    return new Observable<TokenResult>(null);
  };

  linkAndRetrieveDataWithCredential(
    credential: AuthCredential
  ): Observable<UserCredential> {
    return new Observable<UserCredential>(null);
  };

  linkWithCredential(
    credential: AuthCredential
  ): Observable<this> {
    return new Observable<this>(null);
  };

  // linkWithPhoneNumber(
  //     phoneNumber: string,
  //     applicationVerifier: ApplicationVerifier
  // ): Promise<ConfirmationResult>;

  // linkWithPopup(
  //     provider: AuthProvider
  // ): Promise<UserCredential>;

  //linkWithRedirect(provider: AuthProvider): Promise<void>;


  // reauthenticateAndRetrieveDataWithCredential(
  //     credential: AuthCredential
  // ): Promise<UserCredential>;

  // reauthenticateWithCredential(
  //     credential: AuthCredential
  // ): Promise<void>;

  // reauthenticateWithPhoneNumber(
  //     phoneNumber: string,
  //     applicationVerifier: ApplicationVerifier
  // ): Promise<ConfirmationResult>;

  // reauthenticateWithPopup(
  //     provider: AuthProvider
  // ): Promise<UserCredential>;

  // reauthenticateWithRedirect(
  //     provider: AuthProvider
  // ): Promise<void>;

  //reload(): Promise<void>;

  // sendEmailVerification(
  //     actionCodeSettings?: ActionCodeSettings | null
  // ): Promise<void>;

  //toJSON(): Object;

  //unlink(providerId: string): Promise<User>;

  //updateEmail(newEmail: string): Promise<void>;

  //updatePassword(newPassword: string): Promise<void>;

  // updatePhoneNumber(
  //     phoneCredential: AuthCredential
  // ): Promise<void>;

  // updateProfile(profile: {
  //     displayName: string | null;
  //     photoURL: string | null;
  // }): Promise<void>;

  public logout() {
    this.user$.next({ ...defaultUser })
  }

}
