import { WishlistFollow } from './../../wishlists/shared/Wishlist-Follow.interface';
import { WishlistItemCategory } from './../../wishlists/shared/Wishlist-item-category.interface';
import { User } from '@app/features/marasco/core/interfaces/UserInfo.interface';
import { Wishlist } from '../../wishlists/shared';

export class WishlistUser implements User {
  _id: string;  applicationId?: string;
  avatar?: string;
  email: string;
  firstName: string;
  homePhone?: string;
  lastName: string;
  username: string;
  refreshToken?: any;
  addresses?: import("../../../../core/models/address.model").Address[];
  roles?: import("../../../../core/models/role.model").Role[];
  facebook?: string;
  twitter?: string;
  instagram?: string;
  dateCreated?: Date;
  token?: import("../../../../core/models/token.model").TokenModel;
  password?: string;
  confirmPassword?: string;
  status?: string;
  tokens?: any;
  wishlists? : Wishlist[];
  wishlistItemCategories? : WishlistItemCategory[];
  wishlistFollows?: WishlistFollow[];

}