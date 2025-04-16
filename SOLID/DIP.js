/*
 * EJERCICIO:
 * Explora el "Principio SOLID de Inversión de Dependencias (Dependency Inversion
 * Principle, DIP)" y crea un ejemplo simple donde se muestre su funcionamiento
 * de forma correcta e incorrecta.
 */

//❌ Ejemplo INCORRECTO (violando DIP)
class MySQLDatabaseBAD {
    guardar(datos) {
        console.log(`Guardando en MySQL: ${JSON.stringify(datos)}`);
    }
}

class UsuarioServiceBAD {
    constructor() {
        this.db = new MySQLDatabaseBAD(); // 🔴 Alto acoplamiento
    }

    registrar(usuario) {
        this.db.guardar(usuario); // Depende directamente de MySQL
    }
}

const servicio = new UsuarioServiceBAD();
servicio.registrar({ nombre: "Juan", email: "juan@mail.com" });

//✅ Ejemplo CORRECTO (cumpliendo DIP)

class IRepositorio {
    guardar(datos) {
        throw new Error("Debe implementar el método guardar");
    }
}

class MySQLDatabase extends IRepositorio {
    guardar(datos) {
        console.log(`💾 Guardando en MySQL: ${JSON.stringify(datos)}`);
    }
}

class MongoDatabase extends IRepositorio {
    guardar(datos) {
        console.log(`📦 Guardando en MongoDB: ${JSON.stringify(datos)}`);
    }
}

class UsuarioService {
    constructor(repositorio) {
        this.repositorio = repositorio; // ✅ Inversión de dependencia
    }

    registrar(usuario) {
        this.repositorio.guardar(usuario);
    }
}

const mysql = new MySQLDatabase();
const mongo = new MongoDatabase();

const servicio1 = new UsuarioService(mysql);
const servicio2 = new UsuarioService(mongo);

servicio1.registrar({ nombre: "Ana", email: "ana@mail.com" });
servicio2.registrar({ nombre: "Luis", email: "luis@mail.com" });



/*
 * DIFICULTAD EXTRA (opcional):
 * Crea un sistema de notificaciones.
 * Requisitos:
 * 1. El sistema puede enviar Email, PUSH y SMS (implementaciones específicas).
 * 2. El sistema de notificaciones no puede depender de las implementaciones específicas.
 * Instrucciones:
 * 1. Crea la interfaz o clase abstracta.
 * 2. Desarrolla las implementaciones específicas.
 * 3. Crea el sistema de notificaciones usando el DIP.
 * 4. Desarrolla un código que compruebe que se cumple el principio.
 */

// Interfaz base para notificaciones
class INotificador {
    enviar(mensaje, destinatario) {
        throw new Error("Método 'enviar' no implementado.");
    }
}

class NotificadorEmail extends INotificador {
    enviar(mensaje, destinatario) {
        console.log(`📧 Enviando EMAIL a ${destinatario}: ${mensaje}`);
    }
}

class NotificadorSMS extends INotificador {
    enviar(mensaje, destinatario) {
        console.log(`📱 Enviando SMS a ${destinatario}: ${mensaje}`);
    }
}

class NotificadorPush extends INotificador {
    enviar(mensaje, destinatario) {
        console.log(`🔔 Enviando PUSH a ${destinatario}: ${mensaje}`);
    }
}

class SistemaDeNotificaciones {
    constructor(notificador) {
        this.notificador = notificador; // Depende de la abstracción
    }

    notificar(mensaje, destinatario) {
        this.notificador.enviar(mensaje, destinatario);
    }
}

// Inyectamos distintas implementaciones
const email = new NotificadorEmail();
const sms = new NotificadorSMS();
const push = new NotificadorPush();

// Creamos sistemas con cada uno
const sistemaEmail = new SistemaDeNotificaciones(email);
const sistemaSMS = new SistemaDeNotificaciones(sms);
const sistemaPush = new SistemaDeNotificaciones(push);

// Enviamos notificaciones
sistemaEmail.notificar("Tu pedido ha sido enviado", "ana@email.com");
sistemaSMS.notificar("Tu código es 1234", "+34123456789");
sistemaPush.notificar("Tienes una nueva alerta", "usuario123");
