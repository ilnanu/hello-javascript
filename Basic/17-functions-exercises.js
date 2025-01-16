/*
Clase 32 - Ejercicios: Funciones
Vídeo: https://youtu.be/1glVfFxj8a4?t=14146
*/

// NOTA: Explora diferentes sintaxis de funciones para resolver los ejercicios

// 1. Crea una función que reciba dos números y devuelva su suma
function sum(a, b) {
    return a + b
}
console.log(sum(5, 10))

// 2. Crea una función que reciba un array de números y devuelva el mayor de ellos
let myArray = [1, 2, 3, 4, 5]
function maxNumber(numbers) {
    let max = numbers[0]
    for (let number of numbers) {
        if (number > max) {
            max = number
        }
    }
    return max
}
console.log(maxNumber(myArray))

// 3. Crea una función que reciba un string y devuelva el número de vocales que contiene
let string = "Hola, soy Fernando"
function vowelsCount(text) {
    let vowels = 0
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "a" || text[i] === "e" || text[i] === "i" || text[i] === "o" || text[i] === "u") {
            vowels++
        }
    }
    return vowels
}
console.log(vowelsCount(string))

// 4. Crea una función que reciba un array de strings y devuelva un nuevo array con las strings en mayúsculas
let strings = ["hola", "soy", "fernando"]
function toUpperCaseArray(array) {
    let newArray = []
    for (let string of array) {
        newArray.push(string.toUpperCase())
    }
    return newArray
}
console.log(toUpperCaseArray(strings))

// 5. Crea una función que reciba un número y devuelva true si es primo, y false en caso contrario
function isPrime(number) {
    if (number < 2) {
        return false
    }
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false
        }
    }
    return true
}
console.log(isPrime(7))

// 6. Crea una función que reciba dos arrays y devuelva un nuevo array que contenga los elementos comunes entre ambos
let myArray1 = [1, 2, 3, 4, 5]
let myArray2 = [4, 5, 6, 7, 8]
function commonElements(array1, array2) {
    let newArray = []
    for (let element of array1) {
        if (array2.includes(element)) {
            newArray.push(element)
        }
    }
    return newArray
}
console.log(commonElements(myArray1, myArray2))

// 7. Crea una función que reciba un array de números y devuelva la suma de todos los números pares
function sumEvenNumbers(numbers) {
    let sum = 0
    for (let number of numbers) {
        if (number % 2 === 0) {
            sum += number
        }
    }
    return sum
}
console.log(sumEvenNumbers(myArray))

// 8. Crea una función que reciba un array de números y devuelva un nuevo array con cada número elevado al cuadrado
function squareArray(numbers) {
    let newArray = []
    for (let number of numbers) {
        newArray.push(number ** 2)
    }
    return newArray
}
console.log(squareArray(myArray))

// 9. Crea una función que reciba una cadena de texto y devuelva la misma cadena con las palabras en orden inverso
function reverseWords(text) {
    let words = text.split(" ")
    let reversedWords = words.reverse()
    return reversedWords.join(" ")
}
console.log(reverseWords("Hola, soy Fernando"))

// 10. Crea una función que calcule el factorial de un número dado
function factorial(number) {
    let result = 1
    for (let i = 1; i <= number; i++) {
        result *= i
    }
    return result
}
console.log(factorial(5))
