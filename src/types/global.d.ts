interface Window {
    __language: {
        name: string,
        labels: { [key: string]: string | undefined },
    };

    __ngVue?: {
        broadcast: (eventName: string, ...args: any[]) => void;
    }
}

