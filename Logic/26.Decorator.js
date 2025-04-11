/*
 * EJERCICIO:
 * Explora el concepto de "decorador" y muestra cómo crearlo
 * con un ejemplo genérico.
 */
function decorador(funcionOriginal) {
    return function (...args) {
        console.log("Antes de ejecutar la función");
        const resultado = funcionOriginal(...args);
        console.log("Después de ejecutar la función");
        return resultado;
    };
}
function saludar(nombre) {
    console.log(`Hola, ${nombre}!`);
}
const saludarDecorado = decorador(saludar);
saludarDecorado("Juan"); // Antes de ejecutar la función
// Hola, Juan!
// Después de ejecutar la función

/*
 * DIFICULTAD EXTRA (opcional):
 * Crea un decorador que sea capaz de contabilizar cuántas veces
 * se ha llamado a una función y aplícalo a una función de tu elección.
 */
function contador(funcionOriginal) {
    let contador = 0;
    return function (...args) {
        contador++;
        console.log(`La función ha sido llamada ${contador} veces.`);
        return funcionOriginal(...args);
    };
}
function sumar(a, b) {
    return a + b;
}
const sumarContador = contador(sumar);
console.log(sumarContador(1, 2)); // La función ha sido llamada 1 veces.
// 3
console.log(sumarContador(3, 4)); // La función ha sido llamada 2 veces.
// 7
console.log(sumarContador(5, 6)); // La función ha sido llamada 3 veces.
// 11
console.log(sumarContador(7, 8)); // La función ha sido llamada 4 veces.
// 15
console.log(sumarContador(9, 10)); // La función ha sido llamada 5 veces.