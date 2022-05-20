<template>
    <component :is="content.callToAction ? 'a' : 'div'"
               :href="ctaLink"
               :title="ctaName"
               class="grid grid-cols-2 grid-rows-2">
        <ImageSpot :image="image"
                   aspect-ratio="1x1"
                   class="row-start-1 col-start-1 w-80 mr-16 md:row-span-2 md:mr-24 lg:w-120 lg:mr-40 xl:mr-56"/>
        <div class="flex flex-col justify-end row-start-1 col-start-2 md:row-span-1">
            <h2 class="flex items-center">
                {{ content.title }}
                <span v-if="content.callToAction"
                      class="icon-dropdown-right -right ml-10 text-18"/>
            </h2>
            <label class="block mt-5">
                {{ content.lead }}
            </label>
        </div>
        <div class="mt-16 row-start-2 col-start-1 col-span-2 md:mt-10 md:col-span-1 md:col-start-2 md:row-span-1"
             v-html="content.text"/>
    </component>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue-demi';
import {UmbMedia, UmbParagraphWithCtaBlock} from '../../types/umb-models';
import ImageSpot from '../spots/ImageSpot.vue';

export default defineComponent({
    name: 'MiniBlockParagraphWithCtaBlock',
    components: {ImageSpot},
    props: {
        content: {
            type: Object as PropType<UmbParagraphWithCtaBlock>,
            required: true,
        },
        image: {
            type: Object as PropType<UmbMedia>,
            required: true,
        },
    },
    setup(props) {
        const ctaLink = props.content.callToAction?.url ?? null;
        const ctaName = props.content.callToAction?.name ?? null;
        return {
            ctaLink,
            ctaName,
        };
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