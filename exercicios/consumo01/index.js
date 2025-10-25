const axios = require ("axios");

async function BuscarPokemon(nome) {
    try {
        const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`);

        const pokemon = resposta.data;


        const moves = pokemon.moves.map(({move})=> move.name);

        console.log(moves.slice(0,5));

       
    }catch{
        console.log("Erro ao consumir");
    }
}

BuscarPokemon();