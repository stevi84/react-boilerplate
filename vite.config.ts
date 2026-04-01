import { defineConfig, mergeConfig } from 'vite';
import { configDefaults, defineConfig as defineVitest } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 8081,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  assetsInclude: ['**/*.yml'],
});

const vitestConfig = defineVitest({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
    exclude: [...configDefaults.exclude, 'cypress/*'],
    // pool: 'threads', // use threads instead of default 'forks' for better performance
    // isolate: false, // disable isolation for better performance
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
