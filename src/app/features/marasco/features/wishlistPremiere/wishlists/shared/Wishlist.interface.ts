import { WishlistPreference } from './Wishlist-Preference.interface'

export interface Wishlist {
    _id?: string;
    name: string;
    userId?: any;
    preferences?: WishlistPreference;
    statusId?: string;
    privacy?: string;
    dateCreated?: Date;
    dateModified?: Date;
}
