<template>
    <ImageSpot :image="content.image"
               :cta-link="content.callToAction"
               v-bind="$attrs"/>
</template>

<script lang="ts">
import {UmbImageBlock, UmbImageWithCtaBlock} from '../../types/umb-models';
import ImageSpot from '../spots/ImageSpot.vue';

import {defineComponent, PropType} from 'vue-demi';

export default defineComponent({
    name: 'ImageBlock',
    components: {ImageSpot},
    props: {
        content: {
            type: Object as PropType<UmbImageWithCtaBlock | UmbImageBlock>,
            required: true,
        },
    },
});

</script>
