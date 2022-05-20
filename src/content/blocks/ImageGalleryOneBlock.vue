<template>
    <section class="flex flex-wrap">
        <ContentBlock :model="content.block[0]"
                      icon-class="lg:w-30 lg:text-30 xl:w-40 xl:text-40"
                      caption-class="lg:ml-40 lg:mt-10 lg:text-12 xl:ml-50 xl:text-16"
                      quote-class="h2"
                      class="w-full px-20 pb-40 md:px-56 md:pb-56 lg:w-1/3 lg:pl-0 lg:pb-0 lg:pr-0 xl:pl-120"
                      :class="layoutOrder.contentBlock"/>
        <ContentBlockList :blocks="content.images"
                          block-class="flex w-1/8"
                          class="flex w-full lg:w-2/3 lg:pl-56 xl:pl-120"
                          :class="layoutOrder.imagesList"/>
    </section>
</template>

<script lang="ts">
import {UmbImageGalleryOneBlock, UmbImageGallerySettings} from '../../types/umb-models';
import ContentBlock from '../../core/content/ContentBlock.vue';
import ContentBlockList from '../../core/content/ContentBlockList.vue';
import {defineComponent, PropType} from 'vue-demi';

export default defineComponent({
    name: 'ImageGalleryOneBlock',
    components: {
        ContentBlockList,
        ContentBlock,
    },
    props: {
        content: {
            type: Object as PropType<UmbImageGalleryOneBlock>,
            required: true,
        },
        settings: {
            type: Object as PropType<UmbImageGallerySettings>,
            required: true,
        },
    },
    setup(props) {
        const isMirrored = props.settings.layout === 'Mirrored';
        const layoutOrder = {
            contentBlock: isMirrored ? 'order-1' : 'order-0',
            imagesList: isMirrored ? 'order-0' : 'order-1',
        };
        return {
            layoutOrder,
        };
    },
});
</script>
