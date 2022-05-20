import Vue from 'vue';
import { createApp, h } from 'vue-demi';
import App from './App.vue';

import TranslatePlugin from './core/plugins/translate';
import PortalVue from 'portal-vue';
import { config as configureComponents } from './core/components/componentRegistry';
import { VueQueryPlugin } from 'vue-query';
import { install as installVueDemi } from 'vue-demi';
import { setupAngularRegistrations } from './angular-registration';
import { isStandaloneMode } from './core/environment';
import './styling/main.css';

Vue.use(TranslatePlugin);
Vue.use(PortalVue);
Vue.use(VueQueryPlugin);

installVueDemi();
configureComponents();

if (!isStandaloneMode()) {
    setupAngularRegistrations();
} else {
    Vue.config.devtools = true;
    Vue.config.productionTip = true;
    
    const app = createApp({
        render: () => h(App),
    });
    
    app.mount('#app');    
}
