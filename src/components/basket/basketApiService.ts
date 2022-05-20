import { IBasketModel, IBasketResponse } from '@/types/basket';
import axios, { AxiosRequestHeaders } from 'axios';
import { getApiActionPath, unwrapAxiosResponse } from '@/core/apiHelpers';
import {IBasketSustainabilityResponse} from '@/models';

let basketState: IBasketModel | undefined = undefined;

export async function getBasket(id?: number, checkoutStep?: number, validate?: boolean, forceReFetch = false): Promise<IBasketModel> {
    if (forceReFetch || !basketState) {
        const header: AxiosRequestHeaders = checkoutStep ? {'TagManager-CheckoutStep': checkoutStep} : {};

        const response = await unwrapAxiosResponse(axios.get<IBasketResponse>(getApiActionPath(createBasketUrl(id, validate)), {
            headers: header,
        }));
        basketState = response.Model;
        return response.Model;

    } else {
        return Promise.resolve(basketState);
    }
}

function createBasketUrl(id?: number | undefined, validate?: boolean): string {
    let url = 'checkout/basket';
    /*TODO: can we do something else here, or why can we get a basket without an id?
    * Seems a bit strange that we can get a "default" basket.
    * Add a comment describing the functionality
    * */
    if (id) {
        url += `?id=${id}`;
    }
    /*TODO: can we do something else here, or why do we not always validate the basket?
    * Add a comment describing the functionality
    * */
    if (validate) {
        url += `${(url.indexOf('?') > -1 ? '&' : '?')}validate=true`;
    }
    return url;
}

export function getBasketSustainability(id: number, sourceName: string): Promise<IBasketSustainabilityResponse> {
    return unwrapAxiosResponse(axios.get<IBasketSustainabilityResponse>(getApiActionPath(`sustainability/summary/${sourceName}/${id}`)));
}
