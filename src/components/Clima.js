import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({ resultado }) => {

    //Extraer Valores
    const { name, main, weather } = resultado;

    if (!name) return null;

    const urlIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div className="card-panel white col12">
            <div className="black-text">
                <h2>El clima de {name} es:</h2>
                <div className="row valign-wrapper">
                    <div className="col s6 right-align">
                        <img src={urlIcon} alt="" className="responsive-img"/>
                    </div>
                    <div className="col s6 left-align">
                        <h3>{main.temp}°C</h3>
                    </div>
                </div>
                <p>Estado del clima: {weather[0].description}</p>
                <p>Humedad: {main.humidity}%</p>
            </div>
        </div>
    );
}
 
Clima.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Clima;