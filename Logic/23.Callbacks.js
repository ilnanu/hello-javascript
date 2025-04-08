/*
 * EJERCICIO:
 Explora el concepto de callback en javascript creando un ejemplo
 simple (a tu elección) que muestre su funcionamiento.
 */
function procesarUsuario(nombre, callback) {
    console.log("Procesando usuario...");
    callback(nombre);
}

function saludar(nombre) {
    console.log(`¡Hola, ${nombre}!`);
}

// Usamos 'saludar' como callback
procesarUsuario("Carlos", saludar);


/*
 * DIFICULTAD EXTRA (opcional):
 * Crea un simulador de pedidos de un restaurante utilizando callbacks.
 * Estará formado por una función que procesa pedidos.
 * Debe aceptar el nombre del plato, una callback de confirmación, una
 * de listo y otra de entrega.
 * - Debe imprimir un confirmación cuando empiece el procesamiento.
 * - Debe simular un tiempo aleatorio entre 1 a 10 segundos entre
 *   procesos.
 * - Debe invocar a cada callback siguiendo un orden de procesado.
 * - Debe notificar que el plato está listo o ha sido entregado.
 */
function procesarPedido(plato, onConfirmacion, onListo, onEntrega) {
    console.log(`📦 Recibido pedido: ${plato}`);

    // Paso 1: Confirmación
    setTimeout(() => {
        onConfirmacion(plato);

        // Paso 2: Preparar plato
        setTimeout(() => {
            onListo(plato);

            // Paso 3: Entrega
            setTimeout(() => {
                onEntrega(plato);
            }, getTiempoAleatorio());

        }, getTiempoAleatorio());

    }, getTiempoAleatorio());
}

// Tiempo aleatorio entre 1 y 10 segundos (1000–10000 ms)
function getTiempoAleatorio() {
    return Math.floor(Math.random() * 10000) + 1000;
}

// Callbacks personalizados
function confirmar(plato) {
    console.log(`✅ Confirmado: ${plato} está en preparación.`);
}

function listo(plato) {
    console.log(`👨‍🍳 El plato '${plato}' está listo para entregar.`);
}

function entregar(plato) {
    console.log(`🚗 Pedido '${plato}' ha sido entregado con éxito.`);
}

// Simular varios pedidos
procesarPedido("Pizza Margarita", confirmar, listo, entregar);
procesarPedido("Sushi", confirmar, listo, entregar);
procesarPedido("Hamburguesa", confirmar, listo, entregar);
