import {  Image } from '../../../../core/interfaces/Image.interface';

export interface WishlistItem {
    _id?: string;
    name: string;
    categoryId?: any;
    price?: number;
    url?: string;
    notes?: string;
    purchased?: boolean;
    images?: Image[];
    statusId?: string; //created|deleted
    sort? : number;
    dateCreated?: Date;
    dateModifed?: Date
}
