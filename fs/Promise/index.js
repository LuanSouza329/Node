const fsPromisse = require("node:fs/promises");

fsPromisse.readFile(__dirname+"/file.txt", "utf-8")

.then(data => console.log(data))

.catch(erro => console.log(erro));


console.log("olá");