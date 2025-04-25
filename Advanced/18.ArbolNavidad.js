/*
 * EJERCICIO:
 * ¡Ha comenzado diciembre! Es hora de montar nuestro
 * árbol de Navidad...
 * 
 * Desarrolla un programa que cree un árbol de Navidad
 * con una altura dinámica definida por el usuario por terminal.
 * 
 * Ejemplo de árbol de altura 5 (el tronco siempre será igual):
 * 
 *     *
 *    ***
 *   *****
 *  *******
 * *********
 *    |||
 *    |||
 *
 * El usuario podrá seleccionar las siguientes acciones:
 * 
 * - Añadir o eliminar la estrella en la copa del árbol (@)
 * - Añadir o eliminar bolas de dos en dos (o) aleatoriamente
 * - Añadir o eliminar luces de tres en tres (+) aleatoriamente
 * - Apagar (*) o encender (+) las luces (conservando su posición)
 * - Una luz y una bola no pueden estar en el mismo sitio
 *
 * Sólo puedes añadir una estrella, y tantas luces o bolas
 * como tengan cabida en el árbol. El programa debe notificar
 * cada una de las acciones (o por el contrario, cuando no
 * se pueda realizar alguna).
 */
const readline = require('readline');

// Crear interfaz de entrada/salida por terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para dibujar el árbol
function dibujarArbol(altura, estrella, bolas, luces) {
    // Calcular la base del árbol (número de asteriscos por fila)
    let arbol = '';
    for (let i = 1; i <= altura; i++) {
        let fila = ' '.repeat(altura - i) + '*'.repeat(2 * i - 1);
        // Agregar bolas y luces a la fila
        for (let j = 0; j < fila.length; j++) {
            if (bolas.includes(i + '-' + j)) {
                fila = fila.slice(0, j) + 'o' + fila.slice(j + 1);
            }
            if (luces.includes(i + '-' + j)) {
                fila = fila.slice(0, j) + '+' + fila.slice(j + 1);
            }
        }
        arbol += fila + '\n';
    }

    // Agregar la estrella en la copa del árbol
    if (estrella) {
        arbol = ' '.repeat(altura - 1) + '@' + '\n' + arbol;
    } else {
        arbol = ' '.repeat(altura - 1) + '*' + '\n' + arbol;
    }

    // Agregar el tronco
    arbol += ' '.repeat(altura - 1) + '|||' + '\n'.repeat(2);

    // Mostrar el árbol
    console.log(arbol);
}

// Función para hacer preguntas al usuario
function preguntarAccion() {
    rl.question('¿Qué acción quieres realizar? (Añadir o eliminar estrella, bolas, luces, apagar luces): ', (accion) => {
        if (accion.includes("estrella")) {
            estrella = !estrella; // Cambiar estado de la estrella
            console.log(estrella ? "Estrella añadida al árbol." : "Estrella eliminada del árbol.");
        } else if (accion.includes("bola")) {
            // Añadir o eliminar bolas aleatorias
            let bola = `${Math.floor(Math.random() * altura)}-${Math.floor(Math.random() * (altura * 2 - 1))}`;
            if (!bolas.includes(bola)) {
                bolas.push(bola);
                console.log(`Bola añadida en la posición: ${bola}`);
            } else {
                bolas = bolas.filter(b => b !== bola);
                console.log(`Bola eliminada de la posición: ${bola}`);
            }
        } else if (accion.includes("luz")) {
            // Añadir o eliminar luces aleatorias
            let luz = `${Math.floor(Math.random() * altura)}-${Math.floor(Math.random() * (altura * 2 - 1))}`;
            if (!luces.includes(luz)) {
                luces.push(luz);
                console.log(`Luz añadida en la posición: ${luz}`);
            } else {
                luces = luces.filter(l => l !== luz);
                console.log(`Luz eliminada de la posición: ${luz}`);
            }
        } else if (accion.includes("apagar")) {
            luces = []; // Apagar todas las luces
            console.log("Todas las luces están apagadas.");
        } else {
            console.log("Acción no reconocida.");
        }

        // Mostrar el árbol después de la acción
        dibujarArbol(altura, estrella, bolas, luces);
        preguntarAccion(); // Volver a preguntar
    });
}

// Preguntar al usuario la altura del árbol
rl.question('Introduce la altura del árbol de Navidad (número): ', (alturaStr) => {
    const altura = parseInt(alturaStr);
    if (isNaN(altura) || altura <= 0) {
        console.log('Por favor, ingresa un número válido para la altura.');
        rl.close();
        return;
    }

    // Inicializar variables
    let estrella = false;  // Estrella en la copa del árbol
    let bolas = [];        // Lista de bolas
    let luces = [];        // Lista de luces

    // Dibujar el árbol inicial
    dibujarArbol(altura, estrella, bolas, luces);

    // Comenzar la interacción
    preguntarAccion();
});
