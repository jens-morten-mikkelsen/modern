import {IProductSnapshot} from '../models';

export interface IBasketResponse {
    AnalyticsTrackerScript: string,
    Model: IBasketModel
}

export interface IBasketModel extends IBasket, IOrder {
    AllBaskets: [IAllBasketsItem];
    HasQuantityExceedsMaxPreviouslyPurchasedWarning: boolean;
    PreSale: IPreSale;
    Deliverability: IBasketDeliverability;
}

interface IBasket {
    Id: number;
    Position: number;
}

interface IOrder {
    Delivery: IDelivery;
    References: IOrderReferences;
    Message: IOrderMessage;
    LineItems: [ILineItem];
    InvalidLineItems: [IInvalidLineItem];
    SubTotal?: string;
    SubTotalForDropSize?: number;
    CurrencyCode: string;
}

interface IAllBasketsItem extends IBasket {
    ExpectedDeliveryDate: string;
    NumberOfLines: number;
}

interface IBasket {
    Id: number;
    Position: number;
}

interface IPreSale {
    DisplayName: string;
    Id: string;
    ColorClass: string;
}

interface IBasketDeliverability {
    OrderDeadline: string;
}

interface IDelivery {
    ExpectedDate: string;
    PreSaleIndicator?: string;
}

interface IOrderReferences {
    OrderReference: string
}

interface IOrderMessage {
    Text: string
}

interface ILineItem {
    Id: number;
    Product: IProductSnapshot;
    SalesUnitIndex: number;
    Quantity: number;
    QuickSaleIndex: number | undefined;
    Packing?: number | undefined;
    QuantityExceedsMaxPreviouslyPurchasedWarning?: string | undefined;
}

interface IInvalidLineItem {
    Id: number;
    ProductId: number;
    DisplayName: string;
    Quantity: number;
    IsQuickSale: boolean;
    QuickSaleId?: number | undefined;
}