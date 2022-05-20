<template>
    <div class="stock-status"
         :class="statusCssClass">
        {{ $t("Labels.Catalog.Product.Stock") }} {{ inStockQuantity }} {{ unitCode }}
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'ProductStockIndicator',
    props: {
        inStockQuantity: {
            type: Number as PropType<number | undefined | null>,
            default: undefined,
        },
        unitCode: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const hasStockData = (props.inStockQuantity !== undefined) && (props.inStockQuantity !== null);
        const statusCssClass = hasStockData ? '-stock-status-green' : '-stock-status-red';

        return {
            statusCssClass,
        };
    },
});
</script>