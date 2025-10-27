require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRouter = require("./routes/authRouter");
const swaggerDocs = require("./config/swagger");



const app = express();
swaggerDocs(app);

const PORT = process.env.PORT || 8000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requisições por IP
  message: "Muitas requisições deste IP, tente novamente mais tarde.",
  message: {
    status: 429,
    message: "Muitas requisições vindas deste IP. Tente novamente mais tarde."
  }
})

app.use(express.json());
app.use(logger);
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(helmet()); //Proteção de cabeçalhos HTTP
app.use(limiter);

app.use("/users", userRoutes);
app.use("/auth", authRouter);

// 👇 sempre no final
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
