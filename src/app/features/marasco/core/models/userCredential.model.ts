import { AdditionalUserInfo } from './additionalUserInfo.model';
import { AuthCredential } from './authCredential.model';
import { UserInfo } from './userInfo.model';

// export type UserCredential = {
//     additionalUserInfo?: AdditionalUserInfo | null;
//     credential: IAuthCredential | null;
//     operationType?: string | null;
//     user: UserService | null;
// };

export class UserCredential {
    public credential: AuthCredential;
    public user: UserInfo;
    public additionalUserInfo?: AdditionalUserInfo;
    public operationType?: string;
}