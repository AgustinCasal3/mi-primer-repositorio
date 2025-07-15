interface Producto {
    id: number,
    nombre: string,
    precio: number,
    stock: number,
    categoria: string
}

interface Carrito {
    productoId: number,
    nombre: string,
    precio: number,
    cantidad: number,
    subtotal: number
}

const productosDisponibles: Producto[] = [
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

const carrito: Carrito[] = [
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

function agregarAlCarrito(idProducto:number, cantidad:number) {
    console.log(`\n=========================================================`);
    console.log(`              AGREGAR PRODUCTO AL CARRITO`);
    console.log(`=========================================================\n`);

    if (cantidad < 1) {
        console.log(`ERROR: La cantidad no puede ser menor a 1`);
        return;
    }

    //Verificacion para saber si el producto existe
    let productoExiste = false;
    productosDisponibles.forEach(producto => {
        if (producto.id == idProducto) {
            productoExiste = true;
        }
    });

    if (productoExiste == false) {
        console.log(`El producto con id ${idProducto} no figura dentro del catalogo.`);
    } else {
        productosDisponibles.forEach(producto => {
            //Verificar producto
            if (producto.id == idProducto) {
                //Verificar cantidad
                if (producto.stock < cantidad) {
                    console.log(`ERROR: No hay suficiente stock para el producto ${producto.nombre}. (Stock ${producto.stock}, cantidad deseada ${cantidad})`);
                    return;
                } else {
                    carrito.push({
                        productoId: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        cantidad: cantidad,
                        subtotal: (producto.precio * cantidad)
                    });
                    console.log(`Producto agregado correctamente.\n`);
                    console.log(`Producto: ${producto.nombre}`);
                    console.log(`Precio: ${producto.precio}`);
                    console.log(`Cantidad: ${cantidad}`);
                    console.log(`Subtotal: ${(producto.precio * cantidad)}`);
                    return;
                }
            }
        });
    }
}

//Quitar producto del carrito ✓

function quitarDelCarrito(idProducto:number) {
    console.log(`\n=========================================================`);
    console.log(`              QUITAR PRODUCTO DEL CARRITO`);
    console.log(`=========================================================\n`);

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].productoId == idProducto) {
            console.log(`Se elimino ${carrito[i].nombre} del carrito.`);
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

function modificarCantidadCarrito(idProducto:number, nuevaCantidad:number) {
    if (nuevaCantidad < 1) {
        console.log(`ERROR: La cantidad no puede ser menor a 1`);
        return;
    }


    console.log(`\n=========================================================`);
    console.log(`              MODIFICAR CANTIDAD PRODUCTO`);
    console.log(`=========================================================\n`);

    // Verificar si el producto existe en productosDisponibles
    let productoDisponible: Producto | undefined = undefined;

    productosDisponibles.forEach(producto => {
        if (producto.id == idProducto) {
            productoDisponible = producto;
        }
    });

    if (!productoDisponible) {
        console.log(`ERROR: No se encontró ningún producto con ID ${idProducto}`);
        return;
    }

    //Verificar si el producto esta dentro del carrito
    let productoCarrito: Carrito | undefined = undefined;
    carrito.forEach(producto => {
        if (producto.productoId == idProducto) {
            productoCarrito = producto;
        }
    });
    if (!productoCarrito) {
        console.log(`ERROR: No se encontró ningún producto con ID ${idProducto} dentro del carrito`);
        return;
    }

    //Trabajamos con el producto
    carrito.forEach(producto => {
        //Verificar producto
        if (producto.productoId == idProducto) {
            //Verificar cantidad
            productosDisponibles.forEach(prod => {
                if (prod.id == idProducto) {
                    if (prod.stock < nuevaCantidad) {
                        console.log(`ERROR: No hay stock suficiente para el producto ${prod.nombre}`);
                        return;
                    }
                }
            });

            console.log(`Se modifico la cantidad del producto ${producto.nombre} a ${nuevaCantidad}\n`);
            producto.cantidad = nuevaCantidad;
            producto.subtotal = producto.precio * nuevaCantidad;

            console.log(`Producto: ${producto.nombre}`);
            console.log(`Precio: ${producto.precio}`);
            console.log(`Cantidad: ${producto.cantidad}`);
            console.log(`Subtotal: ${(producto.subtotal)}`);
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
        console.log(`No hay items en el carrito`);
        return;
    }

    console.log(`\n=========================================================`);
    console.log(`                   CALCULAR CARRITO`);
    console.log(`=========================================================\n`);

    console.log(`---------------------------------------------------------\n`);

    let subtotal = 0;
    carrito.forEach(producto => {
        if (producto.cantidad >= 3) {
            //Se aplicara descuento de 10% por comprar 3 o mas unidades.
            console.log(`Producto: ${producto.nombre}`);
            console.log(`Precio: ${producto.precio}`);
            console.log(`Cantidad: ${producto.cantidad}`);
            console.log(`Subtotal: ${(producto.subtotal)}`);
            console.log(`Al comprar 3 o mas unidades recibira un descuento del 10%, siendo $${(producto.subtotal * 0.10)}`);
            console.log(`Nuevo subtotal: $${(producto.subtotal * 0.90)}`);
            subtotal += (producto.subtotal * 0.90);
            
        } else {
            console.log(`Producto: ${producto.nombre}`);
            console.log(`Precio: ${producto.precio}`);
            console.log(`Cantidad: ${producto.cantidad}`);
            console.log(`Subtotal: ${(producto.subtotal)}`);
            subtotal += producto.subtotal;
        }

        console.log(`\n---------------------------------------------------------\n`);   
    });

    let descuentoPorMonto = 0;
    if (subtotal > 100000 && subtotal <= 500000) {
        descuentoPorMonto = subtotal * 0.05;
        console.log(`MONTO MAYOR A $100.000! DESCUENTO DISPONIBLE!!`);
        console.log(`Se aplicara un descuento de 5% al subtotal, siendo $${descuentoPorMonto}\n`);
    } else if (subtotal > 500000) {
        console.log(`MONTO MAYOR A $500.000! DESCUENTO DISPONIBLE!!`);
        descuentoPorMonto = subtotal * 0.08;
        console.log(`Se aplicara un descuento de 8% al subtotal, siendo $${descuentoPorMonto}\n`);
    }

    let subtotalConDescuentos = subtotal - descuentoPorMonto;
    let iva = subtotalConDescuentos * 0.21;
    console.log(`Se aplicara un IVA de 21%, siendo $${iva}\n`);

    let totalFinal = subtotalConDescuentos + iva;
    console.log(`=========================================================`);
    console.log(`El monto TOTAL FINAL de su carrito es: $${totalFinal}`);
    console.log(`=========================================================`);
}

//Mostrar contenido del carrito ✓
//Mostrar desglose completo -> Finanzas ✓
//"Carrito vacio" cuando no hay productos -> Estados ✓
//"X productos en el carrito - Total $XXXX" cuando hay items -> Estados ✓
//"ERROR: desc" cuando algo falla -> Estados ✓

function mostrarCarrito() {
    console.log(`\n=========================================================`);
    console.log(`                   MOSTRAR CARRITO`);
    console.log(`=========================================================\n`);

    //Validar que haya items
    if (carrito.length < 1) {
        console.log(`No hay items en el carrito.`);
        return;
    }

    console.log(`\n---------------------------------------------------------\n`);   

    carrito.forEach(producto => {
        if (producto.cantidad >= 3) {
            //Se aplicara descuento de 10% por comprar 3 o mas unidades.
            console.log(`Producto: ${producto.nombre}`);
            console.log(`Precio: ${producto.precio}`);
            console.log(`Cantidad: ${producto.cantidad}`);
            console.log(`Subtotal: ${(producto.subtotal)}`);
            console.log(`Al comprar 3 o mas unidades recibira un descuento del 10%, siendo $${(producto.subtotal * 0.10)}`);
            console.log(`Nuevo subtotal: $${(producto.subtotal * 0.90)}`);
        } else {
            console.log(`Producto: ${producto.nombre}`);
            console.log(`Precio: ${producto.precio}`);
            console.log(`Cantidad: ${producto.cantidad}`);
            console.log(`Subtotal: ${(producto.subtotal)}`);
        }

        console.log(`\n---------------------------------------------------------\n`);   
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

    let contadorItems = 1;
    productosDisponibles.forEach(producto => {
        console.log(`${producto.id}. ${producto.nombre} - $${producto.precio} (Stock: ${producto.stock})`);
        contadorItems++;
    });
}

function empezarSistema() {
    console.log(`\n=========================================================`);
    console.log(`            SIMULADOR DE CARRITO DE COMPRAS`);
    console.log(`=========================================================\n`);

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