<template>
    <portal to="overlay">
        <div class="fixed top-0 right-0 bottom-0 left-0 z-over-all flex items-center justify-center">
            <div class="absolute w-full h-full bg-black-900 opacity-50"
                 @click="closeModal"></div>
            <div class="relative z-10 max-w-750 w-full rounded-3 overflow-hidden m-20 bg-white-100">
                <div class="relative px-20 pt-14 pb-10 bg-white-200 pr-50">
                    <h5 class="inline-block">
                        {{ $t("Labels.Favorites.Editing.Buttons.RemoveFavorite") }}
                    </h5>
                    <button class="-btn-text y-center right-0"
                            @click="closeModal">
                        <i class="icon-cross text-black-900 transition-colors duration-300 ease-in-out block py-15 px-20 text-18 hover:text-black-400"/>
                    </button>
                </div>
                <div class="px-20 py-10">
                    <p class="font-normal pt-0 pb-10">
                        {{ $t("Labels.Favorites.Dialog.ReplaceProductDisclaimer") }}
                    </p>
                    <ReplaceProductConfirmationModalLineItem :line-item="originalProduct"
                                                             :price-display-key="priceDisplayKey"
                                                             is-unavailable
                                                             class="border-t border-gray-300 border-solid rounded-t-3"/>
                    <ReplaceProductConfirmationModalLineItem :line-item="replacementProduct"
                                                             :price-display-key="priceDisplayKey"
                                                             class="border-b border-gray-300 border-solid rounded-b-3"/>
                </div>
                <div class="flex flex-wrap justify-end pb-20 px-20">
                    <button class="-btn-secondary -btn-small mr-8"
                            @click="closeModal">
                        {{ $t("Labels.Favorites.Editing.Buttons.No") }}
                    </button>
                    <button class="-btn-small"
                            @click="replaceProduct">
                        <span class="icon-checkmark inline-block pr-5"></span>
                        {{ $t("Labels.Favorites.Editing.Buttons.ConfirmDeleteFromList") }}
                    </button>
                </div>
            </div>
        </div>
    </portal>
</template>

<script lang="ts">
import { IProductSnapshot } from '../../../models';
import ReplaceProductConfirmationModalLineItem from './ReplaceProductConfirmationModalLineItem.vue';
import { defineComponent, PropType } from 'vue-demi';
import { favoriteListsApi } from '@/components/favorite-lists/favoriteListsApiService';

export default defineComponent({
    name: 'ReplaceProductConfirmationModal',
    components: {
        ReplaceProductConfirmationModalLineItem,
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
    emits: ['close'],
    setup(props, { emit }) {
        function closeModal(): void {
            emit('close');
        }

        async function replaceProduct(): Promise<void> {
            await favoriteListsApi.replaceProduct(props.favoriteListId, props.originalProduct.Id, props.replacementProduct.Id);
            closeModal();
        }

        return {
            replaceProduct,
            closeModal,
        };
    },
});

</script>
