const pool = require("../config/db");

exports.getAllUsers = async(req, res) =>{
    try{
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.status(200).json(rows);
    }catch(err){
        res.status(500).json({ message: "Erro ao buscar usuários", error: err.message });
    }
}

exports.createUser = async(req, res) =>{
    try{
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Nome e email são obrigatórios" });
        }

        const [rows] = await pool.query(
            "INSERT INTO usuarios (name, email) VALUES (?, ?)",
            [name, email]
        );

        res.status(201).json({ id: rows.insertId, name, email });

    }catch(err){
        res.status(500).json({ message: "Erro ao criar usuário", error: err.message });
    }
}

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(rows[0]); 
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar usuário", error: err.message });
  }
};

exports.deleteUser = async (req, res) =>{
    try{
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id]);
        
        if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.status(200).json({ message: "Usuário deletado com sucesso" });

    }catch(err){
        res.status(500).json({ message: "Erro ao deletar usuário", error: err.message });
    }
}

exports.updateUser = async(req, res) =>{
    try {
        const {id} = req.params;

        const {name, email} = req.body;

        const [result] = await pool.query("UPDATE usuarios SET name = ?, email = ? WHERE id = ?",
            [name, email, id]
        );

        if(result.affectedRows === 0){
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const [updatedUser] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);

        res.status(200).json(updatedUser[0]); 
    } catch (err) {
        res.status(500).json({ message: "Erro ao atualizar usuário", error: err.message });
    }
}