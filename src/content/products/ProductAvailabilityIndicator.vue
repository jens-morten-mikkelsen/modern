<template>
    <div>
        <div v-if="availability.IsDiscontinued"
             class="product-snapshot__sold-out text-small text-red-600">
            {{ $t('Labels.Catalog.Product.Warnings.Discontinued') }}
        </div>

        <div v-if="availability.IsDirectlyReplaced"
             class="product-snapshot__sold-out text-small text-red-600">
            {{ $t('Labels.Catalog.Product.Warnings.IsDirectlyReplaced') }}
        </div>
    
        <div v-if="(!availability.IsAvailable && !availability.IsDiscontinued)"
             class="product-snapshot__sold-out text-small text-red-600">
            {{ $t('Labels.Catalog.Product.Warnings.IsUnavailable') }}
        </div>
    
        <div v-if="(availability.IsAvailable && !availability.IsDiscontinued)">
            <div v-if="availability.IsSoldOut"
                 class="product-snapshot__sold-out text-small text-red-600">
                {{ $t('Labels.Catalog.Product.Warnings.IsToBeSoldOut') }}
            </div>
    
            <div v-if="(availability.IsTemporarilyUnavailable)"
                 class="product-snapshot__sold-out text-small text-red-600">
                <span>
                    {{ $t('Labels.Catalog.Product.Warnings.IsTemporarilyUnavailable') }}
                </span>
    
                <div v-if="availability.RestockDate != null"
                     class="__ps-deadline text-black-900">
                    <span class="block text-small">
                        {{ $t('Labels.Catalog.Product.RestockDate') }} {{ availability.RestockDate.toLocaleDateString() }}
                    </span>
                </div>
            </div>
    
            <div v-if="availability.IsReplaced"
                 class="product-snapshot__sold-out text-small text-red-600">
                {{ $t('Labels.Catalog.Product.Warnings.HasBeenReplaced') }}
            </div>
    
            <div v-if="availability.IsLongTermUnavailable"
                 class="product-snapshot__sold-out text-small text-red-600">
                {{ $t('Labels.Catalog.Product.Warnings.IsLongTermUnavailable') }}
            </div>
    
            <div v-if="availability.IsOutOfAssortment"
                 class="product-snapshot__sold-out product-snapshot__out-of-assortment text-small text-red-600">
                {{ $t('Labels.Catalog.Product.Warnings.IsOutOfAssortment') }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { IAvailability } from '../../models';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'ProductAvailabilityIndicator',
    props: {
        availability: {
            type: Object as PropType<IAvailability>,
            required: true,
        },
    },
});
</script>
