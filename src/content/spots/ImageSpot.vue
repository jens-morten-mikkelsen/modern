<template>
    <div>
        <div v-if="aspectRatio"
             class="rounded-3 preserve-aspect-ratio"
             :class="[aspectRatioClass, imageClass]">
            <div class="absolute flex flex-col justify-end items-center p-30 inset-0 z-1 md:p-20 lg:p-40">
                <img :src="image.url"
                     :alt="image.name"
                     class="absolute w-full h-full object-cover inset-0 -z-1">
                <a v-if="ctaLink"
                   :href="ctaLink.url"
                   class="btn -btn-white">
                    {{ ctaLink.name }}
                    <span class="icon-arrow-right -right text-10 lg:text-12"></span>
                </a>
            </div>
        </div>
        <img v-else
             :src="image.url"
             :alt="image.name"
             class="w-full"
             :class="imageClass">
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue-demi';
import {UmbMedia, UmbNameAndUrl} from '../../types/umb-models';

export default defineComponent({
    name: 'ImageSpot',
    props: {
        image: {
            type: Object as PropType<UmbMedia>,
            required: true,
        },
        aspectRatio: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        ctaLink: {
            type: Object as PropType<UmbNameAndUrl | undefined>,
            default: undefined,
        },
        imageClass: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
    },
    setup(props) {
        const aspectRatioClass = props.aspectRatio ? `aspect-ratio-${props.aspectRatio}` : '';
        return {aspectRatioClass};
    },
});
</script>
