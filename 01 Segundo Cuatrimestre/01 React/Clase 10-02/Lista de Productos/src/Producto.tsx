import './Producto.css'

interface Producto {
  nombre: string
  precio: number
  stock: boolean
  imagen: string
}

export function TarjetaProducto({nombre, precio, stock, imagen}: Producto) {

    const claseStock = stock ? 'disponible' : 'agotado';
    const textoStock = stock ? 'Hay Stock' : 'No hay Stock';


    return (
        <div className="contenedor">
            <div className="img">
                <img src={imagen} alt="Imagen del producto"/>
            </div>
            <div className="texto">
                <h3>{nombre}</h3>
                <h2>${precio}</h2>
            </div>
            <div className={claseStock}>
                <h3>{textoStock}</h3>
            </div>
        </div>
    )
}