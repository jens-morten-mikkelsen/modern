<template>
    <QuoteSpot :quote="content.text"
               :author="content.author"
               :author-additional-info="content.title"
               v-bind="$attrs"/>
</template>

<script lang="ts">
import { UmbQuoteBlock } from '@/types/umb-models';
import QuoteSpot from '../spots/QuoteSpot.vue';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'QuoteBlock',
    components: {QuoteSpot},
    props: {
        content: {
            type: Object as PropType<UmbQuoteBlock>,
            required: true,
        },
    },
});
</script>
