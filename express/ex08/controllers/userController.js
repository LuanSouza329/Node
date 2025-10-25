const fs = require("fs").promises;
const path = require("path");

const dir_path = path.join(__dirname, "..", "dados", "dado.json");

exports.getAllUsers = async (req, res) => {
  try {
    const data = await fs.readFile(dir_path, "utf-8");
    const users = JSON.parse(data);
    res.json(users); // ✅ sempre entregar a resposta
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar usuários", error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {

    const { id } = req.params;

    const data = await fs.readFile(dir_path, "utf-8");
    const users = JSON.parse(data);

    const user = users.find(u => u.id === Number(id));

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
}

exports.createUser = async (req, res) => {
  try {
    const data = await fs.readFile(dir_path, 'utf-8');
    const users = JSON.parse(data);

    const newUser = {
      id: users.length + 1,
      ...req.body
    };

    users.push(newUser);

    await fs.writeFile(dir_path, JSON.stringify(users, null, 2));

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
}

exports.updateUser = async (req, res) => {
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
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await fs.readFile(dir_path, "utf-8");
    let users = JSON.parse(data);

    const user = users.find(u => u.id === Number(id));

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    users = users.filter(u => u.id !== Number(id));

    await fs.writeFile(dir_path, JSON.stringify(users, null, 2));

    res.status(200).json({ message: "Usuário apagado com sucesso", user });

  } catch (err) {

    res.status(500).json({ message: "Erro ao deletar usuário", error: err.message });
  }
}