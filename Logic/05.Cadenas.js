
//función palindromo
let palindromo = function (cadena1, cadena2) {
    if (cadena1.toUpperCase() === cadena2.toUpperCase().split("").reverse().join("")) {
        return "Es un palidromo"
    }
    return "No es un palindromo"
}
console.log(palindromo("oso", "perro"));
console.log(palindromo("oso", "oso"));

//función anagrama
let anagrama = function (cadena1, cadena2) {
    if (cadena1.toUpperCase().split("").sort().join("") === cadena2.toUpperCase().split("").sort().join("")) {
        return "Es un anagrama"
    }
    return "No es un anagrama"
}
console.log(anagrama("pozo", "oso"));
console.log(anagrama("pozo", "zopo"));


//función isograma
let isograma = function (cadena) {
    let cadenaSinEspacios = cadena.replace(/ /g, "");
    let cadenaSinRepetidos = [...new Set(cadenaSinEspacios.split(""))].join("");
    if (cadenaSinEspacios === cadenaSinRepetidos) {
        return "Es un isograma"
    }
    return "No es un isograma"
}

console.log(isograma("oso"));
console.log(isograma("murcielago"));
