<template>
    <ul class="product-markings">
        <li v-if="product.Brand.Value"
            class="mt-2 bp-phone-text-small bp-tablet-text-mini text-gray-600">
            {{ product.Brand.Value }}
        </li>

        <li v-if="product.IsSeasonal">
            <img :src="`/client/dist/gfx/${siteName}/icons/markings/seasonal.svg`"
                 :alt="$t('Labels.Catalog.Product.IsSeasonal')"
                 :title="$t('Labels.Catalog.Product.IsSeasonal')">
            <span class="text-x-small sm:text-xx-small ml-5">
                {{ $t("Labels.Catalog.Product.IsSeasonal") }}
            </span>
        </li>

        <li v-for="marking in markingsForRendering"
            :key="marking.Id">
            <img :src="`/client/dist/gfx/${siteName}/icons/markings/${marking.Id}.svg`"
                 :alt="marking.Value"
                 :title="marking.Value">
            <span v-if="marking.Id === 'se' && siteName == 'Sweden'"
                  class="text-x-small sm:text-xx-small ml-5\">
                {{ $t("Labels.Catalog.Product.IsSeasonal") }}
            </span>
        </li>

        <li v-if="product.Co2Equivalent || product.IgnoreCo2Equivalent"
            class="-with-text">
            <img :src="`/client/dist/gfx/${siteName}/icons/markings/co2e.svg`"
                 :alt="$t('Labels.Catalog.Product.Co2Equivalent')"
                 :title="$t('Labels.Catalog.Product.Co2Equivalent')">
            <span v-if="product.Co2Equivalent && !product.IgnoreCo2Equivalent"
                  class="text-small ml-2 sm:text-x-small">
                {{ Intl.NumberFormat('da-DK', { maximumSignificantDigits: 2 }).format(product.Co2Equivalent) }}
            </span>
            <span v-if="product.IgnoreCo2Equivalent"
                  class="text-small ml-2 sm:text-x-small">
                {{ $t("Labels.Catalog.Product.UnknownCo2Equivalent") }}
            </span>
        </li>
        <li v-if="product.Campaigns.Logo">
            <img class="-is-campaign-logo"
                 :src="product.Campaigns.Logo.SmallUrl"
                 :alt="product.Campaigns.Logo.Name"
                 :title="product.Campaigns.Logo.Name">
        </li>
        <li v-if="product.PreSale && product.PreSale.DisplayName !== null">
            <span class="splash presale"
                  :class="preSaleClasses" 
                  v-html="product.PreSale.DisplayName">
            </span>
        </li>
    </ul>
</template>
<script lang="ts">
import { IProductSnapshot, IDisplayable } from '@/models';
import clientContext from '@/core/client-context';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'MarkingsList',
    props: {
        product: {
            type: Object as PropType<IProductSnapshot>,
            required: true,
        },
    },
    setup(props) {
        const markingsForRendering = props.product.Markings.filter(marking => excludedMarkingsFilter(marking)) ?? [];
        const siteName = clientContext.site.name;
        const preSaleClasses = props.product.PreSale ? [`-color${props.product.PreSale.ColorCode}`] : [];

        function excludedMarkingsFilter(marking: IDisplayable<string>): boolean {
            const excludedMarkings = ['noaircargo', 'se'];
            return !excludedMarkings.some(excludedMarkings => marking.Id === excludedMarkings);
        }
        
        return {
            siteName,
            markingsForRendering,
            preSaleClasses,
        };
    },
});
</script>
