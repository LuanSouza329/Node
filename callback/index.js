function greet (name){
    console.log("Olá, " + name);
}

function hello (){
    const name = "Luan";
    greet(name);
}


function resultado (resultado){
    console.log(resultado)
}

async function soma (a, b){
    let res = 0;

    res = a + b;

    await resultado(res);
}


soma(1,2)


/* 
    Callback functions

    São funções que são passadas como argumentos para uma função ou método.
    Elas são importantes para a utilização de funções sincronas e asincronas.
*/