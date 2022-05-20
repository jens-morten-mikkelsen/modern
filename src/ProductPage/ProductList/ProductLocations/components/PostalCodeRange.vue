<template>
    <form class="flex flex-col w-full flex-1 h-full relative mt-20"
          @submit.prevent="setPostalCodeValues">
        <div class="px-20 lg:px-30 flex flex-col w-full flex-1 h-full relative">
            <h5 class="mb-10 text-16 font-light">
                {{ $t("Labels.Forms.Labels.PostalCode") }}
            </h5>

            <div class="flex w-full">
                <label class="pr-10">
                    {{ $t("Labels.Catalog.Facets.Regions.From") }}
                    <input v-model="fromPostalCode"
                           type="number"
                           class="mt-5 pl-15"
                           :class="{'input -error-border': invalidPostalCodeRange}"
                           required>
                </label>
                <div class="flex items-center content-center justify-center flex-col self-center justify-items-center justify-self-center mt-15">
                    -
                </div>

                <label class="pl-10">
                    {{ $t("Labels.Catalog.Facets.Regions.To") }}
                    <input v-model="toPostalCode"
                           type="number"
                           class="mt-5 pl-15"
                           :class="{'input -error-border': invalidPostalCodeRange}"
                           required>
                </label>
            </div>

            <div class="w-full my-10 text-red-600"> 
                <div v-if="invalidPostalCodeRange"
                     class="form-invalid-message">
                    <span class="flex">
                        <span class="icon-notification inline-block pr-10"></span>
                        <span>{{ $t("Labels.Catalog.Facets.Regions.InvalidPostalCodeRange") }}</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="search-facets__submit p-10 border-t border-solid border-gray-100 bottom-0 z-10 bg-white-100 lg:mt-auto">
            <button class="btn -btn-small -btn-block"
                    type="submit"
                    :disabled="!fromPostalCode && !toPostalCode">
                {{ $t("Labels.Catalog.Facets.Buttons.ApplyFilter") }}
            </button>
        </div>
    </form>
</template>

<script lang="ts">
import productListStore from '../store/productListStore';
import { getCurrentQueryParam, setQueryParam } from '../regionQuerymethods';
import { defineComponent, ref } from 'vue-demi';

export default defineComponent({
    name: 'PostalCodeRange',
    setup() {
        const invalidPostalCodeRange = ref(false);
        const fromPostalCode = ref('');
        const toPostalCode = ref('');

        const regionFacets = getCurrentQueryParam();
        fromPostalCode.value = regionFacets.fromPostalCode ?? '';
        toPostalCode.value = regionFacets.toPostalCode ?? '';

        productListStore.setSelectedRegion(regionFacets);

        function setPostalCodeValues() {
            invalidPostalCodeRange.value = false;
            // if only one postalCode is set, we set the other to the same value
            if (!fromPostalCode.value && toPostalCode.value) {
                fromPostalCode.value = toPostalCode.value;
            } else if (!toPostalCode.value && fromPostalCode.value) {
                toPostalCode.value = fromPostalCode.value;
            }

            if (Number(fromPostalCode.value) > Number(toPostalCode.value)) {
                invalidPostalCodeRange.value = true;

                return;
            }

            productListStore.setSelectedRegion({
                fromPostalCode: fromPostalCode.value,
                toPostalCode: toPostalCode.value,
            });
            setQueryParam({
                fromPostalCode: fromPostalCode.value,
                toPostalCode: toPostalCode.value,
            });
        }

        return {
            invalidPostalCodeRange,
            fromPostalCode,
            toPostalCode,
            setPostalCodeValues,
        };
    },
});
</script>