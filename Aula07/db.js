

const conectar = async ()=>{
    if (global.conexao && global.conexao.state != "disconected"){
        return global.conexao;
    }

    const mysql = require("mysql2/promise");
    
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "clientes"
    })

    console.log("Conectado");

    global.conexao = con;

    return con;
}

const todosClientes = async ()=>{
    const con = await conectar();

    const [linhas] = await con.query("SELECT * FROM cli_cliente");

    return await linhas;
}

const inserir = async (cliente) =>{
    const con = await conectar();

    const valores = [cliente.nome, cliente.idade];

    const sql = "INSERT INTO cli_cliente (nome, idade) VALUES (?,?)";

    await con.query(sql, valores);
}

const atualizar = async (id,cliente) =>{
    const con = await conectar();

    const valores = [cliente.nome, cliente.idade, id];

    const sql = "UPDATE cli_cliente SET nome = ?, idade = ? WHERE id = ?";

    await con.query(sql, valores);
}

const deletar = async (id) =>{
    const con = await conectar();

    const sql = "DELETE FROM cli_cliente WHERE id = ?";

    await con.query(sql, id);

    console.log("Cliente deletado");
}


module.exports = {todosClientes, inserir, atualizar, deletar}