import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e/specs",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [["html", { open: "never" }]],
    use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
    },
    projects: [
        { name: "chromium", use: { ...devices["Desktop Chrome"] } },
        { name: "firefox", use: { ...devices["Desktop Firefox"] } },
        { name: "webkit", use: { ...devices["Desktop Safari"] } },
    ],
    webServer: [
        {
            command: "node e2e/mocks/catalogue-server.js",
            url: "http://localhost:4103/api/catalogue/test",
            reuseExistingServer: !process.env.CI,
            env: { PORT: "4103" },
        },
        {
            command: "node e2e/mocks/shopkeepers-server.js",
            url: "http://localhost:4102/api/catalogue/shopkeepers",
            reuseExistingServer: !process.env.CI,
        },
        {
            command: "node e2e/mocks/shopkeeper-server.js",
            url: "http://localhost:4101/",
            reuseExistingServer: !process.env.CI,
        },
        {
            command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
            url: "http://localhost:3000",
            reuseExistingServer: !process.env.CI,
            env: {
                NEXT_PUBLIC_GATEWAY_URL: "http://localhost:4102",
                CATALOGUE_API_URL: "http://localhost:4103",
                USERS_API_URL: "http://localhost:4101",
            },
        },
    ],
});
