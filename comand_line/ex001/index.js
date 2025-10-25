#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");


const args = process.argv.slice(2);

// O primeiro argumento (args[0]) é o nosso 'comando'
const comando = args[0];

if (comando === "ola"){
    const greeting = chalk.white.bold("Hello");

    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "green",
        backgroundColor: "red"
    }

    const msgBox = boxen(greeting, boxenOptions);

    console.log(msgBox);  
}else {
    console.log("COMADOS DISPONÍVEIS \n ---> ola");
}