import db from "../config/database.js";

class Task {

    static async getAllTask() {
        const [rows] = await db.getConnection().query("SELECT * FROM tarefas");
        return rows;
    }

    static async createTask(titulo, descricao) {
        const [result] = await db.getConnection().query("INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)", [titulo, descricao]);
        return { id: result.insertId, titulo, descricao };
    }

    static async getTask(id) {
        const [rows] = await db.getConnection().query("SELECT * FROM tarefas WHERE id = ?", [id]);
        return rows[0];
    }

    static async updateTask(id, titulo, descricao) {
        const [result] = await db.getConnection().query("UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?", [titulo, descricao, id]);

        if (result.affectedRows === 0) {
            return null;
        }

        return { id, titulo, descricao };
    }

    static async deleteTask(id) {
        const [result] = await db.getConnection().query("DELETE FROM tarefas WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return null;
        }
    }
}

export default Task;