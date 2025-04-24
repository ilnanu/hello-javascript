/*
 * EJERCICIO:
 * Cada año se celebra el Batman Day durante la tercera semana de septiembre... 
 * ¡Y este año cumple 85 años! Te propongo un reto doble:
 *
 * RETO 1:
 * Crea un programa que calcule cuándo se va a celebrar el Batman Day hasta 
 * su 100 aniversario.
 *
 * RETO 2:
 * Crea un programa que implemente el sistema de seguridad de la Batcueva. 
 * Este sistema está diseñado para monitorear múltiples sensores distribuidos
 * por Gotham, detectar intrusos y activar respuestas automatizadas. 
 * Cada sensor reporta su estado en tiempo real, y Batman necesita un programa 
 * que procese estos datos para tomar decisiones estratégicas.
 * Requisitos:
 * - El mapa de Gotham y los sensores se representa con una cuadrícula 20x20.
 * - Cada sensor se identifica con una coordenada (x, y) y un nivel
 *   de amenaza entre 0 a 10 (número entero).
 * - Batman debe concentrar recursos en el área más crítica de Gotham.
 * - El programa recibe un listado de tuplas representando coordenadas de los 
 *   sensores y su nivel de amenaza. El umbral de activación del protocolo de
 *   seguridad es 20 (sumatorio de amenazas en una cuadrícula 3x3).
 * Acciones: 
 * - Identifica el área con mayor concentración de amenazas
 *   (sumatorio de amenazas en una cuadrícula 3x3).
 * - Si el sumatorio de amenazas es mayor al umbral, activa el 
 *   protocolo de seguridad.
 * - Calcula la distancia desde la Batcueva, situada en (0, 0). La distancia es
 *   la suma absoluta de las coordenadas al centro de la cuadrícula amenazada.
 * - Muestra la coordenada al centro de la cuadrícula más amenazada, la suma de
 *   sus amenazas, la distancia a la Batcueva y si se debe activar el
 *   protocolo de seguridad.
 */
function calcularBatmanDay() {
    const añoNacimiento = 1939;
    const añoFinal = añoNacimiento + 100;
    const resultado = [];

    for (let año = 2024; año <= añoFinal; año++) {
        // Batman Day = tercer sábado de septiembre
        const diasDeSeptiembre = Array.from({ length: 30 }, (_, i) => new Date(año, 8, i + 1)); // Septiembre = mes 8
        const sabados = diasDeSeptiembre.filter(d => d.getDay() === 6); // 6 = Sábado
        const tercerSabado = sabados[2]; // Índice 2 = tercer sábado
        resultado.push({ año, fecha: tercerSabado.toDateString() });
    }

    return resultado;
}

console.log("Fechas del Batman Day hasta el 100 aniversario:");
console.table(calcularBatmanDay());

// Simulación del sistema de sensores
const sensores = [
    // Coordenada (x, y), nivel de amenaza
    [2, 3, 5], [3, 3, 7], [3, 4, 9], [4, 4, 8], [5, 5, 6],
    [10, 10, 10], [10, 11, 8], [11, 10, 5], [11, 11, 9],
    [15, 18, 4], [16, 18, 3], [17, 18, 6]
];

const UMBRAL = 20;
const GRID_SIZE = 20;

function inicializarMapa() {
    return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

function aplicarSensores(mapa, sensores) {
    sensores.forEach(([x, y, amenaza]) => {
        if (x < GRID_SIZE && y < GRID_SIZE) {
            mapa[y][x] = amenaza;
        }
    });
}

function encontrarZonaCritica(mapa) {
    let maxAmenaza = 0;
    let centroCritico = null;

    for (let y = 0; y <= GRID_SIZE - 3; y++) {
        for (let x = 0; x <= GRID_SIZE - 3; x++) {
            let suma = 0;

            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    suma += mapa[y + dy][x + dx];
                }
            }

            if (suma > maxAmenaza) {
                maxAmenaza = suma;
                centroCritico = { x: x + 1, y: y + 1 }; // Centro de la 3x3
            }
        }
    }

    return { centroCritico, maxAmenaza };
}

function distanciaABatcueva(x, y) {
    return Math.abs(x) + Math.abs(y);
}

// Ejecutamos la simulación
const mapa = inicializarMapa();
aplicarSensores(mapa, sensores);

const { centroCritico, maxAmenaza } = encontrarZonaCritica(mapa);
const distancia = distanciaABatcueva(centroCritico.x, centroCritico.y);
const activarProtocolo = maxAmenaza >= UMBRAL;

console.log("🛡️ Resultado del sistema de seguridad de Gotham:");
console.log(`📍 Centro más amenazado: (${centroCritico.x}, ${centroCritico.y})`);
console.log(`🔥 Suma de amenazas: ${maxAmenaza}`);
console.log(`📏 Distancia a la Batcueva: ${distancia}`);
console.log(`🚨 ¿Activar protocolo? ${activarProtocolo ? "Sí" : "No"}`);
