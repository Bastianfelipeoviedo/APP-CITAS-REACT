import React, { Fragment, useState } from 'react';
import {nanoid} from 'nanoid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) =>{

    //State de cita
    const [cita, setCita] =useState({
        mascota: '',
        propietario:'',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, setError] = useState(false);

    //Función que se ejecuta cada que el usuario escribe en un input

    const handleChange = event =>{
        setCita({
            ...cita,
            [event.target.name]: event.target.value
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas}= cita;

    // cuando el usuario envia el form
    const submitCita= event=>{
        event.preventDefault()

        // Validar
        if(mascota.trim()=== '' || propietario.trim()=== '' || fecha.trim()=== '' || hora.trim()=== '' || sintomas.trim()=== ''){
            setError(true);
            return;
        }

        // Eliminar en el caso de error de validación
        setError(false);

        // Asignar un ID
        cita.id= nanoid();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        setCita({
            mascota: '',
            propietario:'',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }

    return(
        <Fragment>
            <h2>Crear Cita</h2>
            {error?<p className="alerta-error">Todos los campos son obligatorios</p>: null}
            <form onSubmit={submitCita}>
                <label>Nombre Mascota</label>
                <input 
                    type="text" 
                    name="mascota" 
                    className="u-full-width" 
                    placeholder="Nombre Mascota" 
                    onChange={handleChange}
                    value={mascota}
                    />
                <label>Nombre del dueño</label>
                <input 
                type="text" 
                name="propietario" 
                className="u-full-width" 
                placeholder="Nombre dueño de la mascota" 
                onChange={handleChange}
                value={propietario}
                />
                <label>Fecha de alta</label>
                <input 
                    type="date" 
                    name="fecha" 
                    className="u-full-width" 
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time" 
                    name="hora" 
                    className="u-full-width" 
                    onChange={handleChange}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea 
                    className="u-full-width" 
                    name="sintomas" 
                    onChange={handleChange}
                    value={sintomas}>
                </textarea>
                <button type="submit"
                    className="u-full-width button-primary" 
                    onChange={handleChange}>
                        Agregar cita
                </button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes= {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;