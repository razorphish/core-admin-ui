import { Injectable } from '@angular/core';
import { IToken } from '../../tokens';

@Injectable()
export class TokenFactory {
  ////////// Private variables//////////
  // private _user: IToken;

  //////////Publicly exposed properties//////////

  //////////Constructor//////////
  /**
     * These should be singleton objects
     */
  constructor() {}

  public validate(token: IToken, callback?: (errors: string[]) => void): boolean {
    const errors: string[] = [];

    if (!token) {
      throw new Error('User Object Missing...');
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
