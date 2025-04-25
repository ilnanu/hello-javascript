/*
 * EJERCICIO:
 * Papá Noel tiene que comenzar a repartir los regalos...
 * ¡Pero ha olvidado el código secreto de apertura del almacén!
 *
 * Crea un programa donde introducir códigos y obtener pistas.
 * 
 * Código:
 * - El código es una combinación de letras y números aleatorios
 *   de longitud 4. (Letras: de la A a la C, Números: del 1 al 3)
 * - No hay repetidos.
 * - Se genera de manera aleatoria al iniciar el programa.
 * 
 * Usuario:
 * - Dispone de 10 intentos para acertarlo.
 * - En cada turno deberá escribir un código de 4 caracteres, y 
 *   el programa le indicará para cada uno lo siguiente:
 *   - Correcto: Si el caracter está en la posición correcta.
 *   - Presente: Si el caracter existe, pero esa no es su posición.
 *   - Incorrecto: Si el caracter no existe en el código secreto.
 * - Deben controlarse errores de longitud y caracteres soportados.
 * 
 * Finalización:
 * - Papa Noel gana si descifra el código antes de 10 intentos.
 * - Pierde si no lo logra, ya que no podría entregar los regalos.
 */
const readline = require('readline');

// Crear interfaz de entrada/salida por terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Generar el código secreto
function generarCodigoSecreto() {
    const letras = ['A', 'B', 'C'];
    const numeros = ['1', '2', '3'];
    let codigo = [];

    // Crear el código con letras y números aleatorios sin repetidos
    while (codigo.length < 4) {
        const eleccion = Math.random() > 0.5 ? letras : numeros;
        const nuevoCaracter = eleccion[Math.floor(Math.random() * eleccion.length)];
        if (!codigo.includes(nuevoCaracter)) {
            codigo.push(nuevoCaracter);
        }
    }

    return codigo.join('');
}

// Función para dar la pista
function darPista(codigoSecreto, intento) {
    let pista = '';

    // Comprobar cada carácter
    for (let i = 0; i < intento.length; i++) {
        if (codigoSecreto[i] === intento[i]) {
            pista += 'Correcto ';
        } else if (codigoSecreto.includes(intento[i])) {
            pista += 'Presente ';
        } else {
            pista += 'Incorrecto ';
        }
    }

    return pista.trim();
}

// Función principal del juego
function jugar(codigoSecreto, intentosRestantes) {
    if (intentosRestantes <= 0) {
        console.log(`¡Has perdido! El código secreto era: ${codigoSecreto}`);
        rl.close();
        return;
    }

    rl.question('Introduce el código de 4 caracteres (letras A-C y números 1-3): ', (intento) => {
        // Validación de longitud y caracteres válidos
        if (intento.length !== 4 || !/^[A-C1-3]+$/.test(intento)) {
            console.log('Código inválido. Asegúrate de que tiene 4 caracteres y sólo incluye A, B, C, 1, 2, 3.');
            jugar(codigoSecreto, intentosRestantes);
            return;
        }

        // Dar la pista
        const pista = darPista(codigoSecreto, intento);
        console.log(pista);

        if (intento === codigoSecreto) {
            console.log('¡Felicidades! Has acertado el código secreto.');
            rl.close();
        } else {
            console.log(`Te quedan ${intentosRestantes - 1} intentos.`);
            jugar(codigoSecreto, intentosRestantes - 1);
        }
    });
}

// Generar un código secreto al azar
const codigoSecreto = generarCodigoSecreto();
console.log('¡Bienvenido al juego! Tienes 10 intentos para adivinar el código secreto.');

// Comenzar el juego con 10 intentos
jugar(codigoSecreto, 10);
