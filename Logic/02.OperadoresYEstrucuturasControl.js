//Ejercicio Operadores + Estrucuturas de Control

function isValidNumber(num) {
    return (num % 2 === 0) && (num !== 16) && (num % 3 !== 0);
}

for (let i = 10; i < 56; i++) {
    if (isValidNumber(i)) {
        console.log(i);
    }
}