/*
 * EJERCICIO:
 * ¡Cada año celebramos el aDEViento! 24 días, 24 regalos para
 * developers. Del 1 al 24 de diciembre: https://adviento.dev
 * 
 * Dibuja un calendario por terminal e implementa una
 * funcionalidad para seleccionar días y mostrar regalos.
 * - El calendario mostrará los días del 1 al 24 repartidos
 *   en 6 columnas a modo de cuadrícula.
 * - Cada cuadrícula correspondiente a un día tendrá un tamaño 
 *   de 4x3 caracteres, y sus bordes serán asteríscos.
 * - Las cuadrículas dejarán un espacio entre ellas.
 * - En el medio de cada cuadrícula aparecerá el día entre el
 *   01 y el 24.
 *
 * Ejemplo de cuadrículas:
 * **** **** ****
 * *01* *02* *03* ...
 * **** **** ****
 *
 * - El usuario selecciona qué día quiere descubrir.
 * - Si está sin descubrir, se le dirá que ha abierto ese día
 *   y se mostrará de nuevo el calendario con esa cuadrícula
 *   cubierta de asteríscos (sin mostrar el día).
 *
 * Ejemplo de selección del día 1
 * **** **** ****
 * **** *02* *03* ...
 * **** **** ****
 *   
 * - Si se selecciona un número ya descubierto, se le notifica
 *   al usuario.
 */
const readline = require('readline');

// Crear interfaz de entrada/salida por terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Estructura de calendario: 6 filas y 4 columnas de días
const calendario = Array(6).fill(null).map(() => Array(4).fill(false));

// Función para mostrar el calendario
function mostrarCalendario() {
    console.clear(); // Limpiar la terminal antes de mostrar el calendario
    for (let fila = 0; fila < 6; fila++) {
        let row = '';
        for (let col = 0; col < 4; col++) {
            const dia = fila * 4 + col + 1;
            const diaFormateado = dia < 10 ? `0${dia}` : `${dia}`;
            if (dia <= 24) {
                if (calendario[fila][col]) {
                    row += `**** `;
                } else {
                    row += `*${diaFormateado}* `;
                }
            }
        }
        console.log(row);
    }
}

// Función para que el usuario elija un día
function elegirDia() {
    rl.question('Elige un día (1-24) para abrir: ', (dia) => {
        const diaNum = parseInt(dia);
        if (isNaN(diaNum) || diaNum < 1 || diaNum > 24) {
            console.log('Por favor, ingresa un número entre 1 y 24.');
            elegirDia();
        } else {
            const fila = Math.floor((diaNum - 1) / 4);
            const col = (diaNum - 1) % 4;
            if (calendario[fila][col]) {
                console.log(`¡Ya has descubierto el día ${diaNum}!`);
            } else {
                calendario[fila][col] = true; // Marcar como descubierto
                console.log(`¡Has abierto el día ${diaNum}!`);
            }
            mostrarCalendario();
            elegirDia(); // Continuar eligiendo días
        }
    });
}

// Mostrar calendario inicial y empezar la interacción
mostrarCalendario();
elegirDia();
