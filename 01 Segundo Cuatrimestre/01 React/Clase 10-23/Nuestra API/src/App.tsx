import { useState } from 'react'
import './App.css'

import { PokemonList } from './PokemonList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <h1>- Pokedex -</h1>
        <PokemonList/>
      </div>
    </>
  )
}

export default App
