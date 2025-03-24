const fs = require('fs');
const readline = require('readline');
const path = require('path');

const ARCHIVO = path.join(__dirname, 'ventas.txt');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Cargar datos al iniciar
let ventas = cargarVentas();

// Menú principal
function mostrarMenu() {
    console.log('\n===== GESTIÓN DE VENTAS =====');
    console.log('1. Añadir producto');
    console.log('2. Consultar productos');
    console.log('3. Actualizar producto');
    console.log('4. Eliminar producto');
    console.log('5. Total ventas');
    console.log('6. Ventas por producto');
    console.log('7. Salir');

    rl.question('Seleccione opción: ', procesarOpcion);
}

// Cargar datos desde archivo
function cargarVentas() {
    try {
        return fs.readFileSync(ARCHIVO, 'utf8')
            .split('\n')
            .filter(linea => linea)
            .map(linea => {
                const [nombre, cantidad, precio] = linea.split(',');
                return {
                    nombre: nombre.trim(),
                    cantidad: parseInt(cantidad),
                    precio: parseFloat(precio)
                };
            });
    } catch (error) {
        return [];
    }
}

// Guardar datos en archivo
function guardarVentas() {
    const contenido = ventas.map(p =>
        `${p.nombre}, ${p.cantidad}, ${p.precio}`
    ).join('\n');
    fs.writeFileSync(ARCHIVO, contenido);
}

// Procesamiento de opciones
function procesarOpcion(opcion) {
    switch (opcion) {
        case '1': añadirProducto(); break;
        case '2': listarProductos(); break;
        case '3': actualizarProducto(); break;
        case '4': eliminarProducto(); break;
        case '5': calcularTotal(); break;
        case '6': ventasPorProducto(); break;
        case '7': salir(); break;
        default:
            console.log('Opción inválida!');
            mostrarMenu();
    }
}

// Operaciones CRUD
function añadirProducto() {
    rl.question('Nombre del producto: ', nombre => {
        rl.question('Cantidad vendida: ', cantidad => {
            rl.question('Precio unitario: ', precio => {
                ventas.push({
                    nombre,
                    cantidad: parseInt(cantidad),
                    precio: parseFloat(precio)
                });
                guardarVentas();
                console.log('Producto añadido!');
                mostrarMenu();
            });
        });
    });
}

function listarProductos() {
    console.log('\n=== LISTADO DE PRODUCTOS ===');
    ventas.forEach((p, i) =>
        console.log(`${i + 1}. ${p.nombre} - ${p.cantidad} u. - $${p.precio} c/u`)
    );
    mostrarMenu();
}

function actualizarProducto() {
    listarProductos();
    rl.question('\nÍndice del producto a actualizar: ', indice => {
        const producto = ventas[parseInt(indice) - 1];
        rl.question(`Nueva cantidad (${producto.cantidad}): `, cantidad => {
            rl.question(`Nuevo precio (${producto.precio}): `, precio => {
                producto.cantidad = cantidad || producto.cantidad;
                producto.precio = precio || producto.precio;
                guardarVentas();
                console.log('Producto actualizado!');
                mostrarMenu();
            });
        });
    });
}

function eliminarProducto() {
    listarProductos();
    rl.question('\nÍndice del producto a eliminar: ', indice => {
        ventas.splice(parseInt(indice) - 1, 1);
        guardarVentas();
        console.log('Producto eliminado!');
        mostrarMenu();
    });
}

// Cálculos
function calcularTotal() {
    const total = ventas.reduce((sum, p) => sum + (p.cantidad * p.precio), 0);
    console.log(`\nTOTAL VENDIDO: $${total.toFixed(2)}`);
    mostrarMenu();
}

function ventasPorProducto() {
    rl.question('Nombre del producto: ', nombre => {
        const total = ventas
            .filter(p => p.nombre.toLowerCase() === nombre.toLowerCase())
            .reduce((sum, p) => sum + (p.cantidad * p.precio), 0);
        console.log(`TOTAL PARA ${nombre}: $${total.toFixed(2)}`);
        mostrarMenu();
    });
}

// Salida controlada
function salir() {
    if (fs.existsSync(ARCHIVO)) {
        fs.unlinkSync(ARCHIVO);
    }
    console.log('\nArchivo borrado. ¡Hasta luego!');
    rl.close();
}

// Iniciar aplicación
mostrarMenu();
