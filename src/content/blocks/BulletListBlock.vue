<template>
    <section>
        <h3 v-if="content.title">
            {{ content.title }}
        </h3>
        <ul class="m-0">
            <li v-for="(bullet, index) in content.bulletPoints"
                :key="index">
                {{ bullet }}
            </li>
        </ul>
    </section>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue-demi';
import {UmbBulletListBlock} from '../../types/umb-models';

export default defineComponent({
    name: 'BulletListBlock',
    props: {
        content: {
            type: Object as PropType<UmbBulletListBlock>,
            required: true,
        },
    },
});
</script>
