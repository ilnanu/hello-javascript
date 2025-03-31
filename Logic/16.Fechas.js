/*
Utilizando la fecha de tu cumpleaños, formateala y muestra su resultado de 10 maneras diferentes. Por ejemplo:

* Días , mes y año
* Hora, minuto y segundo.
* Día de año
* Día de la semana
* Nombre del mes
* Otras posibilidades hasta 10
*/

var now = new Date();
var fechaCumple = new Date("1998/03/10");
console.log("Fecha de cumpleaños: " + fechaCumple);
console.log("Fecha de cumpleaños: " + fechaCumple.toLocaleDateString());
console.log("Fecha de cumpleaños: " + fechaCumple.toLocaleString());
console.log("Fecha de cumpleaños: " + fechaCumple.toDateString());
console.log("Fecha de cumpleaños: " + fechaCumple.toTimeString());
console.log("Fecha de cumpleaños: " + fechaCumple.toUTCString());
console.log("Fecha de cumpleaños: " + fechaCumple.toISOString());
console.log("Fecha de cumpleaños: " + fechaCumple.toLocaleString("es-ES"));
console.log("Fecha de cumpleaños: " + fechaCumple.toLocaleString("en-US"));
//Ahora lo socititado
//* Días , mes y año
console.log("Fecha de cumpleaños: " + fechaCumple.getDate() + "/" + (fechaCumple.getMonth() + 1) + "/" + fechaCumple.getFullYear());
//* Hora, minuto y segundo.
console.log("Fecha de cumpleaños: " + fechaCumple.getHours() + ":" + fechaCumple.getMinutes() + ":" + fechaCumple.getSeconds());
//* Día de año
var start = new Date(fechaCumple.getFullYear(), 0, 0);
var diff = fechaCumple - start;
var oneDay = 1000 * 60 * 60 * 24;
var dayOfYear = Math.floor(diff / oneDay);
console.log("Fecha de cumpleaños: " + dayOfYear);
//* Día de la semana
var days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
console.log("Fecha de cumpleaños: " + days[fechaCumple.getDay()]);
//* Nombre del mes
var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
console.log("Fecha de cumpleaños: " + months[fechaCumple.getMonth()]);
//* Diferencia entre dos fechas
var fechaActual = new Date();
var diferencia = fechaActual - fechaCumple;
var diasDiferencia = Math.floor(diferencia / (1000 * 60 * 60 * 24));
console.log("Diferencia en días: " + diasDiferencia);
//* Formato personalizado
var opciones = { year: 'numeric', month: 'long', day: 'numeric' };
console.log("Fecha de cumpleaños: " + fechaCumple.toLocaleDateString('es-ES', opciones));
//* Formato ISO
console.log("Fecha de cumpleaños: " + fechaCumple.toISOString());
