import { Injectable } from '@angular/core';

import { UpperCasePipe } from '@angular/common';

@Injectable()
export class WishlistUserFactory {
  ////////// Private variables//////////
  // private _Wishlist: Wishlist;

  //////////Publicly exposed properties//////////

  //////////Constructor//////////
  /**
   * These should be singleton objects
   */
  constructor(private _upperCasePipe: UpperCasePipe) {}

  //   public validate(Wishlist: Wishlist, callback?: (errors: string[]) => void): boolean {
  //     const errors: string[] = [];

  //     if (!Wishlist) {
  //       throw new Error('Wishlist Object Missing...');
  //     }

  //     //Check for required properties
  //     if (!Wishlist.userId) {
  //       errors.push('Please enter a userId');
  //     }

  //     if (!Wishlist.name) {
  //       errors.push('Please enter a wishlist name');
  //     }

  //     // Only check on updated obects
  //     if (Wishlist._id) {
  //       if (!Wishlist.dateCreated) {
  //         errors.push('Date Created not set');
  //       }
  //     }

  //     // Set errors
  //     if (errors.length > 0) {
  //       if (callback) {
  //         callback(errors);
  //       }
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }

  public validate(
    Wishlist: any,
    callback?: (errors: string[]) => void
  ): boolean {
    return true;
  }
}
