import React from 'react';
import Graphs from './Graphs'
import Days from './Days'

function WeatherDisplay(props) {
  if(props.weatherForecast.cod === "404") {
    return (
      <span>City not found.</span>
    );
  }
  else if(props.renderWeatherDisplay) {
    const weatherForecast = props.weatherForecast;
    console.log(weatherForecast);
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
          <span>{weatherForecast.list[0].dt}</span>
          <span>{weatherForecast.list[0].weather[0].description}</span>
        </div>
        <div>
          icon
          {Math.round(weatherForecast.list[0].main.temp-272.15)}&#8451;
        </div>
        <div>
          <span>Precipitation: {rain}&#37;</span>
          <span>Humidity: {weatherForecast.list[0].main.humidity}&#37;</span>
          <span>Wind: {weatherForecast.list[0].wind.speed} m/s</span>
        </div>
        <Graphs
          weatherForecast={props.weatherForecast}
          temperatureArray={props.temperatureArray}
          precipitationArray={props.precipitationArray}
          windArray={props.windArray}
          dateTimeArray={props.dateTimeArray}
        />
        <Days/>
      </div>
    );
  } else {
    return null;
  }
}

export default WeatherDisplay;