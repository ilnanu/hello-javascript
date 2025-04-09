/*
 * EJERCICIO:
 * Explora el concepto de funciones de orden superior en javascript 
 * creando ejemplos simples (a tu elección) que muestren su funcionamiento.
 */

//Ejemplo 1: Recibir una función como parámetro
function operar(a, b, operacion) {
    return operacion(a, b);
}

function sumar(x, y) {
    return x + y;
}

function multiplicar(x, y) {
    return x * y;
}

console.log("Suma:", operar(3, 4, sumar));          // 7
console.log("Multiplicación:", operar(3, 4, multiplicar));  // 12

//Ejemplo 2: Devolver una función

function crearSaludo(saludo) {
    return function (nombre) {
        console.log(`${saludo}, ${nombre}!`);
    };
}

const saludarHola = crearSaludo("Hola");
const saludarBuenas = crearSaludo("Buenas tardes");

saludarHola("Ana");       // Hola, Ana!
saludarBuenas("Carlos");  // Buenas tardes, Carlos!

//Ejemplo 3: Uso real con map, filter y reduce
const numeros = [1, 2, 3, 4, 5];

// map: función que transforma cada valor
const dobles = numeros.map(n => n * 2);
console.log("Dobles:", dobles);

// filter: filtra según una condición
const pares = numeros.filter(n => n % 2 === 0);
console.log("Pares:", pares);

// reduce: reduce el array a un único valor
const suma = numeros.reduce((acc, n) => acc + n, 0);
console.log("Suma total:", suma);


/*
 * DIFICULTAD EXTRA (opcional):
 * Dada una lista de estudiantes (con sus nombres, fecha de nacimiento y 
 * lista de calificaciones), utiliza funciones de orden superior para 
 * realizar las siguientes operaciones de procesamiento y análisis:
 * - Promedio calificaciones: Obtiene una lista de estudiantes por nombre
 *   y promedio de sus calificaciones.
 * - Mejores estudiantes: Obtiene una lista con el nombre de los estudiantes
 *   que tienen calificaciones con un 9 o más de promedio.
 * - Nacimiento: Obtiene una lista de estudiantes ordenada desde el más joven.
 * - Mayor calificación: Obtiene la calificación más alta de entre todas las
 *   de los alumnos.
 * - Una calificación debe estar comprendida entre 0 y 10 (admite decimales).
 */
const estudiantes = [
    {
        nombre: "Ana",
        nacimiento: "2004-05-12",
        calificaciones: [9.5, 8.2, 10, 7.8]
    },
    {
        nombre: "Carlos",
        nacimiento: "2006-02-20",
        calificaciones: [6.8, 7.5, 8.0, 7.0]
    },
    {
        nombre: "Lucía",
        nacimiento: "2003-10-30",
        calificaciones: [9.0, 9.5, 9.8, 10]
    },
    {
        nombre: "Pedro",
        nacimiento: "2005-08-15",
        calificaciones: [5.0, 6.0, 7.5]
    }
];

// ✅ Función auxiliar para validar calificaciones
function validarCalificaciones(estudiante) {
    return estudiante.calificaciones.every(c => c >= 0 && c <= 10);
}

// Filtrar estudiantes con datos válidos
const estudiantesValidos = estudiantes.filter(validarCalificaciones);

// ✅ 1. Promedio de calificaciones
const promedios = estudiantesValidos.map(est => {
    const suma = est.calificaciones.reduce((acc, nota) => acc + nota, 0);
    const promedio = suma / est.calificaciones.length;
    return {
        nombre: est.nombre,
        promedio: promedio.toFixed(2)
    };
});

console.log("📊 Promedios:");
console.table(promedios);

// ✅ 2. Mejores estudiantes (promedio ≥ 9)
const mejores = promedios.filter(est => est.promedio >= 9);
console.log("🏆 Mejores estudiantes (≥ 9):");
console.table(mejores);

// ✅ 3. Orden por nacimiento (más joven primero)
const ordenadosPorEdad = [...estudiantesValidos].sort((a, b) =>
    new Date(b.nacimiento) - new Date(a.nacimiento)
);
console.log("👶 Estudiantes del más joven al mayor:");
console.table(ordenadosPorEdad.map(e => ({
    nombre: e.nombre,
    nacimiento: e.nacimiento
})));

// ✅ 4. Mayor calificación entre todos
const todasLasNotas = estudiantesValidos.flatMap(e => e.calificaciones);
const notaMaxima = Math.max(...todasLasNotas);
console.log("📈 Calificación más alta:", notaMaxima);
