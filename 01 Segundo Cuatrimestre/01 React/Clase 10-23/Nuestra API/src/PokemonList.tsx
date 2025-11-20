import { useEffect, useState } from "react"

import './PokemonList.css'
import { Loading } from './Loading'
import { PokemonCard } from "./PokemonCard"

interface Pokemon {
    name: string;
    url: string;
}

export function PokemonList() {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [page, setPage] = useState(1);
    const limit = 12;

    const [search, setSearch] = useState("");
    const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);

    const [totalPokemons, setTotalPokemons] = useState(0);
    const totalPages = Math.ceil(totalPokemons / limit);

    const [pageInput, setPageInput] = useState("");

    async function fetchPokemons() {
        try {
            setLoading(true);
            setSearchedPokemon(null);

            const offset = (page - 1) * limit;

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            );

            if (!response.ok)
                throw new Error("Error en la carga de Pokémon");

            const data = await response.json();

            setPokemons(data.results);
            setTotalPokemons(data.count); // 🔥 total dinámico

        } catch (err) {
            setError("No se pudieron cargar los Pokémon");
        } finally {
            setLoading(false);
        }
    }

    async function searchPokemon() {
        if (search.trim() === "") return;

        try {
            setLoading(true);

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
            );

            if (!response.ok) {
                setError("Pokémon no encontrado");
                return;
            }

            const data = await response.json();

            setSearchedPokemon({
                name: data.name,
                url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
            });

        } catch {
            setError("Error en la búsqueda");
        } finally {
            setLoading(false);
        }
    }

    async function fetchRandomPokemon() {
        try {
            setLoading(true);

            const randomId = Math.floor(Math.random() * totalPokemons) + 1;

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomId}`
            );

            const data = await response.json();

            setSearchedPokemon({
                name: data.name,
                url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
            });

        } catch {
            setError("No se pudo cargar un Pokémon random");
        } finally {
            setLoading(false);
        }
    }

    function goToPage() {
        const num = parseInt(pageInput);

        if (isNaN(num) || num < 1 || num > totalPages) {
            alert(`Página inválida. Debe ser entre 1 y ${totalPages}`);
            return;
        }

        setPage(num);
        setSearchedPokemon(null);
    }

    useEffect(() => {
        fetchPokemons();
    }, [page]);

    if (loading) return <Loading />;
    if (error) return <div className="error">
        <h2>{error}</h2>
    </div>;

    return (
        <>
            <div className="busquedaPokemon">
                <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    className="searchInput"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={searchPokemon}>Buscar</button>

                <button onClick={fetchRandomPokemon}>Pokemon Random</button>

                <button onClick={fetchPokemons}>Recargar</button>
            </div>

            <div className="userList">

                {searchedPokemon ? (
                    <div className="contenedorPokemons">
                        <div className="pokemonGrid">
                            <PokemonCard
                                name={searchedPokemon.name}
                                url={searchedPokemon.url}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="contenedorPokemons">
                            <div className="pokemonGrid">
                                {pokemons.map((poke) => (
                                    <PokemonCard
                                        key={poke.name}
                                        name={poke.name}
                                        url={poke.url}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="paginacion">
                            <button onClick={() => setPage(1)} disabled={page === 1}>
                                ←←
                            </button>

                            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                                ←
                            </button>

                            <span>
                                Página {page} de {totalPages}
                            </span>

                            <button onClick={() => setPage(page + 1)}>
                                →
                            </button>

                            <button onClick={() => setPage(totalPages)}>
                                →→
                            </button>
                        </div>

                        <div className="gotoPage">
                            <input
                                type="number"
                                placeholder="1"
                                value={pageInput}
                                onChange={(e) => setPageInput(e.target.value)}
                                min={1}
                                max={totalPages}
                            />
                            <button onClick={goToPage}>Ir</button>
                        </div>
                    </>
                )}

            </div>
        </>
    );
}
