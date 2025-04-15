/*
 * EJERCICIO:
 * Explora el "Principio SOLID de Sustitución de Liskov (Liskov Substitution Principle, LSP)"
 * y crea un ejemplo simple donde se muestre su funcionamiento
 * de forma correcta e incorrecta.
 */

//❌ Ejemplo incorrecto (violando LSP)
class AveKO {
    volar() {
        console.log("Estoy volando.");
    }
}

class PinguinoKO extends AveKO {
    volar() {
        throw new Error("¡Los pingüinos no pueden volar!");
    }
}

function hacerVolar(ave) {
    ave.volar(); // ¡esto lanzará un error si ave es un Pinguino!
}

const pinguinoKO = new PinguinoKO();
//hacerVolar(pinguino); // ❌ Violación de LSP


//✅ Ejemplo correcto (cumpliendo LSP)
class Ave {
    comer() {
        console.log("Estoy comiendo.");
    }
}

class AveVoladora extends Ave {
    volar() {
        console.log("Estoy volando.");
    }
}

class Pinguino extends Ave {
    nadar() {
        console.log("Estoy nadando.");
    }
}

class Aguila extends AveVoladora { }

function mostrarVuelo(ave) {
    if (ave instanceof AveVoladora) {
        ave.volar(); // solo las aves voladoras vuelan
    } else {
        console.log("Este animal no puede volar.");
    }
}

const aguila = new Aguila();
const pinguino = new Pinguino();

mostrarVuelo(aguila);     // ✅ "Estoy volando"
mostrarVuelo(pinguino);   // ✅ "Este animal no puede volar"

/*
 * DIFICULTAD EXTRA (opcional):
 * Crea una jerarquía de vehículos. Todos ellos deben poder acelerar y frenar, así como
 * cumplir el LSP.
 * Instrucciones:
 * 1. Crea la clase Vehículo.
 * 2. Añade tres subclases de Vehículo.
 * 3. Implementa las operaciones "acelerar" y "frenar" como corresponda.
 * 4. Desarrolla un código que compruebe que se cumple el LSP.
 */

class Vehiculo {
    constructor(nombre) {
        this.nombre = nombre;
        this.velocidad = 0;
    }

    acelerar(cantidad) {
        this.velocidad += cantidad;
        console.log(`${this.nombre} acelera a ${this.velocidad} km/h`);
    }

    frenar(cantidad) {
        this.velocidad = Math.max(0, this.velocidad - cantidad);
        console.log(`${this.nombre} frena a ${this.velocidad} km/h`);
    }
}

class Coche extends Vehiculo {
    constructor(nombre) {
        super(nombre);
    }
}

class Bicicleta extends Vehiculo {
    constructor(nombre) {
        super(nombre);
    }
}

class Moto extends Vehiculo {
    constructor(nombre) {
        super(nombre);
    }
}
function probarVehiculo(v) {
    console.log(`\n--- Probando ${v.nombre} ---`);
    v.acelerar(30);
    v.frenar(10);
}
const coche = new Coche("Toyota");
const bici = new Bicicleta("Mountain Bike");
const moto = new Moto("Yamaha");

probarVehiculo(coche);
probarVehiculo(bici);
probarVehiculo(moto);
