/*
 * EJERCICIO:
 * ¡El 12 de noviembre lanzo mouredev pro!
 * El campus de la comunidad para estudiar programación de
 * una manera diferente: https://mouredev.pro
 *
 * Crea un programa que funcione como una cuenta atrás.
 *
 * - Al iniciarlo tendrás que indicarle el día, mes, año,
 *   hora, minuto y segundo en el que quieres que finalice.
 * - Deberás transformar esa fecha local a UTC.
 * - La cuenta atrás comenzará y mostrará los días, horas,
 *   minutos y segundos que faltan.
 * - Se actualizará cada segundo y borrará la terminal en
 *   cada nueva representación del tiempo restante.
 * - Una vez finalice, mostrará un mensaje.
 * - Realiza la ejecución, si el lenguaje lo soporta, en
 *   un hilo independiente.
 */
const readline = require('readline');

// 🔹 Pide al usuario la fecha de finalización
const promptFecha = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const ask = (q) => new Promise((res) => rl.question(q, res));

    const dia = await ask("📅 Día (DD): ");
    const mes = await ask("📅 Mes (MM): ");
    const anio = await ask("📅 Año (YYYY): ");
    const hora = await ask("⏰ Hora (24h): ");
    const minuto = await ask("⏰ Minuto: ");
    const segundo = await ask("⏰ Segundo: ");

    rl.close();

    const fechaLocal = new Date(anio, mes - 1, dia, hora, minuto, segundo);
    const fechaUTC = new Date(Date.UTC(
        fechaLocal.getFullYear(),
        fechaLocal.getMonth(),
        fechaLocal.getDate(),
        fechaLocal.getHours(),
        fechaLocal.getMinutes(),
        fechaLocal.getSeconds()
    ));

    console.log(`🕒 Fecha en UTC: ${fechaUTC.toUTCString()}\n`);

    return fechaUTC;
};

const iniciarCuentaAtras = async () => {
    const fechaObjetivoUTC = await promptFecha();

    const intervalo = setInterval(() => {
        const ahoraUTC = new Date();
        const diff = fechaObjetivoUTC.getTime() - ahoraUTC.getTime();

        // Limpia la terminal
        console.clear();

        if (diff <= 0) {
            console.log("🎉 ¡Ha llegado el momento! Bienvenido a mouredev pro 🚀");
            clearInterval(intervalo);
            return;
        }

        const segundosTotales = Math.floor(diff / 1000);
        const dias = Math.floor(segundosTotales / 86400);
        const horas = Math.floor((segundosTotales % 86400) / 3600);
        const minutos = Math.floor((segundosTotales % 3600) / 60);
        const segundos = segundosTotales % 60;

        console.log("⏳ Cuenta atrás para el gran lanzamiento de MoureDev Pro:");
        console.log(`\n${dias} días, ${horas} horas, ${minutos} minutos, ${segundos} segundos\n`);
    }, 1000);
};

iniciarCuentaAtras();
