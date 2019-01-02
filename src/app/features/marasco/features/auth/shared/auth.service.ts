
// import { Injectable } from '@angular/core';
// import { Observable, BehaviorSubject } from 'rxjs';



// @Injectable()
// export class Auth {

//     private _loginSubject = new BehaviorSubject<boolean>(false);

//     private _token: TokenResult = {
//         token: '',
//         expirationTime: '',
//         authTime: '',
//         issuedAtTime: '',
//         signInProvider: '',
//         claims: []
//     }

//     private tokenSubject = new BehaviorSubject<TokenResult>(this._token);



//     /**
//      * Token that can be subscribed to directly when changes are made
//      */
//     public token$ = this.tokenSubject.asObservable();

//     constructor(
//         public currentUser: UserService | null
//     ) {

//     }

//     //confirmPasswordReset(code: string, newPassword: string): Promise<void>;

//     //createUserAndRetrieveDataWithEmailAndPassword(
//     //  email: string,
//     //  password: string
//     //): Promise<UserCredential>;

//     // createUserWithEmailAndPassword(
//     //     email: string,
//     //     password: string
//     // ): Observable<UserCredential> {
//     //     var observable = new Observable<UserCredential>(() => {

//     //     });

//     //     //Inform everybody
//     //     //this.tokenSource.next({ token: '' });
//     //     this.onIdTokenChanged(new UserService());
//     //     return observable;
//     // };

//     //fetchProvidersForEmail(email: string): Promise<Array<string>>;

//     //fetchSignInMethodsForEmail(email: string): Promise<Array<string>>;

//     //isSignInWithEmailLink(emailLink: string): boolean;

//     //getRedirectResult(): Promise<UserCredential>;

//     languageCode: string | null;


//     // private userSource = new BehaviorSubject<IUser>({
//     //     _id: '',
//     //     dateCreated: null,
//     //     email: '',
//     //     firstName: '',
//     //     lastName: '',
//     //     username: '',
//     //     password: '',
//     //     confirmPassword: ''
//     // });

//     // public user$ = this.userSource.asObservable();

//     // onIdTokenChanged(
//     //     nextOrObserver:
//     //       | firebase.Observer<any>
//     //       | ((a: firebase.User | null) => any),
//     //     error?: (a: firebase.auth.Error) => any,
//     //     completed?: firebase.Unsubscribe
//     //   ): firebase.Unsubscribe;

//     isLoggedIn(): Observable<boolean> {
//         return this._loginSubject.asObservable();
//     }

//     /**
//      * Triggered on sign in and sign out
//      * @param next 
//      * @param error 
//      * @param completed 
//      */
//     // onAuthStateChanged(
//     //     next: ((a: User | null) => any),
//     //     error?: (a: Error) => any,
//     //     completed?: Unsubscribe
//     // ): () => void {

//     //     let self = this;


//     //     let fakeUser: User = new User();
//     //     let fakeError: Error = {
//     //         code: '',
//     //         message: ''
//     //     }

//     //     next(fakeUser);
//     //     error(fakeError);
//     //     completed();

//     //     return function unsubscribe() {
//     //         clearInterval();
//     //     };
//     // };

//     // onIdTokenChanged(
//     //     next: ((a: User | null) => any),
//     //     error?: (a: Error) => any,
//     //     completed?: Unsubscribe
//     // ): Unsubscribe {

//     //     let fakeUser: User = new User();
//     //     let fakeError: Error = {
//     //         code: '',
//     //         message: ''
//     //     }

//     //     next(fakeUser);
//     //     error(fakeError);
//     //     completed();

//     //     return function unsubscribe() {
//     //         clearInterval();
//     //     };
//     // };

//     // /**
//     //  * Observer for changes to the signed in user's Id token including sign in , sign out, and token refresh
//     //  * @param user {UserService} user User data that informs observers/subscribers
//     //  * @example .onIdTokenChanged(null).subscribe((token) => { this._store.dispatch(new actions.Idtoken(user)) })
//     //  */
//     // onIdTokenChanged(user: UserService) {
//     //     var tokenObservable = new Observable(observer => {
//     //         observer.next(user);
//     //         observer.complete();
//     //     });

//     //     return tokenObservable;
//     // }

//     // sendSignInLinkToEmail(
//     //     email: string,
//     //     actionCodeSettings: ActionCodeSettings
//     // ): Promise<void>;

//     // sendPasswordResetEmail(
//     //     email: string,
//     //     actionCodeSettings?: ActionCodeSettings | null
//     // ): Promise<void>;

//     //setPersistence(persistence: firebase.auth.Auth.Persistence): Promise<void>;

//     // signInAndRetrieveDataWithCredential(
//     //     credential: AuthCredential
//     // ): Promise<UserCredential>;

//     //signInAnonymously(): Promise<UserCredential>;

//     //signInAnonymouslyAndRetrieveData(): Promise<UserCredential>;

//     // signInWithCredential(
//     //     credential: AuthCredential
//     // ): Promise<User>;

//     // signInWithCustomToken(token: string): Promise<UserCredential>;

//     // signInAndRetrieveDataWithCustomToken(
//     //     token: string
//     // ): Promise<UserCredential>;

//     // signInWithEmailAndPassword(
//     //     email: string,
//     //     password: string
//     // ): Observable<UserCredential> {
//     //     return new Observable<UserCredential>(null);
//     // };

//     // signInAndRetrieveDataWithEmailAndPassword(
//     //     email: string,
//     //     password: string
//     // ): Promise<UserCredential>;

//     // signInWithPhoneNumber(
//     //     phoneNumber: string,
//     //     applicationVerifier: ApplicationVerifier
//     // ): Promise<ConfirmationResult>;

//     // signInWithEmailLink(
//     //     email: string,
//     //     emailLink?: string
//     // ): Promise<UserCredential>;

//     // signInWithPopup(
//     //     provider: AuthProvider
//     // ): Promise<UserCredential>;


//     // signOut(): Observable<void> {
//     //     let observable = new Observable<void>(null);

//     //     return observable;
//     // };

//     // updateCurrentUser(user: User | null): Promise<void>;

//     // useDeviceLanguage(): void;

//     // verifyPasswordResetCode(code: string): Promise<string>;
// }