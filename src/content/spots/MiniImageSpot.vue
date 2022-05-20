<template>
    <a :href="link.url"
       class="m-8 self-start">
        <div class="preserve-aspect-ratio aspect-ratio-1x1">
            <img :src="image.url"
                 :alt="image.name"
                 class="rounded-3">
            <p v-if="imageText"
               class="flex items-end p-0 text-12 leading-none h-20">
                {{ imageText }}
            </p>
        </div>
    </a>
</template>

<script lang="ts">
import { UmbMedia, UmbNameAndUrl } from '@/types/umb-models';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'MiniImageSpot',
    props: {
        image: {
            type: Object as PropType<UmbMedia>,
            required: true,
        },
        link: {
            type: Object as PropType<UmbNameAndUrl>,
            required: true,
        },
        imageText: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
    },
});
</script>
