<template>
    <ContentBlock :model="miniBlockModel"
                  :image="content.image"/>
</template>

<script lang="ts">
import {UmbMiniBlock} from '../../types/umb-models';
import ImageSpot from '../spots/ImageSpot.vue';
import ContentBlock from '../../core/content/ContentBlock.vue';
import {defineComponent, PropType} from 'vue-demi';

export default defineComponent({
    name: 'MiniBlock',
    components: {
        ContentBlock,
    },
    props: {
        content: {
            type: Object as PropType<UmbMiniBlock>,
            required: true,
        },
    },
    setup(props) {
        // TODO: after umbraco changes to make the two miniBlocks unique this can be removed
        const miniBlockModel = props.content.block[0];
        miniBlockModel.alias = `miniBlock${miniBlockModel.alias.charAt(0).toUpperCase() + miniBlockModel.alias.slice(1)}`;

        return {
            miniBlockModel,
        };
    },
});
</script>
