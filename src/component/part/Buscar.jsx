import React from 'react';

const Buscar = props => (

    <input
                type="text"
                className="form-control"
                placeholder={props.buscarA}
                id={props.idBuscar}
                value={props.valueBuscar}
              />
)

export default Buscar