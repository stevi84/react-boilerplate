import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    open: true,
    port: 8081,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    },
  },
  assetsInclude: ['**/*.yml'],
});
