const express = require("express")
const path = require("node:path");
const fs = require("fs").promises;

const PORT = process.env.PORT || 8000;
const app = express();


async function ObterPag() {
    const site = path.resolve("public", "index.html");
    const data =  await fs.readFile(site, "utf-8");

    return data;
}

app.get("/", (req, res)=>{
    res.send("Olá mundo")
})

app.get("/site", async (req, res) => {
    try {
        const site = await ObterPag();
        res.send(site);
    } catch (error) {
        res.status(500).send("Erro ao carregar página: " + error.message);
    }
});


app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})

