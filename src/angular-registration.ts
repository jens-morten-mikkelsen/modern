import { registerVueComponent } from './core/ng/registerVueComponent';
import './core/ng/root-broadcast';

import ProductAvailabilityIndicator from './content/products/ProductAvailabilityIndicator.vue';
import UmbracoPageProxy from  './core/content/UmbracoPageProxy.vue';
import ProductStockIndicator from  './content/products/ProductStockIndicator.vue';
import GoogleMapsRadius from './ProductPage/ProductList/ProductLocations/components/GoogleMapsRadius.vue';
import PostalCodeRange from './ProductPage/ProductList/ProductLocations/components/PostalCodeRange.vue';
import RegionDropdown from './ProductPage/ProductList/ProductLocations/components/RegionDropdown.vue';
import SelectedRegionFacets from './ProductPage/ProductList/ProductLocations/components/SelectedRegionFacets.vue';
import ReplaceProduct from './components/favorite-lists/replace-product/ReplaceProduct.vue';
import VuePortalTarget from './components/shared/VuePortalTarget.vue';
import BasketSustainabilityKeyFigures from './components/basket/BasketSustainabilityKeyFigures.vue';
import IconInfo from '~icons/ui/info';

export function setupAngularRegistrations() {
    const angularModule = window.angular.module('ng.vue');

    registerVueComponent(angularModule, 'basketSustainabilityKeyFigures', BasketSustainabilityKeyFigures);
    registerVueComponent(angularModule, 'umbracoPageProxy', UmbracoPageProxy);

    registerVueComponent(angularModule, 'productStockIndicator', ProductStockIndicator);
    registerVueComponent(angularModule, 'productAvailabilityIndicator', ProductAvailabilityIndicator);
    registerVueComponent(angularModule, 'googleMapsRadius', GoogleMapsRadius);
    registerVueComponent(angularModule, 'postalCodeRange', PostalCodeRange);
    registerVueComponent(angularModule, 'regionDropdown', RegionDropdown);
    registerVueComponent(angularModule, 'selectedRegionFacets', SelectedRegionFacets);
    registerVueComponent(angularModule, 'replaceProduct', ReplaceProduct);
    
    // shared components
    registerVueComponent(angularModule, 'vuePortalTarget', VuePortalTarget);    
    registerVueComponent(angularModule, 'iconInfo', IconInfo); 
}

