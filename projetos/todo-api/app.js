import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js";
import taskRouter from "./routes/taskRoute.js";
import swaggerDocs from "../../express/ex09/config/swagger.js";

dotenv.config();

const app = express();

swaggerDocs(app);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "Limite de requisições ultrapassado, tente mais tarde"
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use("/api", taskRouter);

// Tratamento de erros
app.use(errorHandler);

export default app;
