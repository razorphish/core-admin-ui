// export interface ITokenResult {
//     token: string;
//     expirationTime: string;
//     authTime: string;
//     issuedAtTime: string;
//     signInProvider: string | null;
//     claims: {
//         [key: string]: any;
//     };
// }

export class TokenResult {
    constructor(
        public token: string,
        public expirationTime: string,
        public authTime: string,
        public issuedAtTime: string,
        public signInProvider: string | null,
        public claims: { [key: string]: any }
    ) { }
}