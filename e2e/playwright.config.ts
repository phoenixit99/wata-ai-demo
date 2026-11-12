import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4173', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build -w apps/web && npm run preview -w apps/web',
    cwd: '..',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
