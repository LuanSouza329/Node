const http = require("http");
const path = require("path");
const fs = require("fs");

const Port = process.env.PORT || 8080;
const caminho = path.resolve("dados", "dado.json");

const server = http.createServer((req, res) => {
    fs.readFile(caminho, "utf-8", (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ erro: "Erro ao ler arquivo" }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
    });
});

server.listen(Port, () => {
    console.log(`Servidor rodando na porta ${Port}`);
});
