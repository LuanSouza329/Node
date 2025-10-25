const express = require("express");
const app = express();

const userRouters = require("./routes/userRoutes");
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/users", userRouters);


app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})
