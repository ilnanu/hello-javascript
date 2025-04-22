/*
 * EJERCICIO:
 * ¡La Casa del Dragón ha finalizado y no volverá hasta 2026! 
 * ¿Alguien se entera de todas las relaciones de parentesco
 * entre personajes que aparecen en la saga?
 * Desarrolla un árbol genealógico para relacionarlos (o invéntalo).
 * Requisitos:
 * 1. Estará formado por personas con las siguientes propiedades:
 *    - Identificador único (obligatorio)
 *    - Nombre (obligatorio)
 *    - Pareja (opcional)
 *    - Hijos (opcional)
 * 2. Una persona sólo puede tener una pareja (para simplificarlo).
 * 3. Las relaciones deben validarse dentro de lo posible.
 *    Ejemplo: Un hijo no puede tener tres padres.
 * Acciones:
 * 1. Crea un programa que permita crear y modificar el árbol.
 *    - Añadir y eliminar personas
 *    - Modificar pareja e hijos
 * 2. Podrás imprimir el árbol (de la manera que consideres).
 * 
 * NOTA: Ten en cuenta que la complejidad puede ser alta si
 * se implementan todas las posibles relaciones. Intenta marcar
 * tus propias reglas y límites para que te resulte asumible.
 */
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function prompt(q) {
    return new Promise(resolve => rl.question(q, resolve));
}

class Persona {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.pareja = null;
        this.hijos = [];
    }
}

class ArbolGenealogico {
    constructor() {
        this.personas = new Map();
    }

    agregarPersona(id, nombre) {
        if (this.personas.has(id)) {
            console.log("❌ Ya existe una persona con ese ID.");
            return;
        }
        this.personas.set(id, new Persona(id, nombre));
        console.log(`✅ Persona '${nombre}' añadida.`);
    }

    eliminarPersona(id) {
        if (!this.personas.has(id)) {
            console.log("❌ Persona no encontrada.");
            return;
        }

        // Eliminar referencias como pareja o hijo
        this.personas.forEach(persona => {
            if (persona.pareja === id) persona.pareja = null;
            persona.hijos = persona.hijos.filter(hijoId => hijoId !== id);
        });

        this.personas.delete(id);
        console.log(`🗑️ Persona con ID '${id}' eliminada.`);
    }

    establecerPareja(id1, id2) {
        const p1 = this.personas.get(id1);
        const p2 = this.personas.get(id2);

        if (!p1 || !p2) return console.log("❌ Alguna persona no existe.");
        if (p1.pareja || p2.pareja) return console.log("❌ Alguien ya tiene pareja.");
        if (id1 === id2) return console.log("❌ No puedes emparejar a alguien consigo mismo.");

        p1.pareja = id2;
        p2.pareja = id1;
        console.log(`💞 ${p1.nombre} y ${p2.nombre} ahora son pareja.`);
    }

    añadirHijo(padreId, hijoId) {
        const padre = this.personas.get(padreId);
        const hijo = this.personas.get(hijoId);

        if (!padre || !hijo) return console.log("❌ Persona no encontrada.");
        if (padre.hijos.includes(hijoId)) return console.log("❌ Ya es su hijo.");
        padre.hijos.push(hijoId);
        console.log(`👶 Añadido '${hijo.nombre}' como hijo de '${padre.nombre}'.`);
    }

    imprimirArbol(id, nivel = 0, visitados = new Set()) {
        const persona = this.personas.get(id);
        if (!persona || visitados.has(id)) return;

        visitados.add(id);
        const indent = "  ".repeat(nivel);
        let parejaTexto = persona.pareja ? ` ❤️ ${this.personas.get(persona.pareja).nombre}` : "";
        console.log(`${indent}- ${persona.nombre} [${persona.id}]${parejaTexto}`);

        for (let hijoId of persona.hijos) {
            this.imprimirArbol(hijoId, nivel + 1, visitados);
        }
    }

    imprimirTodos() {
        console.log("\n🌳 Árbol genealógico:");
        this.personas.forEach((persona, id) => {
            // Mostrar solo raíces (quienes no son hijos de nadie)
            let esHijo = [...this.personas.values()].some(p => p.hijos.includes(id));
            if (!esHijo) this.imprimirArbol(id);
        });
    }
}

// Programa interactivo
async function main() {
    const arbol = new ArbolGenealogico();

    while (true) {
        console.log(`
📌 Elige una acción:
1. Añadir persona
2. Eliminar persona
3. Establecer pareja
4. Añadir hijo
5. Mostrar árbol
6. Salir
`);
        const opcion = await prompt("Opción: ");

        switch (opcion) {
            case "1":
                const id = await prompt("ID: ");
                const nombre = await prompt("Nombre: ");
                arbol.agregarPersona(id, nombre);
                break;

            case "2":
                const idEliminar = await prompt("ID de la persona a eliminar: ");
                arbol.eliminarPersona(idEliminar);
                break;

            case "3":
                const id1 = await prompt("ID de la primera persona: ");
                const id2 = await prompt("ID de la segunda persona: ");
                arbol.establecerPareja(id1, id2);
                break;

            case "4":
                const idPadre = await prompt("ID del padre/madre: ");
                const idHijo = await prompt("ID del hijo: ");
                arbol.añadirHijo(idPadre, idHijo);
                break;

            case "5":
                arbol.imprimirTodos();
                break;

            case "6":
                console.log("👋 ¡Hasta pronto!");
                rl.close();
                return;

            default:
                console.log("❌ Opción inválida.");
        }
    }
}

main();
