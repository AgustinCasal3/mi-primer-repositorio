import { useState } from 'react'
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

    const [count, setCount] = useState(0);
    const incrementar = () => {setCount(count + 1)};
    const decrementar = () => {setCount(count - 1)};

    return (
        <div className="producto">
            <div className="contenedor">
                <div className="img">
                    <img src={imagen} alt="Imagen del producto"/>
                </div>
                <div className="texto">
                    <h3>{nombre}</h3>
                    <h2>${precio}</h2>
                </div>
                <div className="divContador">
                    <button onClick={incrementar}>+</button>
                    <p>{count}</p>
                    <button onClick={decrementar}>-</button>
                </div>
                <div className={claseStock}>
                    <h3>{textoStock}</h3>
                </div>
            </div>
        </div>
    )
}