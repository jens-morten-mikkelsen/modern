import { AxiosResponse } from 'axios';

function getApiActionPath(relativePathAndAction: string) {
    return `/api/${relativePathAndAction}`;
}

function getUmbracoPagePath(relativePath: string) {
    return `/_content${relativePath}`;
}

function unwrapAxiosResponse<T>(response: Promise<AxiosResponse<T>>): Promise<T> {
    return response.then(r => r.data);
}

export {
    getApiActionPath, 
    getUmbracoPagePath,
    unwrapAxiosResponse,
};

