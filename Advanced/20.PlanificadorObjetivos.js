/*
 * EJERCICIO:
 * El nuevo año está a punto de comenzar...
 * ¡Voy a ayudarte a planificar tus propósitos de nuevo año!
 *
 * Programa un gestor de objetivos con las siguientes características:
 * - Permite añadir objetivos (máximo 10)
 * - Calcular el plan detallado
 * - Guardar la planificación
 * 
 * Cada entrada de un objetivo está formado por (con un ejemplo):
 * - Meta: Leer libros
 * - Cantidad: 12
 * - Unidades: libros
 * - Plazo (en meses): 12 (máximo 12)
 *
 * El cálculo del plan detallado generará la siguiente salida:
 * - Un apartado para cada mes
 * - Un listado de objetivos calculados a cumplir en cada mes
 *   (ejemplo: si quiero leer 12 libros, dará como resultado 
 *   uno al mes)
 * - Cada objetivo debe poseer su nombre, la cantidad de
 *   unidades a completar en cada mes y su total. Por ejemplo:
 *
 *   Enero:
 *   [ ] 1. Leer libros (1 libro/mes). Total: 12.
 *   [ ] 2. Estudiar Git (1 curso/mes). Total: 1.
 *   Febrero:
 *   [ ] 1. Leer libros (1 libro/mes). Total: 12.
 *   ...
 *   Diciembre:
 *   [ ] 1. Leer libros (1 libro/mes). Total: 12.
 *
 * - Si la duración es menor a un año, finalizará en el mes
 *   correspondiente.
 *   
 * Por último, el cálculo detallado debe poder exportarse a .txt
 * (No subir el fichero)
 */
const fs = require('fs');
const readline = require('readline');

// Crear interfaz de entrada/salida por terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Lista de objetivos
let objetivos = [];

// Función para agregar un objetivo
function agregarObjetivo() {
    if (objetivos.length >= 10) {
        console.log('Ya tienes el máximo de objetivos (10).');
        menuPrincipal();
        return;
    }

    rl.question('Introduce la meta: ', (meta) => {
        rl.question('Introduce la cantidad: ', (cantidad) => {
            rl.question('Introduce las unidades: ', (unidades) => {
                rl.question('Introduce el plazo (en meses): ', (plazo) => {
                    if (parseInt(plazo) > 12 || parseInt(plazo) <= 0) {
                        console.log('El plazo debe estar entre 1 y 12 meses.');
                        agregarObjetivo();
                        return;
                    }

                    objetivos.push({ meta, cantidad: parseInt(cantidad), unidades, plazo: parseInt(plazo) });
                    console.log('Objetivo agregado con éxito.');
                    menuPrincipal();
                });
            });
        });
    });
}

// Función para calcular el plan detallado
function calcularPlan() {
    let planDetallado = '';

    objetivos.forEach((objetivo, idx) => {
        planDetallado += `Objetivo ${idx + 1}: ${objetivo.meta}\n`;
        for (let mes = 1; mes <= objetivo.plazo; mes++) {
            const cantidadMensual = (objetivo.cantidad / objetivo.plazo).toFixed(2);
            planDetallado += `${getMes(mes)}:\n[ ] ${mes}. ${objetivo.meta} (${cantidadMensual} ${objetivo.unidades}/mes). Total: ${objetivo.cantidad}\n`;
        }
        planDetallado += '\n';
    });

    console.log(planDetallado);
    menuPrincipal();
}

// Función para exportar el plan detallado a un archivo .txt
function exportarPlan() {
    let planDetallado = '';

    objetivos.forEach((objetivo, idx) => {
        planDetallado += `Objetivo ${idx + 1}: ${objetivo.meta}\n`;
        for (let mes = 1; mes <= objetivo.plazo; mes++) {
            const cantidadMensual = (objetivo.cantidad / objetivo.plazo).toFixed(2);
            planDetallado += `${getMes(mes)}:\n[ ] ${mes}. ${objetivo.meta} (${cantidadMensual} ${objetivo.unidades}/mes). Total: ${objetivo.cantidad}\n`;
        }
        planDetallado += '\n';
    });

    fs.writeFileSync('plan_detallado.txt', planDetallado, 'utf8');
    console.log('El plan detallado ha sido exportado a plan_detallado.txt');
    menuPrincipal();
}

// Función para obtener el nombre del mes
function getMes(mes) {
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return meses[mes - 1];
}

// Menú principal
function menuPrincipal() {
    rl.question(
        '\nSeleccione una opción:\n1. Agregar objetivo\n2. Calcular plan detallado\n3. Exportar plan a .txt\n4. Salir\n> ',
        (opcion) => {
            switch (opcion) {
                case '1':
                    agregarObjetivo();
                    break;
                case '2':
                    calcularPlan();
                    break;
                case '3':
                    exportarPlan();
                    break;
                case '4':
                    console.log('¡Hasta luego!');
                    rl.close();
                    break;
                default:
                    console.log('Opción no válida. Intenta de nuevo.');
                    menuPrincipal();
            }
        }
    );
}

// Iniciar el menú
menuPrincipal();
