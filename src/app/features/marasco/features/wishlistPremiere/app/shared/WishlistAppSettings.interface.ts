import { MarascoNotificationOptions } from '@app/features/marasco/core/interfaces/NotificationOptions.interface';

export interface WishlistAppSettings {
    _id?: string;
    notifications?: [MarascoNotificationOptions];
}