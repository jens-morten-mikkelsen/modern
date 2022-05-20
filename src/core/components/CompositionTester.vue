<template>
    <div>
        <h1>
            CompositionTester
        </h1>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue-demi';

export default defineComponent({
    name: 'CompositionTester',
    props: {
        test: {
            type: String,
            default: 'test',
        },
    },
});

</script>

<style scoped>

</style>