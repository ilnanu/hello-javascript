/*
 * EJERCICIO:
 * ¡Los JJOO de París 2024 han comenzado!
 * Crea un programa que simule la celebración de los juegos.
 * El programa debe permitir al usuario registrar eventos y participantes,
 * realizar la simulación de los eventos asignando posiciones de manera aleatoria
 * y generar un informe final. Todo ello por terminal.
 * Requisitos:
 * 1. Registrar eventos deportivos.
 * 2. Registrar participantes por nombre y país.
 * 3. Simular eventos de manera aleatoria en base a los participantes (mínimo 3).
 * 4. Asignar medallas (oro, plata y bronce) basándose en el resultado del evento.
 * 5. Mostrar los ganadores por cada evento.
 * 6. Mostrar el ranking de países según el número de medallas.
 * Acciones:
 * 1. Registro de eventos.
 * 2. Registro de participantes.
 * 3. Simulación de eventos.
 * 4. Creación de informes.
 * 5. Salir del programa.
 */

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const eventos = [];
const participantes = [];
const resultados = [];
const medallero = {};

function preguntar(pregunta) {
    return new Promise((resolve) => rl.question(pregunta, resolve));
}

function registrarEvento() {
    return preguntar("🔹 Nombre del evento deportivo: ")
        .then(nombre => {
            eventos.push({ nombre, participantes: [] });
            console.log(`✅ Evento "${nombre}" registrado.`);
        });
}

function registrarParticipante() {
    return preguntar("👤 Nombre del participante: ")
        .then(nombre => {
            return preguntar("🌍 País: ").then(pais => {
                participantes.push({ nombre, pais });
                console.log(`✅ Participante "${nombre}" de "${pais}" registrado.`);
            });
        });
}

function simularEvento() {
    if (eventos.length === 0) {
        console.log("⚠️ No hay eventos registrados.");
        return;
    }

    const evento = eventos[Math.floor(Math.random() * eventos.length)];
    const seleccionados = participantes.sort(() => 0.5 - Math.random()).slice(0, 5);

    if (seleccionados.length < 3) {
        console.log("⚠️ No hay suficientes participantes para simular.");
        return;
    }

    const ganadores = seleccionados.sort(() => 0.5 - Math.random()).slice(0, 3);

    console.log(`🎉 Evento: ${evento.nombre}`);
    console.log("🏁 Participantes:", seleccionados.map(p => p.nombre).join(", "));
    console.log("🥇 Oro:", ganadores[0].nombre);
    console.log("🥈 Plata:", ganadores[1].nombre);
    console.log("🥉 Bronce:", ganadores[2].nombre);

    resultados.push({
        evento: evento.nombre,
        oro: ganadores[0],
        plata: ganadores[1],
        bronce: ganadores[2]
    });

    // Actualizar medallero
    [ganadores[0], ganadores[1], ganadores[2]].forEach((ganador, idx) => {
        const pais = ganador.pais;
        if (!medallero[pais]) {
            medallero[pais] = { oro: 0, plata: 0, bronce: 0 };
        }
        if (idx === 0) medallero[pais].oro++;
        if (idx === 1) medallero[pais].plata++;
        if (idx === 2) medallero[pais].bronce++;
    });
}

function mostrarInforme() {
    if (resultados.length === 0) {
        console.log("📋 No hay eventos simulados todavía.");
        return;
    }

    console.log("\n📋 Resultados por evento:");
    resultados.forEach((res, i) => {
        console.log(`\n🎯 ${i + 1}. Evento: ${res.evento}`);
        console.log(`   🥇 Oro: ${res.oro.nombre} (${res.oro.pais})`);
        console.log(`   🥈 Plata: ${res.plata.nombre} (${res.plata.pais})`);
        console.log(`   🥉 Bronce: ${res.bronce.nombre} (${res.bronce.pais})`);
    });

    console.log("\n🏆 Ranking por países:");
    const ranking = Object.entries(medallero).sort((a, b) => {
        const [pa, ma] = a;
        const [pb, mb] = b;
        return (
            mb.oro - ma.oro ||
            mb.plata - ma.plata ||
            mb.bronce - ma.bronce
        );
    });

    ranking.forEach(([pais, medallas], i) => {
        console.log(
            ` ${i + 1}. ${pais}: 🥇 ${medallas.oro} | 🥈 ${medallas.plata} | 🥉 ${medallas.bronce}`
        );
    });
}

async function menu() {
    while (true) {
        console.log(`\n===== 🏅 MENÚ JJOO PARÍS 2024 =====`);
        console.log("1. Registrar evento");
        console.log("2. Registrar participante");
        console.log("3. Simular evento");
        console.log("4. Mostrar informe");
        console.log("5. Salir");

        const opcion = await preguntar("➡️ Selecciona una opción: ");

        switch (opcion.trim()) {
            case "1":
                await registrarEvento();
                break;
            case "2":
                await registrarParticipante();
                break;
            case "3":
                simularEvento();
                break;
            case "4":
                mostrarInforme();
                break;
            case "5":
                console.log("👋 ¡Gracias por usar el simulador de los JJOO!");
                rl.close();
                return;
            default:
                console.log("❌ Opción no válida.");
        }
    }
}

menu();

