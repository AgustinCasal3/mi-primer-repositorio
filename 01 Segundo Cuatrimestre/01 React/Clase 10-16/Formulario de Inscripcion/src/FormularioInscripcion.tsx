import React, { useEffect, useState } from 'react'

import { Boton } from './BotonSubmit'
import { Input } from './InputField'

export function Formulario() {
    const [nombre, setNombre] = useState('');

    const [apellido, setApellido] = useState('');

    const [email, setEmail] = useState('');

    const [telefono, setTelefono] = useState('');
    
    const [mensajeExito, setMensajeExito] = useState('');

    useEffect(() => {
        if (mensajeExito) {
            document.title = 'Inscripcion Exitosa'
        } else {
            document.title = 'Sistema de Inscripcion'
        }
    }, [mensajeExito]);

    function handleReset() {
        setNombre('');
        setApellido('');
        setEmail('');
        setTelefono('');

        // value=''
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();


        if (nombre == '' || apellido == '' || email == '' || telefono == '' ) {
            alert('Por favor, completa todos los campos.');
            setMensajeExito('');
        } else {
            setMensajeExito('Exito');
            handleReset();
        }


    }

    return (
        <>
            <Input label='nombre' type='text' placeholder='Ingrese su Nombre' onChange={(e) => setNombre(e.target.value)} ></Input>
            <Input label='Apellido' type='text' placeholder='Ingrese su Apellido' onChange={(e) => setApellido(e.target.value)} ></Input>
            <Input label='Email' type='email' placeholder='ejemplo@email.com' onChange={(e) => setEmail(e.target.value)} ></Input>
            <Input label='Telefono' type='tel' placeholder='1234567890' onChange={(e) => setTelefono(e.target.value)} ></Input>

            <Boton texto="Aceptar" onClick={handleSubmit} />
        </>
    )
}

