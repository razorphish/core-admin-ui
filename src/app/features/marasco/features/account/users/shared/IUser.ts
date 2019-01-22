import { IAddress } from '../shared';

import { IRole } from '../../roles';

export interface IUser {
  _id: string;
  avatar?: string;
  email: string;
  firstName: string;
  homePhone?: string;
  lastName: string;
  lockUntil?: number;
  loginAttempts?: number;
  username: string;
  password: string;
  refreshToken?: string;
  salt?: string;
  token?: any;
  confirmPassword?: string;
  addresses?: IAddress[];
  roles?: IRole[];
  facebook?: string;
  twitter?: string;
  instagram?: string;
  dateCreated?: Date;
}
