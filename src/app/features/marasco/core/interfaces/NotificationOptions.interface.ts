
export interface MarascoNotificationAction {
    _id: string;
    action: string;
    icon?: string;
    title: string;
}

export interface MarascoNotification{
    _id?: string;
    name?: string;
    title?: string;
    actions?: MarascoNotificationAction[];
    badge?: string;
    body?: string;
    data?: any;
    dir?: NotificationDirection;
    icon?: string;
    image?: string;
    lang?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    tag?: string;
    timestamp?: number;
    vibrate?: string[];
}