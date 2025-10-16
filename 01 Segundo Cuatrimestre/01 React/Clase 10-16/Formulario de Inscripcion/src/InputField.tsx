import './InputField.css'

interface InputFieldProps {
    label: string,
    type: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}

export function Input({label, type, placeholder, onChange}: InputFieldProps ) {
    return (
        <div className="input-field">
            <label>{label}</label><br />
            <input 
                type={type}
                placeholder={placeholder} 
                onChange={onChange}/>

        </div>
    )
}