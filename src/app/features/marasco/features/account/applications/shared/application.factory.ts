import { Injectable } from '@angular/core';
import { IApplication } from './application.interface';

@Injectable()
export class ApplicationFactory {
  ////////// Private variables//////////
  // private _application: Application;

  ////////// Publicly exposed properties//////////

  ////////// Constructor//////////
  /**
   * These should be singleton objects
   */
  // constructor() {}

  public validate(
    application: IApplication,
    callback?: (errors: string[]) => void
  ): boolean {
    const errors: string[] = [];

    if (!application) {
      throw new Error('Application Object Missing...');
    }

    // Check for required properties
    if (!application.name) {
      errors.push('Please enter application name');
    }

    if (!application.url) {
      errors.push('Please enter url');
    }

    if (!application.statusId) {
      errors.push('Please enter status');
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
