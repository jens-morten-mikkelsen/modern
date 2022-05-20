<template>
    <div v-if="!!basketSustainabilityData">
        <div v-if="basketSustainabilityData.OrganicShare"
             class="mb-20">
            <b class="block mb-4 text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.OrganicShare.Headline") }}
            </b>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.OrganicShare.OrganicAmountPercent") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.OrganicShare.OrganicAmountPercent }}
                </span>
            </p>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.OrganicShare.OrganicWeightPercent") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.OrganicShare.OrganicWeightPercent }}
                </span>
            </p>
        </div>
        <div v-if="basketSustainabilityData.FoodSources"
             class="mb-20">
            <b class="block mb-4 text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.Kilo.Headline") }}
            </b>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.Kilo.Animal") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.FoodSources.Kilo.Animal }}
                </span>
            </p>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.Kilo.Vegetable") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.FoodSources.Kilo.Vegetable }}
                </span>
            </p>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.Kilo.Mixed") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.FoodSources.Kilo.Mixed }}
                </span>
            </p>
        </div>
        <div v-if="basketSustainabilityData.FoodSources"
             :class="basketSustainabilityData.ReducedFoodWaste ? 'mb-20' : ''">
            <b class="block mb-4 text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.CO2E.Headline") }}
            </b>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.CO2E.Animal") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.FoodSources.CO2E.Animal }}
                </span>
            </p>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.CO2E.Vegetable") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.FoodSources.CO2E.Vegetable }}
                </span>
            </p>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.FoodSources.CO2E.Mixed") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.FoodSources.CO2E.Mixed }}
                </span>
            </p>
        </div>
        <div v-if="basketSustainabilityData.ReducedFoodWaste">
            <b class="block mb-4 text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.ReducedFoodWaste.Headline") }}
            </b>
            <p class="flex items-center p-0 text-14 leading-22 xl:text-13">
                {{ $t("Labels.Checkout.Basket.Sustainability.ReducedFoodWaste.KiloSaved") }}
                <span class="mr-0 ml-auto flex-shrink-0 pl-4">
                    {{ basketSustainabilityData.ReducedFoodWaste.KiloSaved }}
                </span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue-demi';
import { IBasketModel } from '@/types/basket';
import { useBasketKeyFigures } from './useBasketApi';

export default defineComponent({
    name: 'BasketSustainabilityInfo',
    props: {
        source: {
            type: Object as PropType<IBasketModel>,
            required: true,
        },
        sourceName: {
            type: String as PropType<'basket' | 'order'>,
            required: true,
            validator: (value: string) => ['basket', 'order'].includes(value),
        },
    },
    setup(props) {
        
        const sourceId = computed(() => props.source.Id);
        const { isLoading, isError, data, refetch } = useBasketKeyFigures(sourceId, props.sourceName);
        watch(() => props.source, () => refetch.value());
        const basketSustainabilityData = computed(() => data.value?.Model);

        return {
            isLoading,
            isError,
            basketSustainabilityData,
        };
    },
});
</script>
