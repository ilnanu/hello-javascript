/*
Clase 43 - Ejercicios: Console
Vídeo: https://youtu.be/1glVfFxj8a4?t=21421
*/

// 1. Crea un función que utilice error correctamente
function throwError() {
    console.error("This is an error")
}
throwError()

// 2. Crea una función que utilice warn correctamente
function showWarning() {
    console.warn("This is a warning")
}
showWarning()

// 3. Crea una función que utilice info correctamente
function showInfo() {
    console.info("This is an info message")
}
showInfo()

// 4. Utiliza table
let myArray = [1, 2, 3, 4, 5]
console.table(myArray)

data = [
    { name: "Fer", age: 37 },
    { name: "Vero", age: 11 },
    { name: "Sara", age: 21 }
]

console.table(data)

// 5. Utiliza group
console.group("Group 1")
console.log("Message 1")
console.log("Message 2")
console.group("Group 2")
console.log("Message 3")
console.groupEnd()
console.log("Message 4")

// 6. Utiliza time
console.time("Timer")
for (let i = 0; i < 1000000; i++) {
    // Do nothing
}
console.timeEnd("Timer")

// 7. Valida con assert si un número es positivo
console.assert(1 > 0, "The number is not positive")
console.assert(-1 > 0, "The number is not positive")

// 8. Utiliza count
console.count("Counter")
console.count("Counter")
console.count("Counter")
console.count("Counter")
console.countReset("Counter")
console.count("Counter")

// 9. Utiliza trace
console.trace()
function myFunction() {
    console.trace()
}
myFunction()

// 10. Utiliza clear
console.clear()
