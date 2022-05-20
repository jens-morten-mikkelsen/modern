<template>
    <div>
        <label v-if="!!content.lead"
               class="mb-5 md:mb-10 cursor-default">
            {{ content.lead }}
        </label>
        <h2 v-if="!!content.title">
            {{ content.title }}
        </h2>
        <div v-if="!!content.text"
             v-html="content.text"/>
        <a v-if="content.callToAction"
           :href="content.callToAction.url"
           class="text-bold underline text-brand-600">
            {{ content.callToAction.name }}
        </a>
    </div>
</template>

<script lang="ts">
import { UmbParagraphWithCtaBlock, UmbRichTextBlock, UmbTeaserColumnsBlock } from '@/types/umb-models';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'TextBlock',
    props: {
        content: {
            type: Object as PropType<UmbParagraphWithCtaBlock | UmbTeaserColumnsBlock | UmbRichTextBlock>,
            required: true,
        },
    },
});
</script>
