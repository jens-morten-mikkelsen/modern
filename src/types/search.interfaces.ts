export interface IFacet {
    Key: string;
    Values: Array<IFacetValue>;
}

export interface IFacetValue {
    Key: string;
    DisplayName: string;
    Count: number;
    IsChecked: boolean;
}