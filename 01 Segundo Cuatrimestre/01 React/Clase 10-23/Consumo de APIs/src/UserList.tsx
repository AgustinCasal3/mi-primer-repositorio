import { useEffect, useState } from "react"

import './UserList.css'

import { Loading } from './Loading'
import { UserCard } from "./UserCard";

interface User {
    id: number,
    name: string,
    email: string,
    phone: string,
    website: string
}

export function UserList() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

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
            <div className="userList">
                <h2>Lista de Usuarios ({users.length})</h2>
                <div className="usersGrid">
                    {users.map((user) => (
                        <UserCard
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        phone={user.phone}
                        website={user.website}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}