import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { JsonApiService } from "@app/features/marasco/core/services/json-api.service";

import { TokenResult } from '../models/tokenResult.model';
import { UserInfo } from '../models/userInfo.model';
import { User } from '../interfaces/UserInfo.interface';
import { UserCredential } from '../models/userCredential.model';
import { AuthCredential } from '../models/authCredential.model';

const defaultUser : User = new UserInfo(); 
  defaultUser._id = '';
  defaultUser.username = 'Guest';
  defaultUser.firstName= 'Guest';
  defaultUser.lastName= '';
  defaultUser.email= '@';


@Injectable()
export class UserService {

  public user$ = new BehaviorSubject<User>({ ...defaultUser });

  constructor(private jsonApiService: JsonApiService) {
    this.jsonApiService.fetch("/user/login-info.json").subscribe(this.user$)
  }

  delete(): Observable<void> {
    return new Observable<void>(null);
  };

  getIdToken(forceRefresh?: boolean): Observable<string> {
    return new Observable<string>();
  };

  getIdTokenResult(
    forceRefresh?: boolean
  ): Observable<TokenResult> {
    return new Observable<TokenResult>();
  };

  // linkAndRetrieveDataWithCredential(
  //   credential: AuthCredential
  // ): Observable<UserCredential> {
  //   return new Observable<UserCredential>(null);
  // };

  // linkWithCredential(
  //   credential: AuthCredential
  // ): Observable<this> {
  //   return new Observable<this>(null);
  // };

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
