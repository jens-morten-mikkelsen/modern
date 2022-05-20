<template>
    <div>
        <div class="flex flex-wrap justify-center -m-4">
            <div v-for="(block, index) in content.blocks"
                 :key="'block' + index"
                 class="p-4 w-full lg:w-1/3"
                 :class="{'md:w-1/2 ': content.blocks.length === 3}">
                <ContentBlock :model="block"
                              aspect-ratio="1x1"
                              class="h-full"
                              :class="getContentSpecificStyling(block)"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { UmbContentElementWithSettings, UmbTeaserColumnsBlock } from '@/types/umb-models';
import ContentBlock from '../../core/content/ContentBlock.vue';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'TeaserColumnsBlock',
    components: {ContentBlock},
    props: {
        content: {
            type: Object as PropType<UmbTeaserColumnsBlock>,
            required: true,
        },
    },
    setup() {
        function getContentSpecificStyling(contentBlock: UmbContentElementWithSettings): string {
            if (contentBlock.alias === 'quoteBlock' || contentBlock.alias === 'paragraphWithCtaBlock') {
                return 'flex items-center px-20 py-40 rounded-3 md:p-56';
            }
            return '';
        }
        return {
            getContentSpecificStyling,
        };
    },
});
</script>
