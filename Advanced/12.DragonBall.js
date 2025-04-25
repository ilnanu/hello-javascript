/*
 * EJERCICIO:
 * ¡El último videojuego de Dragon Ball ya está aquí!
 * Se llama Dragon Ball: Sparking! ZERO.
 *
 * Simula un Torneo de Artes Marciales, al más puro estilo
 * de la saga, donde participarán diferentes luchadores, y el
 * sistema decidirá quién es el ganador.
 *
 * Luchadores:
 * - Nombre.
 * - Tres atributos: velocidad, ataque y defensa
 *   (con valores entre 0 a 100 que tú decidirás).
 * - Comienza cada batalla con 100 de salud.
 * Batalla:
 * - En cada batalla se enfrentan 2 luchadores.
 * - El luchador con más velocidad comienza atacando.
 * - El daño se calcula restando el daño de ataque del
 *   atacante menos la defensa del oponente.
 * - El oponente siempre tiene un 20% de posibilidad de
 *   esquivar el ataque.
 * - Si la defensa es mayor que el ataque, recibe un 10%
 *   del daño de ataque.
 * - Después de cada turno y ataque, el oponente pierde salud.
 * - La batalla finaliza cuando un luchador pierde toda su salud.
 * Torneo:
 * - Un torneo sólo es válido con un número de luchadores
 *   potencia de 2.
 * - El torneo debe crear parejas al azar en cada ronda.
 * - Los luchadores se enfrentan en rondas eliminatorias.
 * - El ganador avanza a la siguiente ronda hasta que sólo
 *   quede uno.
 * - Debes mostrar por consola todo lo que sucede en el torneo,
 *   así como el ganador.
 */
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

class Luchador {
    constructor(nombre, velocidad, ataque, defensa) {
        this.nombre = nombre;
        this.velocidad = velocidad;
        this.ataque = ataque;
        this.defensa = defensa;
        this.salud = 100;
    }

    reset() {
        this.salud = 100;
    }
}

function esPotenciaDe2(n) {
    return n && (n & (n - 1)) === 0;
}

function dañoReal(ataque, defensa) {
    if (defensa >= ataque) return Math.floor(ataque * 0.1);
    return ataque - defensa;
}

function combate(luchador1, luchador2) {
    luchador1.reset();
    luchador2.reset();

    console.log(`\n🔥 ${luchador1.nombre} VS ${luchador2.nombre}`);

    let atacante = luchador1.velocidad >= luchador2.velocidad ? luchador1 : luchador2;
    let defensor = atacante === luchador1 ? luchador2 : luchador1;

    let turno = 1;

    while (luchador1.salud > 0 && luchador2.salud > 0) {
        console.log(`\n🔁 Turno ${turno}`);
        console.log(`👉 Ataca ${atacante.nombre}`);

        const esquiva = Math.random() < 0.2;
        if (esquiva) {
            console.log(`💨 ${defensor.nombre} esquivó el ataque`);
        } else {
            const daño = dañoReal(atacante.ataque, defensor.defensa);
            defensor.salud -= daño;
            console.log(`💥 Daño causado: ${daño}`);
            console.log(`❤️ Salud de ${defensor.nombre}: ${Math.max(defensor.salud, 0)}`);
        }

        [atacante, defensor] = [defensor, atacante];
        turno++;
    }

    const ganador = luchador1.salud > 0 ? luchador1 : luchador2;
    console.log(`🏆 ¡Gana ${ganador.nombre}!\n`);
    return ganador;
}

function torneo(luchadores) {
    if (!esPotenciaDe2(luchadores.length)) {
        console.log("❌ El número de luchadores debe ser potencia de 2 (4, 8, 16...)");
        return;
    }

    let ronda = 1;

    while (luchadores.length > 1) {
        console.log(`\n====== RONDA ${ronda} ======\n`);

        // Barajar luchadores
        luchadores = luchadores.sort(() => Math.random() - 0.5);

        const ganadores = [];

        for (let i = 0; i < luchadores.length; i += 2) {
            const ganador = combate(luchadores[i], luchadores[i + 1]);
            ganadores.push(ganador);
        }

        luchadores = ganadores;
        ronda++;
    }

    console.log(`🎉 El campeón definitivo es: ${luchadores[0].nombre.toUpperCase()} 🥇`);
}

// ⚔️ Luchadores de ejemplo
const luchadores = [
    new Luchador("Goku", 90, 95, 70),
    new Luchador("Vegeta", 85, 90, 75),
    new Luchador("Gohan", 80, 85, 80),
    new Luchador("Piccolo", 70, 78, 85),
    new Luchador("Trunks", 75, 82, 70),
    new Luchador("Freezer", 88, 93, 68),
    new Luchador("Cell", 84, 89, 72),
    new Luchador("Majin Buu", 60, 85, 95),
];

// 🧪 Iniciar torneo
torneo(luchadores);
