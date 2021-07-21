import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
    //State del formulario
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    });

    const [consultar, guardarConsultar] = useState(false);
    const [resultado, guardarResultado] = useState({});
    const [error, guardarError] = useState(false);

    const { ciudad, pais } = busqueda;
    
    useEffect(() => {
        const consultaAPI = async () => {
            if (consultar) {
                const appId = "da69a3401ddf4d205bb3a3bc79701989";
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}&units=metric&lang=es`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                guardarResultado(resultado);
                guardarConsultar(false);

                //Detecta si hubo error de la consulta
                guardarError(false);
                if (resultado.cod === "404")
                    guardarError(true);
            }
        }
        consultaAPI();
        // eslint-disable-next-line
    }, [consultar]);
    
    let componente;
    if (error) {
        componente =    <Error 
                            mensaje="No hay resultados"
                        />
    } else {
        componente =    <Clima
                            resultado={resultado}
                        />
    }
    return (
        <Fragment>
            <Header
                titulo='Clima React App'
            />
            <div className="contenedor-form">
                <div className="container">
                <div className="row">
                    <div className="col m6 s12">
                        <Formulario
                            busqueda={busqueda}
                            guardarBusqueda={guardarBusqueda}
                            guardarConsultar={guardarConsultar}
                        />
                    </div>
                    <div className="col m6 s12">
                        {componente}
                    </div>
                </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
