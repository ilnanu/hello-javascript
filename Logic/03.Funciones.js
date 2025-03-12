//Funciones

function imprimirNumeros(texto1, texto2) {
    let numVeces = 0;
    let textoDevolver = texto1 + texto2;
    for (let i = 1; i <= 100; i++) {
        textoDevolver = validarNumero(i, texto1, texto2);
        if (textoDevolver !== "") {
            console.log(textoDevolver);
            numVeces++;
        }
    }
    return numVeces;
}

function validarNumero(num, texto1, texto2) {
    let textoDevolver = "";
    let esMultiplo3 = num % 3 === 0;
    let esMultiplo5 = num % 5 === 0;

    if (esMultiplo3)
        textoDevolver = texto1;
    if (esMultiplo5)
        textoDevolver = texto2;
    if (esMultiplo3 && esMultiplo5)
        textoDevolver = texto1 + " " + texto2;
    return textoDevolver;
}

console.log("Se han impreso " + imprimirNumeros("Fizz", "Buzz") + " veces los textos");
