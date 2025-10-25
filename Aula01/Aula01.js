const http = require('http');

http.createServer((request, response)=>{
    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    response.write("Olá mundo!");
    response.end();
}).listen(8080);


/* 
    Criando um servidor HTTP simples que responde com "Hello World!" quando acessado na porta 8080.
    O método createServer() cria um novo servidor HTTP e o método listen() inicia o servidor na porta especificada (8080).
    O callback passado para createServer() é chamado sempre que uma requisição é recebida.
    O método writeHead() define o cabeçalho da resposta, e o método write() envia a resposta ao cliente.
*/