import db from "./config/database.js";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { errorHandler } from "./middleware/errorHandler.js";
import taskRouter from "./routes/taskRoute.js";
import swaggerDocs from "../../express/ex09/config/swagger.js";

dotenv.config();

const PORT = process.env.PORT ;

await db.connect();

const app = express();
swaggerDocs(app);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 80,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: "Limite de requesições ultrapassado, tente mais tarde"
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(limiter);

app.use("/api", taskRouter);

app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})

