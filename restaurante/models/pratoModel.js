const pratos = [
    {id: 1, nome: "Pizza de Bacon", preco: 45.00, descricao: "Pizza grande, serve 8 pessoas, a melhor Pizza do Brasil"},
    {id: 2, nome: "Pizza de 4 Queijos", preco: 49.00, descricao: "Pizza grande, serve 8 pessoas, a melhor Pizza do Brasil"},
    {id: 3, nome: "Pizza de Calabresa", preco: 42.50, descricao: "Pizza grande, serve 8 pessoas, a melhor Pizza do Brasil"}
]

function getAllPratos(){
    console.log("Buscando todos os pratos");
    return pratos;
}

module.exports = {getAllPratos};