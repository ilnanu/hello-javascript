/*
 * EJERCICIO:
 * La alternativa descentralizada a X, Bluesky, comienza a atraer
 * a nuevos usuarios. ¿Cómo funciona una red de este estilo?
 * 
 * Implementa un sistema que simule el comportamiento de estas
 * redes sociales.
 * 
 * Debes crear las siguientes operaciones:
 * - Registrar un usuario por nombre e identificador único.
 * - Un usuario puede seguir/dejar de seguir a otro.
 * - Creación de post asociado a un usuario. Debe poseer
 *   texto (200 caracteres máximo), fecha de creación 
 *   e identificador único.   
 * - Eliminación de un post.
 * - Posibilidad de hacer like (y eliminarlo) en un post.
 * - Visualización del feed de un usuario con sus 10 publicaciones
 *   más actuales ordenadas desde la más reciente.
 * - Visualización del feed de un usuario con las 10 publicaciones
 *   más actuales de los usuarios que sigue ordenadas 
 *   desde la más reciente.
 *   
 * Cuando se visualiza un post, debe mostrarse:
 * ID de usuario, nombre de usuario, texto del post, 
 * fecha de creación y número total de likes.
 * 
 * Controla errores en duplicados o acciones no permitidas.
 */
class Usuario {
    constructor(nombre, id) {
        this.nombre = nombre;
        this.id = id;
        this.seguidos = new Set(); // Set de usuarios seguidos
        this.publicaciones = []; // Array de publicaciones del usuario
    }

    seguir(usuario) {
        if (this.seguidos.has(usuario.id)) {
            console.log(`${this.nombre} ya sigue a ${usuario.nombre}`);
        } else {
            this.seguidos.add(usuario.id);
            console.log(`${this.nombre} ahora sigue a ${usuario.nombre}`);
        }
    }

    dejarDeSeguir(usuario) {
        if (!this.seguidos.has(usuario.id)) {
            console.log(`${this.nombre} no sigue a ${usuario.nombre}`);
        } else {
            this.seguidos.delete(usuario.id);
            console.log(`${this.nombre} ha dejado de seguir a ${usuario.nombre}`);
        }
    }

    crearPost(texto) {
        if (texto.length > 200) {
            console.log('El post no puede exceder los 200 caracteres.');
            return;
        }
        const id = Date.now();
        const fecha = new Date().toISOString();
        const post = new Post(id, texto, this, fecha);
        this.publicaciones.push(post);
        console.log(`Publicación creada por ${this.nombre}: "${texto}"`);
    }

    eliminarPost(idPost) {
        const index = this.publicaciones.findIndex(post => post.id === idPost);
        if (index === -1) {
            console.log('Post no encontrado.');
            return;
        }
        this.publicaciones.splice(index, 1);
        console.log(`Post con ID ${idPost} eliminado.`);
    }

    hacerLike(post) {
        post.addLike(this);
    }

    eliminarLike(post) {
        post.removeLike(this);
    }

    mostrarFeed() {
        const feed = this.publicaciones.slice(0, 10);
        console.log(`Feed de ${this.nombre}:`);
        feed.forEach(post => post.mostrarPost());
    }

    mostrarFeedDeSeguidos(usuarios) {
        const feedDeSeguidos = usuarios
            .filter(usuario => this.seguidos.has(usuario.id))
            .map(usuario => usuario.publicaciones.slice(0, 10))
            .flat()
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        console.log(`Feed de usuarios seguidos por ${this.nombre}:`);
        feedDeSeguidos.forEach(post => post.mostrarPost());
    }
}

class Post {
    constructor(id, texto, usuario, fecha) {
        this.id = id;
        this.texto = texto;
        this.usuario = usuario;
        this.fecha = fecha;
        this.likes = new Set();
    }

    addLike(usuario) {
        if (this.likes.has(usuario.id)) {
            console.log(`${usuario.nombre} ya le dio like a este post.`);
        } else {
            this.likes.add(usuario.id);
            console.log(`${usuario.nombre} le dio like a este post.`);
        }
    }

    removeLike(usuario) {
        if (!this.likes.has(usuario.id)) {
            console.log(`${usuario.nombre} no ha dado like a este post.`);
        } else {
            this.likes.delete(usuario.id);
            console.log(`${usuario.nombre} quitó su like de este post.`);
        }
    }

    mostrarPost() {
        console.log(`
        ID: ${this.id}
        Usuario: ${this.usuario.nombre} (${this.usuario.id})
        Texto: ${this.texto}
        Fecha: ${this.fecha}
        Likes: ${this.likes.size}
        `);
    }
}

// Crear usuarios
const usuario1 = new Usuario("Juan", 1);
const usuario2 = new Usuario("Maria", 2);
const usuario3 = new Usuario("Pedro", 3);

// Interacciones entre usuarios
usuario1.seguir(usuario2);
usuario2.seguir(usuario3);
usuario3.seguir(usuario1);

// Crear publicaciones
usuario1.crearPost("¡Hola, esta es mi primera publicación!");
usuario2.crearPost("¡Estoy aprendiendo a programar!");
usuario3.crearPost("Me encanta el café y la programación");

// Hacer likes
usuario1.hacerLike(usuario2.publicaciones[0]);
usuario2.hacerLike(usuario3.publicaciones[0]);

// Mostrar feeds
usuario1.mostrarFeed();
usuario1.mostrarFeedDeSeguidos([usuario2, usuario3]);

// Eliminar publicaciones
usuario1.eliminarPost(usuario1.publicaciones[0].id);

// Mostrar feeds nuevamente
usuario1.mostrarFeed();
usuario1.mostrarFeedDeSeguidos([usuario2, usuario3]);
