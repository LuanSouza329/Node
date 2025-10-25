const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get("/", (req, res)=>{
    res.status(200).send("Pedido feito com sucesso");
})  

app.get("/sobre", (req, res)=>{
    res.render("sobre");
})

app.listen(PORT, ()=>{
    console.log(`Servidor iniciado na porta: ${PORT}`);
})
