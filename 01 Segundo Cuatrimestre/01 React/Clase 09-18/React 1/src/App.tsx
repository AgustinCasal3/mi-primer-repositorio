import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MyButton() {
  return (
    <button>Soy un boton</button>
  );
}


export default function MyApp() {
  return (
    <div>
      <h1>Bienvenido a mi Aplicacion</h1>
      <MyButton/>
    </div>
  );
}