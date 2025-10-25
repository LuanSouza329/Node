const express = require("express");

const rotas = require("./rotas/rotas")

const porta = 8080;

const app = express();

app.use("/", rotas);


app.listen(porta, ()=>{
    console.log("rodando");
})