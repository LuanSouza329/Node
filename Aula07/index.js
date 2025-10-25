/* (async ()=>{
    const db = require("./db");

    console.log("Inserir novo Cliente");

    await db.inserir({nome: "Kaique", idade: 28});

    console.log("Obter todos os clientes")
    
    const clientes = await db.todosClientes();

    console.log(clientes);
})(); */

/* (async ()=>{
    const db = require("./db");

    console.log("Atualizar novo Cliente");

    await db.atualizar(4 ,{nome: "Kaique", idade: 27});
    console.log("Obter todos os clientes")
    
    const clientes = await db.todosClientes();

    console.log(clientes);
})(); */

(async ()=>{
    const db = require("./db");

    console.log("Deletar Cliente");

    await db.deletar(4);
    
    const clientes = await db.todosClientes();

    console.log(clientes);
})();