import { IApplicationSettings } from './application-settings.interface';

export interface IApplication {
  _id?: string;
  name?: string;
  shortName?: string;
  statusId?: string;
  url?: string;
  settings?: IApplicationSettings;
  dateCreated?: Date;
  dateModified?: Date;
}
