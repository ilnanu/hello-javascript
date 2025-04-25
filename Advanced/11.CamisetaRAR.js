/*
 * EJERCICIO:
 * ¿Has visto la camiseta.rar?
 * https://x.com/MoureDev/status/1841531938961592740
 *
 * Crea un programa capaz de comprimir un archivo 
 * en formato .zip (o el que tú quieras).
 * - No subas el archivo o el zip.
 */
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Ruta del archivo o carpeta que quieres comprimir
const rutaAComprimir = './camiseta.txt'; // Cambia esto según tu archivo
const nombreZip = 'comprimido.zip';

// Crear un stream de escritura para el archivo .zip
const output = fs.createWriteStream(nombreZip);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log(`✅ Archivo comprimido correctamente: ${nombreZip}`);
    console.log(`📦 Tamaño final: ${(archive.pointer() / 1024).toFixed(2)} KB`);
});

archive.on('error', (err) => {
    throw err;
});

// Vincula el archivo .zip al stream
archive.pipe(output);

// Comprueba si es un archivo o una carpeta
if (fs.lstatSync(rutaAComprimir).isDirectory()) {
    archive.directory(rutaAComprimir, false);
} else {
    archive.file(rutaAComprimir, { name: path.basename(rutaAComprimir) });
}

// Finaliza el proceso
archive.finalize();
