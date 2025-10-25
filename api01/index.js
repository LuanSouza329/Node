const express = require("express");

const app = express();

app.use(express.json()); 

const produtos = ["Morango", "Uva", "Pera", "Limão"];

app.get('/', (req, res) => {
    res.send('Olá, mundo! Sua API está funcionando!');
});

app.get("/produtos", (req, res) => {
    res.status(200).send(produtos)
})

app.post("/produtos", (req, res) =>{

    const fruta = req.body.fruta;

    produtos.push(fruta);

    res.status(201).json({
        mensagem: `${fruta} adicionada!`,
        produtos: produtos
    })
})

app.listen(8080, () => {
    console.log("Rodando");
})