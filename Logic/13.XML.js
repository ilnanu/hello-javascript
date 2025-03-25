/*
Desarrolla un programa capaz de crear un archivo XML que guarde los siguientes datos (sintaxis correcta en cada caso):
Nombre, Edad, Fecha de nacimiento, Listado de lenguajes de programación
Muestra el contenido del archivo
Borra el archivo

Adicionalmente, utilizando la lógica del archivo anterior, crea un programa capaz de leer y transformar en una misma clase custom los datos alamecenados en el XML.
*/
const fs = require('fs');
const { parseStringPromise, Builder } = require('xml2js');

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

// Función para crear el archivo XML
async function crearArchivoXML() {
    const persona = {
        persona: {
            nombre: "Juan Pérez",
            edad: 30,
            fechaNacimiento: "1994-05-15",
            lenguajes: {
                lenguaje: ["JavaScript", "Python", "Java"]
            }
        }
    };

    const builder = new Builder();
    const xml = builder.buildObject(persona);

    fs.writeFileSync("datos.xml", xml);
    console.log("Archivo XML creado con éxito.");
}

// Función para leer y mostrar el contenido del archivo XML
async function leerArchivoXML() {
    if (!fs.existsSync("datos.xml")) {
        console.log("El archivo XML no existe.");
        return;
    }

    const data = fs.readFileSync("datos.xml", "utf8");
    console.log("Contenido del archivo XML:");
    console.log(data);
}

// Función para leer y transformar el XML en una clase Persona
async function transformarXMLaObjeto() {
    if (!fs.existsSync("datos.xml")) {
        console.log("El archivo XML no existe.");
        return;
    }

    const data = fs.readFileSync("datos.xml", "utf8");
    const jsonObj = await parseStringPromise(data);

    const personaData = jsonObj.persona;
    const persona = new Persona(
        personaData.nombre[0],
        parseInt(personaData.edad[0]),
        personaData.fechaNacimiento[0],
        personaData.lenguajes.lenguaje
    );

    console.log("\nDatos convertidos a objeto Persona:");
    persona.mostrarInfo();
}

// Función para borrar el archivo XML
function borrarArchivoXML() {
    if (fs.existsSync("datos.xml")) {
        fs.unlinkSync("datos.xml");
        console.log("Archivo XML eliminado.");
    } else {
        console.log("No hay archivo XML para borrar.");
    }
}

// Ejecución del flujo
(async () => {
    await crearArchivoXML();
    await leerArchivoXML();
    await transformarXMLaObjeto();
    borrarArchivoXML();
})();
