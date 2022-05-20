import Vue from 'vue';
import { IRegionFacets } from '../regionQuerymethods';

class ProductListStore {
    private state: IProductListStore = Vue.observable({
        regionFacets: {},
    });

    public get regionFacets() {
        return this.state.regionFacets;
    }

    public setSelectedRegion(facets: IRegionFacets) {
        this.state.regionFacets = facets;
    }

    public reset() {
        this.setSelectedRegion({});
    }
}

const productListStore = new ProductListStore();

export default productListStore;

export interface IProductListStore {
    regionFacets?: IRegionFacets;
}
