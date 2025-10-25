const http = require("http");
const porta = 8080;

const server = http.createServer((request, response)=>{
    response.writeHead(200, {"content-type":"text/html; charset=utf8"});
    response.end("Olá, mundo");
})


server.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`);
})