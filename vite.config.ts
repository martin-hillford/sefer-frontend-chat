import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
// eslint-disable-next-line import/no-extraneous-dependencies
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [tsconfigPaths(), svgr(), react()],
    server: {
        port: 3000,
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[hash][extname]',
                chunkFileNames: 'assets/[hash].js',
                entryFileNames: 'assets/[hash].js'
            }
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*'],
            exclude: [],
        }
    },
    preview: { port: 3000, }
});
