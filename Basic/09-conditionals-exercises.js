/*
Clase 24 - Ejercicios: Condicionales
Vídeo: https://youtu.be/1glVfFxj8a4?t=8652
*/

// if/else/else if/ternaria

// 1. Imprime por consola tu nombre si una variable toma su valor
let myName = "Fernando"
let myAge = 30
if (myName === "Fernando") {
    console.log(myName)
}

// 2. Imprime por consola un mensaje si el usuario y contraseña concide con unos establecidos
let username = "admin"
let password = "admin"
if (username === "admin" && password === "admin") {
    console.log("Usuario y contraseña correctos")
}

// 3. Verifica si un número es positivo, negativo o cero e imprime un mensaje
let number = 0
if (number > 0) {
    console.log("El número es positivo")
} else if (number < 0) {
    console.log("El número es negativo")
} else {
    console.log("El número es cero")
}

// 4. Verifica si una persona puede votar o no (mayor o igual a 18) e indica cuántos años le faltan
if (myAge >= 18) {
    console.log("Puede votar")
} else {
    console.log(`Le faltan ${18 - myAge} años para poder votar`)
}

// 5. Usa el operador ternario para asignar el valor "adulto" o "menor" a una variable
//    dependiendo de la edad 
let estado = myAge >= 18 ? "adulto" : "menor"
console.log(estado)

// 6. Muestra en que estación del año nos encontramos dependiendo del valor de una variable "mes"
let mes = 3
if (mes >= 1 && mes <= 3) {
    console.log("Primavera")
} else if (mes >= 4 && mes <= 6) {
    console.log("Verano")
} else if (mes >= 7 && mes <= 9) {
    console.log("Otoño")
} else {
    console.log("Invierno")
}

// 7. Muestra el número de días que tiene un mes dependiendo de la variable del ejercicio anterior
let dias = 0
switch (mes) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        dias = 31
        break
    case 4:
    case 6:
    case 9:
    case 11:
        dias = 30
        break
    case 2:
        dias = 28
        break
}
console.log(dias)

// switch

// 8. Usa un switch para imprimir un mensaje de saludo diferente dependiendo del idioma
let idioma = "es"
let saludo = ""
switch (idioma) {
    case "es":
        saludo = "Hola"
        break
    case "en":
        saludo = "Hello"
        break
    case "fr":
        saludo = "Bonjour"
        break
    default:
        saludo = "Idioma no soportado"
}

// 9. Usa un switch para hacer de nuevo el ejercicio 6
switch (mes) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        console.log("Primavera")
        break
    case 4:
    case 6:
    case 9:
    case 11:
        console.log("Verano")
        break
    case 7:
    case 8:
    case 9:
    case 11:
        console.log("Otoño")
        break
    default:
        console.log("Invierno")
}
// 10. Usa un switch para hacer de nuevo el ejercicio 7
switch (mes) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        dias = 31
        break
    case 4:
    case 6:
    case 9:
    case 11:
        dias = 30
        break
    case 2:
        dias = 28
        break
}
console.log(dias)

