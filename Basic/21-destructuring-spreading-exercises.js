/*
Clase 36 - Ejercicios: Desestructuración y propagación
Vídeo: https://youtu.be/1glVfFxj8a4?t=16802
*/

// 1. Usa desestructuración para extraer los dos primeros elementos de un array 
let myArray = [1, 2, 3, 4, 5]
let [first, second] = myArray
console.log(first, second)

// 2. Usa desestructuración en un array y asigna un valor predeterminado a una variable
let [firstElement, secondElement, thirdElement, fourthElement = 4] = myArray
console.log(firstElement, secondElement, thirdElement, fourthElement)

// 3. Usa desestructuración para extraer dos propiedades de un objeto
let myObject = {
    name: "Fernando",
    age: 37,
    country: "Spain"
}
let { name, age } = myObject
console.log(name, age)

// 4. Usa desestructuración para extraer dos propiedades de un objeto y asígnalas
//    a nuevas variables con nombres diferentes
let { name: myName, age: myAge } = myObject
console.log(myName, myAge)

// 5. Usa desestructuración para extraer dos propiedades de un objeto anidado
let myNestedObject = {
    name: "Fernando",
    age: 37,
    country: "Spain",
    address: {
        street: "Calle Mayor",
        number: 1
    }
}
let { address: { street, number } } = myNestedObject
console.log(street, number)

// 6. Usa propagación para combinar dos arrays en uno nuevo
let array1 = [1, 2, 3]
let array2 = [4, 5, 6]
let combinedArray = [...array1, ...array2]
console.log(combinedArray)

// 7. Usa propagación para crear una copia de un array
let copiedArray = [...array1]
console.log(copiedArray)

// 8. Usa propagación para combinar dos objetos en uno nuevo
let object1 = {
    name: "Fernando",
    age: 37
}
let object2 = {
    country: "Spain"
}
let combinedObject = { ...object1, ...object2 }
console.log(combinedObject)

// 9. Usa propagación para crear una copia de un objeto
let copiedObject = { ...object1 }
console.log(copiedObject)

// 10. Combina desestructuración y propagación
let [oneElement, ...rest] = myArray       // firstElement = 1, rest = [2, 3, 4, 5]
console.log(oneElement, rest)

