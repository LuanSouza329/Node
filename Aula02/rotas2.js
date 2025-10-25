const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    parametro = url.parse(req.url, true).query;

    parametro.nome = parametro.nome || 'sem nome';
    parametro.idade = parametro.idade || 'sem idade';

    res.write('<h1>Olá ' + parametro.nome + '</h1>');
    res.write('<h2>Você tem ' + parametro.idade + ' anos</h2>');

    res.end();
}).listen(8080);

/* 
    Recebendo parâmetros na URL:
    
*/