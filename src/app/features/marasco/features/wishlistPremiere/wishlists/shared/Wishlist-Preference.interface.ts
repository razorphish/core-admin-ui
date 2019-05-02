export interface WishlistPreference {
    _id?: string;
    includePriceWhenSharing: boolean;
    hideFromMe: boolean;
    markPurchasedItem: boolean;
    currencyUnitSymbol: string;
    notifyOnClose: boolean;
    notifyOnAddItem: boolean;
    notifyOnRemoveItem: boolean;
    notifyOnCompletion: boolean;
}
