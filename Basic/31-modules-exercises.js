/*
Clase 45 - Ejercicios: Módulos
Vídeo: https://youtu.be/1glVfFxj8a4?t=22720
*/

// 1. Exporta una función
export function myFunction() {
    console.log("This is a function")
}

// 2. Exporta una constante
export const myConstant = 10

// 3. Exporta una clase
export class MyClass {
    constructor() {
        console.log("This is a class")
    }
}

// 4. Importa una función
import { myFunction } from './31-modules-exercises.js'
myFunction()

// 5. Importa una constante
import { myConstant } from './31-modules-exercises.js'
console.log(myConstant)

// 6. Importa una clase
import { MyClass } from './31-modules-exercises.js'
let myClass = new MyClass()

// 7. Exporta una función, una constante y una clase por defecto (en caso de que lo permita)
export default function myDefaultFunction() {
    console.log("This is a default function")
}
// 8. Importa una función, una constante y una clase por defecto (en caso de que lo permita)
import myDefaultFunction, { myDefaultConstant, myDefaultClass } from './31-modules-exercises.js'
myDefaultFunction()

// 9. Exporta una función, una constante y una clase desde una carpeta
export function myFunction() {
    console.log("This is a function")
}

// 10. Importa una función, una constante y una clase desde un directorio diferente al anterior
import { myFunction, myConstant, MyClass } from '../Basic/31-modules-exercises.js'
myFunction()
