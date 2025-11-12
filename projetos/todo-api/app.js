import express from "express";
import dotenv from "dotenv";


("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.json("Olá mundo");
})


app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})