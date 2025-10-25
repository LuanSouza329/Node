const express = require("express");
const rotas = express.Router();

let cursosInfo = [
    {"curso" : "Node", "info" : "Curso de Node"},
    {"curso" : "Java", "info" : "Curso de Java"},
    {"curso" : "React", "info" : "Curso de React"},
    {"curso" : "Python", "info" : "Curso de Python"},
    {"curso" : "JavaScript", "info" : "Curso de JavaScript"}
];

/* 
    Gets
*/

rotas.get('/', (req, res)=>{
    res.json({ola : "Seja bem-vindo"})
})

rotas.get("/:cursoid", (req, res)=> {
    const curso = req.params.cursoid.toLowerCase();

    const cursoI = cursosInfo.find(i => i.curso.toLowerCase() === curso);

    if (!cursoI) {
        res.status(404).json({
            erro: "Curso não encontrado",
            cursoPesquisado: curso
        });
    } else {
        res.status(200).json(cursoI);
    }
});


module.exports = rotas