import { useQuery } from 'vue-query';
import { ComputedRef } from 'vue-demi';
import { getBasket, getBasketSustainability } from '@/components/basket/basketApiService';

function useBasketKeyFigures(id: ComputedRef<number>, sourceName: string) {
    return useQuery(['basketSustainability', id], () => getBasketSustainability(id.value, sourceName));
}

async function useBasket(id?: number, checkoutStep?: number, validate?: boolean) {
    return useQuery(['basket', id], () => getBasket(id, checkoutStep, validate, true));
}

export {
    useBasketKeyFigures,
    getBasket,
};
