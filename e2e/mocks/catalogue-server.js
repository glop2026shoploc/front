const http = require("node:http");

const port = Number(process.env.PORT ?? 4100);
let numberOfTestRequestSinceBeginning = 0;
let currentMessage = "Message de test depuis la base";

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

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, () => {
    console.log(`Mock catalogue API listening on http://localhost:${port}`);
});
