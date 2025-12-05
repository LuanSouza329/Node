import app from "./app.js";
import db from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Conecta banco ANTES de iniciar servidor
await db.connect();

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
