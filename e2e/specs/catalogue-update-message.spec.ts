import { test, expect } from "../fixtures";

const DEFAULT_MESSAGE = "Message de test depuis la base";

test.afterEach(async ({ request }) => {
    await request.post("http://localhost:4100/test", {
        data: { message: DEFAULT_MESSAGE },
    });
});

test("envoie un nouveau message et l'affiche après soumission", async ({ catalogueTestPage }) => {
    const newMessage = `Message e2e ${Date.now()}`;

    await catalogueTestPage.goto();
    await catalogueTestPage.submitMessage(newMessage);

    await expect(catalogueTestPage.messageText(newMessage)).toBeVisible();
    await expect(catalogueTestPage.messageInput).toHaveValue("");
});