const { obtenerCatalogo, buscarProducto } = require("./cocina");

// Variables del cliente
let carritoCliente = [];
let contadorTickets = 1;

function consultarProductos() {
    const catalogo = obtenerCatalogo();

    console.log(`\n========================================`);
    console.log(`         MENÚ DE LA CAFETERÍA           `);
    console.log(`========================================`);

    // Usamos forEach para recorrer el catálogo
    catalogo.forEach(producto => {
        console.log(
            `ID: [${producto.id}] | ${producto.nombre} | $${producto.precio.toFixed(2)} | ${producto.categoria}`
        );
    });

    console.log(`========================================`);
}

function crearPedidoProducto(idProducto, cantidad = 1) {
    const itemEncontrado = buscarProducto(idProducto);

    if (!itemEncontrado) {
        console.log(`El producto con ID ${idProducto} no existe.`);
        return;
    }

    const itemEnCarrito = carritoCliente.find(item => item.id === idProducto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += cantidad;
    } else {
        carritoCliente.push({
            id: itemEncontrado.id,
            nombre: itemEncontrado.nombre,
            precio: itemEncontrado.precio,
            cantidad: cantidad
        });
    }

    console.log(`Añadido: ${cantidad}x ${itemEncontrado.nombre} al pedido.`);
}
function listarPedidos() {
    console.log(`\n--- PEDIDO ACTUAL DEL CLIENTE ---`);

    if (carritoCliente.length === 0) {
        console.log(`El carrito está vacío.`);
        return;
    }

    let subtotal = 0;

    carritoCliente.forEach(item => {
        const totalItem = item.precio * item.cantidad;
        subtotal += totalItem;
        console.log(`- ${item.cantidad}x ${item.nombre} = $${totalItem.toFixed(2)}`);
    });

    console.log(`Subtotal preliminar: $${subtotal.toFixed(2)}`);
}

function enviarOrdenACaja() {
    if (carritoCliente.length === 0) {
        console.log(`No se puede enviar un pedido vacío.`);
        return null;
    }

    const folio = `#${String(contadorTickets).padStart(3, "0")}`;

    const ordenCompleta = {
        ticket: folio,
        items: [...carritoCliente]
    };

    console.log(`\n¡Orden confirmada! Folio asignado: ${folio}`);

    contadorTickets++;
    carritoCliente = []; 

    return ordenCompleta;
}

module.exports = {
    consultarProductos,
    crearPedidoProducto,
    listarPedidos,
    enviarOrdenACaja
};