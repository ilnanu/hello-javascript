/*
Clase 34 - Ejercicios: Objetos
Vídeo: https://youtu.be/1glVfFxj8a4?t=15675
*/

// 1. Crea un objeto con 3 propiedades
let cat = {
    name: "Misty",
    age: 15,
    alias: "Misi"
}
console.log(cat)


// 2. Accede y muestra su valor
console.log(cat.name)

// 3. Agrega una nueva propiedad
cat.color = "black"
console.log(cat)

// 4. Elimina una de las 3 primeras propiedades
cat.alias = undefined
console.log(cat)
delete cat.alias
console.log(cat)

// 5. Agrega una función e invócala
cat.isblack = function () {
    return this.color === "black"
}
console.log(cat.isblack())
console.log(cat)

// 6. Itera las propiedades del objeto
for (let key in cat) {
    console.log(key, cat[key])
}

// 7. Crea un objeto anidado
let dog = {
    name: "Rex",
    age: 5,
    owner: {
        name: "Fernando",
        age: 37
    }
}
console.log(dog)

// 8. Accede y muestra el valor de las propiedades anidadas
console.log(dog.owner.name)

// 9. Comprueba si los dos objetos creados son iguales
if (JSON.stringify(cat) === JSON.stringify(dog)) {
    console.log("Son iguales")
} else {
    console.log("No son iguales")
}

// 10. Comprueba si dos propiedades diferentes son iguales
if (cat.name === dog.name) {
    console.log("Son iguales")
} else {
    console.log("No son iguales")
}
// 11. Crea un objeto con una propiedad que contenga un array
let person = {
    name: "Fernando",
    hobbies: ["programming", "reading", "running"]
}
console.log(person)
