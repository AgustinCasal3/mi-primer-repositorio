import { useEffect, useState } from "react"

import './UserList.css'

import { Loading } from './Loading'
import { UserCard } from "./UserCard";

interface User {
    id: number,
    name: string,
    email: string,
    phone: string,
    website: string,
    company: {
        name: string;
    };
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
}

export function UserList() {

    const [paginaActual, setPaginaActual] = useState(1);
    const cantUsuariosPagina = 5;

    const [search, setSearch] = useState("");

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error('Error en la carga de usuarios');
            }

            const data = await response.json();

            setUsers(data);
        } catch (err) {
            setError('No se pudieron cargar los usuarios');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const usuariosFiltrados = users.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase())
    );
    
    const startIndex = (paginaActual - 1) * cantUsuariosPagina;
    const endIndex = startIndex + cantUsuariosPagina;
    const usuariosPagina = usuariosFiltrados.slice(startIndex, endIndex);
    
    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <Loading></Loading>
        )
    }

    if (error) {
        return (
            <>
                <div className="error">{error}</div>
            </>
        )
    }

    return (
        <>
            <div className="busquedaUsuarios">
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="searchInput"
                />

                <div className="reloadButton">
                    <button onClick={fetchUsers}>Recargar API</button>
                </div>
            </div>

            <div className="userList">
                <h2>Lista de Usuarios ({usuariosFiltrados.length})</h2>
                <div className="usersGrid">
                    {usuariosPagina.map((user) => (
                        <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        phone={user.phone}
                        website={user.website}
                        company={user.company.name}
                        address={`${user.address.street}, ${user.address.city}`}
                        />
                    ))}
                </div>
            </div>

            <div className="paginacion">
                <button
                    disabled={paginaActual === 1}
                    onClick={() => setPaginaActual(paginaActual - 1)}
                >
                    ←
                </button>

                <span>Página {paginaActual}</span>

                <button
                    disabled={endIndex >= usuariosFiltrados.length}
                    onClick={() => setPaginaActual(paginaActual + 1)}
                >
                    →
                </button>
            </div>
        </>
    )
}