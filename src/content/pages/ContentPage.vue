<template>
    <section v-if="content.contentBlocks.length">
        <ContentBlockList :blocks="content.contentBlocks"
                          is-root-list/>
    </section>
</template>

<script lang="ts">
import ContentBlockList from '@/core/content/ContentBlockList.vue';
import { UmbContentPage } from '@/types/umb-models';
import { defineComponent, PropType } from 'vue-demi';

export default defineComponent({
    name: 'ContentPage',
    components: {
        ContentBlockList,
    },
    props: {
        content: {
            type: Object as PropType<UmbContentPage>,
            required: true,
        },
    },
});
</script>
