import _Vue, { PluginObject } from 'vue';

declare module 'vue/types/vue'
{
    interface Vue {
        /**
         * Translates a label and replacing placeholders with parameters
         * @param labelKey
         * @param parameters
         */
        $t(labelKey: string, ...parameters: string[]): string;
    }
}

if (!('__language' in window)) {
    console.warn('Loading frontend labels failed');
    window.__language = { name: '', labels: {} };
}

const placeholder = /\{(\d{1,2})\}/;

const TranslatePlugin: PluginObject<void> = {
    install: (Vue: typeof _Vue, options?: void) => {
        Vue.prototype.$t = function(labelKey: string, ...parameters: (string | number)[]) {
            const labelValue = window.__language.labels[labelKey];
            if (labelValue === undefined)
                return `{${labelKey}}`;

            if (parameters.length === 0)
                return labelValue;

            return format(labelValue, ...parameters);
        };
    },
};

export default TranslatePlugin;

// Arguments for replacing placeholders in a label, eg. {0}, has the option to be numbers, therefore we ensure that the arguments are parsed to string for generating the final label.
function format(input: string, ...args: (string | number)[]): string {
    return <string>args.reduce((result, arg, ix) => {
        return result.toString().split(`{${ix}}`).join(arg.toString());
    }, input);
}

export function getDictionaryLabel(labelKey: string, ...args: string[]) {
    const labelValue = window.__language.labels[labelKey];
    if (labelValue === undefined)
        return `{${labelKey}}`;

    if (args.length === 0)
        return labelValue;

    return format(labelValue, ...args);
}