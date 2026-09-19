// Carrito del cliente
let carritoCliente = [];
let totalCliente = 0;
let contadorTickets = 1;

// Renderizar el menú del cliente
function renderizarMenuCliente() {
    const productos = JSON.parse(localStorage.getItem("productosCafeteria")) || [];
    const grid = document.getElementById("gridProductosCliente");
    
    if (productos.length === 0) {
        grid.innerHTML = '<p>El menú está vacío. Ve a Cocina para agregar productos.</p>';
        return;
    }

    // Cada producto es clickeable para agregarlo al carrito
    grid.innerHTML = productos.map(prod => `
        <div class="producto" onclick="agregarAlCarrito(${prod.id})">
            <strong>${prod.nombre}</strong><br>
            $${prod.precio.toFixed(2)}
        </div>
    `).join('');
}

// Agregar producto al carrito al hacer clic
function agregarAlCarrito(idProducto) {
    const productos = JSON.parse(localStorage.getItem("productosCafeteria")) || [];
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    // Si ya está en el carrito, aumentamos la cantidad
    const itemExistente = carritoCliente.find(item => item.id === idProducto);
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carritoCliente.push({ ...producto, cantidad: 1 });
    }

    totalCliente += producto.precio;
    renderizarCarritoCliente();
    mostrarNotificacion(`${producto.nombre} agregado`);
}

// Mostrar el carrito del cliente
function renderizarCarritoCliente() {
    document.getElementById("totalCliente").textContent = totalCliente.toFixed(2);
    const lista = document.getElementById("listaCliente");

    if (carritoCliente.length === 0) {
        lista.innerHTML = '<p>Sin productos.</p>';
        return;
    }

    lista.innerHTML = carritoCliente.map(item => `
        <li>${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toFixed(2)}</li>
    `).join('');
}

// Confirmar pedido (Envía a Caja)
function confirmarPedidoCliente() {
    if (carritoCliente.length === 0) {
        mostrarNotificacion("Selecciona al menos un producto");
        return;
    }

    const numeroFormateado = `#${String(contadorTickets).padStart(3, '0')}`;
    document.getElementById("numeroTicket").textContent = numeroFormateado;

    // Guardamos el pedido en localStorage para que la Caja lo vea
    let pedidosPendientes = JSON.parse(localStorage.getItem("pedidosPendientes")) || [];
    pedidosPendientes.push({
        ticket: numeroFormateado,
        items: [...carritoCliente],
        total: totalCliente
    });
    localStorage.setItem("pedidosPendientes", JSON.stringify(pedidosPendientes));

    document.getElementById("modalTicket").style.display = "block";
    contadorTickets++;

    // Refrescamos la Caja
    if (typeof renderizarTicketCaja === 'function') renderizarTicketCaja();
}

// Cerrar modal
function cerrarModalTicket() {
    document.getElementById("modalTicket").style.display = "none";
    carritoCliente = [];
    totalCliente = 0;
    renderizarCarritoCliente();
}