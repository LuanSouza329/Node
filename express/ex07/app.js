const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());


const dir_path = path.resolve("json", "dado.json");

app.get("/", async(req, res)=>{
   try{
        const data = await fs.readFile(dir_path, 'utf-8');
        const users = JSON.parse(data);
        res.status(200).json(users);
   }catch(err){
        res.status(502).json({message: "Erro ao buscar usuários"}); 
   }
})

app.get("/:id", async (req, res)=>{
    try{

        const { id } = req.params;

        const data = await fs.readFile(dir_path, 'utf-8');
        const users = JSON.parse(data);

        const user = users.find(u => u.id === Number(id));

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    }catch(err){
        res.status(500).json({ message: "Erro no servidor", error: err.message });
    }
})

app.post("/users", async(req, res)=>{
    try{

        const data = await fs.readFile(dir_path, 'utf-8');
        const users = JSON.parse(data);

        const newUser = {
            id: users.length + 1,
            ...req.body
        };

        users.push(newUser);

        await fs.writeFile(dir_path, JSON.stringify(users, null, 2));

        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({ message: "Erro no servidor", error: err.message });
    }
})

app.delete("/:id", async(req, res)=>{

    try{
        const {id} = req.params;

        const data = await fs.readFile(dir_path, 'utf-8');
        let users = JSON.parse(data);  

        let user = users.find(u => u.id === Number(id));
        
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        users = users.filter(u => u.id !== Number(id));


        await fs.writeFile(dir_path, JSON.stringify(users, null, 2));


        res.status(200).json({ message: "Usuário apagado com sucesso", user });
    }catch(err){

        res.status(500).json({ message: "Erro ao deletar usuário", error: err.message });
    }
})

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Lê os dados
    const data = await fs.readFile(dir_path, "utf-8");
    let users = JSON.parse(data);

    // 2. Encontra o índice do usuário
    const index = users.findIndex(u => u.id === Number(id));

    if (index === -1) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // 3. Atualiza o usuário mantendo o id
    users[index] = { ...users[index], ...req.body, id: Number(id) };

    // 4. Salva no arquivo
    await fs.writeFile(dir_path, JSON.stringify(users, null, 2));

    // 5. Retorna o usuário atualizado
    res.status(200).json(users[index]);

  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error: err.message });
  }
});


app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})