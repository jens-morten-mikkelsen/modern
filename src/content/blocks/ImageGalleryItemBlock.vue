<template>
    <MiniImageSpot :image="content.image"
                   :link="content.link"
                   v-bind="$attrs"/>
</template>

<script lang="ts">
import { UmbImageGalleryItemBlock } from '@/types/umb-models';
import MiniImageSpot from '../spots/MiniImageSpot.vue';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'ImageGalleryItemBlock',
    components: { MiniImageSpot },
    props: {
        content: {
            type: Object as PropType<UmbImageGalleryItemBlock>,
            required: true,
        },
    },
});
</script>
