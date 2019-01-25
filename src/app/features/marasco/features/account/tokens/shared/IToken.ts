import { IRole } from '../../roles';

export interface IToken {
  _id: string;
  userId: any;
  loginProvider: string;
  name: string;
  value: string;
  scope: string;
  type: string;
  protocol: string;
  expiresIn: number;
  origin?: string;
  forceRefresh?: boolean;
  dateExpire?: Date;
  dateCreated?: Date;
  dateModified?: Date;
}
