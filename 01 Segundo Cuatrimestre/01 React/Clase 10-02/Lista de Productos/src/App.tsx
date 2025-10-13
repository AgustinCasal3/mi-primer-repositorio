import './App.css'
import { TarjetaProducto } from './Producto'
import { Reloj } from './Reloj'

function App() {

  return (
    <>
        <h1>Nuestros Productos</h1>
      <div className="contenido">

        {TarjetaProducto({nombre: "Mococo Friends with U", precio: 40, stock: true, imagen: '../public/imgs/Mococo.png'})}
        {TarjetaProducto({nombre: "Fuwawa Friends with U", precio: 45, stock: false, imagen: '../public/imgs/Fuwawa.png'})}
        {TarjetaProducto({nombre: "Aqua Friends with U", precio: 35, stock: true, imagen: '../public/imgs/Aqua.png'})}
      </div>
        {Reloj()}
    </>
  )
}

export default App
