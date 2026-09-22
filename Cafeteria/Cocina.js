let productos = [
    { id: 1, nombre: "Café Americano", precio: 35.00 },
    { id: 2, nombre: "Capuchino", precio: 45.00 },
    { id: 3, nombre: "Latte Vainilla", precio: 50.00 },
    { id: 4, nombre: "Croissant", precio: 30.00 },
    { id: 5, nombre: "Muffin de Arándano", precio: 32.00 }
];


function listarProductos() {
    console.log("\n--- CATÁLOGO DE COCINA ---");
    if (productos.length === 0) {
        console.log("No hay productos disponibles.");
        return;
    }

    productos.forEach(prod => {
        console.log(`[ID: ${prod.id}] ${prod.nombre} - $${prod.precio.toFixed(2)}`);
    });
}


function agregarProducto(nombre, precio) {
    if (!nombre || isNaN(precio) || precio <= 0) {
        console.log("Error: Nombre o precio inválido.");
        return;
    }

    const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
    

    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        precio: parseFloat(precio)
    };

    productos.push(nuevoProducto);
    console.log(`Producto "${nombre}" agregado correctamente con ID ${nuevoId}.`);
}


function editarProducto(id, nuevoNombre, nuevoPrecio) {
    const producto = productos.find(p => p.id === id);

    if (!producto) {
        console.log(`No se encontró el producto con ID ${id}.`);
        return;
    }

    if (nuevoNombre) producto.nombre = nuevoNombre;
    if (nuevoPrecio && !isNaN(nuevoPrecio) && nuevoPrecio > 0) {
        producto.precio = parseFloat(nuevoPrecio);
    }

    console.log(`Producto ID ${id} actualizado con éxito.`);
}


function eliminarProducto(id) {
    const existe = productos.some(p => p.id === id);
    if (!existe) {
        console.log(`No se encontró el producto con ID ${id}.`);
        return;
    }

    productos = productos.filter(p => p.id !== id);
    console.log(`Producto ID ${id} eliminado del catálogo.`);
}

function obtenerCatalogo() {
    return productos;
}

module.exports = {
    productos,
    listarProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    obtenerCatalogo
};