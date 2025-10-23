import './UserCard.css'

interface UserCardProps {
    name: string,
    email: string,
    phone: string,
    website: string
}

export function UserCard(props: UserCardProps) {
    return (
        <>
        <div className="userCard">
            <h3>{props.name}</h3>
            <p>{props.email}</p>
            <p>{props.phone}</p>
            <p>{props.website}</p>
        </div>
        </>
    )
}