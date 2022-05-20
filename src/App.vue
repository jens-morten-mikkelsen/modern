<template>
    <div>
        <h2>App startet</h2>
        <BasketSustainabilityKeyFigures :basket="basket"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi';
import BasketSustainabilityKeyFigures from './components/basket/BasketSustainabilityKeyFigures.vue';
import { IBasketModel } from './types/basket';

export default defineComponent({
    name: 'App',
    components: { BasketSustainabilityKeyFigures },
    setup() {
        const basket: IBasketModel = {
            AllBaskets: [{
                Id: 0,
                Position: 0,
                ExpectedDeliveryDate: '',
                NumberOfLines: 0,
            }],
            HasQuantityExceedsMaxPreviouslyPurchasedWarning: false,
        } as IBasketModel;

        return {
            basket,
        };
    },
});

</script> 
