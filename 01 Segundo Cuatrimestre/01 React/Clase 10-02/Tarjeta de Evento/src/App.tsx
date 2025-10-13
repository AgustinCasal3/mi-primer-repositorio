import './App.css'
import { EventCard } from './Eventos'

function App() {
  return (
    <>
      <div className="tituloPrincipal">
        <h1>
          Eventos Disponibles:
        </h1>
      </div>
      <div className="contenedorEventos">
        <div className="eventos">
          {EventCard({
            title: "Lollapalooza Argentina 2025",
            date: "2025-03-28",
            location: "Hipódromo de San Isidro, Buenos Aires",
            attendees: 85000,
            category: "music"
          })}

          {EventCard({
            title: "Final Copa Libertadores",
            date: "2025-11-30",
            location: "Estadio Monumental, Buenos Aires",
            attendees: 70000,
            category: "sports"
          })}

          {EventCard({
            title: "Argentina Game Dev Summit",
            date: "2025-08-15",
            location: "Centro de Convenciones, Córdoba",
            attendees: 1200,
            category: "tech"
          })}

          {EventCard({
            title: "Festival Gastronómico Buenos Aires 2025",
            date: "2025-09-21",
            location: "Puerto Madero, Buenos Aires",
            attendees: 5000,
            category: "food"
          })}
          </div>
      </div>
    </>
  )
}

export default App
