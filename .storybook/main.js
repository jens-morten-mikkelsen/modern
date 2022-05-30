module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions"
    ],
    framework: "@storybook/vue",
    core: {
        builder: "storybook-builder-vite-vue2"
    },
    viteFinal: (config) => {
        // customize the Vite config here

        // https://github.com/storybookjs/storybook/issues/10887#issuecomment-901109891
        // config.resolve.dedupe = ['@storybook/client-api'];
        console.log({ config });

        return config;
    },
}