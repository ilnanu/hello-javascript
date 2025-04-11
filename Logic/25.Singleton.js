/*
 * EJERCICIO:
 * Explora el patrón de diseño "singleton" y muestra cómo crearlo
 * con un ejemplo genérico.
 */
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
  }

  getInstance() {
    return this;
  }
}
// Ejemplo de uso
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true, ambas variables apuntan a la misma instancia

/*
 * DIFICULTAD EXTRA (opcional):
 * Utiliza el patrón de diseño "singleton" para representar una clase que
 * haga referencia a la sesión de usuario de una aplicación ficticia.
 * La sesión debe permitir asignar un usuario (id, username, nombre y email),
 * recuperar los datos del usuario y borrar los datos de la sesión.
 */

class SesionUsuario {
    constructor() {
        if (SesionUsuario._instancia) {
            return SesionUsuario._instancia;
        }

        this.usuario = null;
        SesionUsuario._instancia = this;
    }

    iniciarSesion({ id, username, nombre, email }) {
        this.usuario = { id, username, nombre, email };
        console.log(`✅ Sesión iniciada para: ${this.usuario.username}`);
    }

    obtenerUsuario() {
        return this.usuario
            ? this.usuario
            : "⚠️ No hay ningún usuario en sesión.";
    }

    cerrarSesion() {
        if (this.usuario) {
            console.log(`👋 Sesión cerrada para: ${this.usuario.username}`);
            this.usuario = null;
        } else {
            console.log("⚠️ No hay sesión activa para cerrar.");
        }
    }
}

// 🔁 Siempre obtendrás la misma instancia:
const sesion1 = new SesionUsuario();
const sesion2 = new SesionUsuario();

sesion1.iniciarSesion({
    id: 1,
    username: "jdoe",
    nombre: "John Doe",
    email: "jdoe@email.com"
});

console.log("👤 Usuario en sesión:", sesion2.obtenerUsuario()); // usa sesion2 pero es la misma instancia

sesion2.cerrarSesion();
console.log("👤 Estado actual:", sesion1.obtenerUsuario());


