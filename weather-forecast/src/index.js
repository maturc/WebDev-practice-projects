import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//C &#8451; F &#8457;
function Days(props) {
  return (
    <div></div>
  );
}
function Graphs(props) {
  return (
    <div></div>
  );
}
function WeatherDisplay(props) {
  if(props.renderWeatherDisplay) {
    const weatherForecast = props.weatherForecast;
    console.log(weatherForecast);
    const cityName = weatherForecast.city.name;
    const countryName = weatherForecast.city.country;
    return (
      <div>
        <div>
          <h1>{cityName}, {countryName}</h1>
          <span>{weatherForecast.list[0].dt}</span>
          <span>{weatherForecast.list[0].weather[0].description}</span>
        </div>
        <div>
          //icon
          {Math.round(weatherForecast.list[0].main.temp-272.15)}&#8457;
        </div>
        <div>
          <span>Rain: {weatherForecast.list[0].rain['3h']*10}&#37;</span>
          <span>Humidity: {weatherForecast.list[0].main.humidity}&#37;</span>
          <span>Wind: {weatherForecast.list[0].wind.speed} m/s</span>
        </div>
        <Graphs />
        <Days/>
      </div>
    );
  } else {
    return null;
  }
}
function Search(props) {
  const cityName = props.cityName;
  const countryName = props.countryName;
  const handleCityInputChange = props.handleCityInputChange;
  const handleCountryInputChange = props.handleCountryInputChange;
  const handleSubmit = props.handleSubmit;
  return (
    <form onSubmit={(e) => handleSubmit(e)} >
      <input
        type="text"
        value={cityName}
        placeholder="City..."
        onChange={(e) => handleCityInputChange(e.target.value)} />
      <input
        type="text"
        value={countryName}
        placeholder="Country..."
        onChange={(e) => handleCountryInputChange(e.target.value)} />
      <input
        type="submit"
        value="Submit"
      />
    </form>
  );
}
class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      cityName: "",
      countryName: "",
      renderWeatherDisplay: false,
      weatherForecast: {}
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
    //add condition for change state if getweather fails
    this.setState({
      renderWeatherDisplay: true,
      weatherForecast: weatherForecastObj
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
        />
      </div>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);