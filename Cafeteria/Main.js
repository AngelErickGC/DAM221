
const cocina = require("./cocina");
const cliente = require("./cliente");
const caja = require("./Caja");

console.log("\n########## MÓDULO COCINA ##########");

cocina.listarProductos();

cocina.agregarProducto("Frappé de Café", 55.00, "bebida");
cocina.agregarProducto("Brownie", 38.00, "postre");

cocina.listarProductos();

console.log("\n########## BÚSQUEDAS ##########");

cocina.buscarProductosBaratos();
cocina.buscarBebidas();
cocina.buscarProducto(2);

console.log("\n########## MÓDULO CLIENTE ##########");

cliente.consultarProductos();

cliente.crearPedidoProducto(2, 2);
cliente.crearPedidoProducto(4, 1); 

cliente.listarPedidos();

const orden = cliente.enviarOrdenACaja();

console.log("\n########## MÓDULO CAJA ##########");

if (orden) {
    caja.recibirComandaCliente(orden.items, orden.ticket);
}

caja.agregarPedido("Agua Embotellada", 15.00);

const ticket = caja.verTicket();
console.log("\n--- TICKET ACTUAL ---");
ticket.forEach(item => {
    console.log(`${item.producto} - $${item.precio.toFixed(2)}`);
});

const totales = caja.cobrarTicket();
console.log("\n--- TOTALES ---");
console.log(`Subtotal: $${totales.subtotal.toFixed(2)}`);
console.log(`IVA (16%): $${totales.iva.toFixed(2)}`);
console.log(`TOTAL: $${totales.total.toFixed(2)}`);