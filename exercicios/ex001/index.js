const http = require("node:http");
const fs = require("node:fs");
const queryString = require("node:querystring");

http.createServer((req, resp)=>{
    if(req.method === "GET" || req.method === "/"){
        let doc = fs.readFileSync(__dirname + "/index.html", "utf-8");
        resp.end(doc);
    }
        if(req.method === "POST" || req.method === "/form"){
        let body = "";

        req.on("data", chunck=>{
            body += chunck.toString();
        })

        req.on("end", ()=>{
            const dados = queryString.parse(body);

            const nome = dados.e_name;
            const mensagem = dados.e_mensagem;

            console.log("Meu nome é: " + nome + "\n" + "Mensagem: " + mensagem);

            let doc = fs.readFileSync(__dirname + "/obrigado.html", "utf-8");

            resp.end(doc);
            
        })
    }

}).listen(8080);
