import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorHandler.js";
import taskRouter from "./routes/taskRoute.js";

dotenv.config();

const PORT = process.env.PORT ;

const app = express();

app.use(express.json());

app.use("/task", taskRouter);

app.use(errorHandler);


app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})