const readline = require("readline");
const cocina = require("./cocina");
const cliente = require("./cliente");
const caja = require("./Caja");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// --- MENÚ COCINA ---
function menuCocina() {
  console.log("\n--- GESTIÓN DE COCINA ---");
  console.log("1. Listar productos");
  console.log("2. Agregar producto");
  console.log("3. Eliminar producto");
  console.log("4. Ver bebidas");
  console.log("5. Ver postres");
  console.log("6. Volver al Menú Principal");

  rl.question("Selecciona una opción: ", function (opcion) {
    switch (opcion.trim()) {
      case "1":
        cocina.listarProductos();
        menuCocina();
        break;

      case "2":
        rl.question("Nombre del producto: ", function (nombre) {
          rl.question("Precio ($): ", function (precio) {
            rl.question("Categoría (bebida/postre): ", function (cat) {
              cocina.agregarProducto(nombre, precio, cat || "bebida");
              menuCocina();
            });
          });
        });
        break;

      case "3":
        rl.question("ID del producto a eliminar: ", function (id) {
          cocina.eliminarProducto(Number(id));
          menuCocina();
        });
        break;

      case "4":
        cocina.buscarBebidas();
        menuCocina();
        break;

      case "5":
        cocina.buscarPostres();
        menuCocina();
        break;

      case "6":
        menuPrincipal();
        break;

      default:
        console.log("Opción no válida.");
        menuCocina();
        break;
    }
  });
}

// --- MENÚ CLIENTE ---
function menuCliente() {
  console.log("\n--- MENÚ DEL CLIENTE ---");
  console.log("1. Ver catálogo completo");
  console.log("2. Ver promociones");
  console.log("3. Agregar producto al pedido");
  console.log("4. Ver mi pedido actual");
  console.log("5. Confirmar y enviar orden a Caja (con Callback)");
  console.log("6. Volver al Menú Principal");

  rl.question("Selecciona una opción: ", function (opcion) {
    switch (opcion.trim()) {
      case "1":
        cliente.consultarProductos();
        menuCliente();
        break;

      case "2":
        cliente.mostrarPromociones();
        menuCliente();
        break;

      case "3":
        cliente.consultarProductos();
        rl.question("ID del producto: ", function (id) {
          rl.question("Cantidad (Enter = 1): ", function (cant) {
            const cantidad = cant.trim() === "" ? 1 : Number(cant);
            cliente.crearPedidoProducto(Number(id), cantidad);
            menuCliente();
          });
        });
        break;

      case "4":
        cliente.listarPedidos();
        menuCliente();
        break;

      case "5":
        const comanda = cliente.vaciarYDevolverCarrito();

        // Envío a caja con CALLBACK
        caja.recibirComandaCliente(comanda, function (error, respuesta) {
          if (error) {
            console.log(`✗ Error: ${error.message}`);
          } else {
            console.log(`\n[NOTIFICACIÓN]: ${respuesta.mensaje}`);
            console.log(`Estado: -> [${respuesta.estado.toUpperCase()}] <- Folio: ${respuesta.folio} | Total: $${respuesta.total.toFixed(2)}`);
          }
          menuCliente();
        });
        break;

      case "6":
        menuPrincipal();
        break;

      default:
        console.log("Opción no válida.");
        menuCliente();
        break;
    }
  });
}

// --- MENÚ CAJA (TU ROL) ---
function menuCaja() {
  console.log("\n--- MÓDULO DE CAJA ---");
  console.log("1. Ver pedidos pendientes por pagar");
  console.log("2. Cobrar un pedido pendiente (con Callback)");
  console.log("3. Cancelar un pedido pendiente (con Callback)");
  console.log("4. Registrar producto manual en mostrador");
  console.log("5. Ver corte de caja (Total acumulado con IVA)");
  console.log("6. Volver al Menú Principal");

  rl.question("Selecciona una opción: ", function (opcion) {
    switch (opcion.trim()) {
      case "1":
        const pendientes = caja.obtenerPedidosPendientes();
        if (pendientes.length === 0) {
          console.log("No hay pedidos pendientes por pagar.");
        } else {
          console.log("\n--- PEDIDOS PENDIENTES ---");
          pendientes.forEach(function (p) {
            const itemsTexto = p.items.map(function (i) {
              return `${i.cantidad}x ${i.nombre}`;
            }).join(", ");
            console.log(`Folio: ${p.folio} | Artículos: ${itemsTexto} | Subtotal: $${p.subtotal.toFixed(2)} | Total (+IVA): $${p.total.toFixed(2)} | Estado: [${p.estado}]`);
          });
        }
        menuCaja();
        break;

      case "2":
        rl.question("Ingresa el Folio a cobrar (ej. #001): ", function (folio) {
          caja.cobrarPedido(folio.trim(), function (error, data) {
            if (error) {
              console.log(`✗ Error: ${error.message}`);
            } else {
              console.log(`\n[NOTIFICACIÓN]: ${data.mensaje}`);
              console.log(`Total cobrado con IVA: $${data.total.toFixed(2)} | Estado: [${data.estado.toUpperCase()}]`);
            }
            menuCaja();
          });
        });
        break;

      case "3":
        rl.question("Folio a cancelar: ", function (folio) {
          rl.question("Motivo de cancelación: ", function (motivo) {
            caja.cancelarPedido(folio.trim(), motivo, function (error, data) {
              if (error) {
                console.log(`✗ Error: ${error.message}`);
              } else {
                console.log(`\n[NOTIFICACIÓN]: ${data.mensaje}`);
                console.log(`Folio ${data.folio} marcado como: [${data.estado.toUpperCase()}] | Motivo: ${data.motivo}`);
              }
              menuCaja();
            });
          });
        });
        break;

      case "4":
        rl.question("Nombre del producto manual: ", function (nombre) {
          rl.question("Precio ($): ", function (precio) {
            caja.agregarPedidoManual(nombre, precio, function (error, data) {
              if (error) {
                console.log(`✗ Error: ${error.message}`);
              } else {
                console.log(`\n[NOTIFICACIÓN]: ${data.mensaje}`);
                console.log(`Folio: ${data.folio} | Total (+IVA): $${data.total.toFixed(2)} | Estado: [${data.estado}]`);
              }
              menuCaja();
            });
          });
        });
        break;

      case "5":
        const totales = caja.calcularTotalesGenerales();
        console.log("\n--- CORTE DE CAJA ---");
        console.log(`Pedidos cobrados: ${totales.cantidadPagados}`);
        console.log(`Subtotal acumulado: $${totales.subtotal.toFixed(2)}`);
        console.log(`IVA acumulado (16%): $${totales.iva.toFixed(2)}`);
        console.log(`Total en caja: $${totales.total.toFixed(2)}`);
        menuCaja();
        break;

      case "6":
        menuPrincipal();
        break;

      default:
        console.log("Opción no válida.");
        menuCaja();
        break;
    }
  });
}

// --- MENÚ PRINCIPAL ---
function menuPrincipal() {
  console.log("\n=============================");
  console.log("     SISTEMA CAFETERÍA       ");
  console.log("=============================");
  console.log("1. Módulo Cocina");
  console.log("2. Módulo Cliente");
  console.log("3. Módulo Caja");
  console.log("4. Salir del Sistema");

  rl.question("Selecciona un módulo: ", function (opcion) {
    switch (opcion.trim()) {
      case "1":
        menuCocina();
        break;

      case "2":
        menuCliente();
        break;

      case "3":
        menuCaja();
        break;

      case "4":
        console.log("\nSaliendo del sistema... ¡Buen día!");
        rl.close();
        break;

      default:
        console.log("Opción no válida.");
        menuPrincipal();
        break;
    }
  });
}

// Arrancar sistema
menuPrincipal();