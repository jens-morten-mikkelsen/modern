import path from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2';
import legacy from '@vitejs/plugin-legacy';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

const config = defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    return {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
            dedupe: ['vue-demi'],
        },
        build: {
            minify: isProduction,
            manifest: true,
            rollupOptions: {
                input: 'src/main.ts',
            },
        },
        plugins: [
            legacy({
                targets: ['ie >= 11'],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            }),
            Vue2(),
            Icons({
                compiler: 'vue2',
                customCollections: {
                    'ui': FileSystemIconLoader(
                        './src/assets/icons/ui'),
                },
            }),
        ],
        server: {
            port: 3333,
        },
    };
});

export default config;
