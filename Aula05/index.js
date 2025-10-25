const http = require("http");
const fs = require("fs");

http.createServer((req, resp)=>{
   fs.readFile(__dirname + "/index.html", (error, data)=>{
        resp.writeHead(200, {"Content-Type":"text/html"})
        resp.write(data);
        resp.end()
   })
}).listen(8080);

