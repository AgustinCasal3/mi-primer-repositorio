import './FormularioInscripcion.css'

import React, { useEffect, useState } from 'react'

import { Boton } from './BotonSubmit'
import { Input } from './InputField'

export function Formulario() {
    const [nombre, setNombre] = useState('');

    const [apellido, setApellido] = useState('');

    const [email, setEmail] = useState('');

    const [telefono, setTelefono] = useState('');
    
    const [mensajeExito, setMensajeExito] = useState(false);

    useEffect(() => {
        if (mensajeExito) {
            document.title = 'Inscripcion Exitosa'
        } else {
            document.title = 'Sistema de Inscripcion'
        }
    }, [mensajeExito]);

    function handleReset() {
        setMensajeExito(false);

        setNombre('');
        setApellido('');
        setEmail('');
        setTelefono('');
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (nombre == '' || apellido == '' || email == '' || telefono == '' ) {
            alert('Por favor, completa todos los campos.');
            setMensajeExito(false);
        } else {
            setMensajeExito(true);
        }
    }

    return (
        <>
            <div className="contenedorForm">
                <form onSubmit={handleSubmit}>
                    <Input label='Nombre' type='text' value={nombre} placeholder='Ingrese su Nombre' onChange={(e) => setNombre(e.target.value)} ></Input>
                    <Input label='Apellido' type='text' value={apellido} placeholder='Ingrese su Apellido' onChange={(e) => setApellido(e.target.value)} ></Input>
                    <Input label='Email' type='email' value={email} placeholder='ejemplo@email.com' onChange={(e) => setEmail(e.target.value)} ></Input>
                    <Input label='Telefono' type='tel' value={telefono} placeholder='1234567890' onChange={(e) => setTelefono(e.target.value)} ></Input>

                    <Boton texto="Aceptar" type='submit' onClick={handleSubmit} />

                    <Boton texto="Nueva Inscripcion" type='button' onClick={handleReset} />
                </form>

            </div>
        </>
    )
}

