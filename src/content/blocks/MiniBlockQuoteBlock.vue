<template>
    <div class="grid grid-cols-2 grid-rows-2">
        <ImageSpot :image="image"
                   aspect-ratio="1x1"
                   class="rounded-full overflow-hidden flex-shrink-0 self-start w-80 mr-16 row-start-1 col-start-1 md:row-span-2 md:mr-24 md:mb-0 lg:w-120 lg:mr-40 xl:mr-56"/>
        <div class="flex flex-col justify-end row-start-1 col-start-2 md:row-span-1">
            <h2 class="flex items-center">
                {{ content.author }}
            </h2>
            <label class="block mt-5">
                {{ content.title }}
            </label>
        </div>
        <QuoteSpot :quote="content.text"
                   class="h3 mt-16 row-start-2 col-start-1 col-span-2 md:mt-10 md:col-span-1 md:col-start-2 md:row-span-1"
                   icon-position="right"/>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue-demi';
import {UmbMedia, UmbQuoteBlock} from '../../types/umb-models';
import QuoteSpot from '../spots/QuoteSpot.vue';
import ImageSpot from '../spots/ImageSpot.vue';

export default defineComponent({
    name: 'MiniBlockQuoteBlock',
    components: {ImageSpot, QuoteSpot},
    props: {
        content: {
            type: Object as PropType<UmbQuoteBlock>,
            required: true,
        },
        image: {
            type: Object as PropType<UmbMedia>,
            required: true,
        },
    },
});
</script>

<style scoped>
.grid-rows-2 {
    grid-template-rows: repeat(2, auto);
}

.grid-cols-2 {
    grid-template-columns: min-content auto;
}
</style>