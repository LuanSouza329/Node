import * as readline from 'readline';
import chalk from 'chalk';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pergunta(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}


function taboada(numero) {
    console.log( chalk.yellow(`\nTabuada do ${numero}:`));
    for (let i = 1; i <= 10; i++) {
        console.log(chalk.italic(`${numero} x ${i} = ${numero * i}`));
    }
}

async function iniciarTabuada() {
    console.log(chalk.bgGreenBright(chalk.bold(" SEJA BEM VINDO A TABOADA ")));
    
    let continuar = true;
    
    while(continuar) {
        try {
            let numero = await pergunta("Digite um número ");
            
            // Verifica se a entrada é um número válido.
            const numeroValidado = parseInt(numero, 10);
            if(isNaN(numeroValidado)) {
                console.log( chalk.red(chalk.bold("Por favor, digite um número válido.")));
                continue; 
            }

            taboada(numeroValidado);

            const resposta = await pergunta("Gostaria de fazer uma nova consulta? (s/n) ");

            if (resposta.toLowerCase() !== 's') {
                continuar = false;
            }

        } catch(err) {
            console.log(`Erro ao receber dados: ${err.message}`);
            continuar = false; // Se der erro, encerra o loop
        }
    }

    // A interface é fechada APENAS UMA VEZ, após o loop terminar
    rl.close();
    console.log("Obrigado por utilizar a tabuada!");
}

iniciarTabuada(); 