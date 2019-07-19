import { Injectable } from '@angular/core';

import { Job } from './Job.interface';
import { UpperCasePipe } from '@angular/common';

@Injectable()
export class JobFactory {
  ////////// Private variables//////////
  // private _Wishlist: Wishlist;

  //////////Publicly exposed properties//////////

  //////////Constructor//////////
  /**
   * These should be singleton objects
   */
  constructor(private _upperCasePipe: UpperCasePipe) {}

  public validate(job: Job, callback?: (errors: string[]) => void): boolean {
    const errors: string[] = [];

    if (!job) {
      throw new Error('Wishlist Object Missing...');
    }

    //Check for required properties
    if (!job.userId) {
      errors.push('Please enter a userId');
    }

    if (!job.name) {
      errors.push('Please enter a wishlist name');
    }

    // Only check on updated obects
    if (job._id) {
      if (!job.dateCreated) {
        errors.push('Date Created not set');
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
