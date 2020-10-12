import React, {useState} from 'react';
import shortid from 'shortid';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {
    //definir state
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //Cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //validar
        if (nombre.trim()==="" || cantidad < 1 || isNaN(cantidad)){
            guardarError(true);
            return;
        }

        guardarError(false);

        //construir gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //resetear al form
        guardarNombre('');
        guardarCantidad('');
    }

    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            {error ? <Error message= "ERROR!! El gasto es incorrecto" /> : null}

            <div className="campo">
                <label> Nombre del gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value= {nombre}
                    onChange= {e=> guardarNombre(e.target.value)}
                />
                <label> Cantidad del gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange= {e => guardarCantidad (parseInt(e.target.value), 10)}
                />
            </div>
            <input 
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />    
        </form>
     );
}

Formulario.propTypes = {
    guardarGasto : PropTypes.func.isRequired,
    guardarCrearGasto:  PropTypes.func.isRequired
}
 
export default Formulario;
