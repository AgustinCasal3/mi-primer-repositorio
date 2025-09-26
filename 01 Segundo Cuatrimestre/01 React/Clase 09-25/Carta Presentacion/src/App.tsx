import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FotoAgus from './imgs/Agustin.png'

interface Persona {
  dni: number,
  nombre: string,
  apellido: string,
  altura: number,
  edad: number,
  genero: string,
  img: string
}

const Agustin: Persona = {
  dni: 47257342,
  nombre: "Agutin",
  apellido: "Casl",
  altura: 174,
  edad: 19,
  genero: "secreto",
  img: FotoAgus
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="contenido">
      <div className='imagen'>
        <img src={Agustin.img} alt="Foto de Agustin" />
      </div>
      <div className='texto'>
        <div className='titulo'>
          <h1>Authenticity Certificate</h1>
        </div>
        <div className='lista'>
          <ul>
            <li>Nombre: {Agustin.nombre}</li>
            <li>Apellido: {Agustin.apellido}</li>
            <li>Altura: {Agustin.altura}</li>
            <li>Edad: {Agustin.edad}</li>
            <li>Genero {Agustin.genero}</li>
          </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
