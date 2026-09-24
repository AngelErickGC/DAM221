const Cocina = require("./cocina");

let carritoCliente = [];

function consultarProductos() {
  const catalogo = Cocina.obtenerCatalogo();

  console.log("\n========================================");
  console.log("         MENÚ DE LA CAFETERÍA           ");
  console.log("========================================");

  catalogo.forEach(p => {
    const estado = p.disponible ? "DISPONIBLE" : "AGOTADO   ";
    console.log(`[${p.id}] ${estado} | ${p.nombre} | $${p.precio.toFixed(2)} | ${p.categoria}`);
  });

  console.log("========================================\n");
}

function mostrarPromociones() {
  const promos = Cocina.obtenerCatalogo().filter(p => p.promo);
  console.log("\n---------- PROMOCIONES DEL DÍA ----------");
  if (promos.length === 0) {
    console.log("No hay promociones hoy.");
  } else {
    promos.forEach(p => console.log(`${p.nombre} -> ${p.promo}`));
  }
  console.log("-----------------------------------------\n");
}

function mostrarDisponibles() {
  const disponibles = Cocina.obtenerCatalogo().filter(p => p.disponible);
  console.log("\n---------- PRODUCTOS DISPONIBLES ----------");
  disponibles.forEach(d => console.log(`${d.nombre} - $${d.precio.toFixed(2)}`));
  console.log("-------------------------------------------\n");
}

function crearPedidoProducto(idProducto, cantidad = 1) {
  const item = Cocina.buscarProducto(idProducto);

  if (!item) {
    console.log(`✗ El producto con ID ${idProducto} no existe.`);
    return false;
  }
  if (!item.disponible) {
    console.log(`✗ ${item.nombre} no está disponible ahora.`);
    return false;
  }

  const enCarrito = carritoCliente.find(i => i.id === idProducto);
  if (enCarrito) {
    enCarrito.cantidad += cantidad;
  } else {
    carritoCliente.push({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: cantidad
    });
  }

  console.log(`✓ Añadido: ${cantidad}x ${item.nombre} al pedido.`);
  return true;
}

function listarPedidos() {
  console.log("\n--- PEDIDO ACTUAL DEL CLIENTE ---");
  if (carritoCliente.length === 0) {
    console.log("El carrito está vacío.");
    console.log("---------------------------------\n");
    return 0;
  }

  let subtotal = 0;
  carritoCliente.forEach(item => {
    const total = item.precio * item.cantidad;
    subtotal += total;
    console.log(`- ${item.cantidad}x ${item.nombre} = $${total.toFixed(2)}`);
  });

  console.log(`Subtotal preliminar: $${subtotal.toFixed(2)}`);
  console.log("---------------------------------\n");
  return subtotal;
}

function vaciarYDevolverCarrito() {
  const pedidoFinal = [...carritoCliente];
  carritoCliente = [];
  return pedidoFinal;
}

function verCarrito() {
  return carritoCliente;
}

module.exports = {
  consultarProductos,
  mostrarPromociones,
  mostrarDisponibles,
  crearPedidoProducto,
  listarPedidos,
  vaciarYDevolverCarrito,
  verCarrito
};