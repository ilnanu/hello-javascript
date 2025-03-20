// Crea una función que sea capaz de procesar parámetros, pero que también pueda lanzar 3 tipos diferentes de excepcions (una de ellas tiene que corresponderse con un tipo de excepción creada por nosotros de manera personalizada, y debe ser lanzada de manera manual) en caso de error.
/* Captura todas las excepciones desde el lugar donde llamas a la función.
Imprime el tipo de error.
Imprime si no se ha producido ningún error.
Imprime que la ejecución ha finalizado.
*/
// 1. Excepción personalizada
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

// 2. Función de procesamiento
function procesarParametro(param) {
    if (typeof param !== 'number' || !Number.isInteger(param)) {
        throw new TypeError("El parámetro debe ser un entero");
    }
    if (param < 0) {
        throw new RangeError("El parámetro no puede ser negativo");
    }
    if (param === 0) {
        throw new CustomError("El parámetro no puede ser cero");
    }
    return param * 2;
}

// 3. Bloque de ejecución y manejo de excepciones
let noError = true;
try {
    const resultado = procesarParametro(0); // Prueba con diferentes valores
    console.log(`Resultado: ${resultado}`);
} catch (error) {
    noError = false;
    if (error instanceof CustomError) {
        console.log(`Error personalizado: ${error.name} - ${error.message}`);
    } else if (error instanceof TypeError) {
        console.log(`Error de tipo: ${error.name} - ${error.message}`);
    } else if (error instanceof RangeError) {
        console.log(`Error de rango: ${error.name} - ${error.message}`);
    } else {
        console.log(`Error inesperado: ${error.name} - ${error.message}`);
    }
} finally {
    if (noError) {
        console.log("No se produjeron errores");
    }
    console.log("Ejecución finalizada");
}
