const pratoModel = require("../models/pratoModel");

function listarPratos (req, res){
    console.log("Controller: Recebi um pedido para listar os pratos");

    const todosOsPratos = pratoModel.getAllPratos();

    console.log("Controller: Enviando os pratos para a View");

    res.render('pratos', {pratos: todosOsPratos});
}

module.exports = {listarPratos}