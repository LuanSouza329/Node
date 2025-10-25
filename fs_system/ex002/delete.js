const fs = require("node:fs").promises;

function deleteFile (path){
    try {
        fs.unlink(path);
        console.log("Arquivo deletado!");
    } catch (error) {
        console.log("Erro ao deletar arquivo" + error.message);
    }
}

deleteFile("./nomes.cvs");