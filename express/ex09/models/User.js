const { deleteUser } = require("../../ex09/controllers/userController");
const db = require("../config/db");

class User {
    static async findAll({ page = 1, limit = 5, sort = "id", order = "ASC", name }) {

        page = parseInt(page);
        limit = parseInt(limit);

        if (isNaN(page) || page < 1) page = 1;
        if (isNaN(limit) || limit < 1) limit = 5;

        const offset = (page - 1) * limit;
        const params = [];
        let query = "SELECT * FROM usuarios";

        if (name) {
            query += " WHERE name LIKE ?";
            params.push(`%${name}%`);
        }

        query += ` ORDER BY ${sort} ${order.toUpperCase()} LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));

        const [rows] = await db.getConnection().query(query, params);
        return rows;
    }

    static async findUser(id) {
        const [rows] = await db.getConnection().query("SELECT * FROM usuarios WHERE id = ?", [id]);
        return rows[0];
    }

    static async createUser(name, email, hashedPassword) {
        const [result] = await db.getConnection().query(
            "INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );
        return { id: result.insertId, name, email };
    }

    static async updateUser(id, name, email) {
        const [result] = await db.getConnection().query("UPDATE usuarios SET name = ?, email = ? WHERE id = ?", [name, email, id]);

        if (result.affectedRows === 0) {
            return null;
        }

        return { id, name, email };
    }

    static async deleteUser(id) {
        const [result] = await db.getConnection().query("DELETE FROM usuarios WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return null;
        }

        return result.affectedRows > 0;
    }

    static async findByEmail(email) {
        const [rows] = await db.getConnection().query("SELECT * FROM usuarios WHERE email = ?", [email]);
        return rows[0];
    }

}

module.exports = User;

