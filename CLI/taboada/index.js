import readLine from 'node:readline';

import { taboada } from "./taboadaFn.js";

const rl = readLine.createInterface({
    input:process.stdin,
    output:process.stdout
})


function perguntar (){
    rl.question("Digite um número: ", (n1)=>{
        taboada(n1);

        rl.question("Gostaria de fazer outra consulta? (S/N) ", (resposta)=>{
            if (resposta.toUpperCase() == "S"){
                perguntar()
            }else{
                console.log("Programa encerrado! ")
                rl.close()
            }
        })
    });
}

perguntar();