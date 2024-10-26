import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  retries: 1,
  use: {
    browserName: "chromium",
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: "http://localhost:3000",
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: "pnpm start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
});
