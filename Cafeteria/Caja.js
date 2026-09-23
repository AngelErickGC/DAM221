let listaPedidos = [];
const TASA_IVA = 0.16;

function recibirComandaCliente(comanda, folio = "#001") {
  comanda.forEach(({ nombre, precio, cantidad }) => {

    listaPedidos.push({
      producto: `${cantidad}x ${nombre} (${folio})`,
      precio: precio * cantidad
    });
  });
}

function agregarPedido(producto, precio) {
  listaPedidos.push({
    producto: producto.trim(),
    precio: Number(precio)
  });
}

function calcularTotales() {

  const subtotal = listaPedidos.reduce((acc, { precio }) => acc + precio, 0);
  const iva = subtotal * TASA_IVA;
  const total = subtotal + iva;

  return { subtotal, iva, total };
}

function verTicket() {
  return listaPedidos;
}

function cobrarTicket() {
  const totales = calcularTotales();
  listaPedidos = []; 
  return totales;
}

module.exports = {
  recibirComandaCliente,
  agregarPedido,
  calcularTotales,
  verTicket,
  cobrarTicket
};