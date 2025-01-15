/*
Clase 20 - Ejercicios: Operadores
Vídeo: https://youtu.be/1glVfFxj8a4?t=6458
*/

// 1. Crea una variable para cada operación aritmética

let suma = 2 + 3
let resta = 2 - 3
let multiplicacion = 2 * 3
let division = 2 / 3
let modulo = 2 % 3

console.log(suma)
console.log(resta)
console.log(multiplicacion)
console.log(division)
console.log(modulo)

// 2. Crea una variable para cada tipo de operación de asignación,
//    que haga uso de las variables utilizadas para las operaciones aritméticas

let sumaAsignacion = 2
let restaAsignacion = 2
let multiplicacionAsignacion = 2
let divisionAsignacion = 2
let moduloAsignacion = 2

// 3. Imprime 5 comparaciones verdaderas con diferentes operadores de comparación

console.log(2 > 1)
console.log(2 >= 2)
console.log(2 < 3)
console.log(2 <= 2)
console.log(2 === 2)

// 4. Imprime 5 comparaciones falsas con diferentes operadores de comparación

console.log(2 < 1)
console.log(2 <= 1)
console.log(2 > 3)
console.log(2 >= 3)
console.log(2 === 3)

// 5. Utiliza el operador lógico and

console.log(2 > 1 && 2 < 3)

// 6. Utiliza el operador lógico or

console.log(2 > 1 || 2 < 3)

// 7. Combina ambos operadores lógicos

console.log(2 > 1 && 2 < 3 || 2 === 2)

// 8. Añade alguna negación

console.log(!(2 > 1 && 2 < 3 || 2 === 2))


// 9. Utiliza el operador ternario

let ternario = 2 > 1 ? "Es mayor" : "Es menor"
console.log(ternario)

// 10. Combina operadores aritméticos, de comparáción y lógicas

let combinado = 2 + 3 > 4 && 2 < 3 ? "Es mayor" : "Es menor"
console.log(combinado)
