var productosDisponibles = [
    {
        id: 1,
        nombre: "Notebook Lenovo",
        precio: 450000,
        stock: 5,
        categoria: "tecnologia"
    },
    {
        id: 2,
        nombre: "Mouse Inalámbrico",
        precio: 15000,
        stock: 20,
        categoria: "tecnologia"
    },
    {
        id: 3,
        nombre: "Zapatillas Nike",
        precio: 80000,
        stock: 10,
        categoria: "deportes"
    },
    {
        id: 4,
        nombre: "Remera Algodón",
        precio: 12000,
        stock: 0,
        categoria: "ropa"
    },
    {
        id: 5,
        nombre: "Auriculares Bluetooth",
        precio: 22000,
        stock: 15,
        categoria: "tecnologia"
    },
    {
        id: 6,
        nombre: "Mochila Urbana",
        precio: 18000,
        stock: 7,
        categoria: "accesorios"
    },
    {
        id: 7,
        nombre: "Camiseta Oficial Argentina",
        precio: 95000,
        stock: 3,
        categoria: "deportes"
    },
    {
        id: 8,
        nombre: "Lámpara LED Escritorio",
        precio: 8500,
        stock: 12,
        categoria: "hogar"
    },
    {
        id: 9,
        nombre: "Pantalón Jogger",
        precio: 27000,
        stock: 8,
        categoria: "ropa"
    },
    {
        id: 10,
        nombre: "Toalla de Microfibra",
        precio: 4000,
        stock: 25,
        categoria: "hogar"
    },
    {
        id: 11,
        nombre: "Gorra Snapback",
        precio: 9000,
        stock: 13,
        categoria: "accesorios"
    },
    {
        id: 12,
        nombre: "Cargador Portátil PowerBank",
        precio: 19500,
        stock: 9,
        categoria: "tecnologia"
    },
    {
        id: 13,
        nombre: "Set de Pesas 20kg",
        precio: 65000,
        stock: 4,
        categoria: "deportes"
    },
    {
        id: 14,
        nombre: "Buzo Oversize",
        precio: 32000,
        stock: 6,
        categoria: "ropa"
    }
];
var carrito = [
    {
        productoId: 1,
        nombre: "Notebook Lenovo",
        precio: 450000,
        cantidad: 1,
        subtotal: 450000
    },
    {
        productoId: 2,
        nombre: "Mouse Inalámbrico",
        precio: 15000,
        cantidad: 2,
        subtotal: 30000
    }
];
//Operaciones del carrito
//Agregar producto al carrito ✓
//Producto existe en catalogo -> Validacion ✓
//Stock suficiente para la cantidad solicitada -> Validacion ✓
//Cantidad debe ser mayor a 0 -> Validacion ✓
//No se puede agregar mas stock del disponible -> Validacion ✓
//"Producto agregado correctamente" en operaciones exitosas -> Estado ✓
//"ERROR: desc" cuando algo falla -> Estados ✓
function agregarAlCarrito(idProducto, cantidad) {
    console.log("\n=========================================================");
    console.log("              AGREGAR PRODUCTO AL CARRITO");
    console.log("=========================================================\n");
    if (cantidad < 1) {
        console.log("ERROR: La cantidad no puede ser menor a 1");
        return;
    }
    //Verificacion para saber si el producto existe
    var productoExiste = false;
    productosDisponibles.forEach(function (producto) {
        if (producto.id == idProducto) {
            productoExiste = true;
        }
    });
    if (productoExiste == false) {
        console.log("El producto con id ".concat(idProducto, " no figura dentro del catalogo."));
    }
    else {
        productosDisponibles.forEach(function (producto) {
            //Verificar producto
            if (producto.id == idProducto) {
                //Verificar cantidad
                if (producto.stock < cantidad) {
                    console.log("ERROR: No hay suficiente stock para el producto ".concat(producto.nombre, ". (Stock ").concat(producto.stock, ", cantidad deseada ").concat(cantidad, ")"));
                    return;
                }
                else {
                    carrito.push({
                        productoId: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        cantidad: cantidad,
                        subtotal: (producto.precio * cantidad)
                    });
                    console.log("Producto agregado correctamente.\n");
                    console.log("Producto: ".concat(producto.nombre));
                    console.log("Precio: ".concat(producto.precio));
                    console.log("Cantidad: ".concat(cantidad));
                    console.log("Subtotal: ".concat((producto.precio * cantidad)));
                    return;
                }
            }
        });
    }
}
//Quitar producto del carrito ✓
function quitarDelCarrito(idProducto) {
    console.log("\n=========================================================");
    console.log("              QUITAR PRODUCTO DEL CARRITO");
    console.log("=========================================================\n");
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].productoId == idProducto) {
            console.log("Se elimino ".concat(carrito[i].nombre, " del carrito."));
            carrito.splice(i, 1);
            break;
        }
    }
}
//Modificar cantidad de producto ya agregado ✓
//Stock suficiente para la cantidad solicitada -> Validacion ✓
//Cantidad debe ser mayor a 0 -> Validacion ✓
//No se puede agregar mas stock del disponible -> Validacion ✓
//"ERROR: desc" cuando algo falla -> Estados ✓
function modificarCantidadCarrito(idProducto, nuevaCantidad) {
    if (nuevaCantidad < 1) {
        console.log("ERROR: La cantidad no puede ser menor a 1");
        return;
    }
    console.log("\n=========================================================");
    console.log("              MODIFICAR CANTIDAD PRODUCTO");
    console.log("=========================================================\n");
    // Verificar si el producto existe en productosDisponibles
    var productoDisponible = undefined;
    productosDisponibles.forEach(function (producto) {
        if (producto.id == idProducto) {
            productoDisponible = producto;
        }
    });
    if (!productoDisponible) {
        console.log("ERROR: No se encontr\u00F3 ning\u00FAn producto con ID ".concat(idProducto));
        return;
    }
    //Verificar si el producto esta dentro del carrito
    var productoCarrito = undefined;
    carrito.forEach(function (producto) {
        if (producto.productoId == idProducto) {
            productoCarrito = producto;
        }
    });
    if (!productoCarrito) {
        console.log("ERROR: No se encontr\u00F3 ning\u00FAn producto con ID ".concat(idProducto, " dentro del carrito"));
        return;
    }
    //Trabajamos con el producto
    carrito.forEach(function (producto) {
        //Verificar producto
        if (producto.productoId == idProducto) {
            //Verificar cantidad
            productosDisponibles.forEach(function (prod) {
                if (prod.id == idProducto) {
                    if (prod.stock < nuevaCantidad) {
                        console.log("ERROR: No hay stock suficiente para el producto ".concat(prod.nombre));
                        return;
                    }
                }
            });
            console.log("Se modifico la cantidad del producto ".concat(producto.nombre, " a ").concat(nuevaCantidad, "\n"));
            producto.cantidad = nuevaCantidad;
            producto.subtotal = producto.precio * nuevaCantidad;
            console.log("Producto: ".concat(producto.nombre));
            console.log("Precio: ".concat(producto.precio));
            console.log("Cantidad: ".concat(producto.cantidad));
            console.log("Subtotal: ".concat((producto.subtotal)));
        }
    });
}
//Calcular subtotal, descuentos, impuestos y total final. ✓
//Subtotal por producto (precio x cantidad) -> Finanzas ✓
//Subtotal total del carrito -> Finanzas ✓
//Descuentos aplicables (por cantidad, por monto total) -> Finanzas ✓
//Impuestos (IVA 21%) -> Finanzas ✓
//Total final a pagar -> Finanzas ✓
//Mostrar desglose completo -> Finanzas ✓
//"Carrito vacio" cuando no hay productos -> Estados ✓
//"X productos en el carrito - Total $XXXX" cuando hay items -> Estados ✓
//"ERROR: desc" cuando algo falla -> Estados ✓
function calcularCarrito() {
    //Verificar que haya items en el carrito
    if (carrito.length < 1) {
        console.log("No hay items en el carrito");
        return;
    }
    console.log("\n=========================================================");
    console.log("                   CALCULAR CARRITO");
    console.log("=========================================================\n");
    console.log("---------------------------------------------------------\n");
    var subtotal = 0;
    carrito.forEach(function (producto) {
        if (producto.cantidad >= 3) {
            //Se aplicara descuento de 10% por comprar 3 o mas unidades.
            console.log("Producto: ".concat(producto.nombre));
            console.log("Precio: ".concat(producto.precio));
            console.log("Cantidad: ".concat(producto.cantidad));
            console.log("Subtotal: ".concat((producto.subtotal)));
            console.log("Al comprar 3 o mas unidades recibira un descuento del 10%, siendo $".concat((producto.subtotal * 0.10)));
            console.log("Nuevo subtotal: $".concat((producto.subtotal * 0.90)));
            subtotal += (producto.subtotal * 0.90);
        }
        else {
            console.log("Producto: ".concat(producto.nombre));
            console.log("Precio: ".concat(producto.precio));
            console.log("Cantidad: ".concat(producto.cantidad));
            console.log("Subtotal: ".concat((producto.subtotal)));
            subtotal += producto.subtotal;
        }
        console.log("\n---------------------------------------------------------\n");
    });
    var descuentoPorMonto = 0;
    if (subtotal > 100000 && subtotal <= 500000) {
        descuentoPorMonto = subtotal * 0.05;
        console.log("MONTO MAYOR A $100.000! DESCUENTO DISPONIBLE!!");
        console.log("Se aplicara un descuento de 5% al subtotal, siendo $".concat(descuentoPorMonto, "\n"));
    }
    else if (subtotal > 500000) {
        console.log("MONTO MAYOR A $500.000! DESCUENTO DISPONIBLE!!");
        descuentoPorMonto = subtotal * 0.08;
        console.log("Se aplicara un descuento de 8% al subtotal, siendo $".concat(descuentoPorMonto, "\n"));
    }
    var subtotalConDescuentos = subtotal - descuentoPorMonto;
    var iva = subtotalConDescuentos * 0.21;
    console.log("Se aplicara un IVA de 21%, siendo $".concat(iva, "\n"));
    var totalFinal = subtotalConDescuentos + iva;
    console.log("=========================================================");
    console.log("El monto TOTAL FINAL de su carrito es: $".concat(totalFinal));
    console.log("=========================================================");
}
//Mostrar contenido del carrito ✓
//Mostrar desglose completo -> Finanzas ✓
//"Carrito vacio" cuando no hay productos -> Estados ✓
//"X productos en el carrito - Total $XXXX" cuando hay items -> Estados ✓
//"ERROR: desc" cuando algo falla -> Estados ✓
function mostrarCarrito() {
    console.log("\n=========================================================");
    console.log("                   MOSTRAR CARRITO");
    console.log("=========================================================\n");
    //Validar que haya items
    if (carrito.length < 1) {
        console.log("No hay items en el carrito.");
        return;
    }
    console.log("\n---------------------------------------------------------\n");
    carrito.forEach(function (producto) {
        if (producto.cantidad >= 3) {
            //Se aplicara descuento de 10% por comprar 3 o mas unidades.
            console.log("Producto: ".concat(producto.nombre));
            console.log("Precio: ".concat(producto.precio));
            console.log("Cantidad: ".concat(producto.cantidad));
            console.log("Subtotal: ".concat((producto.subtotal)));
            console.log("Al comprar 3 o mas unidades recibira un descuento del 10%, siendo $".concat((producto.subtotal * 0.10)));
            console.log("Nuevo subtotal: $".concat((producto.subtotal * 0.90)));
        }
        else {
            console.log("Producto: ".concat(producto.nombre));
            console.log("Precio: ".concat(producto.precio));
            console.log("Cantidad: ".concat(producto.cantidad));
            console.log("Subtotal: ".concat((producto.subtotal)));
        }
        console.log("\n---------------------------------------------------------\n");
    });
}
//Operaciones del carrito ✓✓✓✓✓
//Agregar producto al carrito ✓
//Quitar producto del carrito ✓
//Modificar cantidad de producto ya agregado ✓
//Calcular subtotal, descuentos, impuestos y total final. ✓
//Mostrar contenido del carrito ✓
//Validaciones de productos ✓✓✓✓✓
//Producto existe en catalogo ✓
//Stock suficiente para la cantidad solicitada ✓
//Cantidad debe ser mayor a 0 ✓
//No se puede agregar mas stock del disponible ✓
//Mostrar mensajes especificos de cada error ✓
//Calculos Financieros ✓✓✓✓✓✓
//Subtotal por producto (precio x cantidad) ✓
//Subtotal total del carrito ✓
//Descuentos aplicables (por cantidad, por monto total) ✓
//Impuestos (IVA 21%) ✓
//Total final a pagar ✓
//Mostrar desglose completo ✓
//Estados del Carrito ✓✓✓✓
//"Carrito vacio" cuando no hay productos ✓
//"X productos en el carrito - Total $XXXX" cuando hay items ✓
//"Producto agregado correctamente" en operaciones exitosas ✓
//"ERROR: desc" cuando algo falla ✓
function mostrarCatalogo() {
    console.log("Productos disponibles:\n");
    var contadorItems = 1;
    productosDisponibles.forEach(function (producto) {
        console.log("".concat(producto.id, ". ").concat(producto.nombre, " - $").concat(producto.precio, " (Stock: ").concat(producto.stock, ")"));
        contadorItems++;
    });
}
function empezarSistema() {
    console.log("\n=========================================================");
    console.log("            SIMULADOR DE CARRITO DE COMPRAS");
    console.log("=========================================================\n");
    mostrarCatalogo();
    mostrarCarrito();
    agregarAlCarrito(6, 2); //Agrego mochila
    agregarAlCarrito(7, 5); //Intento agregar remera (demasiada cantidad, no hay stock)
    agregarAlCarrito(13, 3);
    agregarAlCarrito(15, 1); //Intento agregar pero la id no existe
    modificarCantidadCarrito(6, 5); //Cambio cantidad Mochila
    quitarDelCarrito(2);
    modificarCantidadCarrito(7, 2); //Cambio cantidad Remera (deberia tirar error porque no esta en el carrito)
    modificarCantidadCarrito(15, 3);
    calcularCarrito();
}
empezarSistema();
