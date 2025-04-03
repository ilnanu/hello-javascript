/*
Realiza un programa javascript que muestre ejemplos de las siguientes operaciones con conjuntos:
* Unión
* Intersección
* Diferencia
* Diferencia simétrica
* Subconjunto
* Producto cartesiano
* Potencia de un conjunto
* Complemento de un conjunto
* Producto de conjuntos
*/
// Operaciones con conjuntos en JavaScript

// Función para la unión de conjuntos
function union(setA, setB) {
    return new Set([...setA, ...setB]);
}

// Función para la intersección de conjuntos
function interseccion(setA, setB) {
    return new Set([...setA].filter(x => setB.has(x)));
}

// Función para la diferencia de conjuntos
function diferencia(setA, setB) {
    return new Set([...setA].filter(x => !setB.has(x)));
}

// Función para la diferencia simétrica
function diferenciaSimetrica(setA, setB) {
    return new Set([...diferencia(setA, setB), ...diferencia(setB, setA)]);
}

// Función para verificar si un conjunto es subconjunto de otro
function esSubconjunto(subset, set) {
    return [...subset].every(x => set.has(x));
}

// Función para el producto cartesiano
function productoCartesiano(setA, setB) {
    let resultado = new Set();
    for (let a of setA) {
        for (let b of setB) {
            resultado.add([a, b]);
        }
    }
    return resultado;
}

// Función para calcular la potencia de un conjunto
function potenciaConjunto(set) {
    let arr = [...set];
    let resultado = new Set([new Set()]);

    for (let elem of arr) {
        let temp = new Set();
        for (let subset of resultado) {
            temp.add(new Set([...subset, elem]));
        }
        for (let t of temp) resultado.add(t);
    }
    return resultado;
}

// Función para calcular el complemento de un conjunto (considerando un universo)
function complemento(set, universo) {
    return new Set([...universo].filter(x => !set.has(x)));
}

// Función para el producto de conjuntos (multiplicación de elementos)
function productoDeConjuntos(setA, setB) {
    let resultado = new Set();
    for (let a of setA) {
        for (let b of setB) {
            resultado.add(a * b);
        }
    }
    return resultado;
}

// Ejemplo de uso
const A = new Set([1, 2, 3]);
const B = new Set([3, 4, 5]);
const universo = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log("Unión:", union(A, B));
console.log("Intersección:", interseccion(A, B));
console.log("Diferencia A - B:", diferencia(A, B));
console.log("Diferencia simétrica:", diferenciaSimetrica(A, B));
console.log("¿A es subconjunto de B?", esSubconjunto(A, B));
console.log("Producto cartesiano:", productoCartesiano(A, B));
console.log("Potencia de A:", potenciaConjunto(A));
console.log("Complemento de A:", complemento(A, universo));
console.log("Producto de conjuntos:", productoDeConjuntos(A, B));
