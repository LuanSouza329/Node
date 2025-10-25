const mysql = require("mysql2/promise");

class Database {
  constructor() {
    this.conexion = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
  }

  getConnection() {
    return this.conexion;
  }
}

module.exports = new Database();
