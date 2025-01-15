/*
Clase 18 - Ejercicios: primeros pasos
Vídeo: https://youtu.be/1glVfFxj8a4?t=4733
*/

// 1. Escribe un comentario en una línea
//Comentario una línea

// 2. Escribe un comentario en varias líneas
/*
    Comentario varias una líneas
 */

// 3. Declara variables con valores asociados a todos los datos de tipo primitivos

let unaCadena = "Hola, soy una cadena de texto"
let otraCadena = 'Hola, soy una cadena de texto'
let otraCadenaMas = `Hola, soy una cadena de texto`

let unEntero = 12
let unFloat = 23.4

let unBoolean = true

let unUndefined

let unNull = null

let unSymbol = Symbol("Soy un símbolo")

let bigInt = 1234567890123456789012345678901234567890n
let otroBigInt = BigInt(1234567890123456789012345678901234567890)


// 4. Imprime por consola el valor de todas las variables

console.log(unaCadena)
console.log(otraCadena)
console.log(otraCadenaMas)

console.log(unEntero)
console.log(unFloat)

console.log(unBoolean)

console.log(unUndefined)

console.log(unNull)

console.log(unSymbol)

console.log(bigInt)
console.log(otroBigInt)

// 5. Imprime por consola el tipo de todas las variables

console.log(typeof unaCadena)
console.log(typeof otraCadena)
console.log(typeof otraCadenaMas)

console.log(typeof unEntero)
console.log(typeof unFloat)

console.log(typeof unBoolean)

console.log(typeof unUndefined)

console.log(typeof unNull)

console.log(typeof unSymbol)

console.log(typeof bigInt)
console.log(typeof otroBigInt)

// 6. A continuación, modifica los valores de las variables por otros del mismo tipo

unaCadena = "Hola, soy otra cadena de texto"
otraCadena = 'Hola, soy otra cadena de texto'
otraCadenaMas = `Hola, soy otra cadena de texto`

unEntero = 24
unFloat = 45.6

unBoolean = false

unUndefined = undefined

unNull = null

unSymbol = Symbol("Soy otro símbolo")

bigInt = 9876543210987654321098765432109876543210n
otroBigInt = BigInt(9876543210987654321098765432109876543210)

// 7. A continuación, modifica los valores de las variables por otros de distinto tipo

unaCadena = 12
otraCadena = 23.4
otraCadenaMas = true

unEntero = "Hola, soy una cadena de texto"
unFloat = true

unBoolean = 12

unUndefined = "Hola, soy una cadena de texto"

unNull = "Hola, soy una cadena de texto"

unSymbol = "Hola, soy una cadena de texto"

bigInt = "Hola, soy una cadena de texto"
otroBigInt = "Hola, soy una cadena de texto"

// 8. Declara constantes con valores asociados a todos los tipos de datos primitivos

const unaCadenaConst = "Hola, soy una cadena de texto"
const unEnteroConst = 12
const unFloatConst = 23.4
const unBooleanConst = true
const unUndefinedConst = undefined
const unNullConst = null
const unSymbolConst = Symbol("Soy un símbolo")
const bigIntConst = 1234567890123456789012345678901234567890n

// 9. A continuación, modifica los valores de las constantes
//unEnteroConst = 25

// 10. Comenta las líneas que produzcan algún tipo de error al ejecutarse