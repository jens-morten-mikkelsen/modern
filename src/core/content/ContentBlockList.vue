<template>
    <article>
        <ContentBlock v-for="(block, index) in blocks"
                      :key="index + block.alias"
                      :model="block"
                      :class="generateBlockClasses(index)"/>
    </article>
</template>

<script lang="ts">
import { UmbContentElementWithSettings } from '../../types/umb-models';
import ContentBlock from './ContentBlock.vue';
import {defineComponent, PropType} from 'vue-demi';

export default defineComponent({
    name: 'ContentBlockList',
    components: {
        ContentBlock,
    },
    props: {
        blocks: {
            type: Array as PropType<UmbContentElementWithSettings[]>,
            required: true,
        },
        blockClass: {
            type: String as PropType<string | undefined>,
            default: undefined,
        },
        isRootList: {
            type: Boolean,
            default: false,
        },
        useFirstBlockSpacingOverride: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        function checkIsPreviousBlockNotSameTheme(blockIndex: number): boolean {
            return props.blocks[blockIndex].settings?.content.theme !== props.blocks[blockIndex - 1].settings?.content.theme;
        }
        function checkIsNextBlockNotSameTheme(blockIndex: number): boolean {
            return props.blocks[blockIndex].settings?.content.theme !== props.blocks[blockIndex + 1].settings?.content.theme;
        }
        
        function generateBlockClasses(blockIndex: number): string {
            if (props.blocks[blockIndex].settings === null || !props.isRootList) {
                return props.blockClass ?? '';
            }
            let topBlockSpacing = 'pt-30';
            let bottomBlockSpacing = 'pb-30';

            if (blockIndex === 0 || checkIsPreviousBlockNotSameTheme(blockIndex)) {
                topBlockSpacing = 'pt-56';
            }

            if (blockIndex === (props.blocks.length - 1) || checkIsNextBlockNotSameTheme(blockIndex)) {
                bottomBlockSpacing = 'pb-56';
            }

            return `${topBlockSpacing} ${bottomBlockSpacing} ${props.blockClass ?? ''}`;
        }
        return {
            generateBlockClasses,
        };
    },
});
</script>
