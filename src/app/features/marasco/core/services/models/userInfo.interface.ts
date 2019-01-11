
import { Observable } from 'rxjs';

// export interface UserInfo {
//     displayName: string | null;
//     email: string | null;
//     phoneNumber: string | null;
//     photoURL: string | null;
//     providerId: string;
//     uid: string;
// }
import { Role } from './role.model';
import { Address } from './address.model';
import { TokenModel } from './token.model';

export interface User {
    _id: string;
    avatar?: string;
    email: string;
    firstName: string;
    homePhone?: string;
    lastName: string;
    username: string;
    refreshToken?: any;
    addresses?: Address[];
    roles?: Role[];
    facebook?: string;
    twitter?: string;
    instagram?: string;
    dateCreated?: Date;
    token? : TokenModel | null;
    //displayName? : string = `@${this.username}`;

    getIdToken();
}