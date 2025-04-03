/*
Escribe el mayor número de mecanismos que posee javascript para iterar valores.
*/

// Iteración con bucles clásicos
console.log("Bucles clásicos:");
for (let i = 0; i < 3; i++) console.log("for:", i);
let j = 0;
while (j < 3) console.log("while:", j++);
do { console.log("do while:", j--); } while (j > 0);

// Iteración con Arrays
console.log("Métodos de Arrays:");
const arr = [1, 2, 3];
arr.forEach(num => console.log("forEach:", num));
console.log("map:", arr.map(num => num * 2));
console.log("filter:", arr.filter(num => num % 2 !== 0));
console.log("reduce:", arr.reduce((acc, num) => acc + num, 0));
console.log("some:", arr.some(num => num > 2));
console.log("every:", arr.every(num => num > 0));
console.log("find:", arr.find(num => num > 1));
console.log("findIndex:", arr.findIndex(num => num > 1));

// Iteración sobre Objetos
console.log("Iteración sobre objetos:");
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) console.log("for...in:", key, obj[key]);
Object.keys(obj).forEach(key => console.log("Object.keys:", key, obj[key]));
Object.values(obj).forEach(value => console.log("Object.values:", value));
Object.entries(obj).forEach(([key, value]) => console.log("Object.entries:", key, value));

// Iteración sobre iterables (Strings, Sets, Maps)
console.log("Iteración sobre iterables:");
for (let char of "abc") console.log("for...of string:", char);
const set = new Set([1, 2, 3]);
set.forEach(num => console.log("Set forEach:", num));
const map = new Map([["x", 10], ["y", 20]]);
map.forEach((value, key) => console.log("Map forEach:", key, value));

// Iteradores manuales
console.log("Iteradores manuales:");
const iter = arr[Symbol.iterator]();
let result;
while (!(result = iter.next()).done) console.log("Manual Iterator:", result.value);

// Generadores
console.log("Generadores:");
function* generator() {
    yield "gen1";
    yield "gen2";
    yield "gen3";
}
for (let value of generator()) console.log("Generator:", value);
