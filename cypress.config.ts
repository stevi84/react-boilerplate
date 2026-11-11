import { defineConfig } from 'cypress';

export default defineConfig({
  defaultBrowser: 'chrome',
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://localhost:8081',
  },
});
