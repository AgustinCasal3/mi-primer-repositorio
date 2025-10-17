import './App.css'

import { Formulario } from './FormularioInscripcion'

function App() {

  return (
    <>
      <div className="contenedorTotal">
        <h1>Sistema de Inscripcion</h1>

        { Formulario() }
      </div>
    </>
  )
}

export default App
