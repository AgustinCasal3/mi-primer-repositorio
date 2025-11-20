import './PokemonCard.css'

interface Props {
    name: string;
    url: string;
}

export function PokemonCard({ name, url }: Props) {

    const id = url.split("/").slice(-2, -1)[0];

    // Sprite animado estilo Showdown
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;

    return (
        <div className="userCard">
            <div className="imgUserCard">
                <img 
                    src={image} 
                    alt={name}
                    onError={(e) => {
                        // Si no existe el GIF animado, usamos el PNG normal
                        (e.target as HTMLImageElement).src =
                            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                    }}
                />
            </div>

            <h3>{name.toUpperCase()}</h3>

            <p>ID: {id}</p>
        </div>
    );
}
