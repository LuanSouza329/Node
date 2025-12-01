import mysql from "mysql2/promise";

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      await this.connection.getConnection();
      console.log("✅ Banco de dados conectado com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao conectar ao banco:", err.message);
      setTimeout(() => this.connect(), 5000);
    }
  }

  getConnection() {
    if (!this.connection) {
      console.warn("⚠️ Conexão ausente, tentando reconectar...");
      this.connect();
    }
    return this.connection;
  }
}

const db = new Database();
export default db;
