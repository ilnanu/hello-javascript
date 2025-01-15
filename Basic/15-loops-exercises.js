/*
Clase 30 - Ejercicios: Bucles
Vídeo: https://youtu.be/1glVfFxj8a4?t=12732
*/

// NOTA: Explora diferentes sintaxis de bucles para resolver los ejercicios

// 1. Crea un bucle que imprima los números del 1 al 20
for (let i = 1; i <= 20; i++) {
    console.log(i)
}

// 2. Crea un bucle que sume todos los números del 1 al 100 y muestre el resultado
let suma = 0
for (let i = 1; i <= 100; i++) {
    suma += i
}
console.log(suma)


// 3. Crea un bucle que imprima todos los números pares entre 1 y 50
for (let i = 1; i <= 50; i++) {
    if (i % 2 === 0) {
        console.log(i)
    }
}

// 4. Dado un array de nombres, usa un bucle para imprimir cada nombre en la consola
let nombres = ["Fernando", "Luis", "Ana", "María"]
for (let name of nombres) {
    console.log(name)
}

// 5. Escribe un bucle que cuente el número de vocales en una cadena de texto
let cadena = "Hola, soy Fernando"
let vocales = 0
for (let i = 0; i < cadena.length; i++) {
    if (cadena[i] === "a" || cadena[i] === "e" || cadena[i] === "i" || cadena[i] === "o" || cadena[i] === "u") {
        vocales++
    }
}
console.log(vocales)

// 6. Dado un array de números, usa un bucle para multiplicar todos los números y mostrar el producto
let numeros = [1, 2, 3, 4, 5]
let producto = 1
for (let numero of numeros) {
    producto *= numero
}
console.log(producto)

// 7. Escribe un bucle que imprima la tabla de multiplicar del 5
let tabla = 5
for (let i = 1; i <= 10; i++) {
    console.log(`${tabla} x ${i} = ${tabla * i}`)
}

// 8. Usa un bucle para invertir una cadena de texto
let cadenaInvertida = ""
while (cadena.length > 0) {
    cadenaInvertida += cadena[cadena.length - 1]
    cadena = cadena.slice(0, -1)
}
console.log(cadenaInvertida)

// 9. Usa un bucle para generar los primeros 10 números de la secuencia de Fibonacci
let a = 0
let b = 1
do {
    console.log(a)
    let temp = a
    a = b
    b = temp + b
}
while (a < 10)
console.log(b)

// 10. Dado un array de números, usa un bucle para crear un nuevo array que contenga solo los números mayores a 10
let numeros2 = [1, 20, 3, 40, 5]
let mayoresA10 = []
for (let i = 0; i < numeros2.length; i++) {
    if (numeros2[i] > 10) {
        mayoresA10.push(numeros2[i])
    }
}
console.log(mayoresA10)
