const http = require("http");
const porta = 8080;
const formidavel = require("");
const fs = require("fs");
const emissorEventos = new events.EventEmitter();


const server = http.createServer((request, response)=>{
    emissorEventos.emit("msg", msg);
    response.writeHead(200, {"content-type":"text/html; charset=utf8"});
    response.end(); 
})

server.listen(porta, ()=>{
    console.log("Servidor rodando na porta " + porta);
});

