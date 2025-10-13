import './Eventos.css'

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  category: 'music' | 'sports' | 'tech' | 'food';
}

export function EventCard({ title, date, location, attendees, category }: EventCardProps) {

    let categoria;
    if (category == 'music') {
        categoria = 'Musica';
    } else if (category == 'sports') {
        categoria = 'Deportes';
    } else if (category == 'tech') {
        categoria = 'Tecnologia';
    } else if (category == 'food') {
        categoria = 'Comida';
    }

    return (
            <>
                <div className="contenedor">
                    <div className={category}>
                        <h1>{title}</h1>
                        <h2>{date}</h2>
                        <h3>{location}</h3>
                        <p>Participantes: {attendees}</p>
                        <h2>Tematica del evento: {categoria}</h2>
                    </div>
                </div>
            </>
        )
}
