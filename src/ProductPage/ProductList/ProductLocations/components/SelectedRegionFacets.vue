<template>
    <div v-if="selectedRegionFacetText"
         class="flex items-center justify-between bg-white-300 mt-5 mb-8 font-semibold rounded-3 overflow-hidden h-32 pl-15">
        <span>
            {{ selectedRegionFacetText }}
        </span>
        <button class="h-20 w-20 text-black-300 mx-10 rounded-full bg-gray-100 p-0 hover:bg-gray-200 focus:bg-gray-200"
                aria-label="Close"
                type="reset"
                @click="clearRegionFacets">
            <span class="icon-cross text-18 text-white"></span>
        </button>
    </div>
</template>

<script lang="ts">
import productListStore from '../store/productListStore';
import { getCurrentQueryParam, clearCurrentQuery } from '../regionQuerymethods';
import { IFacet } from '@/types/search.interfaces';
import { computed, defineComponent, PropType } from 'vue-demi';
import { getDictionaryLabel } from '@/core/plugins/translate';

export default defineComponent({
    name: 'SelectedRegionFacets',
    props: {
        regionFacet: {
            type: Object as PropType<IFacet>,
            required: true,
        },
    },
    setup(props) {
        const regionFacets = getCurrentQueryParam();
        productListStore.setSelectedRegion(regionFacets);

        const selectedRegionFacetText = computed(() => {
            if (!productListStore.regionFacets) {
                return '';
            }

            const selectedRegion = props.regionFacet?.Values.find(region => region.IsChecked);
            if (selectedRegion) {
                return `${getDictionaryLabel('Labels.Catalog.Facets.Headline.Regions')}: ${selectedRegion.DisplayName}`;
            }

            if (productListStore.regionFacets.toPostalCode) {
                return `${getDictionaryLabel('Labels.Forms.Labels.PostalCode')}: ${productListStore.regionFacets.fromPostalCode} - ${productListStore.regionFacets.toPostalCode}`;
            }

            if (productListStore.regionFacets.radius) {
                const radiusConvertedToKilometers = (parseFloat(productListStore.regionFacets.radius) / 1000);
                return getDictionaryLabel('Labels.Catalog.Facets.Regions.RadiusSelected', radiusConvertedToKilometers.toFixed(0));
            }

            return '';
        });

        function clearRegionFacets() {
            clearCurrentQuery();
            productListStore.reset();
        }
        
        return {
            selectedRegionFacetText,
            clearRegionFacets,
        };
    },
});
</script>