import { MessageBus } from '../services/messagebus';

export const ngRootBroadcast = new MessageBus();

ngRootBroadcast.addListener('ng', (_, data: [string, ...any]) => {
    if(window.__ngVue === undefined) {
        console.warn(`vue/ng event ${data[0]} was dropped`);
        return;
    }
    window.__ngVue.broadcast.apply(window, data);
});