/*
Clase 28 - Ejercicios: Estructuras
Vídeo: https://youtu.be/1glVfFxj8a4?t=11451
*/

// 1. Crea un array que almacene cinco animales
let animales = ["perro", "gato", "loro", "pez", "tortuga"]
console.log(animales)

// 2. Añade dos más. Uno al principio y otro al final
animales.unshift("conejo")
animales.push("caballo")
console.log(animales)

// 3. Elimina el que se encuentra en tercera posición
animales.splice(2, 1)
console.log(animales)

// 4. Crea un set que almacene cinco libros
let libros = new Set(["El Quijote", "Don Juan Tenorio", "La Celestina", "El Lazarillo de Tormes", "La vida es sueño"])
console.log(libros)

// 5. Añade dos más. Uno de ellos repetido
libros.add("El Quijote")
libros.add("El Hobbit")
console.log(libros)

// 6. Elimina uno concreto a tu elección
libros.delete("La Celestina")
console.log(libros)

// 7. Crea un mapa que asocie el número del mes a su nombre
let meses = new Map([
    [1, "Enero"],
    [2, "Febrero"],
    [3, "Marzo"],
    [4, "Abril"],
    [5, "Mayo"],
    [6, "Junio"],
    [7, "Julio"],
    [8, "Agosto"],
    [9, "Septiembre"],
    [10, "Octubre"],
    [11, "Noviembre"],
    [12, "Diciembre"]
])
console.log(meses)

// 8. Comprueba si el mes número 5 existe en el map e imprime su valor
meses.has(5) ? console.log(meses.get(5)) : console.log("El mes no existe")

// 9. Añade al mapa una clave con un array que almacene los meses de verano
meses.set("Verano", ["Junio", "Julio", "Agosto"])
console.log(meses)

// 10. Crea un Array, transfórmalo a un Set y almacénalo en un Map
let array = [1, 2, 3, 4, 5]
let set = new Set(array)
let map = new Map([["set", set]])
console.log(array)
console.log(set)
console.log(map)
