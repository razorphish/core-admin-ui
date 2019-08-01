export interface SubscriptionItem {
  _id?: string;
  applicationId?: any;
  subscriptionPlanId?: any;
  amount?: number;
  description?: string;
  name?: string;
  saleAmount?: string;
  typeId?: string;
  /**
   * @description Gives number of items allowed, if applicable
   * @type {number}
   * @memberof SubscriptionItem
   */
  limit?: number;
  dateCreated?: Date;
  dateModified?: Date;
}
