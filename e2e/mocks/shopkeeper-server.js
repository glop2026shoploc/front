const http = require("node:http");

const port = Number(process.env.PORT ?? 4101);
const email = "moncommercant@example.com";

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("ok");
        return;
    }

    if (req.url === "/api/users/shopkeeper/register" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const shopkeeper = JSON.parse(body || "{}");

            if (shopkeeper.email === email) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify({error: "Shopkeeper existe déjà"}));
                return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    companyName: shopkeeper.companyName,
                    category: shopkeeper.category,
                    siret: shopkeeper.siret,
                    address: shopkeeper.address,
                    email: shopkeeper.email,
                    status: "WAITING",
                })
            );
        });
        return;
    }
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
})

server.listen(port, () => {
    console.log(`Mock users API listening on http://localhost:${port}`);
});