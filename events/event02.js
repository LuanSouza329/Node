const event = require("events");

class Pizza  extends event{
    constructor(){
        super();
        this.pedido = 0;
    }
    order(tamanho, sabor){
        this.pedido++;
        this.emit("order", tamanho, sabor);
    }
    numPedido(){
        console.log(`Número atual de pedidos é ${this.pedido}`);
    }
}

module.exports = Pizza;