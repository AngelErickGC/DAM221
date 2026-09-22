let listaPedidos = [];       
const TASA_IVA = 0.16;       


function agregarPedido(nombre, precio) {
    const precioNum = parseFloat(precio);

    if (!nombre || isNaN(precioNum) || precioNum <= 0) {
        console.log("Error: Debes ingresar un nombre y un precio válido.");
        return;
    }

  
    listaPedidos.push({
        producto: nombre,
        precio: precioNum
    });

    console.log(`Pedido agregado a caja: ${nombre} - $${precioNum.toFixed(2)}`);
}


function recibirOrdenCliente(orden) {
    if (!orden || !orden.items) return;

    orden.items.forEach(item => {
        
        const { nombre, precio, cantidad } = item;
        listaPedidos.push({
            producto: `${cantidad}x ${nombre} (${orden.ticket})`,
            precio: precio * cantidad
        });
    });

    console.log(`Comanda ${orden.ticket} cargada con éxito a la caja.`);
}


function calcularTotales() {

    const subtotal = listaPedidos.reduce((acumulador, { precio }) => acumulador + precio, 0);
    const iva = subtotal * TASA_IVA;
    const total = subtotal + iva;


    return { subtotal, iva, total };
}


function mostrarResumenCaja() {
    console.log(`\n========================================`);
    console.log(`           🧾 TICKET DE CAJA            `);
    console.log(`========================================`);

    if (listaPedidos.length === 0) {
        console.log(`No hay productos registrados en caja.`);
        console.log(`========================================`);
        return;
    }

 
    listaPedidos.forEach(({ producto, precio }) => {
        console.log(`• ${producto.padEnd(26, " ")} $${precio.toFixed(2)}`);
    });

    
    const { subtotal, iva, total } = calcularTotales();

    console.log(`----------------------------------------`);
    console.log(`Subtotal:                 $${subtotal.toFixed(2)}`);
    console.log(`IVA (16%):                $${iva.toFixed(2)}`);
    console.log(`Total a Pagar:            $${total.toFixed(2)}`);
    console.log(`========================================`);
}


function cobrarVenta() {
    if (listaPedidos.length === 0) {
        console.log("No hay nada que cobrar.");
        return;
    }

    const { total } = calcularTotales();
    console.log(`\n✅ Cobro exitoso por un total de $${total.toFixed(2)}`);
    
    
    listaPedidos = [];
    console.log("Caja lista para la siguiente transacción.");
}

module.exports = {
    agregarPedido,
    recibirOrdenCliente,
    calcularTotales,
    mostrarResumenCaja,
    cobrarVenta
};