const mysql = require("mysql");

const connection =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clientes"
});

connection.connect( async (err, result) => {
    if (err) throw err;
    console.log("Conectado com o banco de dados");
    connection.query("SELECT * FROM cli_cliente",function(err, result){
        if(err){
            throw err;
        }
        console.log(result);
        connection.end();
    })
})

