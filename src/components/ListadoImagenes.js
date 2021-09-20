import React from 'react';
import Imagen from './Imagen';

const ListadoImagenes = ({imagenes}) => {
    return ( 
        <div className="col1-12 p-5 row">
            {imagenes.map(imagen=>(
                <Imagen
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
     );
}
 
export default ListadoImagenes;