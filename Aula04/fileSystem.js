const http = require('http');
const fs = require('fs');
const porta = 8080;


const server = http.createServer((req, res) => {
    fs.readFile(__dirname + "/teste.html",(erro, arquivo)=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(arquivo);
        res.end();
    })
});

server.listen(porta, () => {
    console.log("Rodando");
    console.log(__dirname);
}); 

/* 
    A variável __dirname é uma variável global que contém o caminho absoluto do diretório que contém o arquivo JavaScript em execução.
*/