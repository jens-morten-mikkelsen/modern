import { ngRootBroadcast } from '../../../core/ng/root-broadcast';
import productListStore from './store/productListStore';

export function setQueryParam(facetsToAssign: IRegionFacets) {
    const url = getUrlSearchParams();
    productListStore.setSelectedRegion(facetsToAssign);

    // Only one region facet can be choosen at the time, so we setting a new one. We remove the old one
    removeRegionFacets(url);

    for (const [key, value] of Object.entries(facetsToAssign)) {
        if (value !== null && value !== undefined && value !== '') {
            url.set(key, value);
        }
    }

    assignFacetsToUrl(url);

    const element = document.getElementById('js-hook-scroll-top');
    if (element) {
        const elementTopValue = element.offsetTop;

        const elementLeftValue = element.offsetLeft;

        element.scrollTo(elementTopValue, elementLeftValue);
    }

    ngRootBroadcast.emit('ng', [ 'closeFacetsOverlay' ]);
}

enum RegionFacetKeys {
    fromPostalCode = 'fromPostalCode',
    toPostalCode = 'toPostalCode',
    geopoint = 'geopoint',
    regions = 'regions',
    radius = 'radius'
}

export type IRegionFacets = {
    [key in RegionFacetKeys]?: string | null | undefined;
};

export function getCurrentQueryParam(): IRegionFacets {
    const url = getUrlSearchParams();

    const facets: IRegionFacets = {};

    url.forEach((value, key) => {
        if (isRegionFacetName(key)) {
            facets[key] = value;
        }
    });

    return facets;
}

export function clearCurrentQuery() {
    const url = getUrlSearchParams();

    removeRegionFacets(url);
    assignFacetsToUrl(url);
}

function removeRegionFacets(url: URLSearchParams) {
    const paramsToRemove: string[] = [];

    url.forEach((_, key: string) => {
        if (isRegionFacetName(key)) {
            paramsToRemove.push(key);
        }
    });

    paramsToRemove.forEach(p => url.delete(p));
}

function isRegionFacetName(key: string): key is RegionFacetKeys {
    return Object.keys(RegionFacetKeys).includes(key);
}

function assignFacetsToUrl(url: URLSearchParams) {
    const newParamString = url.toString();

    const routeInHash = getRouteHashState();
    const newurl =
        window.location.origin +
        window.location.pathname +
        routeInHash +
        (routeInHash.includes('?') ? '&' : '?') +
        newParamString;

    window.location.assign(newurl);
}

function getUrlSearchParams() {
    const regexp = /#.+\?(.+)/g;
    const matches = window.location.hash.matchAll(regexp).next();

    return matches?.value !== null && matches?.value !== undefined && matches.value.length === 2
        ? new URLSearchParams(matches.value[1]?.toString() ?? '') 
        : new URLSearchParams('');

}
function getRouteHashState() {
    const regexp = /(#[^?$]*)/g;  
    const matches = window.location.hash.match(regexp);

    return matches !== null
        ? matches[0]?.toString() ?? '' 
        : '#/?';
}