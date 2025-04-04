/*
Crea un pequeño sistema de gestión del estado de pedidos.
Implementa una clase que defina un pedido con las siguientes características:
* El pedido tiene un ID único y un estado.
* El estado es un enumerado que puede ser PENDIENTE, ENVIADO, ENTREGADO y CANCELADO.
* Implementa las funciones que sirvan para modificar el estado:
    * Cambiar el estado a ENVIADO.
    * Cambiar el estado a ENTREGADO.
    * Cambiar el estado a CANCELADO.
    * Cambiar el estado a PENDIENTE.
    * Cambiar el estado a un valor inválido (debería lanzar un error).
    (establece una lógica, por ejemplo, no se puede entregar si no se ha enviado, etc...)
* Implementa un método para mostrar el estado actual del pedido.
* Crea diferentes pedidos y muestra cómo se interactua con ellos.
*/
// Enumerado de estados de pedido
const EstadosPedido = Object.freeze({
    PENDIENTE: "PENDIENTE",
    ENVIADO: "ENVIADO",
    ENTREGADO: "ENTREGADO",
    CANCELADO: "CANCELADO"
});

let contadorID = 1;

class Pedido {
    constructor() {
        this.id = contadorID++;
        this.estado = EstadosPedido.PENDIENTE;
    }

    mostrarEstado() {
        console.log(`Pedido ${this.id} está en estado: ${this.estado}`);
    }

    cambiarEstado(nuevoEstado) {
        const estadoActual = this.estado;

        switch (nuevoEstado) {
            case EstadosPedido.PENDIENTE:
                if (estadoActual === EstadosPedido.ENVIADO || estadoActual === EstadosPedido.CANCELADO) {
                    throw new Error("No se puede volver a PENDIENTE desde ENVIADO o CANCELADO.");
                }
                break;
            case EstadosPedido.ENVIADO:
                if (estadoActual !== EstadosPedido.PENDIENTE) {
                    throw new Error("Solo se puede enviar un pedido que esté PENDIENTE.");
                }
                break;
            case EstadosPedido.ENTREGADO:
                if (estadoActual !== EstadosPedido.ENVIADO) {
                    throw new Error("Solo se puede ENTREGAR un pedido que esté ENVIADO.");
                }
                break;
            case EstadosPedido.CANCELADO:
                if (estadoActual === EstadosPedido.ENTREGADO) {
                    throw new Error("No se puede cancelar un pedido que ya ha sido ENTREGADO.");
                }
                break;
            default:
                throw new Error("Estado inválido.");
        }

        this.estado = nuevoEstado;
        console.log(`Pedido ${this.id} cambiado a estado: ${this.estado}`);
    }
}

// Ejemplo de uso
const pedido1 = new Pedido();
const pedido2 = new Pedido();

pedido1.mostrarEstado();
pedido1.cambiarEstado(EstadosPedido.ENVIADO);
pedido1.cambiarEstado(EstadosPedido.ENTREGADO);
pedido1.mostrarEstado();

pedido2.mostrarEstado();
pedido2.cambiarEstado(EstadosPedido.CANCELADO);
pedido2.mostrarEstado();

try {
    pedido2.cambiarEstado("INVALIDO");
} catch (error) {
    console.error("Error al cambiar estado del pedido2:", error.message);
}

try {
    pedido1.cambiarEstado(EstadosPedido.PENDIENTE);
} catch (error) {
    console.error("Error al cambiar estado del pedido1:", error.message);
}
