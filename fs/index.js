const fs = require("fs");

const file = fs.readFileSync("./file.txt", "utf-8");

console.log(file);

fs.writeFileSync("./file.txt", "Testando outra coisa e eu acho que isso apaga o que já estava");

fs.writeFile("./luan.txt", " Hola en Español", {flag: "a"}, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(" Arquivo escrito");
    }
})