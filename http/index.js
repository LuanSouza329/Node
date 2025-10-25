const http = require("node:http");
const fs = require("node:fs")

const port = 8080;
const server = http.createServer((req, res)=>{
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

   /*  const html = fs.readFileSync(__dirname + "/index.html", "utf-8"); */

   fs.createReadStream(__dirname+"/index.html").pipe(res);

});


server.listen(port, ()=>{
    console.log("Servidor rodando na porta "+ port);
})