<template>
    <article class="-m-4 md:flex">
        <div class="w-full bg-white-100 p-40 m-4 rounded-3 md:w-1/2 md:px-20 lg:px-40">
            <MiniBlock :content="content.blocks[0].content"/>
        </div>
        <div class="w-full bg-white-100 p-40 m-4 rounded-3 md:w-1/2 md:px-20 lg:px-40">
            <MiniBlock :content="content.blocks[1].content"/>
        </div>
    </article>
</template>

<script lang="ts">
import {UmbMiniBlocksBlock} from '../../types/umb-models';
import MiniBlock from './MiniBlock.vue';
import {defineComponent, PropType} from 'vue-demi';

export default defineComponent({
    name: 'MiniBlocksBlock',
    components: {MiniBlock},
    props: {
        content: {
            type: Object as PropType<UmbMiniBlocksBlock>,
            required: true,
        },
    },
});
</script>
