/**
 * Cria um servidor HTTP que responde a diferentes rotas.
 * 
 * Rotas disponíveis:
 * - `/`: Retorna uma mensagem de boas-vindas.
 * - `/sobre`: Retorna informações sobre a aplicação ou organização.
 * 
 * O servidor responde com conteúdo HTML e utiliza o charset UTF-8.
 * Porta utilizada: 8080
 */
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if(req.url === '/'){
        res.write("<h1> Seja bem vindo! </h1>")
    }else if(req.url === '/sobre'){
        res.write("<h1> Sobre nós </h1>");
    }
    res.end();
}).listen(8080);

