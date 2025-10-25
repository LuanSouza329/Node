const http = require("http");
const fs = require("fs");
const porta = 8080;

const server = http.createServer((request, response)=>{
    if(request.url === "/" || request.url === "/index.html"){
        fs.readFile(__dirname+"/index.html", (err, data)=>{
            response.writeHead(200, {"content-type":"text/html; charset=utf8"});
            response.end(data);
        })
    }else if(request.url === "/index2.html"){
        fs.readFile(__dirname+"/index2.html", (err, data)=>{
            response.writeHead(200, {"content-type":"text/html; charset=utf8"});
            response.end(data);
        })
    }else{
        response.writeHead(404, {'Content-Type': 'text/html; charset=utf8'});
        response.end('404 Página não encontrada');
    }
})


server.listen(porta, ()=>{
    console.log(`Servidor rodando na porta ${porta}`);
})