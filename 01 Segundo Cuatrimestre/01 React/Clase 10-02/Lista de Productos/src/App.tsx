import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TarjetaProducto } from './Producto'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="contenido">
        <h1>Nuestros Productos</h1>

        {TarjetaProducto({nombre: "Mococo Friends with U", precio: 40, stock: true, imagen: '../public/imgs/Mococo.png'})}
        <br />
        {TarjetaProducto({nombre: "Fuwawa Friends with U", precio: 45, stock: false, imagen: '../public/imgs/Fuwawa.png'})}
        <br />
        {TarjetaProducto({nombre: "Aqua Friends with U", precio: 35, stock: true, imagen: '../public/imgs/Aqua.png'})}
      </div>
    </>
  )
}

export default App
