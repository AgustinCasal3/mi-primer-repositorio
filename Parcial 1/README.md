Instrucciones de uso para el Carrito - Agustin Casal

Este proyecto tiene dependencias de node.js, para instalarlos, en consola ejecutar el comando
npm i

Para ejecutar el codigo, hacerlo con el comando
npm run start

En el caso de querer modificar el codigo y su comportamiento, debe modificar el archivo dentro de la carpeta "src" que se llama "carrito.ts"

Al terminar las modificaciones, compilar el codigo con el comando
npm run build

POSIBILIDADES DE MODIFICACION DEL CODIGO

Este codigo funciona con funciones faciles de reconocer y de utilizar, gracias a sus nombres

Todo lo que se ejecuta del codigo, se encuentra dentro de la funcion empezarSistema(), asi que si se desea hacer alguna modificacion, es necesario cambiar el contenido de esta funcion

Las funciones disponibles en el sistema y su utilizacion son:

agregarAlCarrito(idProducto, cantidad);
Simplemente agrega un producto con la id especificada a cambio de "idProducto" y la cantidad en la variable "cantidad".

quitarDelCarrito(idProducto);
La funcion elimina un Producto del carrito, el parametro "idProducto" es para identificarlo.

modificarCantidadCarrito(idProducto, nuevaCantidad);
Modifica la cantidad de uno de los productos del carrito. "idProducto" sirve para identificar el producto y "nuevaCantidad" para establecer la nueva cantidad.

calcularCarrito();
No hace falta parametros para esta funcion. Simplemente hace un recuento de todos los productos agregados al carrito, aplica descuentos y muestra el monto total.

mostrarCarrito();
Se explica a si misma, muestra todos los productos dentro del carrito, pero sin hacer un recuento de nada.

mostrarCatalogo();
Como dice el nombre, muestra todos los productos del catalogo, su precio, stock, etc.