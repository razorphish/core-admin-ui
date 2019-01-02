// export interface IAuthCredential {
//     providerId: string;
//     signInMethod: string;
// }

export class AuthCredential {
    constructor(
        public providerId: string,
        public signInMethod: string) {

    }
}