import {
    MarascoNotification,
    MarascoEmailNotification
}
    from '@app/features/marasco/core/interfaces/NotificationOptions.interface';

export interface WishlistAppSettings {
    _id?: string;
    notifications?: [MarascoNotification];
    emailNotifications?: [MarascoEmailNotification];
}