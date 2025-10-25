const fs = require("node:fs").promises;

async function writeFile() {
    try {
        const cvsHeaders = "nome, sobreNome, idade";
        await fs.writeFile("nomes.cvs", cvsHeaders);
    } catch (error) {
        console.log(`Houve um erro na criação do arquivo ${error.message}`);       
    }
}

async function addName(nome, sobreNome, idade){
    try {
        const cvsLine = `\n ${nome},${sobreNome},${idade}`;
        await fs.writeFile("nomes.csv", cvsLine, {flag: 'a'});
        console.log("Usuário cadastrado!")
    } catch (error) {
        console.log(`Houve um erro na escrita do arquivo ${error.message}`);       
    }
}

writeFile();
addName("Evelyn", "Giuponni", 29);