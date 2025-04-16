/*
 * EJERCICIO:
 * Explora el "Principio SOLID de Segregación de Interfaces (Interface Segregation Principle, ISP)"
 * y crea un ejemplo simple donde se muestre su funcionamiento de forma correcta e incorrecta.
 */

//❌ Ejemplo incorrecto (violando ISP)
class TrabajadorMAL {
    trabajar() {
        throw new Error("Debe implementar trabajar");
    }

    comer() {
        throw new Error("Debe implementar comer");
    }

    dormir() {
        throw new Error("Debe implementar dormir");
    }
}

class RobotMAL extends TrabajadorMAL {
    trabajar() {
        console.log("El robot está trabajando.");
    }

    comer() {
        throw new Error("¡Los robots no comen!");
    }

    dormir() {
        throw new Error("¡Los robots no duermen!");
    }
}

//✅ Ejemplo correcto (cumpliendo ISP)
class ITrabajador {
    trabajar() {
        throw new Error("Debe implementar trabajar");
    }
}

class IComedor {
    comer() {
        throw new Error("Debe implementar comer");
    }
}

class IDormilon {
    dormir() {
        throw new Error("Debe implementar dormir");
    }
}

class Humano extends ITrabajador {
    trabajar() {
        console.log("El humano está trabajando.");
    }

    comer() {
        console.log("El humano está comiendo.");
    }

    dormir() {
        console.log("El humano está durmiendo.");
    }
}

// Extendemos varias interfaces según el comportamiento
Object.assign(Humano.prototype, new IComedor(), new IDormilon());

class Robot extends ITrabajador {
    trabajar() {
        console.log("El robot está trabajando.");
    }
}

const humano = new Humano();
const robot = new Robot();

humano.trabajar();  // ✅
humano.comer();     // ✅
humano.dormir();    // ✅

robot.trabajar();   // ✅


/*
 * DIFICULTAD EXTRA (opcional):
 * Crea un gestor de impresoras.
 * Requisitos:
 * 1. Algunas impresoras sólo imprimen en blanco y negro.
 * 2. Otras sólo a color.
 * 3. Otras son multifunción, pueden imprimir, escanear y enviar fax.
 * Instrucciones:
 * 1. Implementa el sistema, con los diferentes tipos de impresoras y funciones.
 * 2. Aplica el ISP a la implementación.
 * 3. Desarrolla un código que compruebe que se cumple el principio.
 */

// Interfaces específicas (segregadas)
class IImpresoraBN {
    imprimirBN(documento) {
        throw new Error("Debe implementar imprimirBN");
    }
}

class IImpresoraColor {
    imprimirColor(documento) {
        throw new Error("Debe implementar imprimirColor");
    }
}

class IScanner {
    escanear(documento) {
        throw new Error("Debe implementar escanear");
    }
}

class IFax {
    enviarFax(documento, destino) {
        throw new Error("Debe implementar enviarFax");
    }
}

// Impresora Blanco y Negro
class ImpresoraBN extends IImpresoraBN {
    imprimirBN(documento) {
        console.log(`🖨️ Impresora B/N: Imprimiendo documento: "${documento}" en blanco y negro.`);
    }
}

// Impresora Color
class ImpresoraColor extends IImpresoraColor {
    imprimirColor(documento) {
        console.log(`🖨️ Impresora Color: Imprimiendo documento: "${documento}" a color.`);
    }
}

// Impresora Multifunción
class ImpresoraMultifuncion extends IImpresoraBN {
    imprimirBN(documento) {
        console.log(`📠 Multifunción: Imprimiendo documento: "${documento}" en blanco y negro.`);
    }
    imprimirColor(documento) {
        console.log(`📠 Multifunción: Imprimiendo documento: "${documento}" a color.`);
    }
    escanear(documento) {
        console.log(`📠 Multifunción: Escaneando documento: "${documento}".`);
    }
    enviarFax(documento, destino) {
        console.log(`📠 Multifunción: Enviando fax del documento "${documento}" a ${destino}.`);
    }
}

// Asignamos interfaces adicionales a la multifunción
Object.assign(ImpresoraMultifuncion.prototype, new IImpresoraColor(), new IScanner(), new IFax());

// Creamos las impresoras
const bn = new ImpresoraBN();
const color = new ImpresoraColor();
const multi = new ImpresoraMultifuncion();

// Probamos las funcionalidades disponibles

console.log("\n🔹 Impresora Blanco y Negro");
bn.imprimirBN("Contrato");

console.log("\n🔹 Impresora Color");
color.imprimirColor("Folleto publicitario");

console.log("\n🔹 Impresora Multifunción");
multi.imprimirBN("Factura");
multi.imprimirColor("Informe");
multi.escanear("Pasaporte");
multi.enviarFax("Formulario", "987-654-321");
