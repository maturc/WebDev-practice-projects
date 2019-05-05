import React from 'react';
import Graphs from './Graphs'

function WeatherDisplay(props) {
  if(props.renderWeatherDisplay) {
    const weatherForecast = props.weatherForecast;
    const cityName = weatherForecast.city.name;
    const countryName = weatherForecast.city.country;
    let rain;
    if (weatherForecast.list[0].hasOwnProperty("rain")) {
      rain = weatherForecast.list[0].rain['3h']*10;
    } else {
      rain = 0;
    }
    return (
      <div>
        <div>
          <h1>{cityName}, {countryName}</h1>
          <span>{weatherForecast.list[0].dt_txt}</span>
        </div>
        <div className="fontNormal">
          <span className="capitalize">{weatherForecast.list[0].weather[0].description}</span>&nbsp;
          {Math.round(weatherForecast.list[0].main.temp-272.15)}°C;
        </div>
        <div>
          <span>Precipitation: {rain}&#37;</span>&nbsp;&nbsp;
          <span>Humidity: {weatherForecast.list[0].main.humidity}%</span>&nbsp;&nbsp;
          <span>Wind: {weatherForecast.list[0].wind.speed} m/s</span>
        </div>
        <Graphs
          weatherForecast={props.weatherForecast}
          temperatureArray={props.temperatureArray}
          precipitationArray={props.precipitationArray}
          windArray={props.windArray}
          dateTimeArray={props.dateTimeArray}
        />
      </div>
    );
  } else {
    return null;
  }
}

export default WeatherDisplay;