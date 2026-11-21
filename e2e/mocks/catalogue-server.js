const http = require("node:http");

const port = Number(process.env.PORT ?? 4100);
let numberOfTestRequestSinceBeginning = 0;
let currentMessage = "Message de test depuis la base";
const LILLE_ID = "00000000-0000-0000-0000-000000000102";
const categories = [
    { categoryId: "000001", name: "Café" },
    { categoryId: "000002", name: "Boulangerie" },
    { categoryId: "000003", name: "Librairie" },
];

function shop(id, name, categoryId, number, road, latitude, longitude) {
    return {
        shopId: id,
        name,
        siret: "10000000000011",
        categoryIds: [categoryId],
        address: { addressId: id, road, number, complement: null, cityId: LILLE_ID, latitude, longitude },
        status: "VALIDATED",
    };
}

const shops = [
    shop("401", "Au Bon Pain", "000002", "12", "rue de la République", 50.631, 3.061),
    shop("403", "Librairie des Tilleuls", "000003", "45", "avenue des Tilleuls", 50.638, 3.07),
    shop("404", "La Fournée du Moulin", "000002", "8", "rue du Moulin", null, null),
];

const testShops = [
    { shopId: "00000000-0000-0000-0000-00000000000a", name: "Boulangerie Dupont", siret: "12345678900013", address: { road: "rue de la République", number: "12" }, status: "WAITING" },
    { shopId: "00000000-0000-0000-0000-00000000000b", name: "Fleuriste Martin", siret: "12345678900021", address: { road: "rue Nationale", number: "3" }, status: "WAITING" },
    {
        shopId: "00000000-0000-0000-0000-00000000000c",
        name: "Café du Marché",
        siret: "12345678900039",
        categoryIds: ["00000000-0000-0000-0000-000000000101"],
        address: { road: "place du Général de Gaulle", number: "4", complement: null, cityId: "00000000-0000-0000-0000-000000000102" },
        status: "VALIDATED",
    },
];

const openingHours = [
    { dayOfWeek: 1, openTime: "08:00:00", closeTime: "12:30:00" },
    { dayOfWeek: 1, openTime: "14:00:00", closeTime: "19:00:00" },
    { dayOfWeek: 2, openTime: "08:00:00", closeTime: "19:00:00" },
    { dayOfWeek: 6, openTime: "09:00:00", closeTime: "18:00:00" },
];

const products = [
    { productId: "00000000-0000-0000-0000-0000000000p1", name: "Café allongé", price: 2.5, pointsPrice: 25, earnedPoints: 0, quantity: 40 },
    { productId: "00000000-0000-0000-0000-0000000000p2", name: "Croissant", price: 1.2, pointsPrice: null, earnedPoints: 3, quantity: 0 },
];

function sendPayload(res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
            numberOfTestRequestSinceBeginning,
            testMessage1: currentMessage,
            testMessage2: "Test Message",
        })
    );
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${port}`);

    if (url.pathname === "/api/catalogue/shops" && req.method === "GET") {
        const cityId = url.searchParams.get("cityId");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(shops.filter((candidate) => candidate.address.cityId === cityId)));
        return;
    }

    if (req.url === "/api/catalogue/categories" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(categories));
        return;
    }

    if (req.url === "/api/catalogue/test" && req.method === "GET") {
        numberOfTestRequestSinceBeginning += 1;
        sendPayload(res);
        return;
    }

    if (req.url === "/api/catalogue/test" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const message = JSON.parse(body || "{}").message;
            if (typeof message !== "string" || message.trim() === "") {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "message is required" }));
                return;
            }

            currentMessage = message;
            sendPayload(res);
        });
        return;
    }

    const validatedShop = testShops[2];
    if (req.url === `/api/catalogue/shops/${validatedShop.shopId}` && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(validatedShop));
        return;
    }
    if (req.url === `/api/catalogue/shops/${validatedShop.shopId}/opening-hours` && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(openingHours));
        return;
    }
    if (req.url === `/api/catalogue/shops/${validatedShop.shopId}/products` && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
        return;
    }

    if (req.url === "/api/catalogue/shops/admin/waiting" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(testShops.filter((shop) => shop.status === "WAITING")));
        return;
    }

    const shop = testShops.find((s) => req.url.startsWith(`/api/catalogue/shops/admin/${s.shopId}/`));
    if (shop && req.url.endsWith("/documents") && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify([`http://localhost:4100/files/${shop.shopId}/kbis.pdf`]));
        return;
    }
    if (shop && req.url.includes("/status?status=") && req.method === "PATCH") {
        shop.status = req.url.split("status=")[1];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(shop));
        return;
    }

    if (req.url === "/api/catalogue/shops/00000000-0000-0000-0000-000000000101/documents" && req.method === "POST") {
        req.resume();
        req.on("end", () => {
            res.writeHead(201);
            res.end();
        });
        return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, () => {
    console.log(`Mock catalogue API listening on http://localhost:${port}`);
});
