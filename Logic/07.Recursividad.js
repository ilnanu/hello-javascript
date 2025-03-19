//Función que calcula el factorial de un número
function factorial(num) {
    if (num === 0) {
        return 1;
    }
    return num * factorial(num - 1);
}

console.log(factorial(9));

//Funcion que calcula el valor de un elemento concreto (según su posición) en la sucesión de Fibonacci
function fibonacci(num) {
    if (num === 0) {
        return 0;
    }
    if (num === 1) {
        return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}

console.log(fibonacci(9));
