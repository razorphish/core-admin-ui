import { WishlistItem } from './Wishlist-item.interface';
import { WishlistPreference } from './Wishlist-Preference.interface'
import { WishlistFollow } from './Wishlist-Follow.interface';

export interface Wishlist {
    _id?: string;
    name: string;
    userId?: any;
    preferences?: WishlistPreference;
    statusId?: string;
    privacy?: string;
    dateCreated?: Date;
    dateModified?: Date;
    shares?: any;
    notifications?: any;
    items?: WishlistItem[];
    follows?: WishlistFollow[];
}
