const http = require("node:http");

const ID = "00000000-0000-0000-0000-000000000101";

const port = Number(process.env.PORT ?? 4101);
const takenEmail = "deja.inscrit@example.com";

const cities = [{ id: ID, name: "Lille" }];
const categories = [{ id: ID, name: "Café" }];

function sendJson(res, status, payload) {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
}

function readBody(req) {
    return new Promise((resolve) => {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => resolve(JSON.parse(body || "{}")));
    });
}

function badRequest(field, message) {
    return { status: 400, problem: { detail: "Requête invalide.", errors: { [field]: message } } };
}

function checkRegistration(url, payload) {
    const account = payload.account ?? {};

    if (account.dataUsageConsent !== true) {
        return badRequest("account.dataUsageConsent", "Le consentement est obligatoire pour créer un compte.");
    }
    if (url.endsWith("/client/register") && !payload.cityId) {
        return badRequest("cityId", "La ville est obligatoire.");
    }
    if (url.endsWith("/shopkeeper/register") && (!payload.categoryId || !payload.address?.road || !payload.address?.cityId)) {
        return badRequest("address", "La catégorie, l'adresse et la ville sont obligatoires.");
    }
    if (account.email === takenEmail) {
        return { status: 409, problem: { detail: "Un compte existe déjà avec cet e-mail." } };
    }
    return null;
}

const server = http.createServer(async (req, res) => {
    if (req.url === "/" && req.method === "GET") return sendJson(res, 200, { status: "ok" });
    if (req.url === "/api/users/cities" && req.method === "GET") return sendJson(res, 200, cities);
    if (req.url === "/api/users/categories" && req.method === "GET") return sendJson(res, 200, categories);

    const isRegistration = req.url === "/api/users/client/register" || req.url === "/api/users/shopkeeper/register";
    if (isRegistration && req.method === "POST") {
        const error = checkRegistration(req.url, await readBody(req));
        if (error) return sendJson(res, error.status, error.problem);
        return sendJson(res, 201, { type: "Bearer", token: "mock-token" });
    }

    sendJson(res, 404, { detail: "Not found" });
});

server.listen(port, () => {
    console.log(`Mock users API listening on http://localhost:${port}`);
});