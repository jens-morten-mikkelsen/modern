declare global {
    interface Window {
        $$ModernEnvironment: IEnvironment
    }
}

export interface IGoogleApiSettings {
    apiKey: string;
}

export interface IEnvironment {
    googleApi: IGoogleApiSettings;
}

export function isStandaloneMode(): boolean {
    return !window.angular;
}

const environment = !isStandaloneMode() ? window.$$ModernEnvironment : {
    googleApi: 'todo - local test key',
};


export default environment;