import './InputField.css'

interface InputFieldProps {
    label: string,
    type: string,
    value:string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string
}

export function Input({label, type, value, placeholder, onChange}: InputFieldProps ) {
    return (
        <div className="input-field">
            <label>{label}</label><br />
            <input 
                type={type}
                value={value}
                placeholder={placeholder} 
                onChange={onChange}/>

        </div>
    )
}