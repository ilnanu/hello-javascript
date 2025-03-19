let valor1 = 3;
let valor2 = 5;
let valorRef = {valorRef1: 3, valorRef2: 5};

let programaValor = function (paramValor1, paramValor2) {
    let tempValor = paramValor2;
    paramValor2 = paramValor1;
    paramValor1 = tempValor;
}

console.log("Programa por Valor:")
console.log(`valor1 ${valor1}`);
console.log(`valor2 ${valor2}`);
programaValor(valor1,valor2);
console.log(`valor1 ${valor1}`);
console.log(`valor2 ${valor2}`);


let programaReferencia = function (valorRef) {
    let tempValor = valorRef.valorRef2;
    valorRef.valorRef2 = valorRef.valorRef1;
    valorRef.valorRef1 = tempValor;
}

console.log("Programa por Referencia:")
console.log(`valorRef1 ${valorRef.valorRef1}`);
console.log(`valorRef2 ${valorRef.valorRef2}`);
programaReferencia(valorRef);
console.log(`valorRef1 ${valorRef.valorRef1}`);
console.log(`valorRef2 ${valorRef.valorRef2}`);


