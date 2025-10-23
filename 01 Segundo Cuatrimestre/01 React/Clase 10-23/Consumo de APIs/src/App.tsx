import { useState } from 'react'
import './App.css'

import { UserList } from './UserList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app">
        <h1>API de Usuarios</h1>
        <UserList/>
      </div>
    </>
  )
}

export default App
