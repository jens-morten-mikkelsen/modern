<template>
    <article class="w-full max-w-1100 mx-auto rounded-3 overflow-hidden">
        <ContentBlock v-for="(block, index) in blockList"
                      :key="index + block.alias"
                      :model="block"
                      aspect-ratio="3x1"
                      image-class="rounded-b-none"
                      :class="block.class"/>
    </article>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue-demi';
import {
    UmbArticleBuilderBlock, UmbBackgroundStyleable,
    UmbContentElementWithSettings,
} from '../../types/umb-models';
import ContentBlock from '../../core/content/ContentBlock.vue';

interface ContentBlockWithClass extends UmbContentElementWithSettings {
    class?: string
}

export default defineComponent({
    name: 'ArticleBuilderBlock',
    components: {ContentBlock},
    props: {
        content: {
            type: Object as PropType<UmbArticleBuilderBlock>,
            required: true,
        },
        settings: {
            type: Object as PropType<UmbBackgroundStyleable>,
            required: true,
        },
    },
    setup(props) {
        const blockList = props.content.blocks.map((block: ContentBlockWithClass, index: number) => {
            if (block.alias === 'leadAndTitleBlock' ||
                block.alias === 'richTextBlock' ||
                block.alias === 'quoteBlock') {
                let topSpacing = 'pt-8 md:pt-12';
                let bottomSpacing = 'pb-8 md:pb-12';

                if (index === 0 || props.content.blocks[index - 1].alias === 'imageBlock') {
                    topSpacing = 'pt-40 md:pt-56';
                }
                if (index === (props.content.blocks.length - 1) || props.content.blocks[index + 1].alias === 'imageBlock') {
                    bottomSpacing = 'pb-40 md:pb-56';
                }
                
                block.class = `px-20 md:px-56 lg:px-120 ${topSpacing} ${bottomSpacing}`;

                
                if (props.settings.backgroundStyle === 'Solid') {
                    block.class += ' bg-white-100';
                }
            }
            return block;
        });
        
        return {
            blockList,
        };
    },
});
</script>
