import './BotonSubmit.css'

interface BotonSubmitProps {
    texto: string
    type: any
    onClick: (e: React.FormEvent) => void
}

export function Boton({texto, type, onClick}: BotonSubmitProps) {
    return (
        <>
            <div className="divBoton">
                <button onClick={onClick} type={type}>{texto}</button>
            </div>
        </>
    )
}