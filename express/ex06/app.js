const path = require('node:path');
const fs = require('node:fs').promises;
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const caminho = path.resolve("json", "user.json");
const bodyUser = require("body-parser");

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




app.get("/", async(req, res) =>{
    try{
        const data = await fs.readFile(caminho, 'utf-8');
        res.status(200).json(JSON.parse(data));
    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.get("/:id",async(req, res)=>{
    const data = await fs.readFile(caminho, 'utf-8');
    let users = JSON.parse(data);
    let user = users["user"+ req.params.id];
    res.json(user);
})

app.post("/", async (req, res) => {
  try {
    // lê o arquivo existente
    const data = await fs.readFile(caminho, "utf-8");
    let users = JSON.parse(data);

    // pega a chave enviada (ex: "user4")
    const key = Object.keys(req.body)[0];
    const user = req.body[key];

    // adiciona no objeto existente
    users[key] = user;

    // grava de volta no arquivo
    await fs.writeFile(caminho, JSON.stringify(users, null, 2));

    res.status(201).json({ [key]: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(caminho, "utf-8");
    let users = JSON.parse(data);

    let id = "user" + req.params.id;

    if (!users[id]) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // guarda o usuário deletado para mostrar na resposta
    let deletedUser = users[id];

    // deleta do objeto
    delete users[id];

    // reescreve o arquivo sem o usuário removido
    await fs.writeFile(caminho, JSON.stringify(users, null, 2));

    res.json({ message: "Usuário deletado com sucesso", deleted: deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar objeto", details: err.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(caminho, "utf-8");
    let users = JSON.parse(data);

    // chave enviada no body (ex: "user3")
    const key = Object.keys(req.body)[0];
    const user = req.body[key];

    // chave da URL (ex: id=3 → "user3")
    const id = "user" + req.params.id;

    if (!users[id]) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // substitui o usuário existente
    users[id] = user;

    // salva no arquivo
    await fs.writeFile(caminho, JSON.stringify(users, null, 2));

    res.json({ message: "Usuário atualizado com sucesso", [id]: user });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar objeto", details: err.message });
  }
});


app.listen(PORT, ()=>{
    console.log(`servidor rodando na porta ${PORT}`);
})