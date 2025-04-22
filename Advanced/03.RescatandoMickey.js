/*
 * EJERCICIO:
 * ¡Disney ha presentado un montón de novedades en su D23! 
 * Pero... ¿Dónde está Mickey?
 * Mickey Mouse ha quedado atrapado en un laberinto mágico 
 * creado por Maléfica.
 * Desarrolla un programa para ayudarlo a escapar.
 * Requisitos:
 * 1. El laberinto está formado por un cuadrado de 6x6 celdas.
 * 2. Los valores de las celdas serán:
 *    - ⬜️ Vacío
 *    - ⬛️ Obstáculo
 *    - 🐭 Mickey
 *    - 🚪 Salida
 * Acciones:
 * 1. Crea una matriz que represente el laberinto (no hace falta
 * que se genere de manera automática).
 * 2. Interactúa con el usuario por consola para preguntarle hacia
 * donde se tiene que desplazar (arriba, abajo, izquierda o derecha).
 * 3. Muestra la actualización del laberinto tras cada desplazamiento.
 * 4. Valida todos los movimientos, teniendo en cuenta los límites
 * del laberinto y los obstáculos. Notifica al usuario.
 * 5. Finaliza el programa cuando Mickey llegue a la salida.
 */

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise(resolve => rl.question(pregunta, resolve));
}

// Definimos el laberinto
let laberinto = [
    ["⬜️", "⬛️", "⬜️", "⬜️", "⬜️", "⬜️"],
    ["⬜️", "⬛️", "⬜️", "⬛️", "⬛️", "⬜️"],
    ["⬜️", "⬛️", "⬜️", "⬜️", "⬜️", "⬜️"],
    ["⬜️", "⬜️", "⬛️", "⬛️", "⬜️", "⬛️"],
    ["⬜️", "⬜️", "⬜️", "⬛️", "⬜️", "⬜️"],
    ["🐭", "⬛️", "⬜️", "⬜️", "⬜️", "🚪"]
];

// Posición inicial de Mickey
let mickeyPos = { row: 5, col: 0 };

function mostrarLaberinto() {
    console.clear();
    laberinto.forEach(row => {
        console.log(row.join(" "));
    });
}

function moverMickey(direccion) {
    const { row, col } = mickeyPos;
    let nuevaFila = row;
    let nuevaCol = col;

    switch (direccion.toLowerCase()) {
        case "arriba":
            nuevaFila--;
            break;
        case "abajo":
            nuevaFila++;
            break;
        case "izquierda":
            nuevaCol--;
            break;
        case "derecha":
            nuevaCol++;
            break;
        default:
            console.log("❗️ Dirección inválida. Usa arriba, abajo, izquierda o derecha.");
            return;
    }

    if (
        nuevaFila < 0 || nuevaFila >= 6 ||
        nuevaCol < 0 || nuevaCol >= 6
    ) {
        console.log("🚫 No puedes salirte del laberinto.");
        return;
    }

    const celdaDestino = laberinto[nuevaFila][nuevaCol];

    if (celdaDestino === "⬛️") {
        console.log("🚧 ¡Hay un obstáculo en esa dirección!");
        return;
    }

    if (celdaDestino === "🚪") {
        laberinto[row][col] = "⬜️";
        laberinto[nuevaFila][nuevaCol] = "🐭";
        mostrarLaberinto();
        console.log("🎉 ¡Mickey ha llegado a la salida! ¡Está libre!");
        process.exit(0);
    }

    // Movimiento válido
    laberinto[row][col] = "⬜️";
    laberinto[nuevaFila][nuevaCol] = "🐭";
    mickeyPos = { row: nuevaFila, col: nuevaCol };
}

async function jugar() {
    mostrarLaberinto();
    while (true) {
        const direccion = await preguntar("¿Hacia dónde debe moverse Mickey? (arriba/abajo/izquierda/derecha): ");
        moverMickey(direccion);
        mostrarLaberinto();
    }
}

jugar();
