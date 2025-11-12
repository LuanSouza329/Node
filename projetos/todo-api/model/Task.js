import db from "../config/database.js";

class Task {

    static async getAllTask() {
        const [rows] = await db.getConnection().query("SELECT * FROM tarefas");
        return rows;
    }
}


export default Task;