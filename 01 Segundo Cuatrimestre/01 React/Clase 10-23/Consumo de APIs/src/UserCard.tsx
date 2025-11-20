import './UserCard.css'

interface UserCardProps {
    name: string;
    email: string;
    phone: string;
    website: string;
    company: string;
    address: string;
}

export function UserCard({ name, email, phone, website, company, address }: UserCardProps) {
    return (
        <div className="userCard">
            <h3>{name}</h3>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Teléfono:</strong> {phone}</p>
            <p><strong>Website:</strong> {website}</p>

            <p><strong>Empresa:</strong> {company}</p>
            <p><strong>Dirección:</strong> {address}</p>
        </div>
    );
}