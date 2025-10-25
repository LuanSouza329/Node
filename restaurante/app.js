const express = require("express");

const pratosController = require("./controllers/pratosController");

const path = require("path");

const app = express();

const port = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get('/cardapio', pratosController.listarPratos);

app.get("/", (req, res)=>{
    res.send("Bem-vindo ao nosso restaurante MVC! acesse /cardapio para ver os pratos");
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`);
    console.log(`Acesse: http://localhost:${port}/cardapio`);
})