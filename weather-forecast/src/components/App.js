import React from 'react';
import Search from './Search'
import WeatherDisplay from './WeatherDisplay'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      countryName: "",
      renderWeatherDisplay: false,
      weatherForecast: {},
      temperatureArray: [],
      precipitationArray: [],
      windArray: [],
      dateTimeArray: []
    };
    this.handleCityInputChange = this.handleCityInputChange.bind(this);
    this.handleCountryInputChange = this.handleCountryInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getWeather = async (city, country) => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=e74587f77136920cc8551103a502e698`);
    const response = await api_call.json();
    return response;
  }
  handleCityInputChange(name) {
    this.setState({
      cityName: name
    });
  }
  handleCountryInputChange(name) {
    this.setState({
      countryName: name
    });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const weatherForecastObj = await this.getWeather(this.state.cityName, this.state.countryName);
    let temperature = [];
    let precipitation = [];
    let wind = [];
    let dTime = [];
    weatherForecastObj.list.forEach(element => {
      temperature.push(Math.round(element.main.temp-272.15));
      if (!element.hasOwnProperty("rain")) {
          precipitation.push(0);
      } else if (isNaN(element.rain['3h'])) {
          precipitation.push(0);
      } else {
        precipitation.push(Math.round(element.rain['3h']*10));
      }
      wind.push(element.wind.speed);
      dTime.push(element.dt_txt.slice(-8,-3))
    });
    this.setState({
      renderWeatherDisplay: true,
      weatherForecast: weatherForecastObj,
      temperatureArray: temperature,
      precipitationArray: precipitation,
      windArray: wind,
      dateTimeArray: dTime
    });
  }

  render() {
    return (
      <div>
        <Search
          cityName={this.state.cityName}
          countryName={this.state.countryName}
          handleCityInputChange={this.handleCityInputChange}
          handleCountryInputChange={this.handleCountryInputChange}
          handleSubmit={this.handleSubmit}
        />
        <WeatherDisplay 
          cityName={this.state.cityName}
          countryName={this.state.countryName}
          renderWeatherDisplay={this.state.renderWeatherDisplay}
          weatherForecast={this.state.weatherForecast}
          temperatureArray={this.state.temperatureArray}
          precipitationArray={this.state.precipitationArray}
          windArray={this.state.windArray}
          dateTimeArray={this.state.dateTimeArray}
        />
      </div>
    );
  }
}

export default App;
