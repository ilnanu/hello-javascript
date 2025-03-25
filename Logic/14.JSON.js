/*
Desarrolla un programa capaz de crear un archivo XML que guarde los siguientes datos (sintaxis correcta en cada caso):
Nombre, Edad, Fecha de nacimiento, Listado de lenguajes de programación
Muestra el contenido del archivo
Borra el archivo

Adicionalmente, utilizando la lógica del archivo anterior, crea un programa capaz de leer y transformar en una misma clase custom los datos alamecenados en el XML.
*/
const fs = require('fs');

// Clase personalizada para manejar los datos
class Persona {
    constructor(nombre, edad, fechaNacimiento, lenguajes) {
        this.nombre = nombre;
        this.edad = edad;
        this.fechaNacimiento = fechaNacimiento;
        this.lenguajes = lenguajes || [];
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Edad: ${this.edad}`);
        console.log(`Fecha de Nacimiento: ${this.fechaNacimiento}`);
        console.log(`Lenguajes de Programación: ${this.lenguajes.join(', ')}`);
    }
}

// Función para crear el archivo JSON
async function crearArchivoJSON() {
    const persona = {
        nombre: "Juan Pérez",
        edad: 30,
        fechaNacimiento: "1994-05-15",
        lenguajes: ["JavaScript", "Python", "Java"]
    };

    const json = JSON.stringify(persona, null, 2);

    fs.writeFileSync("datos.json", json);
    console.log("Archivo JSON creado con éxito.");
}

// Función para leer y mostrar el contenido del archivo JSON
async function leerArchivoJSON() {
    if (!fs.existsSync("datos.json")) {
        console.log("El archivo JSON no existe.");
        return;
    }

    const data = fs.readFileSync("datos.json", "utf8");
    console.log("Contenido del archivo JSON:");
    console.log(data);
}

// Función para leer y transformar el JSON en una clase Persona
async function transformarJSONaObjeto() {
    if (!fs.existsSync("datos.json")) {
        console.log("El archivo JSON no existe.");
        return;
    }

    const data = fs.readFileSync("datos.json", "utf8");
    const personaData = JSON.parse(data);

    const persona = new Persona(
        personaData.nombre,
        personaData.edad,
        personaData.fechaNacimiento,
        personaData.lenguajes
    );

    console.log("\nDatos convertidos a objeto Persona:");
    persona.mostrarInfo();
}

// Función para borrar el archivo JSON
function borrarArchivoJSON() {
    if (fs.existsSync("datos.json")) {
        fs.unlinkSync("datos.json");
        console.log("Archivo JSON eliminado.");
    } else {
        console.log("No hay archivo JSON para borrar.");
    }
}

// Ejecución del flujo
(async () => {
    await crearArchivoJSON();
    await leerArchivoJSON();
    await transformarJSONaObjeto();
    borrarArchivoJSON();
})();
