import './BotonSubmit.css'

interface BotonSubmitProps {
    texto: string
    onClick: (e: React.FormEvent) => void
}

export function Boton({texto, onClick}: BotonSubmitProps) {
    return (
        <>
            <div className="divBoton">
                <button onClick={onClick}>{texto}</button>
            </div>
        </>
    )
}