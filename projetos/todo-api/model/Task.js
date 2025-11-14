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
}


export default Task;