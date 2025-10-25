const http = require("node:http");
const fs = require("node:fs");
const queryString = require("node:querystring");


http.createServer((req, res)=>{
    if(req.method === "GET" && req.url === "/"){
        fs.readFile(__dirname+"/index.html", (err, data)=>{
            res.writeHead(200, {"Content-Type" : "text/html"});
            res.end(data);
        })
    }

    if(req.method === "POST" && req.url === "/criar"){
        let body = "";

        req.on("data", chunk =>{
            body += chunk.toString();
        })

        req.on("end", ()=>{
            const dados = queryString.parse(body);

            const nome = dados.e_name;
            const sobreNome = dados.e_SobreName;

            console.log(dados.e_name + " " + dados.e_SobreName);

            res.end()
        })
    }
}).listen(8080);

