export type SiteName = 'Denmark' | 'Sweden' | 'Poland';

export interface ISiteSpecificfeatures {
    preSale: boolean;
}

export interface ISiteContext {
    name: SiteName;
    enabledFeatures: ISiteSpecificfeatures;
}

export interface IUserContext {
    isAuthenticated: boolean;
    language: string;
}

export interface IClientContext {
    site: ISiteContext;
    user: IUserContext;
}

// Comes from BE in _ModernClientContext.cshtml (only named modern because it is for use in the "modern" FE-project
export default (window as any).$$ModernClientContext as IClientContext;