export interface IProductSnapshotBase {
    Id: number;
    ProductId?: number;
    SalesUnits: IProductSalesUnits;
    Deliverability: IDeliverability;
}

export interface IProductSnapshot extends IProductSnapshotBase {
    Brand: IDisplayable<string>;
    DisplayName: string;
    Image: IProductImage;
    Url: string;
    QuickSales: IQuickSales;
    Deadline: IDeadline | undefined;
    Categories: any[];
    SalesPriceSource: ISalesPriceSource;
    Related: IRelatedProducts;
    IsOnFavoriteList: boolean;
    dataLoaded: boolean;
    isChecked: boolean;
    isHighlight: boolean;
    Campaigns: IProductCampaigns;
    PreSale: IProductPreSale | null;
    IsStockManaged: boolean;
    Stock: IProductStock;
    RelatedOnProduct: string;
    Availability: IAvailability;
    IsSampleItem: boolean;
    IsSeasonal: boolean;
    LatestPurchaseDate?: Date;
    LatestPurchaseQuantity?: number;
    PrimaryCategoryColor?: string;
    Markings: IDisplayable<string>[];
    Co2Equivalent?: number | null;
    IgnoreCo2Equivalent: boolean;
}
interface IProductImage {
    Small: string;
    Large: string;
}
interface IQuickSales {
    Values: Array<IQuickSale>
}
interface IQuickSale extends IProductSnapshotBase {
    Text?: string;
    BestBefore?: Date;
    HideBestBefore?: boolean;
    InStockQuantity?: number;
}
interface IDeadline {
    FormattedText: string;
}
interface ISalesPriceSource {
    TrackingId: string;
    CssClass: string;
    Text: string;
}
interface IRelatedProducts {
    Replacements: number[];
    DirectReplacement: number | null;
}
interface IProductCampaigns {
    Logo: IProductLogoCampaign;
}
interface IProductLogoCampaign {
    Name: string;
    NormalUrl: string;
    SmallUrl: string;
}
interface IProductPreSale {
    ColorCode: number;
    DeliveryPeriod: string;
    DisplayName: string;
    NotOpenForSaleMessage: string;
    OrderPeriod: string;
}
interface IProductStock {
    HtmlText: string;
    InStockQuantity?: number;
}
interface IAvailability {
    IsAvailable: boolean;
    IsLongTermUnavailable: boolean;
    IsTemporarilyUnavailable: boolean;
    IsUnavailable: boolean;
    IsReplaced: boolean;
    IsSoldOut: boolean;
    IsDiscontinued: boolean;
    IsOutOfAssortment: boolean;
    IsRegular: boolean;
    IsDirectlyReplaced: boolean;
    RestockDate: Date | undefined;
}

interface IProductSalesUnits {
    BaseUnitCode: string;
    WeightKg: number;
    Values: ISalesUnit[];
    CheapestSalesUnitFormattedPrices: any;
}

interface ISalesUnit {
    Code: string;
    ListPrice: number;
    Quantity: number;
    Disabled?: boolean | undefined;
    unitQuantity?: number | undefined;
    TextPlural: string;
    TextSingular: string;
    DisplayPrice?: string;
    FormattedPrices: any;
    IsDefault?: boolean | undefined;
    FormattedSalesUnitPrice?: string;
}

interface IDisplayable<T> {
    Id: string;
    Value: T;
}

export interface IBasketSustainabilityResponse {
    Model: IBasketSustainabilityViewModel,
    AnalyticsTrackerScript: string
}

export interface IBasketSustainabilityViewModel {
    OrganicShare: IBasketSustainabilityOrganicShareViewModel,
    FoodSources: IBasketSustainabilityFoodSourcesViewModel,
    ReducedFoodWaste: IBasketSustainabilityReducesFoodWasteViewModel | null
}

interface IBasketSustainabilityOrganicShareViewModel {
    OrganicAmountPercent: number,
    OrganicWeightPercent: number,
    GroundWaterSaved: number
}

interface IBasketSustainabilityFoodSourcesViewModel {
    Kilo: IBasketSustainabilityFoodSourceViewModel,
    CO2E: IBasketSustainabilityFoodSourceViewModel
}
interface IBasketSustainabilityFoodSourceViewModel {
    Animal: number,
    Vegetable: number,
    Mixed: number
}

interface IBasketSustainabilityReducesFoodWasteViewModel {
    KiloSaved: number
}
