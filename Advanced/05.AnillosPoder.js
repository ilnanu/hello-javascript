/*
 * EJERCICIO:
 * ¡La temporada 2 de "Los Anillos de Poder" está a punto de estrenarse! 
 * ¿Qué pasaría si tuvieras que encargarte de repartir los anillos
 * entre las razas de la Tierra Media?
 * Desarrolla un programa que se encargue de distribuirlos.
 * Requisitos:
 * 1. Los Elfos recibirán un número impar.
 * 2. Los Enanos un número primo.
 * 3. Los Hombres un número par.
 * 4. Sauron siempre uno.
 * Acciones:
 * 1. Crea un programa que reciba el número total de anillos
 *    y busque una posible combinación para repartirlos.
 * 2. Muestra el reparto final o el error al realizarlo.
 */
function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function repartirAnillos(total) {
    if (total < 4) {
        console.log("❌ No hay suficientes anillos para repartir correctamente.");
        return;
    }

    const anillosDisponibles = total - 1; // 1 para Sauron

    for (let elfos = 1; elfos <= anillosDisponibles; elfos += 2) { // solo impares
        for (let enanos = 2; enanos <= anillosDisponibles - elfos; enanos++) {
            const hombres = anillosDisponibles - elfos - enanos;
            if (esPrimo(enanos) && hombres >= 0 && hombres % 2 === 0) {
                console.log(`✅ Reparto válido para ${total} anillos:`);
                console.log(`🧝‍♂️ Elfos: ${elfos}`);
                console.log(`⛏️ Enanos: ${enanos}`);
                console.log(`🧔‍♂️ Hombres: ${hombres}`);
                console.log(`🧌 Sauron: 1`);
                return;
            }
        }
    }

    console.log("❌ No se pudo encontrar un reparto válido.");
}

// EJEMPLOS:
repartirAnillos(20);
repartirAnillos(15);
repartirAnillos(7);
repartirAnillos(3); // no válido
