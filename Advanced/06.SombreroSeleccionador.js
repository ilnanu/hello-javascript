/*
 * EJERCICIO:
 * Cada 1 de septiembre, el Hogwarts Express parte hacia la escuela
 * de programación de Hogwarts para magos y brujas del código.
 * En ella, su famoso sombrero seleccionador ayuda a los programadores
 * a encontrar su camino...
 * Desarrolla un programa que simule el comportamiento del sombrero.
 * Requisitos:
 * 1. El sombrero realizará 10 preguntas para determinar la casa del alumno.
 * 2. Deben existir 4 casas. Por ejemplo: Frontend, Backend, Mobile y Data.
 *    (Puedes elegir las que quieras)
 * Acciones:
 * 1. Crea un programa que solicite el nombre del alumno y realice 10
 *    preguntas, con cuatro posibles respuestas cada una.
 * 2. Cada respuesta asigna puntos a cada una de las casas (a tu elección).
 * 3. Una vez finalizado, el sombrero indica el nombre del alumno 
 *    y a qué casa pertenecerá (resuelve el posible empate de manera aleatoria,
 *    pero indicándole al alumno que la decisión ha sido complicada).
 */
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const casas = {
    Frontend: 0,
    Backend: 0,
    Mobile: 0,
    Data: 0,
};

const preguntas = [
    {
        pregunta: "¿Qué disfrutas más al programar?",
        respuestas: [
            { texto: "Crear interfaces bonitas y funcionales", casa: "Frontend" },
            { texto: "Diseñar bases de datos y APIs robustas", casa: "Backend" },
            { texto: "Desarrollar apps que usas a diario", casa: "Mobile" },
            { texto: "Analizar datos para descubrir tendencias", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Cuál es tu herramienta favorita?",
        respuestas: [
            { texto: "HTML/CSS/JavaScript", casa: "Frontend" },
            { texto: "Node.js/Python", casa: "Backend" },
            { texto: "Flutter/Swift/Kotlin", casa: "Mobile" },
            { texto: "SQL/Excel/Pandas", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Qué prefieres en un proyecto?",
        respuestas: [
            { texto: "Que se vea genial y sea fácil de usar", casa: "Frontend" },
            { texto: "Que sea escalable y eficiente", casa: "Backend" },
            { texto: "Que funcione perfecto en el móvil", casa: "Mobile" },
            { texto: "Que permita tomar decisiones con datos", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Con qué te sientes más identificado?",
        respuestas: [
            { texto: "Diseñador de interacciones", casa: "Frontend" },
            { texto: "Arquitecto de sistemas", casa: "Backend" },
            { texto: "Desarrollador en movimiento", casa: "Mobile" },
            { texto: "Detective de datos", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Qué curso te gustaría hacer?",
        respuestas: [
            { texto: "UX/UI design", casa: "Frontend" },
            { texto: "Microservicios", casa: "Backend" },
            { texto: "Desarrollo de apps nativas", casa: "Mobile" },
            { texto: "Machine learning", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Qué valoras más?",
        respuestas: [
            { texto: "Estética", casa: "Frontend" },
            { texto: "Rendimiento", casa: "Backend" },
            { texto: "Comodidad y accesibilidad", casa: "Mobile" },
            { texto: "Precisión y resultados", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Dónde te ves trabajando?",
        respuestas: [
            { texto: "Diseñando webs para startups", casa: "Frontend" },
            { texto: "En el equipo core de arquitectura", casa: "Backend" },
            { texto: "Liderando una app de fitness", casa: "Mobile" },
            { texto: "En un laboratorio analizando datos", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Qué prefieres solucionar?",
        respuestas: [
            { texto: "Problemas de usabilidad", casa: "Frontend" },
            { texto: "Errores de lógica y rendimiento", casa: "Backend" },
            { texto: "Incompatibilidades entre dispositivos", casa: "Mobile" },
            { texto: "Errores en modelos predictivos", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Con cuál lenguaje te llevas mejor?",
        respuestas: [
            { texto: "JavaScript", casa: "Frontend" },
            { texto: "Python", casa: "Backend" },
            { texto: "Dart/Kotlin", casa: "Mobile" },
            { texto: "R/SQL", casa: "Data" },
        ],
    },
    {
        pregunta: "¿Qué prefieres leer?",
        respuestas: [
            { texto: "Guías de estilos y diseño", casa: "Frontend" },
            { texto: "Documentación técnica de APIs", casa: "Backend" },
            { texto: "Changelogs de versiones móviles", casa: "Mobile" },
            { texto: "Papers científicos", casa: "Data" },
        ],
    },
];

let nombre = "";
let indice = 0;

function preguntar() {
    if (indice < preguntas.length) {
        const p = preguntas[indice];
        console.log(`\n${indice + 1}. ${p.pregunta}`);
        p.respuestas.forEach((r, i) => console.log(` ${i + 1}. ${r.texto}`));
        rl.question("Tu elección (1-4): ", (respuesta) => {
            const i = parseInt(respuesta) - 1;
            if (i >= 0 && i < 4) {
                casas[p.respuestas[i].casa]++;
                indice++;
                preguntar();
            } else {
                console.log("Por favor, selecciona una opción válida.");
                preguntar();
            }
        });
    } else {
        determinarCasa();
    }
}

function determinarCasa() {
    const max = Math.max(...Object.values(casas));
    const candidatas = Object.entries(casas).filter(([_, v]) => v === max);
    let casaFinal = candidatas[Math.floor(Math.random() * candidatas.length)][0];

    console.log(`\n🎩 Mmm... ${nombre}... has respondido sabiamente...`);

    if (candidatas.length > 1) {
        console.log(`Ha sido una decisión difícil entre varias casas... 🤔`);
    }

    console.log(`¡Pero finalmente, perteneces a... 🧙‍♂️ **${casaFinal}**!\n`);
    rl.close();
}

rl.question("🎓 ¿Cuál es tu nombre, joven aprendiz? ", (respuesta) => {
    nombre = respuesta;
    console.log(`\nBienvenido, ${nombre}. El Sombrero Seleccionador está listo...\n`);
    preguntar();
});
