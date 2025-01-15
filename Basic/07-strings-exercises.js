/*
Clase 22 - Ejercicios: Strings
Vídeo: https://youtu.be/1glVfFxj8a4?t=7226
*/

// 1. Concatena dos cadenas de texto
let hola = "Hola, "
let myName = "Fernando"
let greeting = hola + myName
console.log(greeting)

// 2. Muestra la longitud de una cadena de texto
console.log(greeting.length)

// 3. Muestra el primer y último carácter de un string
console.log(greeting[0])
console.log(greeting[greeting.length - 1])

// 4. Convierte a mayúsculas y minúsculas un string
console.log(greeting.toUpperCase())
console.log(greeting.toLowerCase())

// 5. Crea una cadena de texto en varias líneas
console.log(`Hola,
soy
Fernando`)

// 6. Interpola el valor de una variable en un string
console.log(`Hola, soy ${myName}`)

// 7. Reemplaza todos los espacios en blanco de un string por guiones
console.log(greeting.replace("Hola", "Buenos días"))

// 8. Comprueba si una cadena de texto contiene una palabra concreta
console.log(greeting.includes("Fernando"))

// 9. Comprueba si dos strings son iguales
console.log(greeting === "Hola, Fernando")

// 10. Comprueba si dos strings tienen la misma longitud
console.log(greeting.length === "Hola, Fernando".length)
