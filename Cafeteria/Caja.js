let listaPedidos = [];
const TASA_IVA = 0.16;
let contadorTickets = 1;

// Recibir comanda del cliente y registrarla como PENDIENTE con CALLBACK
function recibirComandaCliente(comanda, callback) {
  if (!comanda || comanda.length === 0) {
    if (typeof callback === "function") {
      callback(new Error("La comanda está vacía."), null);
    }
    return;
  }

  const folio = `#${String(contadorTickets++).padStart(3, "0")}`;
  
  // Destructuring en el acumulador de reduce()
  const subtotal = comanda.reduce((acc, { precio, cantidad }) => acc + (precio * cantidad), 0);
  const iva = subtotal * TASA_IVA;
  const total = subtotal + iva;

  const nuevoPedido = {
    folio,
    items: comanda,
    subtotal,
    iva,
    total,
    estado: "pendiente" // pendiente | pagado | cancelado
  };

  listaPedidos.push(nuevoPedido);

  if (typeof callback === "function") {
    callback(null, {
      mensaje: `Pedido ${folio} registrado con éxito.`,
      estado: nuevoPedido.estado,
      folio: nuevoPedido.folio,
      total: nuevoPedido.total
    });
  }
}

// Agregar venta rápida manual en mostrador con CALLBACK
function agregarPedidoManual(nombre, precio, callback) {
  const precioNum = Number(precio);
  if (!nombre || isNaN(precioNum) || precioNum <= 0) {
    if (typeof callback === "function") {
      callback(new Error("Nombre o precio inválido."), null);
    }
    return;
  }

  const folio = `#${String(contadorTickets++).padStart(3, "0")}`;
  const subtotal = precioNum;
  const iva = subtotal * TASA_IVA;
  const total = subtotal + iva;

  const nuevoPedido = {
    folio,
    items: [{ nombre: nombre.trim(), precio: precioNum, cantidad: 1 }],
    subtotal,
    iva,
    total,
    estado: "pendiente"
  };

  listaPedidos.push(nuevoPedido);

  if (typeof callback === "function") {
    callback(null, {
      mensaje: `Venta de mostrador ${folio} registrada.`,
      estado: nuevoPedido.estado,
      folio: nuevoPedido.folio,
      total: nuevoPedido.total
    });
  }
}

// Ver pedidos pendientes de cobro
function obtenerPedidosPendientes() {
  return listaPedidos.filter(p => p.estado === "pendiente");
}

// Cobrar pedido pendiente con CALLBACK
function cobrarPedido(folio, callback) {
  const pedido = listaPedidos.find(p => p.folio === folio && p.estado === "pendiente");

  if (!pedido) {
    if (typeof callback === "function") {
      callback(new Error(`No se encontró el pedido pendiente con folio ${folio}`), null);
    }
    return;
  }

  pedido.estado = "pagado";

  if (typeof callback === "function") {
    callback(null, {
      mensaje: `El pedido ${pedido.folio} ha sido pagado.`,
      estado: pedido.estado,
      folio: pedido.folio,
      total: pedido.total
    });
  }
}

// Cancelar pedido con CALLBACK
function cancelarPedido(folio, motivo, callback) {
  const pedido = listaPedidos.find(p => p.folio === folio && p.estado === "pendiente");

  if (!pedido) {
    if (typeof callback === "function") {
      callback(new Error(`No se encontró el pedido pendiente con folio ${folio}`), null);
    }
    return;
  }

  pedido.estado = "cancelado";
  pedido.motivoCancelacion = motivo || "Sin motivo especificado";

  if (typeof callback === "function") {
    callback(null, {
      mensaje: `El pedido ${pedido.folio} fue cancelado exitosamente.`,
      estado: pedido.estado,
      folio: pedido.folio,
      motivo: pedido.motivoCancelacion
    });
  }
}

// Corte de caja general (suma total de cobrados con reduce())
function calcularTotalesGenerales() {
  const pagados = listaPedidos.filter(p => p.estado === "pagado");
  const subtotal = pagados.reduce((acc, { subtotal }) => acc + subtotal, 0);
  const iva = pagados.reduce((acc, { iva }) => acc + iva, 0);
  const total = pagados.reduce((acc, { total }) => acc + total, 0);
  return { subtotal, iva, total, cantidadPagados: pagados.length };
}

module.exports = {
  recibirComandaCliente,
  agregarPedidoManual,
  obtenerPedidosPendientes,
  cobrarPedido,
  cancelarPedido,
  calcularTotalesGenerales
};