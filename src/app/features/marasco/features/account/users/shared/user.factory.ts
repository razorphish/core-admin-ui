import { Injectable } from '@angular/core';

import { IUser } from '../../users';

@Injectable()
export class UserFactory {
  ////////// Private variables//////////
  // private _user: IUser;

  //////////Publicly exposed properties//////////

  //////////Constructor//////////
  /**
     * These should be singleton objects
     */
  constructor() {}

  public validate(user: IUser, callback?: (errors: string[]) => void): boolean {
    const errors: string[] = [];

    if (!user) {
      throw new Error('User Object Missing...');
    }

    // Check for required properties
    if (!user.email) {
      errors.push('Please enter an email');
    }

    if (!user.username) {
      errors.push('Please enter a username');
    }

    // Only check on updated obects
    if (user._id) {
      if (!user.dateCreated) {
        errors.push('Date Created not set');
      }
    }

    // Let's check for address errors
    if (user.addresses && user.addresses.length > 0) {
      if (user.addresses.length > 2) {
        errors.push('Cannot have more than 2 addresses');
      }

      user.addresses.forEach((item, v, i) => {
        if (item.address && item.address.length !== 0) {
          if (!item.city) {
            errors.push(`City is missing for address # ${v}`);
          }

          if (!item.state) {
            errors.push(`State is missing for address # ${v}`);
          }

          if (!item.zip) {
            errors.push(`Zip is missing for address # ${v}`);
          }
        }
      });
    }

    // Check for password
    // When user defines a password then validate it.
    // For security password/salt not returned from api
    if (user.password) {
      if (user.password.length < 3 || user.password.length > 20) {
        errors.push(
          `Password must be at least 3 characters in length and no longer than 20`
        );
      }

      if (user.password !== user.confirmPassword) {
        errors.push(`Confirm password should be entered the same as password`);
      }
    }

    // Set errors
    if (errors.length > 0) {
      if (callback) {
        callback(errors);
      }
      return false;
    } else {
      return true;
    }
  }
}
