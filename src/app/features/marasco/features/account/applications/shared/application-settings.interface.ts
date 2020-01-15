import {
  MarascoEmailNotification,
  MarascoNotification
} from '@app/features/marasco/core/interfaces/NotificationOptions.interface';

export interface IApplicationSettings {
  applicationId: string;
  _id?: string;
  notifications?: [MarascoNotification?];
  emailNotifications?: [MarascoEmailNotification?];
}
