/*
Crea 3 expresiones regulares (a tu criterio) capaces de:
* Validar un email
* Validar un número de teléfono
* Validar una url
*/
// Expresiones regulares
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[0-9]{1,4}?[ -]?(\(?[0-9]{2,3}\)?[ -]?)?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/;

// Función para probar las expresiones regulares
function testRegexPatterns() {
    const testEmail = "correo@example.com";
    const testPhone = "+34 612 345 678";
    const testUrl = "https://www.google.com";

    console.log(`Email válido (${testEmail}):`, emailRegex.test(testEmail));
    console.log(`Teléfono válido (${testPhone}):`, phoneRegex.test(testPhone));
    console.log(`URL válida (${testUrl}):`, urlRegex.test(testUrl));
}

testRegexPatterns();

