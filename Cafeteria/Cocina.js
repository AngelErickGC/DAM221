let productos = [
  { id: 1, nombre: "Café Americano", precio: 35.00, categoria: "bebida", disponible: true, promo: "2x1 los martes" },
  { id: 2, nombre: "Capuchino", precio: 45.00, categoria: "bebida", disponible: true },
  { id: 3, nombre: "Latte Vainilla", precio: 50.00, categoria: "bebida", disponible: true },
  { id: 4, nombre: "Croissant", precio: 30.00, categoria: "postre", disponible: true },
  { id: 5, nombre: "Muffin de Arándano", precio: 32.00, categoria: "postre", disponible: true, promo: "10% de descuento" }
];

function obtenerCatalogo() {
  return productos;
}

function listarProductos() {
  console.log("\n--- CATÁLOGO DE COCINA ---");
  if (productos.length === 0) {
    console.log("No hay productos disponibles.");
    return;
  }
  productos.forEach(prod => {
    const disp = prod.disponible ? "DISPONIBLE" : "AGOTADO";
    console.log(`[ID: ${prod.id}] ${prod.nombre} - $${prod.precio.toFixed(2)} - ${prod.categoria} [${disp}]`);
  });
}

function agregarProducto(nombre, precio, categoria = "bebida") {
  if (!nombre || isNaN(precio) || Number(precio) <= 0) {
    console.log("Error: Nombre o precio inválido.");
    return;
  }
  const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
  const nuevoProducto = {
    id: nuevoId,
    nombre: nombre.trim(),
    precio: parseFloat(precio),
    categoria: categoria.trim(),
    disponible: true
  };
  productos.push(nuevoProducto);
  console.log(`✓ Producto "${nombre}" agregado correctamente con ID ${nuevoId}.`);
}

function editarProducto(id, nuevoNombre, nuevoPrecio) {
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    console.log(`No se encontró el producto con ID ${id}.`);
    return;
  }
  if (nuevoNombre) producto.nombre = nuevoNombre.trim();
  if (nuevoPrecio && !isNaN(nuevoPrecio) && Number(nuevoPrecio) > 0) {
    producto.precio = parseFloat(nuevoPrecio);
  }
  console.log(`✓ Producto ID ${id} actualizado con éxito.`);
}

function eliminarProducto(id) {
  const existe = productos.some(p => p.id === id);
  if (!existe) {
    console.log(`No se encontró el producto con ID ${id}.`);
    return false;
  }
  productos = productos.filter(p => p.id !== id);
  console.log(`✓ Producto ID ${id} eliminado del catálogo.`);
  return true;
}

function buscarProducto(id) {
  return productos.find(p => p.id === id);
}

function buscarProductosBaratos() {
  console.log("\n--- PRODUCTOS BARATOS (<= $35) ---");
  const baratos = productos.filter(p => p.precio <= 35);
  baratos.forEach(p => console.log(`${p.nombre} - $${p.precio.toFixed(2)}`));
  return baratos;
}

function buscarProductosCaros() {
  console.log("\n--- PRODUCTOS CAROS (>= $45) ---");
  const caros = productos.filter(p => p.precio >= 45);
  caros.forEach(p => console.log(`${p.nombre} - $${p.precio.toFixed(2)}`));
  return caros;
}

function buscarBebidas() {
  console.log("\n--- BEBIDAS ---");
  const bebidas = productos.filter(p => p.categoria === "bebida");
  bebidas.forEach(p => console.log(`${p.nombre} - $${p.precio.toFixed(2)}`));
  return bebidas;
}

function buscarPostres() {
  console.log("\n--- POSTRES ---");
  const postres = productos.filter(p => p.categoria === "postre");
  postres.forEach(p => console.log(`${p.nombre} - $${p.precio.toFixed(2)}`));
  return postres;
}

module.exports = {
  productos,
  obtenerCatalogo,
  listarProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
  buscarProducto,
  buscarProductosBaratos,
  buscarProductosCaros,
  buscarBebidas,
  buscarPostres
};