const http = require("node:http");
const fs = require("node:fs")

const port = 8080;
const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.writeHead(200, {"content-type": "text/html"});
        res.end("HOME PAGE");
    }else if (req.url === "/sobre"){
        res.writeHead(200, {"content-type": "text/html; charset=utf-8"});
        res.end("SOBRE NÓS");
    }else{
        res.writeHead(404, {"content-type": "text/html; charset=utf-8"});
        res.end("PÁGINA NÃO ENCONTRADA");
    }
});


server.listen(port, ()=>{
    console.log("Servidor rodando na porta "+ port);
})
