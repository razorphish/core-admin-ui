import { UserInfo } from './userInfo.model';
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
    public access_token: string;
    public refresh_token: string;
    public expirationTime: string;
    public expires_in : string;
    //public authTime: string; same as expires_in
    public issuedAtTime: string;
    public signInProvider: string;
    public claims?: { [key: string]: any };
    public user?: UserInfo;
    public token_type?: string
}