import { getApiActionPath } from '@/core/apiHelpers';
import axios from 'axios';
import { ngRootBroadcast } from '@/core/ng/root-broadcast';

async function addProducts(favoriteListId: number, productIds: number[], silent?: boolean): Promise<void> {
    try {
        await axios.post(getApiActionPath(`favorites/${favoriteListId}/products`), {
            productIds,
        });
    } catch (e) {
        console.error(e);
    }

    if (!silent) {
        ngRootBroadcast.emit('ng', [ 'productAddedToFavoriteList' ]);
    }
}

async function deleteProducts(favoriteListId: number, productIds: number[], silent?: boolean): Promise<void> {
    try {
        await axios.post(getApiActionPath(`favorites/${favoriteListId}/products/delete`), productIds);
    } catch (e) {
        console.error(e);
    }
    if (!silent) {
        ngRootBroadcast.emit('ng', [ 'productDeletedFromFavoriteList' ]);
    }
}

async function replaceProduct(favoriteListId: number, originalProductId: number, replacementProductId: number) {
    try {
        await addProducts(favoriteListId, [replacementProductId], true);
        await deleteProducts(favoriteListId, [originalProductId], true);
        ngRootBroadcast.emit('ng', [ 'productReplacedInFavoriteList' ]);
    } catch (e) {
        console.error(e);
    }
}

export const favoriteListsApi = {
    addProducts,
    deleteProducts,
    replaceProduct,
};
