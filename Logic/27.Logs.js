/*
 * EJERCICIO:
 * Explora el concepto de "logging" en tu lenguaje. Configúralo y muestra
 * un ejemplo con cada nivel de "severidad" disponible.
 */
function ejecutarApp() {
    console.log("📘 LOG: La aplicación se está iniciando...");

    const configCargada = true;
    const usuarioAutenticado = false;

    console.info("ℹ️ INFO: Configuración cargada correctamente.");

    if (!usuarioAutenticado) {
        console.warn("⚠️ WARNING: El usuario no ha iniciado sesión.");
    }

    try {
        throw new Error("No se pudo conectar con la base de datos.");
    } catch (error) {
        console.error("❌ ERROR:", error.message);
    }

    console.debug("🐛 DEBUG: Fin del proceso de inicialización.");
}

ejecutarApp();

/*
 * DIFICULTAD EXTRA (opcional):
 * Crea un programa ficticio de gestión de tareas que permita añadir, eliminar
 * y listar dichas tareas.
 * - Añadir: recibe nombre y descripción.
 * - Eliminar: por nombre de la tarea.
 * Implementa diferentes mensajes de log que muestren información según la 
 * tarea ejecutada (a tu elección).
 * Utiliza el log para visualizar el tiempo de ejecución de cada tarea. 
 */
class GestorDeTareas {
    constructor() {
        this.tareas = [];
    }

    añadirTarea(nombre, descripcion) {
        console.time(`⏱ Añadir tarea "${nombre}"`);

        if (this.tareas.find(t => t.nombre === nombre)) {
            console.warn(`⚠️ La tarea "${nombre}" ya existe.`);
            console.timeEnd(`⏱ Añadir tarea "${nombre}"`);
            return;
        }

        this.tareas.push({ nombre, descripcion });
        console.log(`✅ Tarea añadida: "${nombre}"`);
        console.timeEnd(`⏱ Añadir tarea "${nombre}"`);
    }

    eliminarTarea(nombre) {
        console.time(`⏱ Eliminar tarea "${nombre}"`);

        const indice = this.tareas.findIndex(t => t.nombre === nombre);
        if (indice === -1) {
            console.error(`❌ No se encontró la tarea "${nombre}".`);
            console.timeEnd(`⏱ Eliminar tarea "${nombre}"`);
            return;
        }

        this.tareas.splice(indice, 1);
        console.info(`🗑 Tarea "${nombre}" eliminada correctamente.`);
        console.timeEnd(`⏱ Eliminar tarea "${nombre}"`);
    }

    listarTareas() {
        console.log("📋 Listado de tareas:");
        if (this.tareas.length === 0) {
            console.warn("⚠️ No hay tareas disponibles.");
        } else {
            this.tareas.forEach((tarea, index) => {
                console.log(`${index + 1}. ${tarea.nombre}: ${tarea.descripcion}`);
            });
        }
    }
}

// 🧪 Simulación de uso
const gestor = new GestorDeTareas();

gestor.añadirTarea("Comprar", "Comprar leche, pan y huevos.");
gestor.añadirTarea("Estudiar", "Repasar patrones de diseño.");
gestor.añadirTarea("Comprar", "Tarea duplicada, no debe añadirse.");

gestor.listarTareas();

gestor.eliminarTarea("Comprar");
gestor.eliminarTarea("Dormir"); // no existe

gestor.listarTareas();