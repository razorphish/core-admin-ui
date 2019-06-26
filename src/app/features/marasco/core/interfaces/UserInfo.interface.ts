import { DeviceModel } from './../models/device.model';

import { Observable } from 'rxjs';

// export interface UserInfo {
//     displayName: string | null;
//     email: string | null;
//     phoneNumber: string | null;
//     photoURL: string | null;
//     providerId: string;
//     uid: string;
// }
import { Role } from '../models/role.model';
import { Address } from '../models/address.model';
import { TokenModel } from '../models/token.model';

export interface User {
    _id: string;
    applicationId?: string;
    avatar?: string;
    devices?: DeviceModel;
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
    password? : string;
    confirmPassword? : string;
    //displayName? : string = `@${this.username}`;
    //updatedExisting? : boolean;
    status?: string;
    tokens?: any;
}