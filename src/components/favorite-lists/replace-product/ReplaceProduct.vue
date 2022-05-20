<template>
    <div>
        <button class="__ps-direct-replace-favorite-product--btn absolute -btn-mini normal-case inline-flex items-center font-semibold text-small"
                @click="openConfirmationModal">
            <i class="mr-5 icon-replace text-14 inline-block text-white-100"></i>
            <span>
                {{ $t("Labels.Catalog.Product.Replacements.ReplaceFavorite") }}
            </span>
        </button>
        <ReplaceProductConfirmationModal v-if="showConfirmationModal"
                                         :original-product="originalProduct"
                                         :replacement-product="replacementProduct"
                                         :price-display-key="priceDisplayKey"
                                         :favorite-list-id="favoriteListId"
                                         @close="closeConfirmationModal"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue-demi';
import ReplaceProductConfirmationModal from './ReplaceProductConfirmationModal.vue';
import { IProductSnapshot } from '@/models';

export default defineComponent({
    name: 'ReplaceProduct',
    components: {
        ReplaceProductConfirmationModal,
    },
    props: {
        originalProduct: {
            type: Object as PropType<IProductSnapshot>,
            required: true,
        },
        replacementProduct: {
            type: Object as PropType<IProductSnapshot>,
            required: true,
        },
        priceDisplayKey: {
            type: String,
            required: true,
        },
        favoriteListId: {
            type: Number,
            required: true,
        },
    },
    setup() {
        const showConfirmationModal = ref(false);

        function openConfirmationModal(): void {
            showConfirmationModal.value = true;
        }

        function closeConfirmationModal(): void {
            showConfirmationModal.value = false;
        }
        return {
            showConfirmationModal,
            openConfirmationModal,
            closeConfirmationModal,
        };
    },
});
</script>
