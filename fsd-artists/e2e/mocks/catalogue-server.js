const http = require("node:http");

const port = Number(process.env.PORT ?? 4100);
let numberOfTestRequestSinceBeginning = 0;

const server = http.createServer((req, res) => {
    if (req.url === "/test") {
        numberOfTestRequestSinceBeginning += 1;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                numberOfTestRequestSinceBeginning,
                testMessage1: "Message de test depuis la base",
                testMessage2: "Test Message",
            })
        );
        return;
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, () => {
    console.log(`Mock catalogue API listening on http://localhost:${port}`);
});
