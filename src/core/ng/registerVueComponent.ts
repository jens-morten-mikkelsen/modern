import angular from 'angular';
import Vue, { VueConstructor } from 'vue';
import { Vue as VueInstance, CombinedVueInstance } from 'vue/types/vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VueComponentInstance = CombinedVueInstance<Vue, object, object, object, Record<never, any>>;

interface VueConstructorInternals extends VueConstructor
{
    options: VueInstance['$options'];
}

export const registerVueComponent = (module: angular.IModule, name: string, component: VueConstructor) => {
    component = Vue.extend(component);
    // Get vue component props or use manually passed props (from compositionApi component)
    const propsList = Object.keys((component as VueConstructorInternals).options?.props || {});
    
    // convert vue props to angular props
    const scope = propsList.reduce((obj, key) => {
        obj[key] = '<'; return obj;
    }, {} as Record<string, string>);

    // register angular component
    module.directive(name, () => ({
        restrict: 'E',

        scope,
        link: (scope: angular.IScope, element: JQLite) => {
            const targetNode = document.createElement('div');
            element[0].classList.add('vue-universe');
            element[0].appendChild(targetNode);

            const cInstance = new component({
                propsData: scope,
            });
            cInstance.$mount(targetNode);

            // watch angular props and rebind to vue instance
            syncScopeChangesToProps(propsList, scope, cInstance);

            cleanupOnDestroy(scope, cInstance, targetNode);
        },
    }));
};

function syncScopeChangesToProps(propsList: string[], scope: angular.IScope, cInstance: VueComponentInstance) {
    for (const propName of propsList) {
        scope.$watch(propName, (value) => {
            setPropValueFromAngular(cInstance, propName, value);
        });
    }
}

function cleanupOnDestroy(scope: angular.IScope, cInstance: VueComponentInstance, element: HTMLElement) {
    scope.$on('$destroy', () => {
        cInstance.$destroy();
        element.parentElement?.removeChild(element);
    });
}

function setPropValueFromAngular(cInstance: VueComponentInstance, propName: string, value: unknown) {
    /*
    * If a prop value is set from angular, it is set as the prop value.
    * This is only done to preserve the option to have default values for props on components that needs to be accessed from angular.
    * */
    if (value) {
        cInstance.$props[propName] = value;
    }
}
