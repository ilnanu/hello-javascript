/*
 * EJERCICIO:
 * ¡Deadpool y Wolverine se enfrentan en una batalla épica!
 * Crea un programa que simule la pelea y determine un ganador.
 * El programa simula un combate por turnos, donde cada protagonista posee unos
 * puntos de vida iniciales, un daño de ataque variable y diferentes cualidades
 * de regeneración y evasión de ataques.
 * Requisitos:
 * 1. El usuario debe determinar la vida inicial de cada protagonista.
 * 2. Cada personaje puede impartir un daño aleatorio:
 *    - Deadpool: Entre 10 y 100.
 *    - Wolverine: Entre 10 y 120.
 * 3. Si el daño es el máximo, el personaje que lo recibe no ataca en el
 * siguiente turno, ya que tiene que regenerarse (pero no aumenta vida).
 * 4. Cada personaje puede evitar el ataque contrario:
 *    - Deadpool: 25% de posibilidades.
 *    - Wolverine: 20% de posibilidades.
 * 5. Un personaje pierde si sus puntos de vida llegan a cero o menos.
 * Acciones:
 * 1. Simula una batalla.
 * 2. Muestra el número del turno (pausa de 1 segundo entre turnos).
 * 3. Muestra qué pasa en cada turno.
 * 4. Muestra la vida en cada turno.
 * 5. Muestra el resultado final.
 */
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise(resolve => rl.question(pregunta, resolve));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function startBattle() {
    console.log("💥 ¡Deadpool vs Wolverine - Batalla Épica!");

    const vidaDeadpool = parseInt(await preguntar("🔴 Vida inicial de Deadpool: "));
    const vidaWolverine = parseInt(await preguntar("🟡 Vida inicial de Wolverine: "));

    rl.close();

    let deadpool = {
        nombre: "Deadpool",
        vida: vidaDeadpool,
        evasion: 0.25,
        maxDamage: 100,
        skipTurn: false
    };

    let wolverine = {
        nombre: "Wolverine",
        vida: vidaWolverine,
        evasion: 0.20,
        maxDamage: 120,
        skipTurn: false
    };

    let turno = 1;

    while (deadpool.vida > 0 && wolverine.vida > 0) {
        console.log(`\n🕒 Turno ${turno}`);
        await sleep(1000);

        // Turno de Deadpool
        if (!deadpool.skipTurn) {
            const damage = getRandom(10, 100);
            if (Math.random() < wolverine.evasion) {
                console.log("🟡 Wolverine esquivó el ataque de Deadpool.");
            } else {
                wolverine.vida -= damage;
                console.log(`🔴 Deadpool ataca con ${damage} puntos de daño.`);
                if (damage === 100) {
                    wolverine.skipTurn = true;
                    console.log("💥 Daño máximo. Wolverine se ve obligado a regenerarse y pierde el siguiente turno.");
                }
            }
        } else {
            console.log("🟡 Wolverine se está regenerando y no puede atacar.");
            deadpool.skipTurn = false; // reseteamos por si fue golpeado también antes
            wolverine.skipTurn = false;
        }

        await sleep(1000);

        if (wolverine.vida <= 0) break;

        // Turno de Wolverine
        if (!wolverine.skipTurn) {
            const damage = getRandom(10, 120);
            if (Math.random() < deadpool.evasion) {
                console.log("🔴 Deadpool esquivó el ataque de Wolverine.");
            } else {
                deadpool.vida -= damage;
                console.log(`🟡 Wolverine ataca con ${damage} puntos de daño.`);
                if (damage === 120) {
                    deadpool.skipTurn = true;
                    console.log("💥 Daño máximo. Deadpool se ve obligado a regenerarse y pierde el siguiente turno.");
                }
            }
        } else {
            console.log("🔴 Deadpool se está regenerando y no puede atacar.");
            deadpool.skipTurn = false;
            wolverine.skipTurn = false;
        }

        await sleep(1000);

        // Mostrar estado
        console.log(`❤️ Deadpool: ${Math.max(0, deadpool.vida)} | ❤️ Wolverine: ${Math.max(0, wolverine.vida)}`);

        turno++;
    }

    console.log("\n🎬 ¡La batalla ha terminado!");
    if (deadpool.vida <= 0 && wolverine.vida <= 0) {
        console.log("🪦 ¡Ambos han caído! Empate mortal.");
    } else if (deadpool.vida <= 0) {
        console.log("🏆 ¡Wolverine gana la batalla!");
    } else {
        console.log("🏆 ¡Deadpool gana la batalla!");
    }
}

startBattle();
