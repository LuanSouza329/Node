const express = require('express');

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("TÉSTE COM ACENTUAÇÃO");
    res.end();
})

app.get("/canal", (req, res) => {
    res.json({
        pessoa: "Luan",
        idade: 32,
        curso: "Node",
    });
    res.end();
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
});