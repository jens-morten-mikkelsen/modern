<template>
    <portal-target :name="portalName"/>
</template>

<script lang="ts">
import { PortalTarget } from 'portal-vue';
import { defineComponent } from 'vue-demi';

export default defineComponent({
    name: 'VuePortalTarget',
    components: {
        PortalTarget,
    },
    props: {
        portalName: {
            type: String,
            required: true,
        },
    },
});
</script>
