/*
Utilizando un mecanismo de peticiones HTTP de javascript, 
realiza una petición a la web que tu quieras, 
verifica que dicha petición fue exitosa y muestra por consola el contenido de la web.
*/
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json(); // También puedes usar .text() si es HTML
    })
    .then(data => {
        console.log("Contenido recibido:", data);
    })
    .catch(error => {
        console.error("Error en la petición:", error.message);
    });

/*
Utilizando la PokéAPI (https://pokeapi.co), crea un programa por terminal al que le puedas solicitar
información de un Pokémon concreto utilizando su nombre o número.
- Muestra el nombre, id, peso, altura y tipo(s) del Pokémon.
- Si el Pokémon no existe, muestra un mensaje de error.
- Muestra el nombre de su cadena de evoluciones.
- Muestra los juegos en los que aparece.
- Controla posibles errores.
*/
//const fetch = require('node-fetch');
//const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const BASE_URL = 'https://pokeapi.co/api/v2';

async function getPokemonData(pokemon) {
    try {
        const res = await fetch(`${BASE_URL}/pokemon/${pokemon.toLowerCase()}`);
        if (!res.ok) throw new Error('Pokémon no encontrado');

        const data = await res.json();

        console.log(`\n🔍 Información del Pokémon:`);
        console.log(`Nombre: ${data.name}`);
        console.log(`ID: ${data.id}`);
        console.log(`Peso: ${data.weight}`);
        console.log(`Altura: ${data.height}`);
        console.log(`Tipo(s): ${data.types.map(t => t.type.name).join(', ')}`);

        // Juegos
        const games = data.game_indices.map(entry => entry.version.name);
        console.log(`Aparece en ${games.length} juego(s): ${games.join(', ')}`);

        // Obtener evolución
        await getEvolutionChain(data.species.url);

    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
    }
}

async function getEvolutionChain(speciesUrl) {
    try {
        const resSpecies = await fetch(speciesUrl);
        const speciesData = await resSpecies.json();

        const evoRes = await fetch(speciesData.evolution_chain.url);
        const evoData = await evoRes.json();

        console.log(`\n🔗 Cadena de evolución:`);

        let evolution = evoData.chain;
        while (evolution) {
            console.log(`- ${evolution.species.name}`);
            evolution = evolution.evolves_to[0];
        }

    } catch (err) {
        console.error(`❌ Error obteniendo la cadena de evolución: ${err.message}`);
    }
}

// Obtener el Pokémon desde la línea de comandos
const arg = process.argv[2];
if (!arg) {
    console.log("❗️ Debes introducir el nombre o ID del Pokémon.");
    process.exit(1);
}

getPokemonData(arg);
// Ejecutar el script con: node nombreDelArchivo.js nombreDelPokemon
// Ejemplo: node 22.PeticionesHTTP.js pikachu
// Ejemplo: node 22.PeticionesHTTP.js 25
