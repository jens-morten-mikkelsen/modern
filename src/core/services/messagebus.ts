
type Callback<T> = (ev: any, data: T) => void;
type Unsubscribe = () => void;

export class MessageBus {
    private _callbacks: { [eventName: string]: Callback<any>[] } = {};

    addListener<T>(eventName: string, callback: Callback<T>): Unsubscribe {
        this._callbacks[eventName] = this._callbacks[eventName] ?? [];
        this._callbacks[eventName].push(callback);
        return () => {
            this._callbacks[eventName] = this._callbacks[eventName].filter(x => x !== callback);
        };
    }

    emit<T>(eventName: string, data: T) {
        if (eventName in this._callbacks) {
            for (const cb of this._callbacks[eventName]) {
                cb(eventName, data);
            }
        }
    }
}