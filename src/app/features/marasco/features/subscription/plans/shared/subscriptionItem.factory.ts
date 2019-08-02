import { Injectable } from '@angular/core';

import { SubscriptionItem } from './SubscriptionItem.interface';
import { UpperCasePipe } from '@angular/common';

@Injectable()
export class SubscriptionItemFactory {
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
   * @param {SubscriptionItem} subscriptionItem
   * @param {(errors: string[]) => void} [callback]
   * @returns {boolean}
   * @memberof SubscriptionItemFactory
   */
  public validate(
    subscriptionItem: SubscriptionItem,
    callback?: (errors: string[]) => void
  ): boolean {
    const errors: string[] = [];

    if (!subscriptionItem) {
      throw new Error('Object Missing...');
    }

    //Check for required properties
    if (!subscriptionItem.applicationId) {
      errors.push('Please select an application');
    }

    if (!subscriptionItem.subscriptionPlanId) {
      errors.push('Please select a subscription');
    }

    if (!subscriptionItem.name) {
      errors.push('Please enter a name');
    }

    if (!subscriptionItem.description) {
      errors.push('Please enter a description');
    }

    if (!subscriptionItem.amount) {
      errors.push('Please select an amount');
    }

    if (!subscriptionItem.saleAmount) {
      errors.push('Please enter a sale amount.');
    }

    if (!subscriptionItem.typeId) {
      errors.push('Please select a type.');
    }

    if (!subscriptionItem.limit) {
      errors.push('Please enter a limit.');
    }
    // Only check on updated obects
    if (subscriptionItem._id) {
      if (!subscriptionItem.dateCreated) {
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
