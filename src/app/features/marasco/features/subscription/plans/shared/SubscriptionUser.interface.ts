import { SubscriptionItem } from './SubscriptionItem.interface';

export interface SubscriptionUser {
  _id?: string;
  planId?: any;
  subscriptionPlanId?: any;
  frequencyId?: string;
  statusId?: string;
  dateStart?: Date;
  dateEnd?: Date;
  dateCreated?: Date;
  dateModified?: Date;
}
