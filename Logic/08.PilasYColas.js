// Utilizando una pila y cadenas de texto, simula el mecanismo adelante/atrás de un navegador web. Crea un programa en el que puedes navegar a una página o indicarle que te quieresdesplazar aledante o atrás, mostrando en cada caso el nombre de la web
// Las palabras "adelante", "atras" desencadena esta acción, el resto se interpreta como el nombre de una nueva web.

// Solución:
// Utilizamos una pila para almacenar las páginas visitadas y una variable para almacenar la página actual.
// Si el usuario introduce una página, la añadimos a la pila y la mostramos.
// Si el usuario introduce "adelante", mostramos la página anterior de la pila.
// Si el usuario introduce "atras", mostramos la página siguiente de la pila.
// Si la pila está vacía, mostramos un mensaje de error.

let pila = [];
let paginaActual = "";

function navegarWeb(entrada) {
    if (entrada === "adelante") {
        if (pila.length > 0) {
            paginaActual = pila.pop();
            console.log(paginaActual);
        } else {
            console.log("No hay páginas anteriores");
        }
    } else if (entrada === "atras") {
        if (paginaActual !== "") {
            pila.push(paginaActual);
            console.log(pila[pila.length - 1]);
        } else {
            console.log("No hay páginas posteriores");
        }
    } else {
        pila.push(entrada);
        paginaActual = entrada;
        console.log(paginaActual);
    }
}

console.log("Navegador web");
console.log("Introduce una dirección web o las palabras 'adelante' o 'atras'");

navegarWeb("www.google.com");
navegarWeb("www.youtube.com");
navegarWeb("adelante");
navegarWeb("adelante");
navegarWeb("atras");
navegarWeb("atras");

// Utilizando colas y cadenas de texto, simula el mecanismo de una cola de impresión. Crea un programa en el que puedes añadir trabajos a la cola, mostrar el trabajo que se está imprimiendo y eliminar el trabajo que se ha impreso.
// Las palabras "imprimir", "siguiente" y "eliminar" desencadenan estas acciones, el resto se interpreta como un trabajo a añadir a la cola.

// Solución:
// Utilizamos una cola para almacenar los trabajos y una variable para almacenar el trabajo actual.
// Si el usuario introduce un trabajo, lo añadimos a la cola.
// Si el usuario introduce "imprimir", mostramos el trabajo actual.
// Si el usuario introduce "siguiente", mostramos el siguiente trabajo de la cola.
// Si el usuario introduce "eliminar", eliminamos el trabajo actual.
// Si la cola está vacía, mostramos un mensaje de error.

let cola = [];
let trabajoActual = "";

function colaImpresion(entrada) {
    if (entrada === "imprimir") {
        if (trabajoActual !== "") {
            console.log(trabajoActual);
        } else {
            console.log("No hay trabajos pendientes");
        }
    } else if (entrada === "siguiente") {
        if (cola.length > 0) {
            trabajoActual = cola.shift();
            console.log(trabajoActual);
        } else {
            console.log("No hay trabajos pendientes");
        }
    } else if (entrada === "eliminar") {
        if (trabajoActual !== "") {
            trabajoActual = "";
        } else {
            console.log("No hay trabajos pendientes");
        }
    } else {
        cola.push(entrada);
    }
}

console.log("Cola de impresión");
console.log("Introduce un trabajo o las palabras 'imprimir', 'siguiente' o 'eliminar'");

colaImpresion("Trabajo 1");
colaImpresion("Trabajo 2");
colaImpresion("imprimir");
colaImpresion("Trabajo 2");
colaImpresion("siguiente");
colaImpresion("eliminar");
colaImpresion("Trabajo 2");

