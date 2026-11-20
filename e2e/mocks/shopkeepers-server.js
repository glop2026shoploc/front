const http = require("node:http");

const categories = [
    { categoryId: "20700000-0000-4000-8000-000000000011", name: "Boulangerie" },
    { categoryId: "20700000-0000-4000-8000-000000000012", name: "Presse" },
    { categoryId: "20700000-0000-4000-8000-000000000013", name: "Vêtements" },
    { categoryId: "20700000-0000-4000-8000-000000000014", name: "Alimentation" },
];

const cityId = "20700000-0000-4000-8000-000000000099";
const shops = [
    { shopId: "20700000-0000-4000-8000-000000000001", name: "Boulangerie du Centre", category: categories[0], address: { number: "12", road: "rue de la Paix", cityId }, status: "VALIDATED" },
    { shopId: "20700000-0000-4000-8000-000000000002", name: "Presse du Marché", category: categories[1], address: { number: "4", road: "place du Marché", cityId }, status: "VALIDATED" },
    { shopId: "20700000-0000-4000-8000-000000000003", name: "Boutique des Fleurs", category: categories[2], address: { number: "8", road: "rue des Fleurs", cityId }, status: "VALIDATED" },
    { shopId: "20700000-0000-4000-8000-000000000004", name: "Épicerie du Quartier", category: categories[3], address: { number: "17", road: "avenue Victor Hugo", cityId }, status: "VALIDATED" },
    { shopId: "20700000-0000-4000-8000-000000000005", name: "Boulangerie des Halles", category: categories[0], address: { number: "2", road: "rue du Centre", cityId }, status: "VALIDATED" },
    { shopId: "20700000-0000-4000-8000-000000000006", name: "Shop en attente", category: categories[1], address: { number: "1", road: "rue du Test", cityId }, status: "WAITING" },
];

const port = Number(process.env.PORT ?? 4102);

http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/api/catalogue/categories") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(categories));
        return;
    }
    if (url.pathname === "/api/catalogue/shops") {
        const categoryId = url.searchParams.get("categoryId");
        const visibleShops = shops.filter((shop) => shop.status === "VALIDATED"
            && (!categoryId || shop.category.categoryId === categoryId));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(visibleShops));
        return;
    }
    res.writeHead(404).end();
}).listen(port);
