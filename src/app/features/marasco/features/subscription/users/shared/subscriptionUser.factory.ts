import { Injectable } from '@angular/core';

import { SubscriptionUser } from './SubscriptionUser.interface';
import { UpperCasePipe } from '@angular/common';

import * as moment from 'moment';

@Injectable()
export class SubscriptionUserFactory {
  ////////// Private variables//////////

  //////////Publicly exposed properties//////////

  /**
   *Creates an instance of SubscriptionItemFactory.
   * @author Antonio Marasco
   * @date 2019-07-29
   * @param {UpperCasePipe} _upperCasePipe
   * @memberof SubscriptionItemFactory
   */
  constructor(private _upperCasePipe: UpperCasePipe) {}

  /**
   * @description Validates a subscription Form object
   * @author Antonio Marasco
   * @date 2019-07-29
   * @param {SubscriptionUser} subscriptionUser
   * @param {(errors: string[]) => void} [callback]
   * @returns {boolean}
   * @memberof SubscriptionItemFactory
   */
  public validate(
    subscriptionUser: SubscriptionUser,
    callback?: (errors: string[]) => void
  ): boolean {
    const errors: string[] = [];

    if (!subscriptionUser) {
      throw new Error('Object Missing...');
    }

    //Check for required properties
    if (!subscriptionUser.userId) {
      errors.push('Please select/enter an user');
    }

    if (!subscriptionUser.subscriptionPlanId) {
      errors.push('Please select a subscription');
    }

    if (!subscriptionUser.frequencyId) {
      errors.push('Please select a frequency');
    }

    if (!subscriptionUser.statusId) {
      errors.push('Please select a status');
    }

    if (!subscriptionUser.dateStart) {
      errors.push('Please select a start date');
    }

    if (!subscriptionUser.dateEnd) {
      errors.push('Please enter an end date.');
    }

    //Compare times
    let startTime = moment(subscriptionUser.dateStart);
    let endTime = moment(subscriptionUser.dateEnd);

    if (endTime.isBefore(startTime)){
      errors.push('End date cannot be before start date');
    }

    // Only check on updated obects
    if (subscriptionUser._id) {
      if (!subscriptionUser.dateCreated) {
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
