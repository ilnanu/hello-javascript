/*
 * EJERCICIO:
 * He presentado mi proyecto más importante del año: mouredev pro.
 * Un campus para la comunidad, que lanzaré en octubre, donde estudiar
 * programación de una manera diferente.
 * Cualquier persona suscrita a la newsletter de https://mouredev.pro
 * accederá a sorteos mensuales de suscripciones, regalos y descuentos.
 *
 * Desarrolla un programa que lea los registros de un fichero .csv y
 * seleccione de manera aleatoria diferentes ganadores.
 * Requisitos:
 * 1. Crea un .csv con 3 columnas: id, email y status con valor "activo"
 *    o "inactivo" (y datos ficticios).
 *    Ejemplo: 1 | test@test.com | activo
 *             2 | test2@test.com | inactivo
 *    (El .csv no debe subirse como parte de la corrección)
 * 2. Recupera los datos desde el programa y selecciona email aleatorios.
 * Acciones:
 * 1. Accede al fichero .csv y selecciona de manera aleatoria un email
 *    ganador de una suscripción, otro ganador de un descuento y un último
 *    ganador de un libro (sólo si tiene status "activo" y no está repetido).
 * 2. Muestra los emails ganadores y su id.
 * 3. Ten en cuenta que la primera fila (con el nombre de las columnas)
 *    no debe tenerse en cuenta.
 */
const fs = require('fs');
const csv = require('csv-parser');

const rutaCSV = 'suscriptores.csv';
const usuariosActivos = [];

fs.createReadStream(rutaCSV)
    .pipe(csv())
    .on('data', (row) => {
        if (row.status.trim().toLowerCase() === 'activo') {
            usuariosActivos.push({ id: row.id, email: row.email });
        }
    })
    .on('end', () => {
        if (usuariosActivos.length < 3) {
            console.log('⚠️ No hay suficientes usuarios activos para el sorteo.');
            return;
        }

        // Selección de 3 ganadores distintos al azar
        const ganadores = seleccionarGanadores(usuariosActivos, 3);
        const premios = ['Suscripción', 'Descuento', 'Libro'];

        console.log('\n🎉 GANADORES DEL SORTEO MOUREDEV PRO 🎉\n');
        premios.forEach((premio, i) => {
            const ganador = ganadores[i];
            console.log(`🏆 ${premio}: ${ganador.email} (ID: ${ganador.id})`);
        });
    });

// Función para obtener elementos aleatorios sin repetir
function seleccionarGanadores(array, cantidad) {
    const copia = [...array];
    const ganadores = [];

    for (let i = 0; i < cantidad; i++) {
        const index = Math.floor(Math.random() * copia.length);
        ganadores.push(copia.splice(index, 1)[0]);
    }

    return ganadores;
}

