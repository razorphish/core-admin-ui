import { SubscriptionItem } from './SubscriptionItem.interface';

export interface SubscriptionPlan {
  _id?: string;
  applicationId?: string;
  description?: string;
  name?: string;

  /**
   * @description Status
   * @type {string}
   * @memberof Job
   * @example active|inactive|disabled|pending|archived|suspended|deleted
   */
  statusId?: string;

  items? : SubscriptionItem[];

  dateExpire?: any;
  dateModified?: Date;
  dateCreated?: Date;
}
