import { Injectable } from '@angular/core';

import { SubscriptionPlan } from './SubscriptionPlan.interface';
import { UpperCasePipe } from '@angular/common';

@Injectable()
export class SubscriptionPlanFactory {
  ////////// Private variables//////////

  //////////Publicly exposed properties//////////

  /**
   *Creates an instance of SubscriptionPlanFactory.
   * @author Antonio Marasco
   * @date 2019-07-29
   * @param {UpperCasePipe} _upperCasePipe
   * @memberof SubscriptionPlanFactory
   */
  constructor(private _upperCasePipe: UpperCasePipe) {}

  /**
   * @description Validates a subscription Form object
   * @author Antonio Marasco
   * @date 2019-07-29
   * @param {SubscriptionPlan} subscriptionPlan
   * @param {(errors: string[]) => void} [callback]
   * @returns {boolean}
   * @memberof SubscriptionPlanFactory
   */
  public validate(
    subscriptionPlan: SubscriptionPlan,
    callback?: (errors: string[]) => void
  ): boolean {
    const errors: string[] = [];

    if (!subscriptionPlan) {
      throw new Error('Object Missing...');
    }

    //Check for required properties
    if (!subscriptionPlan.applicationId) {
      errors.push('Please select an application');
    }

    if (!subscriptionPlan.name) {
      errors.push('Please enter a name');
    }

    if (!subscriptionPlan.description) {
      errors.push('Please enter a description');
    }

    if (!subscriptionPlan.statusId) {
      errors.push('Please select a status');
    }

    if (!subscriptionPlan.dateExpire) {
      errors.push('Please enter a expiration date');
    }

    // Only check on updated obects
    if (subscriptionPlan._id) {
      if (!subscriptionPlan.dateCreated) {
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
