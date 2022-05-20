<template>
    <div v-if="lineItem"
         class="flex flex-wrap border-r border-solid border-white-100 -not-rounded product-snapshot py-10 px-20 md:flex-no-wrap"
         :style="{'border-left-color': lineItem.PrimaryCategoryColor}"
         :class="[{'bg-white-200': isUnavailable}, lineItem.PrimaryCategoryColor ? 'border-l-5' : 'border-l']">
        <div class="flex relative items-center justify-center"
             :class="{'bg-white-100': isUnavailable}">
            <!-- Image overlay for directly replaced products, made this way to remove white box around images -->
            <div v-if="isUnavailable"
                 class="absolute inset-0 bg-white-300 opacity-50 z-1 pointer-events-none"></div>
            <img v-if="lineItem.Image && lineItem.Image.Small"
                 :src="lineItem.Image.Small"
                 :lazy-srcset="`${lineItem.Image.Small} 1x, ${lineItem.Image.Small} 2x`"
                 class="img-responsive"
                 :alt="lineItem.DisplayName">
            <img v-else
                 src="/client/dist/images/product_placeholder_50x50.svg"
                 class="img-responsive"
                 :alt="lineItem.DisplayName">
        </div>
        <div class="flex flex-col flex-grow justify-center pl-20 py-10">
            <span class="inline-block mr-5 bp-phone-text-small bp-tablet-text-mini text-gray-600">
                {{ lineItem.Id }}
            </span>
            <h3 class="__ps-title"
                :class="{'text-gray-600': isUnavailable}">
                {{ lineItem.DisplayName }}
            </h3>
            <div>
                <MarkingsList v-if="lineItem.Markings"
                              :product="lineItem"/>
            </div>
        </div>

        <div class="flex flex-col items-end justify-center w-full py-10 mr-0 ml-auto md:w-auto">
            <template v-if="lineItem.Availability.IsRegular">
                <span class="font-semibold text-small mb-5">
                    {{ $t("Labels.Favorites.Editing.Labeltext.DirectReplacementProduct") }}
                </span>
                <div class="flex flex-col text-small">
                    <div v-for="(item, index) in lineItem.SalesUnits.Values"
                         :key="index">
                        <span v-if="priceDisplayKey"
                              class="font-semibold">
                            {{ item.FormattedPrices[priceDisplayKey] }}
                        </span>
                        <span v-else
                              class="font-semibold">
                            {{ item.FormattedSalesUnitPrice }}
                        </span>
                    </div>
                </div>
            </template>
            <ProductAvailabilityIndicator v-else
                                          class="text-right font-semibold"
                                          :availability="lineItem.Availability"/>
        </div>
    </div>
</template>

<script lang="ts">
import { IProductSnapshot } from '@/models';
import ProductAvailabilityIndicator from '@/content/products/ProductAvailabilityIndicator.vue';
import MarkingsList from '@/content/products/MarkingsList.vue';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'ReplaceProductConfirmationModalLineItem',
    components: {
        ProductAvailabilityIndicator,
        MarkingsList,
    },
    props: {
        lineItem: {
            type: Object as PropType<IProductSnapshot>,
            required: true,
        },
        priceDisplayKey: {
            type: String,
            required: true,
        },
        isUnavailable: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
