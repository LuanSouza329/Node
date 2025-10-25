const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send("Erro ao ler o arquivo HTML.");
        } else {
            res.setHeader("Content-Type", "text/html");
            console.log(filePath);
            res.send(data);
        }
    });
});

app.post("/form", (req, res)=>{
      const filePath = path.join(__dirname, "public", "obrigado.html");

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send("Erro ao ler o arquivo HTML.");
        } else {
            res.setHeader("Content-Type", "text/html");      
            const name = parseInt(req.body.i_name);
            
            console.log(name)
            res.send(data);
        }
    });
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
