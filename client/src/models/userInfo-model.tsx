export class UserInfoModel {
    public constructor(
        public userId?: number,
        public firstName?: string,
        public lastName?: string,
        public userName?: string,
        public password?: number,
        public isAdmin?: number,) {

    }
}