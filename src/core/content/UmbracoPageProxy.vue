<template>
    <div v-if="pageData">
        <component :is="renderComponent"
                   v-bind="pageData"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue-demi';
import { pageResolver } from '../components/componentResolver';
import { useUmbracoApi } from './useUmbracoApi';

export default defineComponent({
    name: 'UmbracoPageProxy',
    props: {
        umbracoEntryPoint: {
            required: true,
            type: String,
        },
    },
    setup(props) {
        const { data: pageData } = useUmbracoApi(props.umbracoEntryPoint);

        const renderComponent = computed(() => {
            if (!pageData.value) return undefined;
            return pageResolver.resolve(pageData.value.alias);
        });

        return {
            pageData,
            renderComponent,
        };
    },
});

</script>