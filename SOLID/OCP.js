/*
 * EJERCICIO:
 * Explora el "Principio SOLID Abierto-Cerrado (Open-Close Principle, OCP)" 
 * y crea un ejemplo simple donde se muestre su funcionamiento
 * de forma correcta e incorrecta.
 */

//❌ Ejemplo incorrecto (violando OCP)
class Descuento {
    calcular(cliente) {
        if (cliente.tipo === "regular") {
            return 0;
        } else if (cliente.tipo === "premium") {
            return 10;
        } else if (cliente.tipo === "vip") {
            return 20;
        }
    }
}


//✅ Ejemplo correcto (aplicando OCP)
class EstrategiaDescuento {
    calcular() {
        return 0; // por defecto, sin descuento
    }
}

class DescuentoRegular extends EstrategiaDescuento { }

class DescuentoPremium extends EstrategiaDescuento {
    calcular() {
        return 10;
    }
}

class DescuentoVIP extends EstrategiaDescuento {
    calcular() {
        return 20;
    }
}

class CalculadoraDescuento {
    constructor(estrategia) {
        this.estrategia = estrategia;
    }

    calcularDescuento() {
        return this.estrategia.calcular();
    }
}

const descuentoRegular = new CalculadoraDescuento(new DescuentoRegular());
console.log("🧾 Descuento Regular:", descuentoRegular.calcularDescuento(), "%");

const descuentoPremium = new CalculadoraDescuento(new DescuentoPremium());
console.log("🧾 Descuento Premium:", descuentoPremium.calcularDescuento(), "%");

const descuentoVIP = new CalculadoraDescuento(new DescuentoVIP());
console.log("🧾 Descuento VIP:", descuentoVIP.calcularDescuento(), "%");


/*
 * DIFICULTAD EXTRA (opcional):
 * Desarrolla una calculadora que necesita realizar diversas operaciones matemáticas. 
 * Requisitos:
 * - Debes diseñar un sistema que permita agregar nuevas operaciones utilizando el OCP.
 * Instrucciones:
 * 1. Implementa las operaciones de suma, resta, multiplicación y división.
 * 2. Comprueba que el sistema funciona.
 * 3. Agrega una quinta operación para calcular potencias.
 * 4. Comprueba que se cumple el OCP.
 */

class Operacion {
    ejecutar(a, b) {
        throw new Error("Método 'ejecutar' debe ser implementado.");
    }

    get nombre() {
        return "Operación base";
    }
}
class Suma extends Operacion {
    ejecutar(a, b) {
        return a + b;
    }

    get nombre() {
        return "Suma";
    }
}

class Resta extends Operacion {
    ejecutar(a, b) {
        return a - b;
    }

    get nombre() {
        return "Resta";
    }
}

class Multiplicacion extends Operacion {
    ejecutar(a, b) {
        return a * b;
    }

    get nombre() {
        return "Multiplicación";
    }
}

class Division extends Operacion {
    ejecutar(a, b) {
        if (b === 0) throw new Error("No se puede dividir entre cero.");
        return a / b;
    }

    get nombre() {
        return "División";
    }
}
class Potencia extends Operacion {
    ejecutar(a, b) {
        return Math.pow(a, b);
    }

    get nombre() {
        return "Potencia";
    }
}
class Calculadora {
    constructor() {
        this.operaciones = [];
    }

    agregarOperacion(operacion) {
        this.operaciones.push(operacion);
    }

    ejecutarOperacion(nombre, a, b) {
        const operacion = this.operaciones.find(op => op.nombre.toLowerCase() === nombre.toLowerCase());

        if (!operacion) throw new Error(`Operación '${nombre}' no encontrada.`);
        return operacion.ejecutar(a, b);
    }

    listarOperaciones() {
        return this.operaciones.map(op => op.nombre);
    }
}
const calc = new Calculadora();

calc.agregarOperacion(new Suma());
calc.agregarOperacion(new Resta());
calc.agregarOperacion(new Multiplicacion());
calc.agregarOperacion(new Division());
calc.agregarOperacion(new Potencia()); // Nueva operación añadida

console.log("🧮 Operaciones disponibles:", calc.listarOperaciones());

console.log("5 + 3 =", calc.ejecutarOperacion("suma", 5, 3));
console.log("10 - 4 =", calc.ejecutarOperacion("resta", 10, 4));
console.log("6 * 7 =", calc.ejecutarOperacion("multiplicación", 6, 7));
console.log("20 / 4 =", calc.ejecutarOperacion("división", 20, 4));
console.log("2 ^ 3 =", calc.ejecutarOperacion("potencia", 2, 3)); // Potencia añadida