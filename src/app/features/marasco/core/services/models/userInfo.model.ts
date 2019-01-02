// export interface UserInfo {
//     displayName: string | null;
//     email: string | null;
//     phoneNumber: string | null;
//     photoURL: string | null;
//     providerId: string;
//     uid: string;
// }

export class UserInfo {
    constructor(
        public displayName: string | null,
        public email: string | null,
        public phoneNumber: string | null,
        public photoURL: string | null,
        public providerId: string,
        public uid: string
    ) { }
}