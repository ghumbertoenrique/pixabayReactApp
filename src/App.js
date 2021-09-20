import React,{useState, useEffect} from 'react';
import Formulario from './components/formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([])
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect( () =>{
    const consultarAPI = async () =>{
      if(busqueda === '') return;

      const imagenesPorPaginas = 30;
      const APIKey = '23315507-019ce8a1c537608f3232ac8c2';
      const url = `https://pixabay.com/api/?key=${APIKey}&q=${busqueda}&per_page=${imagenesPorPaginas}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // calcular el total de paginas

      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPaginas);
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover la pantalla hacia arriba

      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});

    }
    consultarAPI();
  },[busqueda, paginaactual] )

  const paginaAnterior = e =>{
    const nuevaPaginaActual = paginaactual -1;
    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual +1;
    if(nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p> 
          <Formulario 
            guardarBusqueda={guardarBusqueda}
          />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes
          imagenes={imagenes}
        />
        { (paginaactual === 1 )? null : ( 
        <button
          type="button"
          className="btn btn-info mr-1"
          onClick={paginaAnterior}
        >
          &laquo; Anterior 
        </button>) }
        {(paginaactual === totalpaginas)?null : (
        <button
          type="button"
          className="btn btn-info"
          onClick={paginaSiguiente}
        >
          Siguiente &raquo;
        </button>
        )}
      </div>

    </div>
  );
}

export default App;
