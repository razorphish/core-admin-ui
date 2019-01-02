
// export class AdditionalUserInfo = {
//     isNewUser: boolean;
//     profile: Object | null;
//     providerId: string;
//     username: string | null;
// };

export class AdditionalUserInfo {
    constructor(
        public isNewUser: boolean,
        public profile: Object | null,
        public providerId: string,
        public username: string | null) { }
}