let productos = [
    { id: 1, nombre: "Café Americano", precio: 35.00, categoria: "bebida" },
    { id: 2, nombre: "Capuchino", precio: 45.00, categoria: "bebida" },
    { id: 3, nombre: "Latte Vainilla", precio: 50.00, categoria: "bebida" },
    { id: 4, nombre: "Croissant", precio: 30.00, categoria: "postre" },
    { id: 5, nombre: "Muffin de Arándano", precio: 32.00, categoria: "postre" }
];

function listarProductos() {
    console.log("\n--- CATÁLOGO DE COCINA ---");

    if (productos.length === 0) {
        console.log("No hay productos disponibles.");
        return;
    }

    productos.forEach(prod => {
        console.log(
            `[ID: ${prod.id}] ${prod.nombre} - $${prod.precio.toFixed(2)} - ${prod.categoria}`
        );
    });
}

function agregarProducto(nombre, precio, categoria) {

    if (!nombre || isNaN(precio) || precio <= 0) {
        console.log("Error: Nombre o precio inválido.");
        return;
    }

    const nuevoId = productos.length > 0
        ? Math.max(...productos.map(p => p.id)) + 1
        : 1;

    const nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        precio: parseFloat(precio),
        categoria: categoria
    };

    productos.push(nuevoProducto);

    console.log(
        `Producto "${nombre}" agregado correctamente con ID ${nuevoId}.`
    );
}

function editarProducto(id, nuevoNombre, nuevoPrecio) {

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        console.log(`No se encontró el producto con ID ${id}.`);
        return;
    }

    if (nuevoNombre) {
        producto.nombre = nuevoNombre;
    }

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


function buscarProductosBaratos() {

    const baratos = productos.filter(p => p.precio <= 35);

    console.log("\n--- PRODUCTOS BARATOS ---");

    baratos.forEach(p => {
        console.log(`${p.nombre} - $${p.precio.toFixed(2)}`);
    });

    return baratos;
}

function buscarProductosCaros() {

    const caros = productos.filter(p => p.precio >= 45);

    console.log("\n--- PRODUCTOS CAROS ---");

    caros.forEach(p => {
        console.log(`${p.nombre} - $${p.precio.toFixed(2)}`);
    });

    return caros;
}

function buscarBebidas() {

    const bebidas = productos.filter(p => p.categoria === "bebida");

    console.log("\n--- BEBIDAS ---");

    bebidas.forEach(p => {
        console.log(`${p.nombre} - $${p.precio.toFixed(2)}`);
    });

    return bebidas;
}

function buscarPostres() {

    const postres = productos.filter(p => p.categoria === "postre");

    console.log("\n--- POSTRES ---");

    postres.forEach(p => {
        console.log(`${p.nombre} - $${p.precio.toFixed(2)}`);
    });

    return postres;
}

function buscarProducto(id) {

    const producto = productos.find(p => p.id === id);

    console.log("\n--- PRODUCTO ENCONTRADO ---");

    if (producto) {
        console.log(
            `[ID: ${producto.id}] ${producto.nombre} - $${producto.precio.toFixed(2)}`
        );
    } else {
        console.log("Producto no encontrado.");
    }

    return producto;
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
    obtenerCatalogo,
    buscarProductosBaratos,
    buscarProductosCaros,
    buscarBebidas,
    buscarPostres,
    buscarProducto
};