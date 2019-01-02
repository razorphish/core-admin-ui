import { AdditionalUserInfo } from './additionalUserInfo.model';
import { AuthCredential } from './authCredential.model';
import { UserService } from '../user.service';

// export type UserCredential = {
//     additionalUserInfo?: AdditionalUserInfo | null;
//     credential: IAuthCredential | null;
//     operationType?: string | null;
//     user: UserService | null;
// };

export class UserCredential {
    constructor(
        public credential: AuthCredential | null,
        public user: UserService | null,
        public additionalUserInfo?: AdditionalUserInfo | null,
        public operationType?: string | null
    ) { }
}