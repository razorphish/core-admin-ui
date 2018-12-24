import { IAddress, ICalendar, IBusinessHours } from '../shared';

import { IRole } from '../../roles';

export interface IUser {
  _id: string;
  avatar?: string;
  dateCreated: Date;
  email: string;
  firstName: string;
  homePhone?: string;
  lastName: string;
  lockUntil?: number;
  loginAttempts?: number;
  username: string;
  password: string;
  refreshToken?: string;
  confirmPassword: string;
  salt?: string;
  addresses?: IAddress[];
  businessHours?: IBusinessHours[];
  calendars?: ICalendar[];
  roles?: IRole[];
  facebook?: string;
  twitter?: string;
  instagram?: string;
}
