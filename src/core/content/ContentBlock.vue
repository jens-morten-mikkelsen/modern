<template>
    <div>
        <component :is="blockComponent"
                   :content="model.content"
                   :settings="blockSettings"
                   v-bind="$attrs"/>
    </div>
</template>

<script lang="ts">
import { UmbContentElementWithSettings } from '../../types/umb-models';
import { blockResolver } from '../components/componentResolver';
import {defineComponent, PropType} from 'vue-demi';

export default defineComponent({
    name: 'ContentBlock',
    props: {
        model: {
            type: Object as PropType<UmbContentElementWithSettings>,
            required: true,
        },
    },
    setup(props) {
        const blockComponent = blockResolver.resolve(props.model.alias);
        const blockSettings = props.model.settings?.content;

        return {
            blockComponent,
            blockSettings,
        };
    },
});

</script>
