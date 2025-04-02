/*
Crea un programa en javascript capaz de ejecutar de manera asíncrona una función que tardará en finalizar un número concreto de segundos parametrizables.
También debes poder asignarle un nombre.
La función imprime su nombre, cuándo empieza, el tiempo que durará su ejecución y cuando finalia.
*/
function asyncTask(name, duration) {
    return new Promise((resolve) => {
        console.log(`Tarea "${name}" iniciada. Duración: ${duration} segundos.`);
        const startTime = new Date();
        setTimeout(() => {
            const endTime = new Date();
            console.log(`Tarea "${name}" finalizada. Empezó a las ${startTime.toLocaleTimeString()} y terminó a las ${endTime.toLocaleTimeString()}.`);
            resolve();
        }, duration * 1000);
    });
}

// Ejemplo de uso
async function runTasks() {
    await asyncTask("Tarea 1", 3);
    await asyncTask("Tarea 2", 5);
}

runTasks();

/*
Utilizando el concepto de asincronía y la función anterior, crea el siguiente programa que ejecuta en este orden
* Una función C que dura 3 segundos
* Una función B que dura 2 segundos
* Una función A que dura 1 segundo
* Una función D que dura 1 segundo
* Las funciones C, B y A se ejecutan en paralelo.
* La función D comienza su ejecución cuando las 3 anteriores han finalizado.
*/
function asyncTask(name, duration) {
    return new Promise((resolve) => {
        console.log(`Tarea "${name}" iniciada. Duración: ${duration} segundos.`);
        const startTime = new Date();
        setTimeout(() => {
            const endTime = new Date();
            console.log(`Tarea "${name}" finalizada. Empezó a las ${startTime.toLocaleTimeString()} y terminó a las ${endTime.toLocaleTimeString()}.`);
            resolve();
        }, duration * 1000);
    });
}

// Ejemplo de uso
async function runTasks() {
    const taskC = asyncTask("C", 3);
    const taskB = asyncTask("B", 2);
    const taskA = asyncTask("A", 1);

    await Promise.all([taskC, taskB, taskA]);
    await asyncTask("D", 1);
}

runTasks();
