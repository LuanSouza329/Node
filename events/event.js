/* const event = require("events");

const ev = new event();

ev.on("pedir-pizza", (tamanho, sabor)=>{
    console.log(`Pedido recebido \n Tamanho: ${tamanho} \n Sabor: ${sabor}` );
})


ev.emit("pedir-pizza", 8, "Frango e Catupiry");

 */


const Pizza = require("./event02");


const piz = new Pizza();

piz.on("order", (tamanho, sabor) => {
    console.log(`Pedido recebido \n Tamanho: ${tamanho} \n Sabor: ${sabor}`);
});

piz.order(8, "Catupiry");
piz.numPedido();