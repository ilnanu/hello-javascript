/*
Clase 41 - Ejercicios: Manejo de errores
Vídeo: https://youtu.be/1glVfFxj8a4?t=20392
*/

// 1. Captura una excepción utilizando try-catch
try {
    throw new Error("This is an error")
} catch (error) {
    console.log(error)
}

// 2. Captura una excepción utilizando try-catch y finally
try {
    throw new Error("This is an error")
}
catch (error) {
    console.log(error)
}
finally {
    console.log("This is the finally block")
}

// 3. Lanza una excepción genérica
try {
    throw new Error("This is an error")
} catch (error) {
    console.log(error)
}

// 4. Crea una excepción personalizada
class MyError extends Error {
    constructor(message) {
        super(message)
        this.name = "MyError"
    }
}
try {
    throw new MyError("This is a custom error")
}
catch (error) {
    console.log(error)
}

// 5. Lanza una excepción personalizada
try {
    throw new MyError("This is a custom error")
} catch (error) {
    console.log(error)
}

// 6. Lanza varias excepciones según una lógica definida
function checkNumber(number) {
    if (number < 0) {
        throw new Error("The number is negative")
    }
    if (number === 0) {
        throw new Error("The number is zero")
    }
    if (number > 0) {
        throw new Error("The number is positive")
    }
}
checkNumber(5)
checkNumber(0)
checkNumber(-5)


// 7. Captura varias excepciones en un mismo try-catch
try {
    checkNumber(5)
    checkNumber(0)
    checkNumber(-5)
} catch (error) {
    console.log(error)
}

// 8. Crea un bucle que intente transformar a float cada valor y capture y muestre los errores
let values = [1, 2, 3, "four", 5]
for (let value of values) {
    try {
        console.log(parseFloat(value))
    } catch (error) {
        console.log(error)
    }
}

// 9. Crea una función que verifique si un objeto tiene una propiedad específica y lance una excepción personalizada
function checkProperty(object, property) {
    if (!object.hasOwnProperty(property)) {
        throw new Error("The property does not exist")
    }
}
let myObject = {
    name: "Fernando",
    age: 37
}
try {
    checkProperty(myObject, "country")
} catch (error) {
    console.log(error)
}

// 10. Crea una función que realice reintentos en caso de error hasta un máximo de 10
function retryOperation() {
    let retries = 0
    while (retries < 10) {
        try {
            throw new Error("This is an error")
        } catch (error) {
            console.log(error)
            retries++
        }
    }
}
retryOperation()
