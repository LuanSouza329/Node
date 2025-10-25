const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

const PersonRoutes = require("./routes/personRoutes");


//middWares Json
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

//Rotas API

app.use('/person', PersonRoutes);


app.get("/", (req, res) => {
    res.status(200).json({ message: "Olá mundo em JSON" });
})

const DB_USER = encodeURIComponent("supportlatam2");
const DB_PASSWORD = encodeURIComponent("teste12345");

//Conexão com mongo DB usando promiesse

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.0uanwxi.mongodb.net/`)
    .then(() => {
        console.log("Conectando ao mongoDB");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        })
    })

    .catch((err) => {
        console.log(err)
    })

//



