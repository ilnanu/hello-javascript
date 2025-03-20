// Implementa la jerarquia de una empresa de desarrollo formada por Empleados que pueden ser Gerentes, Gerentes de Proyectos o Programadores.
// Cada empleado tiene un identificador y un nombre
// Dependiendo de su labor, tienen propiedades y funciones exclusivas de su actividad, y almacenan los empleados a su cargo

// Implementa la jerarquia de una empresa de desarrollo formada por Empleados que pueden ser Gerentes, Gerentes de Proyectos o Programadores.
// Cada empleado tiene un identificador y un nombre
// Dependiendo de su labor, tienen propiedades y funciones exclusivas de su actividad, y almacenan los empleados a su cargo

class Empleado {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    // Método común para todos los empleados
    obtenerDetalles() {
        return `ID: ${this.id}, Nombre: ${this.nombre}`;
    }
}

class Gerente extends Empleado {
    constructor(id, nombre) {
        super(id, nombre);
        this.empleadosACargo = [];
    }

    // Añadir un empleado a cargo
    añadirEmpleado(empleado) {
        this.empleadosACargo.push(empleado);
    }

    // Obtener detalles del gerente y sus empleados a cargo
    obtenerDetalles() {
        let detalles = super.obtenerDetalles();
        detalles += `, Empleados a cargo: ${this.empleadosACargo.map(emp => emp.nombre).join(", ")}`;
        return detalles;
    }
}

class GerenteDeProyectos extends Empleado {
    constructor(id, nombre, proyecto) {
        super(id, nombre);
        this.proyecto = proyecto;
    }

    // Obtener detalles del gerente de proyectos
    obtenerDetalles() {
        return `${super.obtenerDetalles()}, Proyecto: ${this.proyecto}`;
    }
}

class Programador extends Empleado {
    constructor(id, nombre, lenguaje) {
        super(id, nombre);
        this.lenguaje = lenguaje;
    }

    // Obtener detalles del programador
    obtenerDetalles() {
        return `${super.obtenerDetalles()}, Lenguaje: ${this.lenguaje}`;
    }
}

// Ejemplo de uso
const gerente = new Gerente(1, "Carlos");
const gerenteDeProyectos = new GerenteDeProyectos(2, "Ana", "Proyecto X");
const programador1 = new Programador(3, "Luis", "JavaScript");
const programador2 = new Programador(4, "María", "Python");

gerente.añadirEmpleado(gerenteDeProyectos);
gerente.añadirEmpleado(programador1);
gerente.añadirEmpleado(programador2);

console.log(gerente.obtenerDetalles()); // Output: ID: 1, Nombre: Carlos, Empleados a cargo: Ana, Luis, María
console.log(gerenteDeProyectos.obtenerDetalles()); // Output: ID: 2, Nombre: Ana, Proyecto: Proyecto X
console.log(programador1.obtenerDetalles()); // Output: ID: 3, Nombre: Luis, Lenguaje: JavaScript
console.log(programador2.obtenerDetalles()); // Output: ID: 4, Nombre: María, Lenguaje: Python
