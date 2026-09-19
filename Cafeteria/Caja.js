// Variables de la Caja
let pedidoCaja = [];
let totalCaja = 0;

// Al cargar, recuperamos los pedidos pendientes del Cliente
function cargarPedidosPendientes() {
    const pedidosPendientes = JSON.parse(localStorage.getItem("pedidosPendientes")) || [];
    
    pedidosPendientes.forEach(pedido => {
        pedidoCaja.push(pedido);
        totalCaja += pedido.total;
    });

    // Limpiamos el localStorage de pedidos pendientes
    localStorage.removeItem("pedidosPendientes");
    renderizarTicketCaja();
}

// Agregar producto manual (Cajera)
function agregarPedido() {
    const nombreProducto = document.getElementById("producto").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);

    if (nombreProducto === "" || isNaN(precio)) {
        mostrarNotificacion("Completa los campos");
        return;
    }
    if (precio < 0.50) {
        mostrarNotificacion("Precio mínimo: $0.50");
        return;
    }
    if (precio > 500.00) {
        mostrarNotificacion("Precio máximo: $500.00");
        return;
    }

    pedidoCaja.push({ producto: nombreProducto, precio: precio });
    totalCaja += precio;

    renderizarTicketCaja();
    mostrarNotificacion(`${nombreProducto} añadido`);
    
    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("producto").focus();
}

// Renderizar el ticket de la Caja
function renderizarTicketCaja() {
    document.getElementById("totalActual").textContent = totalCaja.toFixed(2);
    const lista = document.getElementById("listaActual");

    if (pedidoCaja.length === 0) {
        lista.innerHTML = '<p>Sin productos.</p>';
        return;
    }

    lista.innerHTML = pedidoCaja.map((item, index) => {
        // Si el item tiene "items" es un pedido del cliente
        if (item.items) {
            const detalle = item.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ');
            return `
                <li><strong>${item.ticket}</strong>: ${detalle} - $${item.total.toFixed(2)}</li>
            `;
        } else {
            // Es un pedido manual de la cajera
            return `
                <li>${item.producto} - $${item.precio.toFixed(2)}</li>
            `;
        }
    }).join('');
}

// Cobrar y cerrar el ticket
function cerrarPedido() {
    if (pedidoCaja.length === 0) {
        mostrarNotificacion("Ticket vacío");
        return;
    }

    mostrarNotificacion(`Cobrado: $${totalCaja.toFixed(2)}`);
    
    pedidoCaja = [];
    totalCaja = 0;
    renderizarTicketCaja();
}