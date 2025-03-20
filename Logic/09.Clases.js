//Implementa dos clases que representen las estructuras de Pila y Cola. Deben poder inicializarse y disponer de operaciones para añadir, eliminar, retornar el número de elementos e imprimir todo su contenido

class Pila {
    constructor() {
        this.items = [];
    }

    // Añadir un elemento a la pila
    push(element) {
        this.items.push(element);
    }

    // Eliminar el último elemento de la pila
    pop() {
        if (this.items.length === 0) {
            return "La pila está vacía";
        }
        return this.items.pop();
    }

    // Retornar el número de elementos en la pila
    size() {
        return this.items.length;
    }

    // Imprimir todo el contenido de la pila
    print() {
        console.log(this.items.toString());
    }
}

class Cola {
    constructor() {
        this.items = [];
    }

    // Añadir un elemento a la cola
    enqueue(element) {
        this.items.push(element);
    }

    // Eliminar el primer elemento de la cola
    dequeue() {
        if (this.items.length === 0) {
            return "La cola está vacía";
        }
        return this.items.shift();
    }

    // Retornar el número de elementos en la cola
    size() {
        return this.items.length;
    }

    // Imprimir todo el contenido de la cola
    print() {
        console.log(this.items.toString());
    }
}

// Ejemplo de uso de la clase Pila
const pila = new Pila();
pila.push(1);
pila.push(2);
pila.push(3);
pila.print(); // Output: 1,2,3
console.log(pila.pop()); // Output: 3
pila.print(); // Output: 1,2
console.log(pila.size()); // Output: 2

// Ejemplo de uso de la clase Cola
const cola = new Cola();
cola.enqueue(1);
cola.enqueue(2);
cola.enqueue(3);
cola.print(); // Output: 1,2,3
console.log(cola.dequeue()); // Output: 1
cola.print(); // Output: 2,3
console.log(cola.size()); // Output: 2