import { UmbPageData } from './../../types/umb-models.d';
import { useQuery } from 'vue-query';
import axios from 'axios';
import { getUmbracoPagePath, unwrapAxiosResponse } from '../apiHelpers';

function getUmbracoPage(path: string): Promise<UmbPageData> {
    return unwrapAxiosResponse(axios.get<UmbPageData>(getUmbracoPagePath(path), {
        // TODO - RIGHT NOW WE GET A 404 on correct path
        validateStatus: function(status: number) {
            return [200, 404].includes(status) ; 
        },
    }));
}

function useUmbracoApi(path: string) {
    return useQuery(['umbracoPageApi', path], () => getUmbracoPage(path));
}

export {
    useUmbracoApi,
};