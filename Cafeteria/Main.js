// --- NAVEGACIÓN ---
function cambiarVista(nombreVista, boton) {
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(`vista-${nombreVista}`).classList.add('active');
    boton.classList.add('active');

    // Refrescamos la vista al cambiar
    if (nombreVista === 'cliente') renderizarMenuCliente();
    if (nombreVista === 'caja') { cargarPedidosPendientes(); renderizarTicketCaja(); }
    if (nombreVista === 'cocina') listarProductosCrud();
}

// --- NOTIFICACIONES ---
function mostrarNotificacion(mensaje) {
    const toast = document.getElementById("toast");
    toast.textContent = mensaje;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 2000);
}

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    listarProductosCrud();
    console.log("Sistema listo.");
});

// Atajo de teclado para Caja
document.getElementById("precio").addEventListener("keypress", (e) => {
    if (e.key === "Enter") agregarPedido();
});