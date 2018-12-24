import { Injectable } from '@angular/core';

import { IRole } from '../../roles';

@Injectable()
export class RoleFactory {
  ////////// Private variables//////////
  // private _role: IRole;

  //////////Publicly exposed properties//////////

  //////////Constructor//////////
  /**
   * These should be singleton objects
   */
  constructor() {}

  public validate(role: IRole, callback?: (errors: string[]) => void): boolean {
    const errors: string[] = [];

    if (!role) {
      throw new Error('Role Object Missing...');
    }

    // Check for required properties
    if (!role.name) {
      errors.push('Please enter a role name');
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
