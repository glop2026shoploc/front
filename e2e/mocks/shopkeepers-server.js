const http = require("node:http");

const shops = [
    { id: "20700000-0000-4000-8000-000000000001", name: "Boulangerie du Centre", category: "Boulangerie", address: "12 rue de la Paix" },
    { id: "20700000-0000-4000-8000-000000000003", name: "Boutique des Fleurs", category: "Vêtements", address: "8 rue des Fleurs" },
    { id: "20700000-0000-4000-8000-000000000002", name: "Presse du Marché", category: "Presse", address: "4 place du Marché" },
    { id: "20700000-0000-4000-8000-000000000004", name: "Épicerie du Quartier", category: "Alimentation", address: "17 avenue Victor Hugo" },
];

const port = Number(process.env.PORT ?? 4102);

http.createServer((req, res) => {
    if (req.url?.startsWith("/api/catalogue/shopkeepers")) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(shops));
        return;
    }
    res.writeHead(404).end();
}).listen(port);
