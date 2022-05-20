<template>
    <form class="flex flex-col w-full flex-1 h-full relative mt-20"
          @submit.prevent="setQueryValue">
        <div class="px-20 lg:px-30 flex flex-col w-full flex-1">
            <span class="mt-8 mb-15 md:m-0">
                <h5 class="mb-10 text-16 font-light">
                    {{ $t("Labels.Catalog.Facets.Headline.Regions") }}
                </h5>

                <select v-if="facet"
                        v-model="selectedRegionValue">
                    <option value="">
                        {{ $t("Labels.Catalog.Search.AllRegions") }}
                    </option>

                    <option v-for="value in facet.Values"
                            :key="value.Key"
                            :value="value.Key">
                        {{ value.DisplayName }}
                    </option>
                </select>
            </span>        
        </div>
        <div class="search-facets__submit p-10 border-t border-solid border-gray-100 bottom-0 z-10 bg-white-100 lg:mt-auto">
            <button class="btn -btn-small -btn-block"
                    type="submit">
                {{ $t("Labels.Catalog.Facets.Buttons.ApplyFilter") }}
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import productListStore from '../store/productListStore';
import { getCurrentQueryParam, setQueryParam } from '../regionQuerymethods';
import { IFacet } from '@/types/search.interfaces';
import {defineComponent, PropType, ref} from 'vue-demi';

export default defineComponent({
    name: 'RegionDropdown',
    props: {
        facet: {
            type: Object as PropType<IFacet>,
            required: true,
        },
    },
    setup() {
        const regionFacets = getCurrentQueryParam();
        const selectedRegionValue = ref(regionFacets.regions ?? '');

        productListStore.setSelectedRegion(regionFacets);

        function setQueryValue() {
            setQueryParam({ regions: selectedRegionValue.value });
            productListStore.setSelectedRegion({
                regions: selectedRegionValue.value,
            });
        }
        return {
            setQueryValue,
            selectedRegionValue,
        };
    },
});
</script>
