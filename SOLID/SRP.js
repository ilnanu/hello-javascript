/*
 * EJERCICIO:
 * Explora el "Principio SOLID de Responsabilidad Única (Single Responsibility
 * Principle, SRP)" y crea un ejemplo simple donde se muestre su funcionamiento
 * de forma correcta e incorrecta.
 */
//Ejemplo erroneo
class UsuarioMal {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }

    guardarEnBD() {
        console.log(`💾 Guardando usuario ${this.nombre} en la base de datos...`);
    }

    enviarEmailBienvenida() {
        console.log(`📧 Enviando email de bienvenida a ${this.email}`);
    }
}
//Ejemplo correcto
class Usuario {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class UsuarioRepositorio {
    guardar(usuario) {
        console.log(`💾 Guardando usuario ${usuario.nombre} en la base de datos...`);
    }
}

class ServicioEmail {
    enviarBienvenida(usuario) {
        console.log(`📧 Enviando email de bienvenida a ${usuario.email}`);
    }
}
const usuario = new Usuario("Ana", "ana@email.com");

const repo = new UsuarioRepositorio();
repo.guardar(usuario);

const servicioEmail = new ServicioEmail();
servicioEmail.enviarBienvenida(usuario);


/*
* DIFICULTAD EXTRA (opcional):
 * Desarrolla un sistema de gestión para una biblioteca. El sistema necesita
 * manejar diferentes aspectos como el registro de libros, la gestión de usuarios
 * y el procesamiento de préstamos de libros.
 * Requisitos:
 * 1. Registrar libros: El sistema debe permitir agregar nuevos libros con 
 * información básica como título, autor y número de copias disponibles.
 * 2. Registrar usuarios: El sistema debe permitir agregar nuevos usuarios con
 * información básica como nombre, número de identificación y correo electrónico.
 * 3. Procesar préstamos de libros: El sistema debe permitir a los usuarios
 * tomar prestados y devolver libros.
 * Instrucciones:
 * 1. Diseña una clase que no cumple el SRP: Crea una clase Library que maneje
 * los tres aspectos mencionados anteriormente (registro de libros, registro de
 * usuarios y procesamiento de préstamos).
 * 2. Refactoriza el código: Separa las responsabilidades en diferentes clases
 * siguiendo el Principio de Responsabilidad Única.
 */

//Ejemplo erroneo
class LibraryMal {
    constructor() {
        this.libros = [];
        this.usuarios = [];
        this.prestamos = [];
    }

    registrarLibro(titulo, autor, copias) {
        this.libros.push({ titulo, autor, copias });
        console.log(`📚 Libro registrado: ${titulo}`);
    }

    registrarUsuario(nombre, id, email) {
        this.usuarios.push({ nombre, id, email });
        console.log(`👤 Usuario registrado: ${nombre}`);
    }

    prestarLibro(titulo, idUsuario) {
        const libro = this.libros.find(l => l.titulo === titulo);
        const usuario = this.usuarios.find(u => u.id === idUsuario);

        if (!libro || libro.copias <= 0) {
            console.error("❌ Libro no disponible.");
            return;
        }

        if (!usuario) {
            console.error("❌ Usuario no encontrado.");
            return;
        }

        libro.copias--;
        this.prestamos.push({ titulo, idUsuario, fecha: new Date() });
        console.log(`📖 Préstamo realizado: ${titulo} a ${usuario.nombre}`);
    }

    devolverLibro(titulo, idUsuario) {
        const libro = this.libros.find(l => l.titulo === titulo);
        if (!libro) {
            console.error("❌ Libro no encontrado.");
            return;
        }

        libro.copias++;
        this.prestamos = this.prestamos.filter(p => !(p.titulo === titulo && p.idUsuario === idUsuario));
        console.log(`✅ Libro devuelto: ${titulo}`);
    }
}

//Ejemplo OK
class Libro {
    constructor(titulo, autor, copias) {
        this.titulo = titulo;
        this.autor = autor;
        this.copias = copias;
    }
}
class UsuarioLibreria {
    constructor(nombre, id, email) {
        this.nombre = nombre;
        this.id = id;
        this.email = email;
    }
}
class RepositorioLibros {
    constructor() {
        this.libros = [];
    }

    agregar(libro) {
        this.libros.push(libro);
    }

    buscar(titulo) {
        return this.libros.find(l => l.titulo === titulo);
    }
}
class RepositorioUsuarios {
    constructor() {
        this.usuarios = [];
    }

    agregar(usuario) {
        this.usuarios.push(usuario);
    }

    buscar(id) {
        return this.usuarios.find(u => u.id === id);
    }
}
class GestorPrestamos {
    constructor(librosRepo, usuariosRepo) {
        this.prestamos = [];
        this.librosRepo = librosRepo;
        this.usuariosRepo = usuariosRepo;
    }

    prestar(titulo, idUsuario) {
        const libro = this.librosRepo.buscar(titulo);
        const usuario = this.usuariosRepo.buscar(idUsuario);

        if (!libro || libro.copias <= 0) {
            console.error("❌ Libro no disponible.");
            return;
        }

        if (!usuario) {
            console.error("❌ Usuario no encontrado.");
            return;
        }

        libro.copias--;
        this.prestamos.push({ titulo, idUsuario, fecha: new Date() });
        console.log(`📖 Préstamo: ${titulo} a ${usuario.nombre}`);
    }

    devolver(titulo, idUsuario) {
        const libro = this.librosRepo.buscar(titulo);
        if (!libro) {
            console.error("❌ Libro no encontrado.");
            return;
        }

        libro.copias++;
        this.prestamos = this.prestamos.filter(p => !(p.titulo === titulo && p.idUsuario === idUsuario));
        console.log(`✅ Devolución: ${titulo} por usuario ${idUsuario}`);
    }
}
// Instancias de repositorios
const librosRepo = new RepositorioLibros();
const usuariosRepo = new RepositorioUsuarios();
const prestamos = new GestorPrestamos(librosRepo, usuariosRepo);

// Agregar libros y usuarios
librosRepo.agregar(new Libro("El Quijote", "Cervantes", 3));
librosRepo.agregar(new Libro("1984", "Orwell", 2));

usuariosRepo.agregar(new UsuarioLibreria("Ana", 1, "ana@email.com"));
usuariosRepo.agregar(new UsuarioLibreria("Luis", 2, "luis@email.com"));

// Préstamos
prestamos.prestar("1984", 1);
prestamos.prestar("El Quijote", 2);

// Devolución
prestamos.devolver("1984", 1);
