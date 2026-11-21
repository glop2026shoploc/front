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

const waitingShops = [
    { shopId: "00000000-0000-0000-0000-00000000000a", name: "Boulangerie Dupont", siret: "12345678900013", address: { road: "rue de la République", number: "12" }, status: "WAITING" },
    { shopId: "00000000-0000-0000-0000-00000000000b", name: "Fleuriste Martin", siret: "12345678900021", address: { road: "rue Nationale", number: "3" }, status: "WAITING" },
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

    if (req.url === "/api/catalogue/shops/admin/waiting" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(waitingShops.filter((shop) => shop.status === "WAITING")));
        return;
    }

    const shop = waitingShops.find((s) => req.url.startsWith(`/api/catalogue/shops/admin/${s.shopId}/`));
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
