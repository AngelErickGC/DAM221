// ==========================================
// MÓDULO COCINA - Gestión de Productos
// ==========================================

// Productos de cafetería por defecto
let productos = JSON.parse(localStorage.getItem("productosCafeteria")) || [
    { id: 1, nombre: "Café Americano", precio: 2.50 },
    { id: 2, nombre: "Capuchino", precio: 3.50 },
    { id: 3, nombre: "Latte Vainilla", precio: 4.00 },
    { id: 4, nombre: "Expreso Doble", precio: 3.00 },
    { id: 5, nombre: "Té Verde", precio: 2.50 },
    { id: 6, nombre: "Té Chai", precio: 3.20 },
    { id: 7, nombre: "Croissant", precio: 2.00 },
    { id: 8, nombre: "Muffin Arándano", precio: 2.80 },
    { id: 9, nombre: "Cheesecake", precio: 4.50 }
];

// Guardar en localStorage
function guardarEnMemoria() {
    localStorage.setItem("productosCafeteria", JSON.stringify(productos));
}

// Listar productos
function listarProductosCrud() {
    let lista = document.getElementById("listaProductosCrud");
    
    if (productos.length === 0) {
        lista.innerHTML = '<p>No hay productos.</p>';
        return;
    }

    lista.innerHTML = "";
    productos.forEach(producto => {
        lista.innerHTML += `
            <div class="producto-item">
                <span>ID: ${producto.id} - ${producto.nombre} - $${producto.precio.toFixed(2)}</span>
                <div class="producto-acciones">
                    <button onclick="editar(${producto.id})">Editar</button>
                    <button onclick="eliminar(${producto.id})">Eliminar</button>
                </div>
            </div>
        `;
    });
}

// Agregar producto
function agregarProducto() {
    let nombre = document.getElementById("crudNombre").value;
    let precio = document.getElementById("crudPrecio").value;

    if (nombre === "" || precio === "") {
        alert("Escribe el nombre y el precio");
        return;
    }

    let producto = {
        id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
        nombre: nombre,
        precio: Number(precio)
    };

    productos.push(producto);
    guardarEnMemoria();

    document.getElementById("crudNombre").value = "";
    document.getElementById("crudPrecio").value = "";

    listarProductosCrud();
}

// Editar producto
function editar(id) {
    let producto = productos.find(p => p.id === id);
    if (!producto) return;

    let nombre = prompt("Nuevo nombre:", producto.nombre);
    let precio = prompt("Nuevo precio:", producto.precio);

    if (nombre !== null && precio !== null) {
        producto.nombre = nombre;
        producto.precio = Number(precio);
        guardarEnMemoria();
        listarProductosCrud();
    }
}

// Eliminar producto
function eliminar(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    
    productos = productos.filter(p => p.id !== id);
    guardarEnMemoria();
    listarProductosCrud();
}