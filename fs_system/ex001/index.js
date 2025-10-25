const fs = require("node:fs").promises;
const http = require("node:http");
const PORT = process.env.PORT || 8080;




http.createServer((req, res) => {

    async function readFile(filePath) {
        try {
            res.writeHead(200, {"content-type":"text/html;charset=utf-8"});
            const data = await fs.readFile(filePath, "utf-8");
            res.end(data.toString());
        } catch (error) {
            res.end("Houve um erro ao efetuar a leitura do do arquivo " + error.message);
        }
    }

    readFile( __dirname+"/greetings.txt");


}).listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})