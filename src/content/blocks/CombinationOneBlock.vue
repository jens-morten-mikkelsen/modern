<template>
    <section class="flex flex-wrap">
        <div class="w-full flex items-center p-40 pl-20 md:p-56 lg:w-2/5 lg:pl-0 xl:px-1/13"
             :class="layoutOrder.topBlock">
            <ContentBlock :model="content.topBlock[0]"
                          caption-class="lg:ml-40 lg:mt-10 lg:text-12 xl:ml-50 xl:text-16"
                          icon-class="lg:w-30 lg:text-30 xl:w-40 xl:text-40"/>
        </div>
        <div class="w-full -mb-30 pl-20 md:-mb-56 md:pl-56 lg:transform lg:translate-y-56 lg:w-3/5 lg:mb-0 lg:pl-0"
             :class="layoutOrder.topImage">
            <ImageSpot :image="content.topImage"
                       aspect-ratio="3x2"/>
        </div>
        <article class="w-full bg-white-100 rounded-3 pt-70 px-20 pb-40 md:p-56 md:pt-120 lg:w-2/3 lg:pt-100 lg:px-40 xl:px-1/13"
                 :class="layoutOrder.bottomMainBlocks">
            <ContentBlockList :blocks="content.bottomMainBlocks"/>
        </article>
        <div class="relative w-full p-40 flex justify-center md:p-56 lg:block lg:w-1/3 lg:pt-100 lg:px-40 xl:pl-1/13"
             :class="layoutOrder.bottomSecondaryBlock">
            <div class="sticky top-56">
                <ContentBlock :model="content.bottomSecondaryBlock[0]"/>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue-demi';
import {UmbCombinationOneBlock, UmbCombinationOneSettings} from '../../types/umb-models';
import ContentBlock from '../../core/content/ContentBlock.vue';
import ContentBlockList from '../../core/content/ContentBlockList.vue';
import ImageSpot from '../spots/ImageSpot.vue';

export default defineComponent({
    name: 'CombinationOneBlock',
    components: {
        ImageSpot,
        ContentBlockList,
        ContentBlock,
    },
    props: {
        content: {
            type: Object as PropType<UmbCombinationOneBlock>,
            required: true,
        },
        settings: {
            type: Object as PropType<UmbCombinationOneSettings>,
            required: true,
        },
    },
    setup(props) {
        const isMirrored = props.settings.layout === 'Mirrored';
        const layoutOrder = {
            topImage: isMirrored ? 'order-0' : 'order-1',
            topBlock: isMirrored ? 'order-1' : 'order-0',
            bottomMainBlocks: isMirrored ? 'order-3' : 'order-2',
            bottomSecondaryBlock: isMirrored ? 'order-2' : 'order-3',
        };
        return {
            layoutOrder,
        };
    },
});
</script>
