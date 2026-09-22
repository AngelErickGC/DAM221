// ==========================================
// APLICACIÓN PRINCIPAL DE CONSOLA (Terminal)
// Conecta Cocina, Cliente y Caja
// ==========================================

const readline = require("readline");
const cocina = require("./Cocina");
const cliente = require("./cliente");
const caja = require("./Caja");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(texto) {
    return new Promise(resolve => rl.question(texto, resolve));
}

async function menuPrincipal() {
    while (true) {
        console.log(`\n=== SISTEMA DE CAFETERÍA ===`);
        console.log("1. Módulo Cocina (Gestión de Menú)");
        console.log("2. Módulo Cliente (Toma de Pedido)");
        console.log("3. Módulo Caja (Cobro y Ticket)");
        console.log("4. Salir");

        const opcion = await preguntar("Selecciona un módulo (1-4): ");

        switch (opcion.trim()) {
            case "1":
                await menuCocina();
                break;
            case "2":
                await menuCliente();
                break;
            case "3":
                await menuCaja();
                break;
            case "4":
                console.log("\nSaliendo del sistema...");
                rl.close();
                return;
            default:
                console.log("Opción no válida.");
        }
    }
}

async function menuCocina() {
    console.log(`\n--- MENÚ COCINA ---`);
    console.log("1. Listar catálogo");
    console.log("2. Agregar producto");
    console.log("3. Editar producto");
    console.log("4. Eliminar producto");
    console.log("5. Regresar");

    const op = await preguntar("Elige una acción: ");
    if (op === "1") {
        cocina.listarProductos();
    } else if (op === "2") {
        const nombre = await preguntar("Nombre del producto: ");
        const precio = await preguntar("Precio ($): ");
        cocina.agregarProducto(nombre, precio);
    } else if (op === "3") {
        const id = parseInt(await preguntar("ID a editar: "));
        const nombre = await preguntar("Nuevo nombre (Enter para dejar igual): ");
        const precio = await preguntar("Nuevo precio (Enter para dejar igual): ");
        cocina.editarProducto(id, nombre, precio);
    } else if (op === "4") {
        const id = parseInt(await preguntar("ID a eliminar: "));
        cocina.eliminarProducto(id);
    }
}

async function menuCliente() {
    console.log(`\n--- MENÚ CLIENTE ---`);
    console.log("1. Consultar Menú");
    console.log("2. Agregar producto al pedido");
    console.log("3. Listar pedido actual");
    console.log("4. Confirmar y enviar a Caja");
    console.log("5. Regresar");

    const op = await preguntar("Elige una acción: ");
    if (op === "1") {
        cliente.consultarProductos();
    } else if (op === "2") {
        const id = parseInt(await preguntar("ID del producto: "));
        const cant = parseInt(await preguntar("Cantidad: ")) || 1;
        cliente.crearPedidoProducto(id, cant);
    } else if (op === "3") {
        cliente.listarPedidos();
    } else if (op === "4") {
        const orden = cliente.enviarOrdenACaja();
        if (orden) {
            caja.recibirOrdenCliente(orden);
        }
    }
}

async function menuCaja() {
    console.log(`\n--- MENÚ CAJA ---`);
    console.log("1. Agregar producto manual (mostrador)");
    console.log("2. Ver ticket con Subtotal, IVA y Total");
    console.log("3. Cobrar y cerrar venta");
    console.log("4. Regresar");

    const op = await preguntar("Elige una acción: ");
    if (op === "1") {
        const nombre = await preguntar("Concepto/Producto: ");
        const precio = await preguntar("Precio ($): ");
        caja.agregarPedido(nombre, precio);
    } else if (op === "2") {
        caja.mostrarResumenCaja();
    } else if (op === "3") {
        caja.cobrarVenta();
    }
}

menuPrincipal();